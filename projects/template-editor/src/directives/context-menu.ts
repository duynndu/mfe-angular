import type { App, Directive, DirectiveBinding } from 'vue';

type ContextMenuHandle = {
  showFromEvent?: (e: MouseEvent, subject?: unknown) => void;
};

type ResolvedBinding = {
  handle?: ContextMenuHandle;
  subject?: unknown;
};

type WithCtxHandler = HTMLElement & {
  __ctxMenuHandler?: (e: MouseEvent) => void;
  __ctxMenuBoundValue?: ResolvedBinding;
};

type ContextMenuBinding = ContextMenuHandle | { menu?: ContextMenuHandle; subject?: unknown } | unknown;

const contextMenuDirective: Directive<HTMLElement, ContextMenuBinding | undefined> = {
  mounted(el: WithCtxHandler, binding: DirectiveBinding<ContextMenuBinding | undefined>) {
    bindHandler(el, resolveBinding(binding));
  },
  updated(el: WithCtxHandler, binding: DirectiveBinding<ContextMenuBinding | undefined>) {
    const next = resolveBinding(binding);
    if (next !== el.__ctxMenuBoundValue) {
      unbindHandler(el);
      bindHandler(el, next);
    }
  },
  unmounted(el: WithCtxHandler) {
    unbindHandler(el);
  }
};

export default contextMenuDirective;

export const installContextMenuDirective = (app: App) => {
  app.directive('context-menu', contextMenuDirective);
};

function bindHandler(el: WithCtxHandler, value?: ResolvedBinding) {
  const handler = (e: MouseEvent) => {
    e.preventDefault();
    value?.handle?.showFromEvent?.(e, value.subject);
  };
  el.__ctxMenuHandler = handler;
  el.__ctxMenuBoundValue = value;
  el.addEventListener('contextmenu', handler);
}

function unbindHandler(el: WithCtxHandler) {
  if (el.__ctxMenuHandler) {
    el.removeEventListener('contextmenu', el.__ctxMenuHandler);
    delete el.__ctxMenuHandler;
  }
  if (el.__ctxMenuBoundValue) {
    delete el.__ctxMenuBoundValue;
  }
}

function resolveBinding(binding: DirectiveBinding<ContextMenuBinding | undefined>): ResolvedBinding | undefined {
  let handle: ContextMenuHandle | undefined;
  let subject: unknown;

  const raw = binding.value as any;

  if (raw && typeof raw === 'object' && 'menu' in raw) {
    const menu = raw.menu;
    if (menu && typeof menu.showFromEvent === 'function') handle = menu as ContextMenuHandle;
    subject = raw.subject;
  } else if (raw && typeof raw === 'object' && 'showFromEvent' in raw) {
    handle = raw as ContextMenuHandle;
  } else {
    subject = raw;
  }

  if (!handle) {
    handle = resolveHandleFromRefs(binding);
  }

  if (!handle && typeof subject === 'undefined') return undefined;

  return { handle, subject };
}

function resolveHandleFromRefs(binding: DirectiveBinding<ContextMenuBinding | undefined>): ContextMenuHandle | undefined {
  const inst = binding.instance as any;
  const refs = inst?.$refs;
  if (!refs) return undefined;
  // Try argument-named ref first (v-context-menu:ctxMenu)
  if (binding.arg && refs[binding.arg] && typeof refs[binding.arg].showFromEvent === 'function') {
    return refs[binding.arg] as ContextMenuHandle;
  }
  // Otherwise find the first ref that exposes showFromEvent
  for (const key of Object.keys(refs)) {
    const refVal = refs[key];
    if (refVal && typeof refVal.showFromEvent === 'function') {
      return refVal as ContextMenuHandle;
    }
  }
  return undefined;
}
