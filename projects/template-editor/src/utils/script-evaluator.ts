import * as Vue from 'vue';

export interface EvalScriptResult {
  scope: Record<string, any>;
  error: string | null;
}

// Constructor chuẩn cho hàm Async trong JS Engine
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

/**
 * Thực thi chuỗi mã JavaScript trong Async Sandbox khép kín với đầy đủ Vue 3 Composition APIs
 * Hỗ trợ TOP-LEVEL AWAIT trực tiếp trong Script!
 * @param scriptStr Chuỗi mã JavaScript người dùng nhập
 * @param dataObj Đối tượng data reactive từ Angular/Vue truyền vào
 */
export async function evalScriptScope(
  scriptStr: string,
  dataObj?: Record<string, any>
): Promise<EvalScriptResult> {
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

    const data = dataObj || {};

    const fn = new AsyncFunction(
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
      'data',
      body
    );

    const result = await fn(
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
      isReactive,
      data
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
