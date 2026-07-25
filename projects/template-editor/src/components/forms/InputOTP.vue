<template>
  <div
    ref="inputGroup"
    class="input-otp-wrapper"
    :style="style"
    tabindex="0"
    @keydown="onKeydown"
  >
    <div
      v-for="(item, i) in arrayLength"
      :key="i"
      ref="elementRefs"
      class="input-otp-item"
      :class="{ active: focusIndex === i && isFocused, disabled: disabled }"
      @click="setFocusIndex(i)"
    >
      <span>{{ getDisplayValueBeforeCaret(i) }}</span>
      <div v-if="focusIndex === i && isFocused && !readonly" class="caret"></div>
      <span>{{ getDisplayValueAfterCaret(i) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, computed, nextTick, onMounted, onBeforeUnmount, inject } from 'vue';

export default {
  name: 'InputOTP',
  props: {
    modelValue: { type: [String, Number], default: '' },
    type: { type: String as () => 'text' | 'number', default: 'text' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maskLength: { type: Array as () => number[] },
    padChar: { type: String, default: ' ' },
    padStart: { type: String },
    style: { type: String, default: '' },
    class: { type: String, default: '' },
    path: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onFieldChange = inject<((path: string, value: any) => void) | null>('onFieldChange', null);
    const inputGroup = ref<HTMLElement | null>(null);
    const elementRefs = ref<HTMLElement[]>([]);
    const valueArray = ref<string[]>([]);
    const arrayLength = ref<string[]>([]);
    const focusIndex = ref<number>(0);
    const isFocused = ref(false);
    const hasInitialized = ref(false);
    const isInternalModelSync = ref(false);
    const emitFieldChange = (value: any) => {
      if (!props.path) return;
      onFieldChange?.(props.path, value);
    };

    const specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', ' '];

    const maskLength = computed<number[]>(() => (props.maskLength && props.maskLength.length ? props.maskLength : [1, 1, 1, 1]));
    const segmentCount = computed(() => maskLength.value.length);
    const totalMaskChars = computed(() => maskLength.value.reduce((sum, length) => sum + length, 0));

    const splitStringByPattern = (input: string, pattern: number[]) => {
      const result: string[] = [];
      let currentIndex = 0;
      for (const length of pattern) {
        if (currentIndex < input?.length) {
          result.push(input.substring(currentIndex, currentIndex + length));
          currentIndex += length;
        } else {
          result.push('');
        }
      }
      return result;
    };

    const applyPadStartValue = (value: string) => {
      if (props.padStart === null || props.padStart === undefined || String(value).length === 0) {
        return value;
      }

      return String(value).padStart(totalMaskChars.value, props.padStart);
    };

    const updateValueArray = (value: string, shouldApplyPadStart = false) => {
      let nextValue = value;

      if (shouldApplyPadStart) {
        nextValue = applyPadStartValue(nextValue);
      }

      valueArray.value = splitStringByPattern(nextValue, maskLength.value);
    };

    const emitModelValue = (value: string) => {
      isInternalModelSync.value = true;
      emit('update:modelValue', value);
      emitFieldChange(value);
    };

    const getNormalizedSegmentValue = (index: number) => {
      const currentValue = valueArray.value[index] ?? '';
      const emptyMaskedValue = props.padChar.repeat(maskLength.value[index]);

      if (!currentValue || currentValue === emptyMaskedValue) {
        return '';
      }

      let normalizedValue = currentValue;
      while (normalizedValue.startsWith(props.padChar) && normalizedValue.length > 0) {
        normalizedValue = normalizedValue.slice(props.padChar.length);
      }

      return normalizedValue;
    };

    const getInputSegmentValue = (index: number) => {
      const normalizedValue = getNormalizedSegmentValue(index);

      if (!normalizedValue) {
        return '';
      }

      return normalizedValue.split(props.padChar).join('');
    };

    const getSegmentDisplayValue = (index: number) => {
      const currentValue = valueArray.value[index] ?? '';
      const currentMaskLength = maskLength.value[index];

      if (currentValue.length === 0) {
        return props.padChar.repeat(currentMaskLength);
      }

      if (focusIndex.value === index && isFocused.value) {
        return currentValue;
      }

      if (currentValue.length < currentMaskLength) {
        return currentValue.padStart(currentMaskLength, props.padChar);
      }

      return currentValue;
    };

    const getCaretPosition = (index: number) => {
      const displayValue = getSegmentDisplayValue(index);
      const normalizedValue = getInputSegmentValue(index);

      return Math.min(normalizedValue.length, displayValue.length);
    };

    const getDisplayValueBeforeCaret = (index: number) => {
      const displayValue = getSegmentDisplayValue(index);
      return displayValue.slice(0, getCaretPosition(index));
    };

    const getDisplayValueAfterCaret = (index: number) => {
      const displayValue = getSegmentDisplayValue(index);
      return displayValue.slice(getCaretPosition(index));
    };

    const padValuesToMatchMask = () => {
      valueArray.value.forEach((val, index) => {
        if (val.length > 0 && val.length < maskLength.value[index]) {
          valueArray.value[index] = val.padStart(maskLength.value[index], props.padChar);
        }
      });
      const newValue = applyPadStartValue(valueArray.value.join(''));
      updateValueArray(newValue);
      emitModelValue(newValue);
    };

    const setFocusIndex = (index: number) => {
        if (props.disabled) return;

      focusIndex.value = index;

      valueArray.value[focusIndex.value] = getInputSegmentValue(focusIndex.value);

        isFocused.value = true;

        nextTick(() => {
            const el = elementRefs.value[focusIndex.value];
            if (el) {
            const selection = getSelection();
            const range = document.createRange();
            range.selectNodeContents(el);
            selection?.removeAllRanges();
            selection?.addRange(range);
            }
        });
        };

    const onKeydown = (event: KeyboardEvent) => {
      event.preventDefault();
      const idx = focusIndex.value;

      if (event.ctrlKey && event.key.toLowerCase() === 'a') {
        const el = elementRefs.value[idx];
        const selection = getSelection();
        const range = document.createRange();
        range.selectNodeContents(el);
        selection?.removeAllRanges();
        selection?.addRange(range);
        return;
      }

      if (!props.disabled && !props.readonly) {
        const keyValue = event.key;

        if (!/^[0-9]*$/.test(keyValue) && !specialKeys.includes(keyValue) && props.type === 'number') return;

        if (keyValue === 'Backspace') {
          if (getInputSegmentValue(idx) === '') {
            setFocusIndex(Math.max(idx - 1, 0));
          } else {
            valueArray.value[idx] = getInputSegmentValue(idx).slice(0, -1);
          }
          emitModelValue(valueArray.value.join(''));
        } else if (keyValue === 'ArrowLeft') {
          setFocusIndex(Math.max(idx - 1, 0));
        } else if (keyValue === 'ArrowRight') {
          setFocusIndex(Math.min(idx + 1, segmentCount.value - 1));
        } else if (keyValue === ' ') {
          padValuesToMatchMask();
          setFocusIndex(Math.min(idx + 1, segmentCount.value - 1));
        } else if (keyValue.length === 1) {
          const nextValue = `${getInputSegmentValue(idx)}${keyValue.toUpperCase().trim()}`.slice(0, maskLength.value[idx]);

          valueArray.value[idx] = nextValue;

          if (nextValue.length >= maskLength.value[idx]) {
            setFocusIndex(Math.min(idx + 1, segmentCount.value - 1));
          }

          emitModelValue(valueArray.value.join(''));
        }
      }
    };

    // --- Xử lý click ra ngoài ---
    const handleClickOutside = (event: MouseEvent) => {
      if (inputGroup.value && !inputGroup.value.contains(event.target as Node)) {
        if (isFocused.value) {
          isFocused.value = false;
          padValuesToMatchMask();
        }
      }
    };

    watch(
      [() => props.modelValue, () => props.padStart, maskLength],
      ([newVal]) => {
        arrayLength.value = Array(segmentCount.value || 0).fill('');
        const shouldApplyPadStart = !hasInitialized.value || !isInternalModelSync.value;
        updateValueArray(String(newVal || ''), shouldApplyPadStart);
        hasInitialized.value = true;
        isInternalModelSync.value = false;
      },
      { immediate: true }
    );

    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside);
    });


    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });

    return {
      inputGroup,
      elementRefs,
      valueArray,
      arrayLength,
      focusIndex,
      isFocused,
      getDisplayValueBeforeCaret,
      getDisplayValueAfterCaret,
      setFocusIndex,
      onKeydown,
    };
  },
};
</script>

<style scoped>
.input-otp-item {
  height: 20px;
  padding: 0 2px;
  min-width: 22px;
  width: auto;
  border: 1px solid #222;
  text-align: center;
  font-size: 14px;
  cursor: text;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-otp-wrapper {
  background: white;
  outline: none;
  display: flex;
  gap: 1px;
}

.active {
  border-color: #8ad4ee;
  border-radius: 3px;
}

.disabled {
  cursor: not-allowed;
}

.caret {
  width: 0.1px;
  height: 80%;
  background-color: #333;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
