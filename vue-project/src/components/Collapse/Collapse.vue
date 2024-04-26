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

watch(()=>props.modelValue,()=>{
    activeNames.value=props.modelValue
})

const handleItemClick =(item:NameType)=>{
    if(props.accordion){
        activeNames.value = activeNames.value[0] === item ? [] : [item]; 
    }else{
        const index = activeNames.value.indexOf(item)
        if(index===-1) activeNames.value.push(item)
        else  activeNames.value.splice(index,1)
    }
      emits('update:modelValue',activeNames.value)  
      //自定义事件：子组件传值给父组件，两种情况都需要更新v-model的值
}

//也可以使用props传递，但是要在<slot>上进行传递，不如用provide
provide(collapseContextKey,{
    activeNames,  
    handleItemClick
})

</script>
