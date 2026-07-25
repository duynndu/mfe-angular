import type { Directive, DirectiveBinding } from 'vue';
import type { App } from 'vue';

export type MaskBindingValue =
  | string
  | {
      format: string;
      tokens?: RegExp;
      onMasked?: (masked: string, digitCount: number) => void;
      showMask?: boolean;
      placeholderChar?: string;
    };

type MaskEl = HTMLInputElement & {
  __maskHandler?: (e: Event) => void;
  __maskBeforeRange?: { startDigit: number; endDigit: number };
  __maskRecordRange?: EventListener;
  __maskSelectHandlers?: Array<{ type: keyof HTMLElementEventMap; fn: EventListener }>;
  __maskDigits?: string;
};

// General masking function that supports literal blocks wrapped in []
// and only inserts separators when there are remaining digits or a following literal.
export const applyMask = (
  raw: string,
  format: string,
  tokenPattern: RegExp,
  opts?: { showMask?: boolean; placeholderChar?: string }
) => {
  const digits = raw.replace(/\D/g, '');
  let result = '';
  let di = 0;
  let inLiteral = false;
  let literalEnabled = false;
  const showMask = opts?.showMask ?? false;
  const placeholder = opts?.placeholderChar ?? '_';
  const tokenCount = tokenSlotsFromFormat(format, tokenPattern);
  const cappedDigits = digits.slice(0, tokenCount);
  for (let i = 0; i < format.length; i++) {
    const ch = format[i];
    const digitsRemaining = cappedDigits.length - di;
    if (ch === '[') { inLiteral = true; literalEnabled = digitsRemaining > 0; continue; }
    if (ch === ']') { inLiteral = false; continue; }
    if (inLiteral) {
      if (literalEnabled || showMask) {
        result += ch;
      }
      continue;
    }
    if (tokenPattern.test(ch)) {
      if (di < cappedDigits.length) {
        result += cappedDigits[di++];
      } else {
        if (showMask) {
          result += placeholder;
          continue;
        }
        break;
      }
    } else {
      const nextIsLiteral = format[i + 1] === '[';
      if (showMask || di > 0 || (nextIsLiteral && digitsRemaining > 0)) {
        if (showMask || digitsRemaining > 0 || nextIsLiteral) {
          result += ch;
        }
      }
    }
  }
  return result;
};

const tokensFromFormat = (format: string) => {
  const stripped = format.replace(/\[[^\]]*]/g, '');
  const letters = stripped.replace(/[^YyMDHhms]/g, '') || 'YyMDHhms';
  return new RegExp(`[${letters}]`);
};

const tokenSlotsFromFormat = (format: string, tokens: RegExp) => {
  const cleaned = format.replace(/\[[^\]]*]/g, '');
  let count = 0;
  for (const ch of cleaned) {
    tokens.lastIndex = 0;
    if (tokens.test(ch)) count++;
  }
  return count;
};

const escapeForRegex = (ch: string) => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const digitIndexFromCaret = (value: string, caret: number) => {
  const slice = value.slice(0, caret);
  return slice.replace(/\D/g, '').length;
};

const caretFromDigitIndex = (masked: string, digitIndex: number, placeholderChar: string) => {
  const isSlotChar = (ch: string) => /\d/.test(ch) || ch === placeholderChar;
  if (digitIndex <= 0) {
    const firstSlot = masked.split('').findIndex(isSlotChar);
    return firstSlot >= 0 ? firstSlot : 0;
  }

  let count = 0;
  for (let i = 0; i < masked.length; i++) {
    if (isSlotChar(masked[i])) {
      if (count === digitIndex) return i;
      count++;
    }
  }
  // If we didn't hit the exact index, place at end
  return masked.length;
};

const selectTokenSegment = (el: HTMLInputElement, format: string, tokens: RegExp) => {
  const fmt = format.replace(/\[|\]/g, '');
  if (!fmt.length) return;
  const caret = el.selectionStart ?? 0;
  const length = fmt.length;
  const clamp = Math.max(0, Math.min(caret, Math.max(length - 1, 0)));
  const isToken = (idx: number) => {
    tokens.lastIndex = 0;
    return tokens.test(fmt[idx]);
  };

  let idx = clamp;
  while (idx < length && !isToken(idx)) idx++;
  if (!isToken(idx)) return;

  const start = idx;
  const end = Math.min(idx + 1, length);
  el.setSelectionRange(start, end);
};

const selectTokenSegmentDirectional = (
  el: HTMLInputElement,
  format: string,
  tokens: RegExp,
  direction: 'left' | 'right'
) => {
  const fmt = format.replace(/\[|\]/g, '');
  if (!fmt.length) return;
  const caret = el.selectionStart ?? 0;
  const length = fmt.length;
  const isToken = (idx: number) => {
    tokens.lastIndex = 0;
    return tokens.test(fmt[idx]);
  };

  if (direction === 'right') {
    let idx = Math.max(0, Math.min(caret, length - 1));
    while (idx < length && !isToken(idx)) idx++;
    if (idx < length && isToken(idx)) {
      el.setSelectionRange(idx, Math.min(idx + 1, length));
    }
    return;
  }

  let idx = Math.max(0, Math.min(caret - 1, length - 1));
  while (idx >= 0 && !isToken(idx)) idx--;
  if (idx >= 0 && isToken(idx)) {
    el.setSelectionRange(idx, Math.min(idx + 1, length));
  }
};

const enforceDateBounds = (format: string, tokens: RegExp, rawDigits: string) => {
  const fmt = format.replace(/\[[^\]]*]/g, '');
  const monthIdx: number[] = [];
  const dayIdx: number[] = [];
  const yearIdx: number[] = [];

  let di = 0;
  for (const ch of fmt) {
    tokens.lastIndex = 0;
    if (!tokens.test(ch)) continue;
    if (/M/.test(ch)) monthIdx.push(di);
    else if (/[D]/.test(ch)) dayIdx.push(di);
    else if (/[Y]/.test(ch)) yearIdx.push(di);
    di++;
  }

  const digits = rawDigits.split('');
  const read = (idx: number[]) => idx.map(i => digits[i] ?? '').join('');
  const write = (idx: number[], value: string) => {
    const padded = value.padStart(idx.length, '0');
    idx.forEach((pos, i) => { digits[pos] = padded[i]; });
  };

  if (monthIdx.length) {
    const mStr = read(monthIdx);
    if (mStr.length === monthIdx.length && /^\d+$/.test(mStr)) {
      let m = parseInt(mStr, 10);
      if (m === 0) m = 1;
      if (m > 12) write(monthIdx, '12');
    }
  }

  const yStr = read(yearIdx);
  const hasFullYear = yStr.length === yearIdx.length && /^\d+$/.test(yStr);
  const year = hasFullYear ? parseInt(yStr, 10) : undefined;

  if (dayIdx.length) {
    const dStr = read(dayIdx);
    if (dStr.length === dayIdx.length && /^\d+$/.test(dStr)) {
      let d = parseInt(dStr, 10);
      const mStr = read(monthIdx);
      const hasMonth = mStr.length === monthIdx.length && /^\d+$/.test(mStr);
      const month = hasMonth ? parseInt(mStr, 10) : undefined;
      const maxDay = (() => {
        if (!month) return 31;
        if (month === 2) {
          const leap = year !== undefined && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
          return leap ? 29 : 28;
        }
        return [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
      })();
      if (d === 0) d = 1;
      if (d > maxDay) write(dayIdx, String(maxDay));
    }
  }

  return digits.join('');
};

const applyBoundedDigits = (template: string, boundedDigits: string) => {
  let i = 0;
  return template.replace(/\d/g, () => boundedDigits[i++] ?? '');
};

const resolve = (binding: MaskBindingValue) => {
  if (typeof binding === 'string') {
    const fmt = binding;
    return {
      format: fmt,
      tokens: tokensFromFormat(fmt),
      onMasked: undefined,
      showMask: true,
      placeholderChar: '_'
    };
  }
  const fmt = binding.format;
  return {
    format: fmt,
    tokens: binding.tokens ?? tokensFromFormat(fmt),
    onMasked: binding.onMasked,
    showMask: binding.showMask ?? true,
    placeholderChar: binding.placeholderChar ?? '_'
  };
};

const mask: Directive<MaskEl, MaskBindingValue> = {
  mounted(el: MaskEl, binding: DirectiveBinding<MaskBindingValue>) {
    const handler = () => {
      const { format, tokens, onMasked, showMask, placeholderChar } = resolve(binding.value);
      if (!format || !tokens) return;
      const prevValue = el.value;
      const prevCaret = el.selectionStart ?? prevValue.length;
      const totalSlots = tokenSlotsFromFormat(format, tokens);
      const digitIdx = Math.min(digitIndexFromCaret(prevValue, prevCaret), totalSlots);

      const currentDigits = prevValue.replace(/\D/g, '');

      const range = el.__maskBeforeRange;
      let digitsForMask = currentDigits;

      if (range && el.__maskDigits !== undefined) {
        const removedCount = Math.max(0, range.endDigit - range.startDigit);
        const priorDigits = el.__maskDigits;
        const priorSlots = new Array(totalSlots).fill(placeholderChar);

        for (let i = 0; i < totalSlots; i++) {
          priorSlots[i] = priorDigits[i] ?? placeholderChar;
        }

        const insertedCount = Math.max(0, currentDigits.length - (priorDigits.length - removedCount));
        const insertDigits = currentDigits.slice(range.startDigit, range.startDigit + insertedCount);

        const nextSlots = [...priorSlots];
        let pos = range.startDigit;
        for (const ch of insertDigits) {
          if (pos >= totalSlots) break;
          nextSlots[pos++] = ch;
        }

        for (let i = pos; i < Math.min(range.endDigit, totalSlots); i++) {
          nextSlots[i] = placeholderChar;
        }

        digitsForMask = nextSlots.join('');
      } else {
        let digitsArr = currentDigits.split('');

        const hasFullLength = digitsArr.length >= totalSlots;
        if (hasFullLength && el.__maskDigits) {
          const prior = el.__maskDigits.padEnd(totalSlots, placeholderChar).slice(0, totalSlots).split('');
          const insertPos = Math.max(0, Math.min(digitIdx - 1, totalSlots - 1));
          prior[insertPos] = digitsArr[insertPos] ?? prior[insertPos];
          digitsArr = prior;
        } else if (digitsArr.length > totalSlots) {
          const extras = digitsArr.length - totalSlots;
          const insertionPos = Math.max(0, Math.min(digitIdx - 1, digitsArr.length - 1));
          for (let i = 0; i < extras; i++) {
            const dropIndex = Math.min(insertionPos + 1, digitsArr.length - 1);
            digitsArr.splice(dropIndex, 1);
          }
        }

        digitsForMask = digitsArr.join('');
      }

      const boundedDigits = enforceDateBounds(format, tokens, digitsForMask.replace(/\D/g, ''));
      if (boundedDigits !== digitsForMask.replace(/\D/g, '')) {
        digitsForMask = applyBoundedDigits(digitsForMask, boundedDigits);
      }

      const masked = applyMask(digitsForMask, format, tokens, { showMask, placeholderChar });
      const digitCount = masked.replace(/\D/g, '').length;
      const trailingPlaceholderRx = new RegExp(`${escapeForRegex(placeholderChar)}+$`);
      let normalized = digitCount >= totalSlots
        ? masked.replace(trailingPlaceholderRx, '')
        : masked;
      if (digitCount >= totalSlots - 1 && trailingPlaceholderRx.test(normalized)) {
        normalized = normalized.replace(trailingPlaceholderRx, '');
      }

      if (el.value !== normalized) {
        el.value = normalized;
        const nextCaret = caretFromDigitIndex(normalized, digitIdx, placeholderChar);
        el.setSelectionRange(nextCaret, nextCaret);
      }
      el.__maskDigits = normalized.replace(/\D/g, '');
      delete el.__maskBeforeRange;
      onMasked?.(normalized, digitCount);

      // Reselect the next token slot after input so the user can overwrite seamlessly.
      const { format: fmt, tokens: tkns } = resolve(binding.value);
      if (fmt && tkns) setTimeout(() => selectTokenSegment(el, fmt, tkns), 0);
    };
    el.__maskHandler = handler;
    el.addEventListener('input', handler);

    const recordRange = (ev?: InputEvent) => {
      // Block non-digit input (typing or paste) early.
      if (ev) {
        const type = ev.inputType;
        const data = ev.data ?? '';
        const isInsert = type === 'insertText' || type === 'insertFromPaste';
        if (isInsert && data && !/^\d+$/.test(data)) {
          ev.preventDefault?.();
          return;
        }
      }

      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? start;
      const startDigit = digitIndexFromCaret(el.value, start);
      const endDigit = digitIndexFromCaret(el.value, end);
      el.__maskBeforeRange = { startDigit, endDigit };
    };

    el.__maskRecordRange = recordRange as EventListener;
    el.addEventListener('beforeinput', recordRange as EventListener);

    const ensureMaskVisible = () => {
      const { format, tokens, showMask, placeholderChar } = resolve(binding.value);
      if (!format || !tokens) return { format, tokens };
      if (showMask && el.value === '') {
        const masked = applyMask('', format, tokens, { showMask, placeholderChar });
        el.value = masked;
        el.__maskDigits = '';
      }
      return { format, tokens };
    };

    const triggerSelect = () => {
      const { format, tokens } = ensureMaskVisible();
      if (!format || !tokens) return;
      setTimeout(() => {
        const firstSlot = el.value.indexOf(resolve(binding.value).placeholderChar ?? '_');
        if (firstSlot >= 0) {
          el.setSelectionRange(firstSlot, firstSlot + 1);
        } else {
          selectTokenSegment(el, format, tokens);
        }
      }, 0);
    };

    const handleBlur = () => {
      ensureMaskVisible();
    };

    const navHandler = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.shiftKey) return;
      if (!['ArrowLeft', 'ArrowRight'].includes(keyboardEvent.key)) return;
      const { format, tokens } = resolve(binding.value);
      if (!format || !tokens) return;

      const direction = keyboardEvent.key === 'ArrowLeft' ? 'left' : 'right';
      setTimeout(() => selectTokenSegmentDirectional(el, format, tokens, direction), 0);
    };

    const blockBackspace = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Backspace') {
        keyboardEvent.preventDefault();
      }
    };

    el.__maskSelectHandlers = [
      { type: 'focus', fn: triggerSelect },
      { type: 'click', fn: triggerSelect },
      { type: 'blur', fn: handleBlur },
      { type: 'keyup', fn: navHandler },
      { type: 'keydown', fn: blockBackspace }
    ];

    el.__maskSelectHandlers?.forEach(({ type, fn }) => el.addEventListener(type, fn));

    // Ensure mask is visible on mount if empty and showMask is on.
    const { format, tokens, showMask, placeholderChar } = resolve(binding.value);
    if (format && tokens && showMask && el.value === '') {
      const masked = applyMask('', format, tokens, { showMask, placeholderChar });
      el.value = masked;
      el.__maskDigits = '';
      setTimeout(() => selectTokenSegment(el, format, tokens), 0);
    }
  },
  beforeUnmount(el: MaskEl) {
    if (el.__maskHandler) {
      el.removeEventListener('input', el.__maskHandler);
      delete el.__maskHandler;
    }
    if (el.__maskRecordRange) {
      el.removeEventListener('beforeinput', el.__maskRecordRange);
      delete el.__maskRecordRange;
    }
    if (el.__maskSelectHandlers) {
      el.__maskSelectHandlers.forEach(({ type, fn }) => el.removeEventListener(type, fn));
      delete el.__maskSelectHandlers;
    }
    if (el.__maskDigits) {
      delete el.__maskDigits;
    }
  }
};

export default mask;

export const installMaskDirective = (app: App) => {
  app.directive('mask', mask);
  app.directive('mask-datetime', mask);
};
