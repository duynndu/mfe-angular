import * as Vue from 'vue';

export interface EvalScriptResult {
  scope: Record<string, any>;
  error: string | null;
}

// Constructor chuẩn cho hàm Async trong JS Engine
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

/**
 * Thực thi chuỗi mã JavaScript trong Async Sandbox khép kín với đầy đủ Vue 3 Composition APIs
 * Hỗ trợ TOP-LEVEL AWAIT trực tiếp trong Script!
 * @param scriptStr Chuỗi mã JavaScript người dùng nhập
 * @param contextObj Đối tượng context chứa data và metadata từ Host truyền vào
 */
export async function evalScriptScope(
  scriptStr: string,
  contextObj?: Record<string, any>
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

    const $context = contextObj || {};

    // Sử dụng AsyncFunction để hỗ trợ Top-Level Await trực tiếp trong script
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
      '$context',
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
      $context
    );

    return { scope: result ?? {}, error: null };
  } catch (err: any) {
    return {
      scope: {},
      error: `Lỗi Script: ${err.message || String(err)}`
    };
  }
}
