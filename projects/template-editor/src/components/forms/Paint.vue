<template>
  <div class="paint-wrapper" @mouseenter="showToolbar" @mouseleave="hideToolbar">
    <div :class="['paint-toolbar', { hidden: !toolbarVisible }]">
      <button type="button" class="icon-btn" title="Màu" @click="openColorPicker">🎨</button>
      <input
        ref="colorInputRef"
        type="color"
        class="hidden-input"
        v-model="strokeColor"
      />
      <div class="thickness-wrapper">
        <button
          type="button"
          class="icon-btn"
          title="Độ dày nét"
          @click="toggleThicknessPopover"
        >
          📏
        </button>
        <div v-if="thicknessOpen" class="thickness-popover">
          <input
            type="range"
            min="1"
            max="20"
            v-model.number="strokeWidth"
            @blur="closeThicknessPopover"
          />
          <input
            type="number"
            min="1"
            max="20"
            v-model.number="strokeWidth"
            @blur="closeThicknessPopover"
          />
        </div>
      </div>
      <button type="button" class="icon-btn" title="Ảnh nền" @click="openBackgroundPicker">🖼️</button>
      <input
        ref="bgInputRef"
        type="file"
        accept="image/*"
        class="hidden-input"
        @change="onBackgroundSelected"
      />
      <button type="button" :class="['mode-btn', 'icon-btn', { active: !erasing }]" title="Bút" @click="setMode('pen')">✏️</button>
      <button type="button" :class="['mode-btn', 'icon-btn', { active: erasing }]" title="Tẩy" @click="setMode('eraser')">🧽</button>
      <button type="button" class="icon-btn" title="Xóa" @click="clearCanvas">🗑️</button>
      <span class="toolbar-spacer"></span>
      <button type="button" class="icon-btn" title="Lưu" @click="emitImage">💾</button>
    </div>
    <div
      class="paint-canvas-box"
      ref="boxRef"
      @mousedown.prevent="startDraw"
      @mousemove="updateCursor"
      @mouseenter="showCursor"
      @mouseleave="hideCursor"
      @touchstart.prevent="startDrawTouch"
    >
      <canvas ref="baseCanvasRef"></canvas>
      <canvas ref="overlayCanvasRef"></canvas>
      <div v-if="cursorVisible" class="paint-cursor" :style="cursorStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, inject } from 'vue';

export default {
  name: 'Paint',
  props: {
    modelValue: { type: String, default: '' },
    lineWidth: { type: Number, default: 3 },
    color: { type: String, default: '#000000' },
    src: { type: String, default: '' },
    path: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onFieldChange = inject<((path: string, value: any) => void) | null>('onFieldChange', null);
    const emitFieldChange = (value: any) => {
      if (!props.path) return;
      onFieldChange?.(props.path, value);
    };
    const baseCanvasRef = ref<HTMLCanvasElement | null>(null);
    const overlayCanvasRef = ref<HTMLCanvasElement | null>(null);
    const boxRef = ref<HTMLDivElement | null>(null);
    const colorInputRef = ref<HTMLInputElement | null>(null);
    const bgInputRef = ref<HTMLInputElement | null>(null);
    const baseCtx = ref<CanvasRenderingContext2D | null>(null);
    const drawCtx = ref<CanvasRenderingContext2D | null>(null);
    const drawing = ref(false);
    const strokeColor = ref(props.color);
    const strokeWidth = ref(props.lineWidth);
    const erasing = ref(false);
    const cursorVisible = ref(false);
    const cursorPos = ref({ x: 0, y: 0 });
    const thicknessOpen = ref(false);
    const toolbarVisible = ref(false);
    let resizeObserver: ResizeObserver | null = null;

    const cursorStyle = computed(() => {
      const size = Math.max(strokeWidth.value, 4);
      const color = erasing.value ? '#777' : strokeColor.value;
      return {
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        color,
        left: `${cursorPos.value.x - size / 2}px`,
        top: `${cursorPos.value.y - size / 2}px`
      };
    });

    const resizeCanvas = () => {
      const baseCanvas = baseCanvasRef.value;
      const overlayCanvas = overlayCanvasRef.value;
      const box = boxRef.value;
      if (!baseCanvas || !overlayCanvas || !box) return;
      const prevBase = baseCanvas.width && baseCanvas.height ? baseCanvas.toDataURL('image/png') : '';
      const prevOverlay = overlayCanvas.width && overlayCanvas.height ? overlayCanvas.toDataURL('image/png') : '';
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = Math.max(1, box.clientWidth);
      const cssHeight = Math.max(1, box.clientHeight);
      [baseCanvas, overlayCanvas].forEach((c) => {
        c.width = cssWidth * dpr;
        c.height = cssHeight * dpr;
        c.style.width = `${cssWidth}px`;
        c.style.height = `${cssHeight}px`;
      });

      const baseContext = baseCanvas.getContext('2d');
      const overlayContext = overlayCanvas.getContext('2d');
      if (!baseContext || !overlayContext) return;
      [baseContext, overlayContext].forEach((c) => {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.scale(dpr, dpr);
        c.lineCap = 'round';
        c.lineJoin = 'round';
      });
      baseCtx.value = baseContext;
      drawCtx.value = overlayContext;

      if (props.modelValue) {
        setBackground(props.modelValue, true);
      }
      if (props.src) {
        setBackground(props.src, true);
      }
      if (prevBase) {
        setBackground(prevBase, true);
      }
      if (prevOverlay) {
        restoreOverlay(prevOverlay, cssWidth, cssHeight);
      }
    };

    const startDraw = (e: MouseEvent) => {
      if (!drawCtx.value) return;
      drawing.value = true;
      const { x, y } = getPos(e.clientX, e.clientY);
      drawCtx.value.globalCompositeOperation = erasing.value ? 'destination-out' : 'source-over';
      drawCtx.value.beginPath();
      drawCtx.value.moveTo(x, y);
      cursorVisible.value = true;
      cursorPos.value = { x, y };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', stopDraw);
    };

    const startDrawTouch = (e: TouchEvent) => {
      if (!drawCtx.value) return;
      drawing.value = true;
      const touch = e.touches[0];
      const { x, y } = getPos(touch.clientX, touch.clientY);
      drawCtx.value.globalCompositeOperation = erasing.value ? 'destination-out' : 'source-over';
      drawCtx.value.beginPath();
      drawCtx.value.moveTo(x, y);
      window.addEventListener('touchmove', onMoveTouch, { passive: false });
      window.addEventListener('touchend', stopDrawTouch);
    };

    const onMove = (e: MouseEvent) => {
      if (!drawing.value || !drawCtx.value) return;
      updateCursor(e);
      drawTo(e.clientX, e.clientY);
    };

    const onMoveTouch = (e: TouchEvent) => {
      if (!drawing.value || !drawCtx.value) return;
      const touch = e.touches[0];
      drawTo(touch.clientX, touch.clientY);
    };

    const stopDraw = () => {
      drawing.value = false;
      drawCtx.value?.closePath();
      drawCtx.value && (drawCtx.value.globalCompositeOperation = 'source-over');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stopDraw);
    };

    const stopDrawTouch = () => {
      drawing.value = false;
      drawCtx.value?.closePath();
      drawCtx.value && (drawCtx.value.globalCompositeOperation = 'source-over');
      window.removeEventListener('touchmove', onMoveTouch);
      window.removeEventListener('touchend', stopDrawTouch);
    };

    const getPos = (clientX: number, clientY: number) => {
      const rect = overlayCanvasRef.value?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const updateCursor = (e: MouseEvent) => {
      const { x, y } = getPos(e.clientX, e.clientY);
      cursorPos.value = { x, y };
      cursorVisible.value = true;
    };

    const showCursor = () => {
      cursorVisible.value = true;
    };

    const hideCursor = () => {
      if (drawing.value) return;
      cursorVisible.value = false;
    };

    const drawTo = (clientX: number, clientY: number) => {
      if (!drawCtx.value) return;
      const { x, y } = getPos(clientX, clientY);
      drawCtx.value.strokeStyle = strokeColor.value;
      drawCtx.value.lineWidth = strokeWidth.value;
      drawCtx.value.lineTo(x, y);
      drawCtx.value.stroke();
    };

    const clearCanvas = () => {
      const baseCanvas = baseCanvasRef.value;
      const overlayCanvas = overlayCanvasRef.value;
      if (!baseCanvas || !baseCtx.value || !overlayCanvas || !drawCtx.value) return;
      baseCtx.value.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
      drawCtx.value.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      emit('update:modelValue', '');
      emitFieldChange('');
    };

    const toggleThicknessPopover = () => {
      thicknessOpen.value = !thicknessOpen.value;
    };

    const closeThicknessPopover = () => {
      thicknessOpen.value = false;
    };

    const showToolbar = () => {
      toolbarVisible.value = true;
    };

    const hideToolbar = () => {
      toolbarVisible.value = false;
      thicknessOpen.value = false;
    };

    const openColorPicker = () => {
      colorInputRef.value?.click();
    };

    const openBackgroundPicker = () => {
      bgInputRef.value?.click();
    };

    const onBackgroundSelected = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0];
      input.value = '';
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBackground(reader.result);
        }
      };
      reader.readAsDataURL(file);
    };

    const setMode = (mode: 'pen' | 'eraser') => {
      erasing.value = mode === 'eraser';
    };

    const emitImage = () => {
      const merged = mergeCanvases();
      if (!merged) return;
      try {
        const dataUrl = merged.toDataURL('image/png');
        emit('update:modelValue', dataUrl);
        emitFieldChange(dataUrl);
      } catch (err) {
        console.error('Xuất ảnh thất bại do CORS/taint', err);
      }
    };

    const mergeCanvases = () => {
      const baseCanvas = baseCanvasRef.value;
      const overlayCanvas = overlayCanvasRef.value;
      if (!baseCanvas || !overlayCanvas) return null;
      const merged = document.createElement('canvas');
      merged.width = baseCanvas.width;
      merged.height = baseCanvas.height;
      const mctx = merged.getContext('2d');
      if (!mctx) return null;
      mctx.drawImage(baseCanvas, 0, 0);
      mctx.drawImage(overlayCanvas, 0, 0);
      return merged;
    };

    const setBackground = (dataUrl: string, fromResize = false) => {
      const baseCanvas = baseCanvasRef.value;
      const box = boxRef.value;
      if (!baseCanvas || !baseCtx.value || !dataUrl) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const drawW = box?.clientWidth ?? img.width;
        const drawH = box?.clientHeight ?? img.height;
        if (!fromResize) {
          baseCtx.value?.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
        }
        baseCtx.value?.drawImage(img, 0, 0, drawW, drawH);
      };
      img.src = dataUrl;
    };

    const restoreOverlay = (dataUrl: string, w?: number, h?: number) => {
      const overlayCanvas = overlayCanvasRef.value;
      const box = boxRef.value;
      if (!overlayCanvas || !drawCtx.value || !dataUrl) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const drawW = w ?? box?.clientWidth ?? 0;
        const drawH = h ?? box?.clientHeight ?? 0;
        if (!drawW || !drawH) return;
        drawCtx.value?.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        drawCtx.value?.drawImage(img, 0, 0, drawW, drawH);
      };
      img.src = dataUrl;
    };

    const restoreImage = (dataUrl: string, w?: number, h?: number) => {
      const baseCanvas = baseCanvasRef.value;
      const box = boxRef.value;
      if (!baseCanvas || !baseCtx.value || !dataUrl) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const drawW = w ?? box?.clientWidth ?? 0;
        const drawH = h ?? box?.clientHeight ?? 0;
        if (!drawW || !drawH) return;
        baseCtx.value?.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
        baseCtx.value?.drawImage(img, 0, 0, drawW, drawH);
      };
      img.src = dataUrl;
    };

    watch(() => props.modelValue, (val) => {
      if (val) restoreImage(val);
    });

    watch(() => props.src, (val) => {
      if (val) setBackground(val);
    });

    onMounted(() => {
      resizeCanvas();
      if (boxRef.value) {
        resizeObserver = new ResizeObserver(() => resizeCanvas());
        resizeObserver.observe(boxRef.value);
      }
      window.addEventListener('resize', resizeCanvas);
    });

    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stopDraw);
      window.removeEventListener('touchmove', onMoveTouch);
      window.removeEventListener('touchend', stopDrawTouch);
    });

    return {
      baseCanvasRef,
      overlayCanvasRef,
      boxRef,
      strokeColor,
      strokeWidth,
      erasing,
      cursorVisible,
      cursorStyle,
      colorInputRef,
      bgInputRef,
      thicknessOpen,
      toolbarVisible,
      startDraw,
      startDrawTouch,
      clearCanvas,
      emitImage,
      toggleThicknessPopover,
      closeThicknessPopover,
      showToolbar,
      hideToolbar,
      openColorPicker,
      openBackgroundPicker,
      onBackgroundSelected,
      setBackground,
      setMode,
      updateCursor,
      showCursor,
      hideCursor
    };
  }
};
</script>

<style scoped>
.paint-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;
}
.paint-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 12px;
  background: #f7f9fc;
  border: 1px solid #e2e6ef;
  border-radius: 7px;
  padding: 4px 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  z-index: 3;
}
.paint-toolbar.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-6px);
}
.paint-label {
  font-weight: 600;
}
.icon-btn {
  min-width: 24px;
  padding: 2px 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.thickness-wrapper {
  position: relative;
}
.thickness-popover {
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 5;
  background: #fff;
  border: 1px solid #d7dce3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
  min-width: 120px;
}
.thickness-popover input[type='range'] {
  flex: 1;
}
.thickness-popover input[type='number'] {
  width: 48px;
  height: 24px;
  padding: 2px 4px;
  border: 1px solid #d7dce3;
  border-radius: 6px;
}
.paint-toolbar input[type='number'] {
  width: 58px;
  height: 24px;
  padding: 2px 4px;
  border: 1px solid #d7dce3;
  border-radius: 7px;
  background: #fff;
}
.mode-btn.active {
  background: #0a6cff;
  color: #fff;
  border-color: #0a6cff;
}
.paint-toolbar button {
  min-height: 26px;
  padding: 2px 6px;
  border: 1px solid #d7dce3;
  border-radius: 6px;
  background: #fff;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.toolbar-spacer {
  flex: 1 1 auto;
}
.paint-toolbar button:hover {
  background: #eef3fc;
  border-color: #b8c4d6;
}
.paint-toolbar button:active {
  background: #dce6fb;
  border-color: #94a7c5;
}
.paint-canvas-box {
  border: 1px dashed #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  height: 100%;
  position: relative;
  cursor: none;
}
canvas {
  display: block;
  position: absolute;
  inset: 0;
}
.paint-canvas-box canvas:first-of-type {
  z-index: 1;
  pointer-events: none;
}
.paint-canvas-box canvas:last-of-type {
  z-index: 2;
}
button {
  cursor: pointer;
}
.hidden-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.paint-cursor {
  position: absolute;
  border: 1px solid #000;
  border-radius: 50%;
  pointer-events: none;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px #fff;
}
.paint-cursor::after {
  content: '\270F';
  position: absolute;
  right: -12px;
  top: -12px;
  font-size: 14px;
  color: inherit;
  display: inline-block;
  transform: rotate(135deg);
  transform-origin: center;
}
</style>
