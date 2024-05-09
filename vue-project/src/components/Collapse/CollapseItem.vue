<template>
    <div class="vk-collapse-item" >
        <div 
        class="vk-collapse-item__header" 
        :id="`item-header-${name}`" 
        @click="clickItem"
        :class="{
            'is-disabled':disabled,
            'is-active':isActive
        }">
            <slot name="title">{{ title }} </slot>
            <Icon icon="angle-right" class="header-angle" />
        </div>

        <!-- 使用内置Transition组件实现动画效果 -->
        <Transition name="slide" v-on="TransitionEvents">
            <!-- wrapper：用于解决content元素包含的 padding-bottom: 25px;引发的过渡卡顿的问题。 -->
            <!-- 同时引发问题：文字内容先显示出来，父节点才慢慢地添加动画，解决：添加el.style.overflow='hidden' -->
            <div class="vk-collapse-item-wrapper" v-show="isActive">
                <div class="vk-collapse-item__content" :id="`item-content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </Transition>

    </div>
</template>

<script setup lang="ts">
import {inject, computed} from 'vue'
import type { CollapseItemProps} from './types';
import {collapseContextKey} from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
    name:'VkCollapseItem'
})

let props = defineProps<CollapseItemProps>()
//接收Collapse组件提供的数据
const collapseContext = inject(collapseContextKey); 

const isActive = computed(()=>collapseContext?.activeNames.value.includes(props.name))

const clickItem = ()=>{
    if(props.disabled) return ;
    else {
        collapseContext?.handleItemClick(props.name)
    }
}

//item内容高度不确定，使用JavaScript 钩子来获得高度
const TransitionEvents:Record<string,(el:HTMLElement)=>void> = {
    //展开
    beforeEnter(el){
        el.style.height ='0px'
        el.style.overflow='hidden'
    },
    enter(el){
        //el.scrollHeight可以获取元素的高度
        el.style.height = `${el.scrollHeight}px`
    },
    afterEnter(el){
        el.style.height =''  //动画结束不需要相关属性
        el.style.overflow=''
    },
    //关闭
    beforeLeave(el){
        el.style.height=`${el.scrollHeight}px`  
        el.style.overflow='hidden'
    },
    leave(el){
        el.style.height ='0px'
    },
    afterLeave(el){
        el.style.height =''
        el.style.overflow='hidden'
    }

}

</script>
