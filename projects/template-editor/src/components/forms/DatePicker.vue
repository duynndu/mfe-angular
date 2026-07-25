<template>
  <div class="datepicker-wrapper" ref="wrapperRef">
    <!-- Slot cho nhãn -->
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
    <input
      type="text"
      class="datepicker-input"
      :placeholder="placeholder"
      v-model="displayValue"
      v-mask-datetime="format"
      @focus="openPicker"
      @click="openPicker"
      @input="onInput"
      :disabled="disabled"
      :readonly="readonly"
      autocomplete="off"
      :style="[{ textIndent: ($slots['label'] || label) ? labelSpanWidth + 'px' : undefined }, inputStyle]"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch, inject, type PropType } from 'vue';
import type { StyleValue } from 'vue';
import moment from 'moment';
import mask from '../../directives/mask-datetime';
import { useDatePickerService } from '../../services/datePickerService';

export default {
  name: 'DatePicker',
  directives: { mask, 'mask-datetime': mask },
  props: {
    modelValue: { type: String, default: '' },
    format: { type: String, default: 'DD/MM/YYYY' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    minuteStep: { type: Number, default: 5 },
    label: { type: String, default: '' },
    inputStyle: { type: [Object, String, Array] as PropType<StyleValue>, default: null },
    path: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onFieldChange = inject<((path: string, value: any) => void) | null>('onFieldChange', null);
    const wrapperRef = ref<HTMLElement | null>(null);
    const displayValue = ref('');
    const { open, syncValue } = useDatePickerService();
    const emitFieldChange = (value: any) => {
      if (!props.path) return;
      onFieldChange?.(props.path, value);
    };

    // Tự động phát hiện mode từ format
    const detectMode = (format: string): 'date' | 'datetime' => {
      // Strip literal text (nội dung trong []) trước khi kiểm tra token H/h/m/s
      const stripped = format.replace(/\[[^\]]*]/g, '');
      return /[Hhms]/.test(stripped) ? 'datetime' : 'date';
    };

    const tokenRegex = /[YyMDHhms]/;
    const literalStrippedFormat = props.format.replace(/\[[^\]]*]/g, '');
    const expectedDigits = literalStrippedFormat
      .split('')
      .reduce((acc, ch) => acc + (tokenRegex.test(ch) ? 1 : 0), 0);

    const onInput = () => {
      const masked = displayValue.value;
      const digitCount = masked.replace(/\D/g, '').length;
      const m = digitCount === expectedDigits
        ? moment(masked, props.format, true)
        : moment.invalid();
      if (m.isValid()) {
        const display = m.format(props.format);
        displayValue.value = display;
        emit('update:modelValue', m.format());
        emitFieldChange(m.format());
        syncValue(display, wrapperRef.value);
      }
    };

    // Khi modelValue thay đổi từ ngoài
    watch(
      () => props.modelValue,
      (val) => {
        const parsed = val
          ? moment(val).isValid()
            ? moment(val)
            : moment(val, props.format, true)
          : null;
        if (parsed && parsed.isValid()) {
          displayValue.value = parsed.format(props.format);
        } else {
          displayValue.value = '';
        }
        syncValue(displayValue.value, wrapperRef.value);
      },
      { immediate: true }
    );
    const openPicker = () => {
      if (props.disabled || props.readonly || !wrapperRef.value) return;
      open({
        anchor: wrapperRef.value,
        value: displayValue.value,
        format: props.format,
        mode: detectMode(props.format),
        minuteStep: props.minuteStep,
        onSelect: (val: string) => {
          const parsed = moment(val, props.format, true).isValid()
            ? moment(val, props.format, true)
            : moment(val);
          if (parsed.isValid()) {
            const display = parsed.format(props.format);
            displayValue.value = display;
            emit('update:modelValue', parsed.format());
            emitFieldChange(parsed.format());
            syncValue(display, wrapperRef.value);
          }
        }
      });
    };

    // Tính toán độ rộng label (dùng slot)
    const labelSpan = ref<HTMLElement>()
    const labelSpanWidth = ref(0)
    const updateLabelWidth = () => {
      labelSpanWidth.value = labelSpan.value?.offsetWidth ?? 0
    }
    if (typeof window !== 'undefined') {
      setTimeout(updateLabelWidth, 0)
    }
    // Nếu slot label thay đổi, cần cập nhật lại width (nếu cần, có thể dùng watchEffect hoặc onUpdated)

    return {
      wrapperRef,
      displayValue,
      onInput,
      openPicker,
      labelSpan,
      labelSpanWidth
    };
  }
};

</script>

<style scoped>
.datepicker-wrapper {
  position: relative;
  width: 100%;
}
.hs-label-span {
  position: absolute;
  background: white;
  line-height: 1;
  bottom: calc(100% - 20px);
  left: 0;
}
.datepicker-input {
  width: 100%;
  padding: 2px 4px;
  font-size: 12pt;
  color: #00a;
  line-height: 20px;
  border: none;
  border-radius: 0;
  background: url(@/assets/img/icon/bg-line-textarea.png);
  background-position-y: 1px;
}
.datepicker-input:focus {
  outline: none;
  box-shadow: none;
}
</style>
