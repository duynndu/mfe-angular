<template>
  <div class="page-a4-wrapper" :class="{ 'landscape': landscape }">
    <!-- Container nguồn dùng để Vue render slot ban đầu -->
    <div
      ref="sourceContainer"
      class="page-a4-source"
      :style="[computedStyle, { width: pageWidth }]"
    >
      <slot></slot>
    </div>

    <!-- Danh sách các trang A4 được tự động phân chia -->
    <div
      v-for="pIdx in pageCount"
      :key="pIdx"
      class="page-a4 page-a4-sheet"
      :class="{ 'landscape': landscape }"
      :style="[computedStyle, { width: pageWidth, minHeight: pageHeight, height: pageHeight }]"
    >
      <div
        class="page-a4-content"
        :ref="(el) => setPageRef(el, pIdx - 1)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, PropType } from 'vue';

export default {
  name: 'PageA4',
  props: {
    style: {
      type: [Object, String] as PropType<Record<string, string> | string>,
      default: () => ({ padding: '10mm 15mm' }),
    },
    landscape: {
      type: Boolean,
      default: false,
    },
    autoPaginate: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const sourceContainer = ref<HTMLElement | null>(null);
    const pageCount = ref<number>(1);
    const pageRefs = ref<HTMLElement[]>([]);

    let isPaginating = false;
    let resizeObserver: ResizeObserver | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const setPageRef = (el: any, index: number) => {
      if (el) {
        pageRefs.value[index] = el as HTMLElement;
      }
    };

    const computedStyle = computed(() => {
      if (typeof props.style === 'string') {
        return props.style;
      }
      return {
        padding: '10mm 15mm',
        ...props.style,
      };
    });

    const pageWidth = computed(() => (props.landscape ? '297mm' : '210mm'));
    const pageHeight = computed(() => (props.landscape ? '210mm' : '297mm'));

    // Chuyển đổi mm sang pixel xấp xỉ chuẩn CSS (96 DPI: 1mm ≈ 3.7795px)
    const getPageHeightPx = () => {
      const mm = props.landscape ? 210 : 297;
      return mm * 3.779527559;
    };

    const getPaddingVerticalPx = (el: HTMLElement) => {
      const cs = window.getComputedStyle(el);
      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      return pt + pb;
    };

    const getElementOuterHeight = (el: HTMLElement) => {
      const cs = window.getComputedStyle(el);
      const mt = parseFloat(cs.marginTop) || 0;
      const mb = parseFloat(cs.marginBottom) || 0;
      return el.offsetHeight + mt + mb;
    };

    // Lấy toàn bộ child DOM nodes của template theo đúng thứ tự
    const allOrderedChildren = ref<HTMLElement[]>([]);

    const collectInitialChildren = () => {
      if (!sourceContainer.value) return;
      const directChildren = Array.from(sourceContainer.value.children) as HTMLElement[];
      if (directChildren.length > 0) {
        allOrderedChildren.value = directChildren;
      }
    };

    // Phân chia các element vào các trang A4 mà KHÔNG gây mất focus
    const paginate = () => {
      if (isPaginating) return;
      isPaginating = true;

      // Lưu trữ trạng thái focus và vị trí con trỏ của input hiện tại
      const activeEl = document.activeElement as HTMLElement | null;
      let caretStart: number | null = null;
      let caretEnd: number | null = null;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')
      ) {
        const inputEl = activeEl as HTMLInputElement | HTMLTextAreaElement;
        try {
          caretStart = inputEl.selectionStart;
          caretEnd = inputEl.selectionEnd;
        } catch (_) {}
      }

      collectInitialChildren();
      const children = allOrderedChildren.value;

      if (children.length === 0) {
        pageCount.value = 1;
        isPaginating = false;
        return;
      }

      if (!props.autoPaginate) {
        pageCount.value = 1;
        nextTick(() => {
          const targetPage = pageRefs.value[0];
          if (targetPage) {
            children.forEach((child) => {
              if (child.parentElement !== targetPage) {
                targetPage.appendChild(child);
              }
            });
          }
          isPaginating = false;
        });
        return;
      }

      const sheetEl = (pageRefs.value[0]?.closest('.page-a4-sheet') as HTMLElement) || sourceContainer.value;
      const totalPageHeightPx = sheetEl?.clientHeight || getPageHeightPx();
      const paddingVerticalPx = sheetEl ? getPaddingVerticalPx(sheetEl) : 75.6;
      const maxContentHeightPx = Math.max(100, totalPageHeightPx - paddingVerticalPx);

      // Phân bổ các phần tử vào từng bucket trang dựa trên chiều cao thực tế
      const pageBuckets: HTMLElement[][] = [[]];
      let currentAccumulatedHeight = 0;
      let currentPageIdx = 0;

      children.forEach((child) => {
        const itemHeight = getElementOuterHeight(child);

        // Nếu phần tử vượt quá chiều cao còn lại của trang hiện tại
        if (currentAccumulatedHeight + itemHeight > maxContentHeightPx && currentAccumulatedHeight > 0) {
          currentPageIdx++;
          pageBuckets[currentPageIdx] = [];
          currentAccumulatedHeight = 0;
        }

        pageBuckets[currentPageIdx].push(child);
        currentAccumulatedHeight += itemHeight;
      });

      const newPageCount = Math.max(1, pageBuckets.length);
      pageCount.value = newPageCount;

      nextTick(() => {
        let hasMovedAnyNode = false;

        // Phân phối element vào đúng page sheet và đảm bảo thứ tự chính xác
        pageBuckets.forEach((bucket, pIdx) => {
          const targetPage = pageRefs.value[pIdx];
          if (!targetPage) return;

          bucket.forEach((child, index) => {
            const currentChildAtIndex = targetPage.children[index];
            if (currentChildAtIndex !== child) {
              targetPage.insertBefore(child, currentChildAtIndex || null);
              hasMovedAnyNode = true;
            }
          });
        });

        // Phục hồi focus và vị trí con trỏ nếu node bị di chuyển
        if (hasMovedAnyNode && activeEl && document.contains(activeEl)) {
          try {
            activeEl.focus();
            if (
              caretStart !== null &&
              caretEnd !== null &&
              typeof (activeEl as HTMLInputElement).setSelectionRange === 'function'
            ) {
              (activeEl as HTMLInputElement).setSelectionRange(caretStart, caretEnd);
            }
          } catch (_) {}
        }

        isPaginating = false;
        observeChildren();
      });
    };

    const observeChildren = () => {
      if (!resizeObserver) return;
      resizeObserver.disconnect();
      allOrderedChildren.value.forEach((child) => {
        if (child) {
          resizeObserver?.observe(child);
        }
      });
    };

    const debouncedPaginate = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        paginate();
      }, 50);
    };

    onMounted(() => {
      nextTick(() => {
        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            if (!isPaginating) {
              debouncedPaginate();
            }
          });
        }

        collectInitialChildren();
        paginate();
      });
    });

    onUnmounted(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (resizeObserver) resizeObserver.disconnect();
    });

    watch(
      () => [props.landscape, props.autoPaginate, props.style],
      () => {
        nextTick(() => debouncedPaginate());
      },
      { deep: true }
    );

    return {
      sourceContainer,
      pageCount,
      pageRefs,
      setPageRef,
      computedStyle,
      pageWidth,
      pageHeight,
    };
  },
};
</script>

<style scoped>
.page-a4-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.page-a4-source {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  left: -9999px;
  top: 0;
  box-sizing: border-box;
}

.page-a4-sheet {
  position: relative;
  font-family: 'Times New Roman', Times, serif;
  background: white;
  box-sizing: border-box;
  margin: 10px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-a4-content {
  width: 100%;
  flex: 1;
  box-sizing: border-box;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0mm;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .page-a4-wrapper {
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
    width: 100% !important;
  }

  .page-a4-source {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  .page-a4-sheet {
    margin: 0 !important;
    box-shadow: none !important;
    height: 297mm !important;
    min-height: 297mm !important;
    max-height: 297mm !important;
    width: 210mm !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .page-a4-sheet:not(:last-child) {
    break-after: page !important;
    page-break-after: always !important;
  }

  .page-a4-sheet:last-child {
    break-after: avoid !important;
    page-break-after: avoid !important;
  }

  .page-a4-sheet.landscape {
    height: 210mm !important;
    min-height: 210mm !important;
    max-height: 210mm !important;
    width: 297mm !important;
  }
}
</style>
