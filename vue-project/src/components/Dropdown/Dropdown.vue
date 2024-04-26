<template>
    <div  class="vk-dropdown">
        <Tooltip  
        :trigger="trigger" 
        :placement="placement"
        :popperOptions="popperOptions"
        :openDelay="openDelay"
        :closeDelay="closeDelay"
        ref="tooltipRef">
            <slot></slot>
            <template #content>
                <ul class="vk-dropdown__menu">
                    <template v-for="item in menuOptions" :key="item.key">
                        <!-- 第一个li是分割线 -->
                        <li  
                            v-if="item.divided"
                            class="divided-placeholder"
                        ></li>
                        <li
                            class="vk-dropdown__item"
                            :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
                            :id="`dropdown-item-${item.key}`"
                            @click="itemClick(item)"
                        >
                            <RenderVnode :vNode="item.label"></RenderVnode>
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>

</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Ref} from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue';
import type {DropdownProps,MenuOption,DropdownInstance} from './types'
import type {TooltipInstance} from '../Tooltip/types'
import RenderVnode from '../Common/RenderVnode';

const props = withDefaults(defineProps<DropdownProps>(),{
    hideAfterClick:true
}) 

//获取tooltipRef上的方法
const tooltipRef= ref()  as Ref<TooltipInstance>

//点击选项时，隐藏下拉列表
const itemClick = (item:MenuOption)=>{
  if (item.disabled) return 
  else{
    if(props.hideAfterClick) tooltipRef.value?.hide()
  }
}

//接收Tooltip的方法暴露给App.vue
defineExpose<DropdownInstance>({
  show: tooltipRef.value?.show,
  hide: tooltipRef.value?.hide
})

</script>