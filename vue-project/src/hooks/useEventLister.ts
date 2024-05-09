// useEventLister 是一个 Vue 自定义 Hook，用于为事件目标添加和移除事件监听器。  
// 当你想要基于某个值（可能是响应式的，也可能不是）来动态地添加或移除事件监听器时，确实需要区分目标(target)是否是响应式的。
// 这是因为响应式的值（如使用ref或reactive创建的值）可能会在运行时发生变化，而非响应式的值则不会。

import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue';
import type { Ref } from 'vue'

export default function useEventLister(
    // 获取触发事件的DOM元素，可以是一个 Ref 引用（指向 EventTarget 或 null）或直接的 EventTarget
    target: Ref<EventTarget | null> | EventTarget,
    event: string,  // 要监听的事件名  
    handler: (e: Event) => any // 回调函数
) {
    // 判断 target 是不是一个响应式的值
    if (isRef(target)) {
        // 监听 target 的变化，当 target 发生变化时，移除旧 target 的事件监听器并添加新 target 的事件监听器  
        watch(target, (value, oldvalue) => {
            oldvalue?.removeEventListener(event, handler);
            value?.addEventListener(event, handler);
        });
    } else {
        // 如果 target 不是 Ref 引用，则在组件挂载时添加事件监听器  
        onMounted(() => {
            target.addEventListener(event, handler);
        });
    }

    // 在组件卸载前，移除 target 的事件监听器  
    onBeforeUnmount(() => {
        //unref 的主要作用是取消一个响应式对象（ref）的响应性，并将其转换为常规值。
        //unref 函数会检查其参数是否是一个ref对象。如果是，则返回该ref对象内部的值（即.value属性）；如果不是，则返回参数本身。
        unref(target)?.removeEventListener(event, handler);
    });

}




