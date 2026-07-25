import { reactive } from 'vue';

export type DatePickerMode = 'date' | 'datetime';

export type DatePickerRequest = {
  anchor: HTMLElement;
  value?: string;
  format: string;
  mode: DatePickerMode;
  minuteStep: number;
  onSelect?: (value: string) => void;
};

const state = reactive({
  isOpen: false,
  anchor: null as HTMLElement | null,
  value: '' as string,
  format: 'YYYY-MM-DD',
  mode: 'date' as DatePickerMode,
  minuteStep: 5,
  rect: { top: 0, left: 0, width: 0, height: 0 },
  onSelect: null as ((value: string) => void) | null
});

const updatePosition = () => {
  if (!state.anchor) return;
  const rect = state.anchor.getBoundingClientRect();
  state.rect = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  };
};

const open = (request: DatePickerRequest) => {
  state.anchor = request.anchor;
  state.value = request.value ?? '';
  state.format = request.format;
  state.mode = request.mode;
  state.minuteStep = request.minuteStep;
  state.onSelect = request.onSelect ?? null;
  updatePosition();
  state.isOpen = true;
};

const close = () => {
  state.isOpen = false;
  state.anchor = null;
  state.onSelect = null;
};

const select = (value: string) => {
  state.onSelect?.(value);
  close();
};

const syncValue = (value: string, anchor?: HTMLElement | null) => {
  if (!state.isOpen) return;
  if (anchor && state.anchor !== anchor) return;
  state.value = value;
};

export const useDatePickerService = () => ({
  state,
  open,
  close,
  select,
  syncValue,
  updatePosition
});
