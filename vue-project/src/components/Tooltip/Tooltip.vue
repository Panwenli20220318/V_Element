<template>
    <div class="vk-tooltip" v-on="outerevents" ref="popperContainNode">
        <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
            <slot></slot>
        </div>
        <Transition :name="transition">
            <div class="vk-tooltip__popper"  ref="popperNode" v-if="isOpen">
                <slot name="content">{{ content }}</slot>
            </div>
        </Transition>

    </div>
</template>


<script setup lang="ts">
import {ref,watch,onUnmounted, reactive,computed} from 'vue'
import type {TooltipProps,TooltipInstance} from './types'
import {createPopper} from '@popperjs/core'
import type {Instance} from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import {debounce} from 'lodash-es'

defineOptions({
    name:'VkTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(),{
    placement:'bottom',
    transition:'fade',  //设置默认值
    openDelay: 0,
    closeDelay: 0
})

const popperOptions = computed(()=>{
    return {
        placement:props.placement,  //解决优先级问题
        ...props.popperOptions
    }
})

const isOpen =ref<boolean>(false)

const togglePopper=()=>{
    if(isOpen.value) closeFinal()
    else  openFinal()
}

const openCount = ref<number>(0)
const closeCount = ref<number>(0)
const open=()=>{
    isOpen.value=true
    console.log(`openCount ${++openCount.value}`)
}

const close=()=>{
    isOpen.value=false
    console.log(`closeCount ${++closeCount.value}`)
}

const openDebounce = debounce(open,props.openDelay)
const closeDebounce = debounce(close,props.closeDelay)

const openFinal =()=>{
    closeDebounce.cancel()
    openDebounce()
}

const closeFinal =()=>{
    openDebounce.cancel()
    closeDebounce()
}

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
let popperInstance:Instance|null = null

watch(isOpen,(newValue)=>{
    if(newValue){  //只有isOpen为true时，才创建popperInstance实例
        if(triggerNode.value && popperNode.value){
            popperInstance = createPopper(triggerNode.value,popperNode.value,popperOptions.value)
        }
    }
},{flush:'post'})
//  需要满足if(triggerNode.value && popperNode.value) watch函数要在demo节点生成以后再进行调用:{flush:'post'}


let events:Record<string,any> =reactive({})
let outerevents:Record<string,any> =reactive({})
//支持click/hover两种触发方式，动态绑定事件
//attachEvents 函数是用来根据传入的 props.trigger 值来绑定不同的事件监听器到 events 对象上
const attachEvents=()=>{
    if(props.trigger==='click'){
        events['click'] = togglePopper
    }
    else{
        events['mouseenter'] = openFinal
        outerevents['mouseleave'] = closeFinal
    }
}
// 1.添加手动事件的判断：如果不是手动触发，才绑定事件
if(!props.manual) {attachEvents()}   //需要先执行一下

watch(()=>props.trigger,(newTrigger,oldTrigger)=>{
    if(newTrigger!=oldTrigger){
        //清空事件列表
        events={}
        outerevents={}
        attachEvents()
    }
},{flush:'post'})

const popperContainNode = ref<HTMLElement>()
const handleClickOutside =()=>{
    //2.排除手动的情况
    if(props.trigger==='click' && isOpen.value && !props.manual){
        closeFinal()
    }
}
useClickOutside(popperContainNode,handleClickOutside)

//3.先把一些事件绑定去掉，新建实例，在实例上通过对应处理进行赋值
watch(()=>props.manual,(isManual)=>{
    if(isManual){
        events={}
        outerevents={}
    }else{
        attachEvents()
    }
})


//优化代码，卸载popperInstance
onUnmounted(()=>{
    popperInstance?.destroy()
})

//4.方法暴露出去给App.vue使用
defineExpose<TooltipInstance>({
    'show':openFinal,
    'hide':closeFinal
})

</script>