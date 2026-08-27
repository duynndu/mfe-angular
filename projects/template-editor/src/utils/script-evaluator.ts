import * as Vue from 'vue';

export interface EvalScriptResult {
  scope: Record<string, any>;
  error: string | null;
}

/**
 * Thực thi chuỗi mã JavaScript trong Sandbox khép kín với đầy đủ Vue 3 Composition APIs (Chuẩn form-jit)
 * @param scriptStr Chuỗi mã JavaScript người dùng nhập
 */
export function evalScriptScope(scriptStr: string): EvalScriptResult {
  if (!scriptStr || !scriptStr.trim()) {
    return { scope: {}, error: null };
  }

  try {
    let body = scriptStr.trim();
    if (!body.includes('return')) {
      body = 'return (' + body + ')';
    }

    const {
      reactive,
      ref,
      computed,
      watch,
      watchEffect,
      nextTick,
      h,
      shallowRef,
      shallowReactive,
      toRef,
      toRefs,
      unref,
      isRef,
      isReactive
    } = Vue;

    const fn = new Function(
      'Vue',
      'reactive',
      'ref',
      'computed',
      'watch',
      'watchEffect',
      'nextTick',
      'h',
      'shallowRef',
      'shallowReactive',
      'toRef',
      'toRefs',
      'unref',
      'isRef',
      'isReactive',
      body
    );

    const result = fn(
      Vue,
      reactive,
      ref,
      computed,
      watch,
      watchEffect,
      nextTick,
      h,
      shallowRef,
      shallowReactive,
      toRef,
      toRefs,
      unref,
      isRef,
      isReactive
    );

    const evaluatedScope = typeof result === 'object' && result !== null ? result : {};
    return { scope: evaluatedScope, error: null };
  } catch (err: any) {
    return {
      scope: {},
      error: `Lỗi Script: ${err.message || String(err)}`
    };
  }
}
