<template>
  <div class="textarea-wrapper" :style="style">
    <!-- Nhãn -->
    <span
      class="hs-label-span"
      :style="labelStyle"
      ref="labelSpan"
      v-html="label ? label + '&nbsp;' : ''"
    ></span>

    <!-- Textarea nhập -->
    <textarea
      ref="textarea"
      class="hs-textarea-line no-print"
      :class="{ 'hs-textarea-line-none': !line }"
      v-model="input"
      :style="{ ...textareaStyleComputed, textIndent: labelSpanWidth + 'px' }"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      spellcheck="false"
      @keydown="setCaretPosition"
      @click="setCaretPosition"
      @select="limitSelection"
    ></textarea>

    <!-- Bản in -->
    <template v-if="!input">
      <div
        class="hs-textarea-line yes-print"
        :style="{ ...textareaStyleComputed, textIndent: labelSpanWidth + 'px', height: textareaHeight + 'px' }"
      ></div>
    </template>
    <template v-else>
      <div
        v-for="(lineText, i) in splitString(input)"
        :key="i"
        class="hs-textarea-line yes-print"
        :style="{ ...textareaStyleComputed, textIndent: i === 0 ? labelSpanWidth + 'px' : '0px' }"
      >
        {{ lineText }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, nextTick, onMounted, PropType } from 'vue'
import { useTextareaAutosize } from '@vueuse/core'

export default {
  name: 'HsTextarea',
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    maxlength: { type: Number, default: 2000 },
    rows: { type: Number, default: 1 },
    line: { type: Boolean, default: true },
    suffix: {
      type: Object as PropType<{ length?: number; char?: string }>,
      default: () => ({ length: 0, char: '\u00A0' })
    },
    textareaStyle: { type: [String, Object], default: '' },
    labelStyle: { type: [String, Object], default: '' },
    style: { type: [String, Object], default: '' }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // --- Reactive binding
    const input = ref(props.modelValue)
    const { textarea } = useTextareaAutosize({ input })

    // --- Elements
    const labelSpan = ref<HTMLElement>()
    const padEnd = ref('')
    const textareaHeight = ref(20)

    const labelSpanWidth = computed(() => labelSpan.value?.offsetWidth ?? 0)
    const textareaStyleComputed = computed(() =>
      typeof props.textareaStyle === 'string' ? {} : props.textareaStyle
    )

    // --- Init
    onMounted(() => {
      padEnd.value = props.suffix.char?.repeat(props.suffix.length || 0) || ''
      input.value = props.modelValue + padEnd.value
      nextTick(() => {
        textareaHeight.value = textarea.value?.offsetHeight ?? 20
      })
    })

    // --- Watch: external -> internal
    watch(
      () => props.modelValue,
      newVal => {
        if (newVal + padEnd.value !== input.value) {
          input.value = newVal + padEnd.value
        }
      }
    )

    // --- Watch: internal -> emit
    watch(input, newVal => {
      if (!newVal.includes(padEnd.value)) {
        input.value = newVal + padEnd.value
        nextTick(() => setCaretPosition())
      }
      emit('update:modelValue', input.value.replace(padEnd.value, ''))
    })

    // --- Caret control
    const setCaretPosition = () => {
      const el = textarea.value
      if (!el) return
      const caret = el.selectionStart
      const actualLength = el.value.replace(padEnd.value, '').length
      if (caret > actualLength) el.setSelectionRange(actualLength, actualLength)
    }

    const limitSelection = () => {
      const el = textarea.value
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const actualLength = el.value.replace(padEnd.value, '').length
      const maxLen = actualLength - start
      if (end - start > maxLen) el.setSelectionRange(start, start + maxLen)
    }

    const splitString = (val: string) => val?.split('\n') ?? []

    return {
      input,
      textarea,
      labelSpan,
      labelSpanWidth,
      textareaHeight,
      textareaStyleComputed,
      setCaretPosition,
      limitSelection,
      splitString
    }
  }
};
</script>

<style scoped>
.textarea-wrapper {
  display: block;
  width: 100%;
  position: relative;
  height: auto;
}
.hs-textarea-line-none {
  background: none !important;
}
.hs-label-span {
  position: absolute;
  background: white;
  line-height: 1;
  bottom: calc(100% - 20px);
}
.hs-textarea-line {
  outline: none;
  background: url(@/assets/img/icon/bg-line-textarea.png);
  background-position-y: 1px;
  border: none;
  line-height: 20px;
  font-size: 12pt;
  width: 100%;
  color: #00a;
  resize: none;
  display: block;
  overflow: hidden;
}
.hs-textarea-line.yes-print {
  white-space: pre-wrap;
  padding: 2px;
  display: none;
}
@media print {
  .no-print {
    display: none !important;
  }
  .yes-print {
    display: block !important;
  }
}
</style>
