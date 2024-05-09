<template>
<div class="vk-tooltip" ref="popperContainerNode" v-on="outerEvents">
  <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
    <slot></slot>
  </div>

  <Transition :name="transition">
    <div v-if="isOpen" class="vk-tooltip__popper" ref="popperNode">
      <slot name="content">
        {{content}}
      </slot>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </Transition>

</div>
</template>

<script setup lang="ts">
import type {TooltipProps,TooltipEmits,TooltipInstance} from './types'
import {ref,watch,onUnmounted, reactive,computed} from 'vue'
import {createPopper} from '@popperjs/core'
import type {Instance} from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import {debounce} from 'lodash-es'

defineOptions({
    name:'VkTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(),{
    placement:'bottom',
    trigger: 'hover',
    transition:'fade',  //设置默认值
    openDelay: 0,
    closeDelay: 0
})
const emits = defineEmits<TooltipEmits>()

const popperOptions = computed(()=>{
    return {
        placement:props.placement,  //解决优先级问题
        modifiers: [   //添加偏移量
            {
                name: 'offset',
                options: {
                offset: [0,5],
                },
            }
        ],
        ...props.popperOptions
    }
})

//一开始为false，不显示
const isOpen =ref(false)

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
let popperInstance:Instance|null = null

watch(isOpen,(newValue)=>{
     //只有isOpen为true时，才创建popperInstance实例
    if(newValue){ 
        if(triggerNode.value && popperNode.value){
            popperInstance = createPopper(triggerNode.value,popperNode.value,popperOptions.value)
        }else {
            popperInstance?.destroy()
        }
    }
},{flush:'post'})
//  需要满足if(triggerNode.value && popperNode.value) watch函数要在demo节点生成以后再进行调用:{flush:'post'}

let openTimes = 0
let closeTimes = 0

const open=()=>{
    openTimes++
    console.log('open times', openTimes)
    isOpen.value=true
    emits('visible-change', true)
}

const close=()=>{
    closeTimes++
    console.log('close times', closeTimes)
    isOpen.value=false
    emits('visible-change', false)
}

//支持防抖：如果函数持续被触发，那么在一定时间内只执行一次，如果在这个时间内再次被触发，则重新计算执行时间。
const openDebounce = debounce(open,props.openDelay)
const closeDebounce = debounce(close,props.closeDelay)

//无论最后的结果时open还是close，两个函数都会执行一遍，修正这个问题。
const openFinal =()=>{
    closeDebounce.cancel()
    openDebounce()
}

const closeFinal =()=>{
    openDebounce.cancel()
    closeDebounce()
}

const togglePopper=()=>{
    if(isOpen.value) closeFinal()
    else  openFinal()
}

//支持click/hover两种触发方式，动态绑定事件
let events:Record<string,any> =reactive({})
let outerEvents:Record<string,any> =reactive({})
//attachEvents 函数是用来根据传入的 props.trigger 值来绑定不同的事件监听器到 events 对象上
const attachEvents=()=>{
    if (props.trigger === 'hover') {
        events['mouseenter'] = openFinal
        outerEvents['mouseleave'] = closeFinal
    }
    else if (props.trigger === 'click'){
        events['click'] = togglePopper
    }
}

//添加手动事件： 1. 如果不是手动触发，才绑定事件
if(!props.manual) {attachEvents()}   //需要先执行一下

watch(()=>props.trigger,(newTrigger,oldTrigger)=>{
    if(newTrigger!=oldTrigger){
        //清空事件列表
        events={}
        outerEvents={}
        attachEvents()
    }
})

//支持 clickoutside 的时候隐藏
const popperContainerNode = ref<HTMLElement>()
const handleClickOutside =()=>{
    //2.排除手动和hover的情况
    if(props.trigger==='click' && isOpen.value && !props.manual){
        closeFinal()
    }
    if (isOpen.value) {
        emits('click-outside', true)
    }
}
useClickOutside(popperContainerNode,handleClickOutside)

//3.先把一些事件绑定去掉，新建实例，在实例上通过对应处理进行赋值
watch(()=>props.manual,(isManual)=>{
    if(isManual){
        events={}
        outerEvents={}
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
    show:openFinal,
    hide:closeFinal
})

</script>