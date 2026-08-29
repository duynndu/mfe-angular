# Agent Guidelines & Conventions for `ngx-vue-template-editor`

## Project Architecture
This repository is a Micro-Frontend workspace combining Angular 20 and Vue 3 apps via Module Federation / Native Federation:
- `projects/shell`: Angular 20 Shell Application.
- `projects/template-editor`: Vue 3 + Vite Micro-Frontend Application for interactive template editing & previewing.
- `projects/shared`: Shared utilities (`VirtualHTMLParser`), constants (`templateCategories`), helpers, and TypeScript interfaces.
- `projects/first-mf`: Angular sub-app / micro-frontend.

## Build & Test Commands
- **Template Editor Dev:** `npm run start:template-editor` (or `npm run dev` in `projects/template-editor`)
- **Template Editor Build:** `npm run build:template-editor` (or `npm run build` in `projects/template-editor`)
- **Shell Build:** `npm run build:shell`
- **Build All:** `npm run build:all`

## Code Conventions & Rules

### Component Organization (`projects/template-editor/src/components`)
- **`forms/`**: Form input/interactive components used in templates (e.g., `Textarea.vue`, `Select.vue`, `Checkbox.vue`, `DatePicker.vue`, `InputOTP.vue`, `Paint.vue`).
- **`layouts/`**: Page layout components used in templates (e.g., `PageA4.vue`, `PageA5.vue`).
- **`preview/`**: Preview container and editor engine components (`Preview.vue`, `PreviewWrapper.vue`).
- Do NOT place template-usable components directly inside `preview/`. Use appropriate subfolders like `forms/` or `layouts/`.

### Component Registration in Template Preview
When creating a new component designed to be used within templates:
1. Place the component `.vue` file in `projects/template-editor/src/components/forms/` or `layouts/`.
2. Register the component in `Preview.vue` inside `renderPreview()` using `this.app.component('ComponentName', ComponentName)`.
3. Add the component preset in `projects/shared/constants/template-categories.ts` if it should appear in the "Insert Component" context menu.

### Styling Guidelines
- Use Vanilla CSS / Scoped CSS (`<style scoped>`) inside Vue components.
- Do not add arbitrary unconfigured utility frameworks unless explicitly instructed.
- Maintain clean, responsive layout support for page formats (A4/A5).

### Code Quality & Verification
- Always run `npm run build:template-editor` after making structural code changes to verify compilation.
- Ensure all exported helpers and components maintain TypeScript type safety.
