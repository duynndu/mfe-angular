<template>
  <Teleport to="body">
    <div v-if="state.isOpen">
      <div
        class="datepicker-popup"
        ref="popupRef"
        :style="popupStyle"
        @mousedown.stop
      >
        <div class="calendar-header">
          <button type="button" class="calendar-nav" @click="prevMonth">&#60;</button>
          <span class="calendar-label">
            <select :value="calendarMonth" @change="onMonthChange($event)">
              <option v-for="(m, i) in 12" :key="i" :value="i">{{ moment().month(i).format('MM') }}</option>
            </select>
            <select :value="calendarYear" @change="onYearChange($event)">
              <option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
            </select>
          </span>
          <button type="button" class="calendar-nav" @click="nextMonth">&#62;</button>
        </div>
        <table class="calendar-table">
          <thead>
            <tr>
              <th v-for="d in 7" :key="d">{{ moment().weekday(d % 7).format('dd') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wIdx) in weeks" :key="wIdx">
              <td v-for="(day, dIdx) in week" :key="dIdx">
                <button
                  :class="[
                    'calendar-day',
                    { selected: isSelected(day), today: isToday(day), outsideMonth: isOutside(day) }
                  ]"
                  @mousedown.prevent="selectDay(day)"
                >{{ day.date() }}</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="isDateTime" class="time-row">
          <label class="time-field">
            <span>Hour</span>
            <select :value="hours" @change="onHourChange($event)">
              <option v-for="h in 24" :key="h" :value="h - 1">{{ String(h - 1).padStart(2, '0') }}</option>
            </select>
          </label>
          <label class="time-field">
            <span>Minute</span>
            <select :value="minutes" @change="onMinuteChange($event)">
              <option v-for="m in minuteOptions" :key="m" :value="m">{{ String(m).padStart(2, '0') }}</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import moment from 'moment';
import { useDatePickerService } from '../../services/datePickerService';

export default {
  name: 'DatePickerPortal',
  setup() {
    const { state, close, select, updatePosition } = useDatePickerService();
    const popupRef = ref<HTMLDivElement | null>(null);
    const popupStyle = ref<Record<string, string>>({});
    const calendarMonth = ref(moment().month());
    const calendarYear = ref(moment().year());
    const selectedMoment = ref<moment.Moment | null>(null);
    const hours = ref(moment().hours());
    const minutes = ref(moment().minutes());
    const isDateTime = computed(() => state.mode === 'datetime');

    const minuteOptions = computed(() => {
      const step = Math.max(1, Math.min(60, state.minuteStep));
      const result: number[] = [];
      for (let m = 0; m < 60; m += step) result.push(m);
      if (!result.includes(59)) result.push(59);
      return result;
    });

    const yearRange = computed(() => {
      const center = calendarYear.value;
      const start = center - 10;
      return Array.from({ length: 21 }, (_, i) => start + i);
    });

    const syncFromState = () => {
      const val = state.value;
      const parsed = val
        ? moment(val, state.format, true).isValid()
          ? moment(val, state.format, true)
          : moment(val)
        : null;
      if (parsed && parsed.isValid()) {
        selectedMoment.value = parsed;
        calendarMonth.value = parsed.month();
        calendarYear.value = parsed.year();
        hours.value = parsed.hours();
        minutes.value = parsed.minutes();
      } else {
        const now = moment();
        selectedMoment.value = null;
        calendarMonth.value = now.month();
        calendarYear.value = now.year();
        hours.value = now.hours();
        minutes.value = now.minutes();
      }
    };

    const positionPopup = () => {
      if (!state.isOpen || !popupRef.value) return;
      const popupRect = popupRef.value.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const gap = 2;
      const fixedWidth = 230;
      const placeBelow = state.rect.top + state.rect.height + gap + popupRect.height <= viewportH;
      const top = placeBelow ? state.rect.top + state.rect.height + gap : state.rect.top - popupRect.height - gap;
      popupStyle.value = {
        position: 'fixed',
        top: `${Math.max(8, top)}px`,
        left: `${state.rect.left}px`,
        width: `${fixedWidth}px`
      };
    };

    const handleWindowChange = () => {
      if (!state.isOpen) return;
      updatePosition();
      positionPopup();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!state.isOpen) return;
      const target = e.target as Node | null;
      if (popupRef.value && popupRef.value.contains(target)) return;
      if (state.anchor && state.anchor.contains(target)) return;
      close();
    };

    const weeks = computed(() => {
      const first = moment().year(calendarYear.value).month(calendarMonth.value).startOf('month');
      const last = moment().year(calendarYear.value).month(calendarMonth.value).endOf('month');
      const start = first.clone().startOf('week');
      const end = last.clone().endOf('week');
      const days: Array<moment.Moment> = [];
      let day = start.clone();
      while (day.isBefore(end) || day.isSame(end, 'day')) {
        days.push(day.clone());
        day.add(1, 'day');
      }
      const chunked: Array<Array<moment.Moment>> = [];
      for (let i = 0; i < days.length; i += 7) chunked.push(days.slice(i, i + 7));
      return chunked;
    });

    const selectDay = (day: moment.Moment) => {
      const base = isDateTime.value
        ? day.clone().hours(hours.value).minutes(minutes.value)
        : day;
      selectedMoment.value = base;
      select(base.format(state.format));
    };

    const isSelected = (day: moment.Moment) => Boolean(selectedMoment.value && selectedMoment.value.isSame(day, 'day'));
    const isToday = (day: moment.Moment) => moment().isSame(day, 'day');
    const isOutside = (day: moment.Moment) => day.month() !== calendarMonth.value;

    const prevMonth = () => {
      if (calendarMonth.value === 0) {
        calendarMonth.value = 11;
        calendarYear.value--;
      } else {
        calendarMonth.value--;
      }
    };

    const nextMonth = () => {
      if (calendarMonth.value === 11) {
        calendarMonth.value = 0;
        calendarYear.value++;
      } else {
        calendarMonth.value++;
      }
    };

    const onMonthChange = (e: Event) => {
      calendarMonth.value = Number((e.target as HTMLSelectElement).value);
    };

    const onYearChange = (e: Event) => {
      calendarYear.value = Number((e.target as HTMLSelectElement).value);
    };

    const onHourChange = (e: Event) => {
      hours.value = Number((e.target as HTMLSelectElement).value);
      if (selectedMoment.value) selectedMoment.value.hours(hours.value);
    };

    const onMinuteChange = (e: Event) => {
      minutes.value = Number((e.target as HTMLSelectElement).value);
      if (selectedMoment.value) selectedMoment.value.minutes(minutes.value);
    };

    watch(
      () => state.value,
      () => syncFromState(),
      { immediate: true }
    );

    watch(
      () => state.isOpen,
      async (open) => {
        if (open) {
          await nextTick();
          syncFromState();
          positionPopup();
          document.addEventListener('mousedown', handleClickOutside, true);
          window.addEventListener('scroll', handleWindowChange, true);
          window.addEventListener('resize', handleWindowChange);
        } else {
          document.removeEventListener('mousedown', handleClickOutside, true);
          window.removeEventListener('scroll', handleWindowChange, true);
          window.removeEventListener('resize', handleWindowChange);
        }
      }
    );

    onMounted(() => {
      if (state.isOpen) {
        document.addEventListener('mousedown', handleClickOutside, true);
        window.addEventListener('scroll', handleWindowChange, true);
        window.addEventListener('resize', handleWindowChange);
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      window.removeEventListener('scroll', handleWindowChange, true);
      window.removeEventListener('resize', handleWindowChange);
    });

    watch([calendarMonth, calendarYear], () => positionPopup());

    return {
      state,
      popupRef,
      popupStyle,
      calendarMonth,
      calendarYear,
      yearRange,
      weeks,
      selectDay,
      isSelected,
      isToday,
      isOutside,
      prevMonth,
      nextMonth,
      onMonthChange,
      onYearChange,
      onHourChange,
      onMinuteChange,
      hours,
      minutes,
      minuteOptions,
      isDateTime,
      moment
    };
  }
};
</script>

<style scoped>
.datepicker-popup {
  position: fixed;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 8px;
  z-index: 100;
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.calendar-label {
  display: flex;
  align-items: center;
  gap: 4px;
}
.calendar-label select {
  margin: 0 2px;
  font-size: 14px;
  padding: 2px 4px;
  min-width: 56px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: auto;
  color: #222;
  scrollbar-width: thin;
  scrollbar-color: #0a6cff #f2f6ff;
}
.calendar-label select::-webkit-scrollbar { width: 2px; }
.calendar-label select::-webkit-scrollbar-track { background: #f2f6ff; }
.calendar-label select::-webkit-scrollbar-thumb { background: #0a6cff; border-radius: 999px; }
.calendar-label select::-webkit-scrollbar-thumb:hover { background: #0857cc; }
.calendar-nav {
  background: #97c1ff;
  border: 1px solid #4b93ff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: transform 0.1s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.calendar-nav:hover {
  background: #3d8bff;
  border-color: #4e95ff;
  box-shadow: 0 2px 6px rgba(8, 90, 209, 0.25);
}
.calendar-nav:active {
  transform: translateY(1px);
  box-shadow: 0 1px 3px rgba(8, 90, 209, 0.35);
}
.calendar-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
}
.calendar-table th {
  color: #888;
  font-weight: 500;
  padding: 2px 0;
}
.calendar-table td { padding: 0; }
.calendar-day {
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  margin: 1px;
  font-size: 14px;
  transition: background 0.15s;
}
.calendar-day.selected { background: #409ffd; color: #fff; }
.calendar-day.today { border: 1px solid #0066cc; }
.calendar-day:hover { background: #e6f0fa; }
.calendar-day.outsideMonth { color: #aaa; }
.time-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  gap: 8px;
}
.time-field {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #333;
}
.time-field select {
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  scrollbar-width: thin;
  scrollbar-color: #0a6cff #f2f6ff;
}
.time-field select::-webkit-scrollbar { width: 2px; }
.time-field select::-webkit-scrollbar-track { background: #f2f6ff; }
.time-field select::-webkit-scrollbar-thumb { background: #0a6cff; border-radius: 999px; }
.time-field select::-webkit-scrollbar-thumb:hover { background: #0857cc; }
</style>
