function buildPath(basePath: string, prop: string | number | symbol, isArray: boolean): string {
  const propStr = String(prop);
  if (isArray) {
    return basePath ? `${basePath}[${propStr}]` : `[${propStr}]`;
  }
  return basePath ? `${basePath}.${propStr}` : propStr;
}

/**
 * Recursively creates a Proxy around an object to automatically detect
 * all property updates (including nested objects and arrays) and invoke
 * onChange(path, value, oldValue).
 */
export function createTrackedState<T extends object>(
  target: T,
  onChange?: (path: string, value: any, oldValue: any) => void,
  basePath = '',
  cache = new WeakMap<object, any>()
): T {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  if ((target as any).__isTrackedProxy) {
    return target;
  }

  if (cache.has(target)) {
    return cache.get(target);
  }

  const proxy = new Proxy(target, {
    get(t, prop) {
      if (prop === '__rawTarget') return t;
      if (prop === '__isProxy' || prop === '__isTrackedProxy') return true;
      const val = (t as any)[prop];
      if (typeof val === 'object' && val !== null && typeof prop !== 'symbol') {
        const nextPath = buildPath(basePath, prop, Array.isArray(t));
        return createTrackedState(val, onChange, nextPath, cache);
      }
      return val;
    },
    set(t, prop, value) {
      if (typeof prop === 'symbol') {
        return Reflect.set(t, prop, value);
      }
      const oldValue = (t as any)[prop];
      const result = Reflect.set(t, prop, value);
      if (oldValue !== value && prop !== 'length') {
        const fieldPath = buildPath(basePath, prop, Array.isArray(t));
        // console.log(
        //   `%c[TrackedState 🎯]%c Thuộc tính %c${fieldPath}%c thay đổi:`,
        //   'background: #0284c7; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;',
        //   'color: #334155;',
        //   'color: #059669; font-weight: bold;',
        //   'color: #334155;',
        //   value
        // );
        onChange?.(fieldPath, value, oldValue);
      }
      return result;
    },
    deleteProperty(t, prop) {
      if (typeof prop === 'symbol') {
        return Reflect.deleteProperty(t, prop);
      }
      const oldValue = (t as any)[prop];
      const result = Reflect.deleteProperty(t, prop);
      const fieldPath = buildPath(basePath, prop, Array.isArray(t));
      onChange?.(fieldPath, undefined, oldValue);
      return result;
    },
  });

  cache.set(target, proxy);
  return proxy as T;
}

