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
      class="input-border"
      :class="{ active: focusIndex === i && isFocused, disabled: disabled }"
      @click="setFocusIndex(i)"
    >
      {{ valueArray[i] }}
      <div v-if="focusIndex === i && isFocused && !readonly" class="caret"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'InputOTP',
  props: {
    modelValue: { type: String, default: '' },
    type: { type: String as () => 'text' | 'number', default: 'text' },
    length: { type: Number },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maskLength: { type: Array as () => number[] },
    padChar: { type: String, default: ' ' },
    padStart: { type: String },
    style: { type: String, default: '' },
    class: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputGroup = ref<HTMLElement | null>(null);
    const elementRefs = ref<HTMLElement[]>([]);
    const valueArray = ref<string[]>([]);
    const arrayLength = ref<string[]>([]);
    const focusIndex = ref<number>(0);
    const isFocused = ref(false);

    const specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', ' '];

    let maskLength = ref<number[]>(props.maskLength || []);
    const totalLength = computed(() => props.length || maskLength.value.length);

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

    const updateValueArray = (value: string) => {
      valueArray.value = splitStringByPattern(value, maskLength.value);
    };

    const padValuesToMatchMask = () => {
      valueArray.value.forEach((val, index) => {
        if (val.length > 0 && val.length < maskLength.value[index]) {
          valueArray.value[index] = val.padStart(maskLength.value[index], props.padChar);
        }
      });
      let newValue = valueArray.value.join('');
      if (props.padStart !== null && props.padStart !== undefined && newValue != null) {
        newValue = String(newValue).padStart(totalLength.value, props.padStart);
      }
      updateValueArray(newValue);
      emit('update:modelValue', newValue);
    };

    const setFocusIndex = (index: number) => {
        if (props.disabled) return;

        // Tìm ô trống đầu tiên
        const firstEmptyIndex = valueArray.value.findIndex(val => val === '' || val.length === 0);

        if (firstEmptyIndex !== -1 && index > firstEmptyIndex) {
            // Nếu click vào ô sau ô trống đầu tiên, tự động focus ô trống đầu tiên
            focusIndex.value = firstEmptyIndex;
        } else {
            focusIndex.value = index;
        }

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

        valueArray.value[idx] ||= '';

        if (keyValue.length === 1) {
          valueArray.value[idx] = keyValue.toUpperCase().trim();

        // Chuyển focus nếu ô đã đầy
        if (valueArray.value[idx].length >= maskLength.value[idx]) {
            setFocusIndex(Math.min(idx + 1, totalLength.value - 1));
        }

          emit('update:modelValue', valueArray.value.join(''));
        } else if (keyValue === 'Backspace') {
          if (valueArray.value[idx] === '') {
            setFocusIndex(Math.max(idx - 1, 0));
          } else {
            valueArray.value[idx] = valueArray.value[idx].slice(0, -1);
          }
          emit('update:modelValue', valueArray.value.join(''));
        } else if (keyValue === 'ArrowLeft') {
          setFocusIndex(Math.max(idx - 1, 0));
        } else if (keyValue === 'ArrowRight') {
          setFocusIndex(Math.min(idx + 1, totalLength.value - 1));
        } else if (keyValue === ' ') {
          padValuesToMatchMask();
          setFocusIndex(Math.min(idx + 1, totalLength.value - 1));
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
      () => props.modelValue,
      (newVal) => {
        updateValueArray(newVal || '');
      },
      { immediate: true }
    );

    onMounted(() => {
        // Nếu maskLength chưa có, tạo mặc định 1 cho mỗi ô
        if (!maskLength.value.length) {
            maskLength.value = Array.from({ length: totalLength.value }).fill(1) as number[];
        }

        // Khởi tạo arrayLength để v-for render đúng số ô
        arrayLength.value = Array(totalLength.value).fill('');

        // --- Khởi tạo giá trị hiển thị với padStart / padChar ---
        const initialValue = props.modelValue || '';
        valueArray.value = maskLength.value.map((len, idx) => {
            let val = initialValue.substr(
            maskLength.value.slice(0, idx).reduce((a, b) => a + b, 0),
            len
            );
            // Pad từng phần theo padChar nếu chưa đủ độ dài
            if (val.length < len) val = val.padStart(len, props.padChar);
            return val;
        });

        // Nếu props.padStart có giá trị, pad toàn bộ string, rồi chia theo maskLength
        if (props.padStart != null) {
            const fullPadded = String(initialValue).padStart(totalLength.value, props.padStart);
            let currentIndex = 0;
            valueArray.value = maskLength.value.map((len) => {
            const val = fullPadded.substr(currentIndex, len);
            currentIndex += len;
            return val;
            });
        }

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
      setFocusIndex,
      onKeydown,
    };
  },
};
</script>

<style scoped>
.input-border {
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
