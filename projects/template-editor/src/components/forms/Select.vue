<template>
  <div
    class="select-wrapper"
    ref="wrapperRef"
    :class="{ disabled, readonly }"
  >
    <!-- Slot cho nhãn hoặc dùng prop label -->
    <span
      v-if="$slots['label'] || label"
      class="hs-label-span"
      ref="labelSpan"
    >
      <template v-if="$slots['label']">
        <slot name="label"></slot>
      </template>
      <template v-else>{{ label }}&nbsp;</template>
    </span>

    <!-- Input + tags -->
    <div
      class="input-container"
      :tabindex="containerTabIndex"
      @click="focusInput"
      @focus="focusInput"
      @focusout="onContainerFocusOut"
    >
      <template v-if="multiple">
        <span
          v-if="hasLabel"
          class="label-spacer"
          :style="multipleLabelSpacerStyle"
        ></span>

        <span
          v-for="(item, i) in selectedItems"
          :key="i"
          class="tag"
        >
          {{ getItemLabel(item) }}
          <span
            v-if="!readonly && !disabled"
            class="remove"
            @mousedown.prevent.stop="removeItem(item)"
          >❌</span>
        </span>

        <input
          ref="inputRef"
          v-model="search"
          class="input"
          :placeholder="placeholderText"
          :disabled="disabled || readonly"
          @focus="open"
        />
      </template>

      <template v-else>
        <div
          v-for="(item, i) in selectedItems"
          :key="i"
          class="tag"
          :style="singleSelectedTagStyle"
          v-show="!showSingleInput && !search.length"
        >
          {{ getItemLabel(item) }}
          <span
            v-if="!readonly && !disabled"
            class="remove"
            @mousedown.prevent.stop="removeItem(item)"
          >❌</span>
        </div>

        <input
          v-if="showSingleInput"
          ref="inputRef"
          v-model="search"
          class="input"
          :style="singleInputStyle"
          :placeholder="placeholderText"
          :disabled="disabled || readonly"
          @focus="open"
        />
      </template>
    </div>

    <!-- Dropdown -->
    <div v-if="isOpen" class="dropdown">
      <div
        v-for="(item, i) in filteredItems"
        :key="i"
        class="option"
        :class="{ selected: isSelected(item) }"
        @mousedown.prevent="select(item)"
      >
        <input
          v-if="multiple"
          type="checkbox"
          :checked="isSelected(item)"
          @mousedown.stop
        />
        {{ getItemLabel(item) }}
      </div>

      <div v-if="filteredItems.length === 0" class="empty">
        Không tìm thấy kết quả
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, PropType, nextTick, inject } from 'vue';

export default {
  name: 'Select',
  props: {
    modelValue: [String, Number, Array] as PropType<any>,
    items: { type: Array as PropType<any[]>, default: () => [] },
    bindLabel: { type: String, default: '' },
    bindValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    multiple: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    label: { type: String, default: '' },
    searchByKeys: { type: Array as PropType<string[]>, default: () => [] },
    path: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'search', 'change'],
  setup(props, { emit, slots }) {
    const onFieldChange = inject<((path: string, value: any) => void) | null>('onFieldChange', null);
    const onSelectSearch = inject<((path: string, payload: { term: string; items: any[] }) => void) | null>('onSelectSearch', null);
    const emitFieldChange = (value: any) => {
      if (!props.path) return;
      onFieldChange?.(props.path, value);
    };
    const isOpen = ref(false);
    const isSingleInputActive = ref(false);
    const search = ref('');
    const suppressSearchEmit = ref(false);
    const selectedItems = ref<any[]>([]);

    const wrapperRef = ref<HTMLElement | null>(null);
    const inputRef = ref<HTMLInputElement | null>(null);
    const labelSpan = ref<HTMLElement | null>(null);
    const hasLabel = computed(() => Boolean(slots['label'] || props.label));
    const labelSpanWidth = computed(() => labelSpan.value?.offsetWidth ?? 0);
    const multipleLabelSpacerStyle = computed(() => ({
      width: labelSpanWidth.value + 'px',
      flex: `0 0 ${labelSpanWidth.value}px`,
    }));
    const singleSelectedTagStyle = computed(() => ({
      textIndent: (hasLabel.value ? labelSpanWidth.value : 0) + 'px',
      lineHeight: '20px'
    }));
    const singleInputStyle = computed(() => ({
      paddingLeft: (hasLabel.value ? labelSpanWidth.value : 0) + 'px',
    }));
    const containerTabIndex = computed(() =>
      props.disabled || props.readonly ? -1 : 0
    );

    /* ---------------- helpers ---------------- */

    const getItemLabel = (item: any) =>
      props.bindLabel && typeof item === 'object'
        ? String(item[props.bindLabel])
        : String(item);

    const getItemValue = (item: any) =>
      props.bindValue && typeof item === 'object'
        ? item[props.bindValue]
        : item;

    const isEqual = (a: any, b: any): boolean => {
      // If bindValue is set, compare extracted values as strings
      if (props.bindValue) {
        return String(getItemValue(a)) === String(getItemValue(b));
      }
      // If both are objects and bindValue is not set, use JSON comparison
      if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        return JSON.stringify(a) === JSON.stringify(b);
      }
      // Otherwise compare as primitives
      return String(a) === String(b);
    };

    const isSelected = (item: any) =>
      selectedItems.value.some(s => isEqual(s, item));

    /* ---------------- computed ---------------- */

    const filteredItems = computed(() => {
      if (!search.value.trim()) return props.items;
      const q = search.value.toLowerCase();
      
      return props.items.filter(i => {
        // If searchByKeys is provided and not empty, search by those keys
        if (props.searchByKeys && props.searchByKeys.length > 0) {
          if (typeof i === 'object' && i !== null) {
            return props.searchByKeys.some(key => {
              const value = i[key];
              return value != null && String(value).toLowerCase().includes(q);
            });
          }
          // If item is not an object, fall back to label search
          return getItemLabel(i).toLowerCase().includes(q);
        }
        
        // Default: search by label
        return getItemLabel(i).toLowerCase().includes(q);
      });
    });

    const placeholderText = computed(() =>
      selectedItems.value.length === 0
        ? props.placeholder
        : ''
    );
    const showSingleInput = computed(() => isSingleInputActive.value);

    /* ---------------- actions ---------------- */

    const open = () => {
      if (!props.disabled && !props.readonly) isOpen.value = true;
    };

    const focusInput = () => {
      if (props.disabled || props.readonly) return;

      open();

      if (!props.multiple) {
        isSingleInputActive.value = true;
        nextTick(() => inputRef.value?.focus());
        return;
      }

      inputRef.value?.focus();
    };

    const deactivateSingleInput = () => {
      if (props.multiple) return;

      isOpen.value = false;
      isSingleInputActive.value = false;
      clearSearch();
    };

    const clearSearch = () => {
      suppressSearchEmit.value = true;
      search.value = '';
    };

    const selectMultipleItem = (item: any) => {
      if (isSelected(item)) {
        selectedItems.value = selectedItems.value.filter(
          s => !isEqual(s, item)
        );
      } else {
        selectedItems.value = [...selectedItems.value, item];
      }
    };

    const selectSingleItem = (item: any) => {
      selectedItems.value = [item];
      deactivateSingleInput();
    };

    const select = (item: any) => {
      if (props.disabled || props.readonly) return;

      if (props.multiple) {
        selectMultipleItem(item);
      } else {
        selectSingleItem(item);
      }

      clearSearch();
      syncModel();
      if (props.multiple) {
        nextTick(() => inputRef.value?.focus());
      }
    };

    const removeItem = (item: any) => {
      selectedItems.value = selectedItems.value.filter(
        s => !isEqual(s, item)
      );
      syncModel();
    };

    const syncModel = () => {
      const value = props.multiple
        ? selectedItems.value.map(getItemValue)
        : getItemValue(selectedItems.value[0] || '');

      emit('update:modelValue', value);
      emitFieldChange(value);
      emit('change', props.multiple ? selectedItems.value : selectedItems.value[0]);
    };

    /* ---------------- outside click ---------------- */

    const onClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.value?.contains(e.target as Node)) {
        isOpen.value = false;
        deactivateSingleInput();
      }
    };

    const onContainerFocusOut = (e: FocusEvent) => {
      if (props.multiple) return;

      const nextTarget = e.relatedTarget as Node | null;
      if (nextTarget && wrapperRef.value?.contains(nextTarget)) {
        return;
      }

      deactivateSingleInput();
    };

    /* ---------------- sync from v-model ---------------- */

    const initMultipleSelected = () => {
      if (!Array.isArray(props.modelValue)) {
        selectedItems.value = [];
        return;
      }

      selectedItems.value = props.items.filter(i =>
        props.modelValue.some((v: any) => isEqual(i, v))
      );
    };

    const initSingleSelected = () => {
      if (props.modelValue == null) {
        selectedItems.value = [];
        return;
      }

      const found = props.items.find(
        i => isEqual(i, props.modelValue)
      );
      selectedItems.value = found ? [found] : [];
    };

    const initSelected = () => {
      selectedItems.value = [];

      if (props.multiple) {
        initMultipleSelected();
        return;
      }

      initSingleSelected();
    };

    watch(() => props.modelValue, initSelected);
    watch(() => props.items, initSelected);
    watch(search, (value) => {
      if (suppressSearchEmit.value) {
        suppressSearchEmit.value = false;
        return;
      }
      const payload = {
        term: value,
        items: filteredItems.value
      };
      emit('search', payload);
      onSelectSearch?.(props.path, payload);
    });

    onMounted(() => {
      initSelected();
      document.addEventListener('mousedown', onClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', onClickOutside);
    });

    return {
      isOpen,
      showSingleInput,
      search,
      selectedItems,
      filteredItems,
      wrapperRef,
      inputRef,
      containerTabIndex,
      hasLabel,
      labelSpan,
      labelSpanWidth,
      multipleLabelSpacerStyle,
      singleSelectedTagStyle,
      singleInputStyle,
      getItemLabel,
      getItemValue,
      isSelected,
      select,
      removeItem,
      focusInput,
      onContainerFocusOut,
      open,
      placeholderText,
    };
  },
};
</script>


<style scoped>
.select-wrapper {
  position: relative;
  font-size: 12pt;
}

.input-container {
  border-radius: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: text;
  position: relative;
}

.hs-label-span {
  z-index: 1;
  position: absolute;
  background: white;
  line-height: 1;
  bottom: calc(100% - 20px);
}

.input-container {
  background: url(@/assets/img/icon/bg-line-textarea.png);
  background-position-y: 1px;
  border: none;
  line-height: 18px;
  font-size: 12pt;
  color: #00a;
  min-height: 24.4px;
}

.input-container:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24,144,255,.2);
}

.tag {
  align-items: center;
  padding: 1px;
  border-radius: 2px;
  transform: translateY(-2px);
}

.label-spacer {
  display: inline-block;
  height: 1px;
}

.remove {
  margin-left: 2px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
  pointer-events: none;
  font-size: 8px;
}

.tag:hover .remove {
  opacity: 1;
  pointer-events: auto;
}

.input {
  border: none;
  outline: none;
  flex: 1;
  background-color: transparent;
  transform: translateY(-3px);
  line-height: 19px;
  color: inherit;
  font-size: inherit;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #d9d9d9;
  max-height: 240px;
  overflow: auto;
  z-index: 10;
}

.option {
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.option:hover {
  background: #f5f5f5;
}

.option.selected {
  background: #e6f7ff;
}

.empty {
  padding: 10px;
  color: #999;
  text-align: center;
}
</style>

