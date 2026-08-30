# 🛠️ Component Contribution & Development Guide

Standard workflow for creating, registering, and maintaining Vue 3 template components in the **Template Editor Micro-Frontend** system.

---

## 1. Directory Structure & Conventions

All components usable within templates must reside under `projects/template-editor/src/components/`:

- **`forms/`**: Form inputs and interactive components (`Textarea.vue`, `Checkbox.vue`, `DatePicker.vue`, `Select.vue`, `InputOTP.vue`, `Paint.vue`).
- **`layouts/`**: Page containers and layout templates (`PageA4.vue`, `PageA5.vue`).
- **`preview/`**: Editor core engine, DOM Tree view, and preview wrapper (`Preview.vue`, `PreviewWrapper.vue`, `DomTreeView.vue` — *do NOT place template-usable components here*).

---

## 2. Component Creation Workflow (5 Steps)

### Step 1: Create Component (`src/components/forms/MyComponent.vue`)
Support standard `v-model` (`modelValue`). (Changes are automatically tracked via Deep Proxy at the Engine level, so NO `path` prop or `inject('onFieldChange')` is needed!):

```vue
<template>
  <div class="my-component">
    <input :value="modelValue" @input="onInput" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: any;
}>();

const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit('update:modelValue', val);
}
</script>

<style scoped>
.my-component {
  display: inline-block;
}
</style>
```

### Step 2: Register Component in `Preview.vue`
Open `projects/template-editor/src/components/preview/Preview.vue`, import your component, and register it inside `renderPreview()`:

```typescript
import MyComponent from '../forms/MyComponent.vue';

// Inside renderPreview() method:
this.app.component('MyComponent', MyComponent);
```

### Step 3: Add Component Preset to Insert Context Menu
Add the component preset in `projects/shared/constants/template-categories.ts`:

```typescript
{
  label: 'Form Components',
  templates: [
    {
      label: 'My Component',
      icon: 'fa fa-cube',
      template: '<MyComponent v-model="data.myField" />'
    }
  ]
}
```

### Step 4 (Optional): Declare Self-Closing Tag
If your component is a self-closing tag (e.g. `<MyComponent />`), add its tag name into `VirtualHTMLParser.closingTags` in `projects/shared/utils/virtual-html-parser.ts`.

### Step 5: Verify Build & Type Safety
```bash
# Build Vue Micro-Frontend integration bundle
npm run build:template-editor:shell

# Or build entire workspace
npm run build:all
```

---

## 3. Pull Request & Quality Checklist

Before submitting a PR, ensure all following items pass:

- [ ] **Scoped CSS**: Always use `<style scoped>` to avoid style leakage across print pages (A4 / A5).
- [ ] **Data Sync**: Support `v-model` and call `onFieldChange` when values change.
- [ ] **Type Safety**: Maintain clean TypeScript types without any compile warnings or errors.
- [ ] **Context Menu & Palette**: Verify the component can be inserted via Right-Click Context Menu and inspected via the DOM Tree Sidebar.
- [ ] **Build Validation**: `npm run build:template-editor:shell` and `npm run build:shell` succeed with **0 errors**.
