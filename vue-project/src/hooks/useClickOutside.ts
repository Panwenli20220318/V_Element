import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

//   自定义 Hook，用于检测点击事件是否发生在指定元素外部  

//   elementRef 对HTMLElement的引用，可能是undefined  
//   callback 当点击发生在元素外部时调用的回调函数  

const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
    // 定义一个处理函数，用于检查点击事件是否发生在elementRef所引用的元素外部  
    const handler = (e: MouseEvent) => {
        // 确保elementRef有值且事件的目标存在  
        if (elementRef.value && e.target) {
            // 使用contains方法检查点击的目标元素是否是elementRef所引用元素的子元素  
            // 如果不是，则调用callback函数  
            if (!elementRef.value.contains(e.target as HTMLElement)) {
                callback(e);
            }
        }
    };

    // 组件挂载后，给document添加点击事件监听器  
    onMounted(() => {
        document.addEventListener('click', handler);
    });

    // 组件卸载前，移除之前添加的点击事件监听器  
    onUnmounted(() => {
        document.removeEventListener('click', handler);
    });
};

export default useClickOutside;