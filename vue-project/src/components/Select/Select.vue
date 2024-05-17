<template>
    <div 
    class="vk-select"
    :class="{'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover=true"
    @mouseleave="states.mouseHover=false"
    >
        <Tooltip
        placement="bottom-start"
        manual
        @click-outside="controlDropdown(false)"
        ref="tooltipRef"
        :popperOptions="popperOptions"
        >
        <!--click-outside事件是Input.vue发送的  -->
            <Input 
            v-model="states.inputValue"
            :placeholder="filteredPlaceholder"
            :disabled="disabled"
            :readonly="!filterable ||!isDropdownShow"
            @input ="onFilter"
            ref="inputRef">
                <template #suffix>
                    <!-- 清除图标 -->
                    <Icon 
                    icon="circle-xmark"
                    v-if="showClearIcon"
                    class="vk-input__clear"
                    @click.stop="onClear"
                    />
                    <!-- 箭头图标 -->
                    <Icon 
                    v-else
                    icon="angle-down" 
                    class="header-angle" 
                    :class="{
                        'is-active':isDropdownShow
                    }"></Icon>
                </template>
            </Input>

            <template #content>
                <ul class="vk-select__menu">
                    <template v-for="(item,index) in filteredOptions" :key="index">
                        <li class="vk-select__menu-item"
                        :class="{
                            'is-disabled': item.disabled,
                            'is-selected': states.selectedOption?.value === item.value ,
                        }"
                        :id="`select-item-${item.value}`"
                        @click.stop="itemSelect(item)"
                        >
                        <!-- 需要停止冒泡，否则无法自动关闭 -->
                           <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label"/>
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/Input/Input.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Icon from '@/components/Icon/Icon.vue'
import type {SelectProps,SelectOption,SelectEmits,SelectStates} from './types'
import { ref,reactive,computed,watch } from 'vue';
import type { Ref } from 'vue';
import type {TooltipInstance} from '@/components/Tooltip/types'
import type {InputInstance} from '@/components/Input/types'
import RenderVnode from '../Common/RenderVnode';
import { isFunction } from 'lodash-es';

defineOptions({
    name:'VkSelect'
})

const props=withDefaults(defineProps<SelectProps>(),{
    modelValue:'',
    options: () => []
})
const emits=defineEmits<SelectEmits>()

//将props换为ref类型
const filteredOptions = ref(props.options)
watch(()=>props.options,(newOption)=>{
    filteredOptions.value = newOption
})

//根据输入的值生成新的选项
const generateFilterOptions = (searchValue:string)=>{
    if(!props.filterable) return 
    if(props.filterMethod && isFunction(props.filterMethod)){
        filteredOptions.value = props.filterMethod(searchValue)
    }else{
        filteredOptions.value=props.options.filter(option=>option.label.includes(searchValue))
    }
}

const onFilter =()=>{
    generateFilterOptions(states.inputValue)
}

const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}

//支持设置默认选项
const findOption=(value:string)=>{
    const option = props.options.find(option=>option.value===value)
    return option?option:null;
}
const innitialOption = findOption(props.modelValue)

//标记item的状态，初始化为默认选项和它对应的值
const states =reactive<SelectStates>({
    inputValue:innitialOption?innitialOption.label:'',
    selectedOption:innitialOption,
    mouseHover:false
})

const tooltipRef=ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const isDropdownShow = ref(false)

//filter模式下 再次选择时Input框的placeholder为上次选中的值
const filteredPlaceholder=computed(()=>{
    return (props.filterable && states.selectedOption && isDropdownShow.value)?states.selectedOption.label:props.placeholder
})

//控制打开关闭的函数
const controlDropdown = (show:boolean)=>{
    if(show){
        //filter模式 并且 之前选择了对应的值, 再次选择时需要清空Input框
        if(props.filterable && states.selectedOption){
            states.inputValue=''
        }
        // 进行一次默认选择性的生成
        if(props.filterable){
            generateFilterOptions(states.inputValue)
        }
        tooltipRef.value?.show()
    }else{
        tooltipRef.value?.hide()
        // blur 时候将之前的值回灌到input中
        if(props.filterable && states.selectedOption){
            states.inputValue= states.selectedOption? states.selectedOption.label:''
        }
    }
    isDropdownShow.value=show
    emits('visible-change',show)
}

//点击后切换状态的函数
const toggleDropdown=()=>{
    if(props.disabled) return
    if(isDropdownShow.value){
        controlDropdown(false)
    }else{
        controlDropdown(true)
    }
}

//用于处理选项被选中的事件 
const itemSelect =(e:SelectOption)=>{
    if(e.disabled) return 
    states.inputValue = e.label
    states.selectedOption = e
    emits('change',e.value)
    emits('update:modelValue',e.value)
    controlDropdown(false)
    inputRef.value.ref.focus()
}

//是否显示清除按钮
const showClearIcon = computed(()=>{
    // * hover 上去
    // * props.clearable 为 true
    // 必须要有选择过选项
    // Input 的值不能为空
    return props.clearable 
    && states.mouseHover
    && states.selectedOption
    && states.inputValue.trim() !== ''
})

//清除事件
const onClear =()=>{
    states.selectedOption = null
    states.inputValue =''
    emits('clear')
    emits('change','')
    emits('update:modelValue','')
}

watch(()=>props.modelValue,(newValue)=>{
    const updateOption = findOption(newValue)
    states.inputValue = updateOption?updateOption.label:''
    states.selectedOption = updateOption
})
</script>