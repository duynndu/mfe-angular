# 🧩 Template Editor Micro-Frontend (Angular 20 + Vue 3)

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&logo=angular)](https://angular.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Native Federation](https://img.shields.io/badge/Native%20Federation-Module%20Federation-blue?style=flat-square)](https://www.npmjs.com/package/@angular-architects/native-federation)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

A powerful, interactive **Medical & Document Template Editor** built with **Angular 20 Micro-Frontend Shell** and **Vue 3 Template Engine**. It delivers seamless **bidirectional two-way data binding**, **live visual editing**, **DOM tree inspection**, **custom JavaScript sandbox with top-level `await`**, and **pixel-perfect A4/A5 print layouts**.

---

## ✨ Key Features

- ⚡ **True Two-Way Realtime Data Binding:** Mutate state in Angular (`[(data)]="data"`, `[(ngModel)]`) or in Vue components (`v-model`), and both frameworks stay synchronized in realtime.
- 📜 **Dynamic JavaScript Sandbox (form-jit):** Write embedded JS scripts with Vue 3 Composition APIs (`reactive`, `ref`, `computed`, `watch`) and native **Top-Level `await`** (e.g. `await fetch(...)`).
- 🌳 **Interactive DOM Tree Sidebar:** Visual tree hierarchy with search, expand/collapse, drag & drop reordering, and node deletion.
- 📄 **Standard Print Page Formats:** Built-in `<PageA4>` and `<PageA5>` layout containers with CSS paging rules and keyboard shortcut print support (`Ctrl + P`).
- 🎨 **Rich Form Component Suite:**
  - `<Textarea>`: Auto-wrapping and dynamic fill lines.
  - `<InputOTP>`: Formatted character-by-character mask boxes.
  - `<Select>`: Single and multiple selection dropdowns with search.
  - `<Checkbox>`: Dynamic checkbox groups with custom sizing.
  - `<DatePicker>`: Masked text date inputs and interactive calendar popups.
  - `<Paint>`: Digital signature and canvas drawing pad.
- 🖱️ **Context Menu & Live Canvas Actions:** Right-click canvas elements to insert before/after/inside, duplicate, edit properties, or delete.

---

## 🏗️ Architecture

```
ngx-vue-template-editor/
├── projects/
│   ├── shell/                # Angular 20 Shell Application (Host)
│   │   ├── src/app/
│   │   │   ├── components/template-editor/   # Angular Wrapper Component
│   │   │   └── pages/home/                   # Demo page with 2-way binding
│   ├── template-editor/      # Vue 3 + Vite Micro-Frontend (Remote)
│   │   ├── src/
│   │   │   ├── components/forms/             # Template form components
│   │   │   ├── components/layouts/           # PageA4, PageA5 layout containers
│   │   │   ├── components/preview/           # Preview engine & DOM Tree View
│   │   │   └── utils/script-evaluator.ts     # Async JS Sandbox Engine
│   └── shared/               # Shared utilities, constants, and types
```

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Development Servers
```bash
# Start both Shell (Angular 4200) & Template Editor
npm run start:shell

# Or start Vue Template Editor standalone (Vite dev server)
npm run start:template-editor
```

### 3. Production Build
```bash
# Build Vue Micro-Frontend for Shell integration
npm run build:template-editor:shell

# Build Shell
npm run build:shell

# Build All
npm run build:all
```

---

## 💡 Usage Example

### Angular Component (`home.ts`)

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemplateEditor } from '../../components/template-editor/template-editor';

@Component({
  selector: 'app-shell-home',
  standalone: true,
  imports: [FormsModule, TemplateEditor],
  templateUrl: './home.html'
})
export class Home {
  // 1. Context dữ liệu 2 chiều (chứa data & metadata truyền cho Vue Sandbox)
  context: any = {
    data: {
      name: 'Nguyễn Văn An',
      age: '25',
      birthday: '15/08/1999',
      category: 'tech',
      tags: ['vue', 'typescript'],
      signature: '',
      ip: ''
    }
  };

  // 2. Mẫu biểu in HTML
  template = `<PageA4 style="padding: 3mm 15mm;">
    <h2>BỆNH ÁN NGOẠI TRÚ</h2>
    <Textarea v-model="data.name" label="Họ và tên:" line :suffix="{ length: 1, char: '❤️' }" />
    <InputOTP v-model="data.age" :mask-length="[1,1,1]" pad-start="0" />
    <Select v-model="data.category" label="Danh mục:" :items="categoryList" bind-label="name" bind-value="id" />
    <Paint v-model="data.signature" style="width: 400px; height: 120px;" />
  </PageA4>`;

  // 3. Script logic bổ sung (Hỗ trợ top-level await & Vue Reactivity)
  script = `// Khởi tạo reactive state từ $context
const data = reactive($context.data || {});

// Lấy IP client hoặc dữ liệu từ API bất đồng bộ (Top-Level await)
try {
  const res = await fetch('https://api.ipify.org');
  data.ip = await res.text();
} catch (e) {}

const categoryList = [
  { id: 'tech', name: 'Công Nghệ' },
  { id: 'business', name: 'Kinh Doanh' }
];

return {
  data,
  categoryList
};`;

  editMode = true;
}
```

### Angular Template (`home.html`)

```html
<!-- Input trên Angular Cha -->
<input [(ngModel)]="context.data.name" placeholder="Gõ họ tên ở Angular..." />

<!-- Component Editor truyền 2 chiều -->
<template-editor
  [(template)]="template"
  [(script)]="script"
  [(context)]="context"
  [(editMode)]="editMode"
></template-editor>
```

---

## 🛠️ Adding New Template Components

To add a new component usable within templates:
1. **Create Component:** Place `.vue` component in `projects/template-editor/src/components/forms/` or `layouts/`.
2. **Register Component:** Register in `renderPreview()` inside `projects/template-editor/src/components/preview/Preview.vue`.
3. **Register in Context Menu:** Add the component preset in `projects/shared/constants/template-categories.ts`.
4. **Verify Compilation:** Run `npm run build:template-editor:shell`.

---

## 🎯 Live Demo
- [https://duynndu.github.io/ngx-vue-template-editor](https://duynndu.github.io/ngx-vue-template-editor)

---

## 📄 License
MIT License. Free to use and customize for medical record systems and document template builders.