<template>
    <div class="vk-collapse">
         <slot></slot>
    </div>
</template>

<script setup lang="ts">
import{ref,provide,watch} from 'vue'
import type {CollapseProps,NameType,CollapseEmits} from './types'
import {collapseContextKey} from './types'

defineOptions({
    name:'VkCollapse'
})

const props = defineProps<CollapseProps>()
const emits =defineEmits<CollapseEmits>()

//ref数组：当数组的内容发生变化时，Vue 的响应性系统能够检测到这些变化，并触发组件的重新渲染。
const activeNames = ref<NameType[]>(props.modelValue);  

//3.保证外部值更新时，本地值也进行更新
watch(()=>props.modelValue,()=>{
    activeNames.value=props.modelValue
})

const handleItemClick =(item:NameType)=>{
    //如果手风琴效果被打开
    if(props.accordion){
        //只允许一项被打开，如果这一项已经被打开了，就把它关闭
        activeNames.value = activeNames.value[0] === item ? [] : [item]; 
    }else{
        const index = activeNames.value.indexOf(item)
        if(index>-1){
            //存在，删除数组中对应的一项
            activeNames.value.splice(index,1)
        }else{
            //不存在，添加
            activeNames.value.push(item)
        }
    }
    //4.activeNames的值发生变化时，需要发送更新v-model的事件
    emits('update:modelValue',activeNames.value)  
    emits('change',activeNames.value)
}

//也可以使用props传递，但是要在<slot>上进行传递，不如用provide
provide(collapseContextKey,{
    activeNames,  
    handleItemClick
})

</script>
