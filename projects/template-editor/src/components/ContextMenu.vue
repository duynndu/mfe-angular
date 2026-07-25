<template>
  <teleport to="body">
    <ul
      ref="menuRef"
      v-show="open"
      class="ctx-menu"
      :style="{ top: `${pos.y}px`, left: `${pos.x}px` }"
      @click.stop="close"
      @contextmenu.stop
    >
      <slot :close="close" :subject="subject" />
    </ul>
    <!-- Consume attrs (c-id, c-name) to avoid extraneous attr warnings -->
    <div v-bind="attrs" style="display:none"></div>
  </teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const open = ref(false)
const pos = ref({ x: 0, y: 0 })
const subject = ref<unknown>()
const menuRef = ref<HTMLElement | null>(null)

function show(x: number, y: number, nextSubject?: unknown) {
  subject.value = nextSubject
  open.value = true
  updatePosition(x, y)
}

function showFromEvent(e: MouseEvent, nextSubject?: unknown) {
  show(e.clientX, e.clientY - 15, nextSubject)
}

function close() {
  open.value = false
}

function updatePosition(x: number, y: number) {
  nextTick(() => {
    const rect = menuRef.value?.getBoundingClientRect()
    const menuWidth = rect?.width || 200
    const menuHeight = rect?.height || 240
    const maxX = window.innerWidth - menuWidth
    const maxY = window.innerHeight - menuHeight
    pos.value = { x: Math.min(x, maxX), y: Math.min(y, maxY) }
  })
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

// Expose for parent use (imperative API similar to ngx-contextmenu service)
defineExpose({ show, showFromEvent, close, subject })

onMounted(() => window.addEventListener('keydown', onKeydown))
onMounted(() => document.addEventListener('click', close, true))
onMounted(() => document.addEventListener('contextmenu', close, true))

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('click', close, true))
onBeforeUnmount(() => document.removeEventListener('contextmenu', close, true))
</script>

<style scoped>
.ctx-menu {
  position: fixed;
  background-clip: padding-box;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, .18);
  box-shadow: 0 6px 12px rgba(0, 0, 0, .18);
  color: #70757e;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  font-size: 14px;
  margin: 2px 0 0;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px 0;
  text-align: start;
}

.ctx-menu > :deep(li) {
  cursor: pointer;
  outline: none;
  color: #70757e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  padding: 6px 20px;
  gap: 4px;
  line-height: 15px;
  gap: 10px;
}

.ctx-menu > :deep(li):hover {
  color: #5a6473;
  background-color: #f8f8f8;
}


</style>
