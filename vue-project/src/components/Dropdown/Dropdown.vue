<template>
    <div  class="vk-dropdown">
        <Tooltip  
        :trigger="trigger" 
        :placement="placement"
        :popperOptions="popperOptions"
        :openDelay="openDelay"
        :closeDelay="closeDelay"
        :manual="manual"
        @visible-change="visibleChange"
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
                            <!-- {{ item.label }} -->
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
import Tooltip from '../Tooltip/Tooltip.vue';
import type {DropdownProps,DropdownEmits,MenuOption,DropdownInstance} from './types'
import type {TooltipInstance} from '../Tooltip/types'
import RenderVnode from '../Common/RenderVnode';

defineOptions({
  name: 'VkDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(),{
    hideAfterClick:true
}) 
const emits = defineEmits<DropdownEmits>()

//获取tooltipRef上的方法
const tooltipRef = ref<TooltipInstance | null>(null)

const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

//点击选项时，隐藏下拉列表
const itemClick = (item:MenuOption)=>{
    if(item.disabled) return 
    emits('select', item)
    if(props.hideAfterClick) tooltipRef.value?.hide()
}

//接收Tooltip的方法暴露给App.vue
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})

</script>