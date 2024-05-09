<template>
    <div class="vk-switch"
    :class="{
        [`vk-switch--${size}`]:size,
        'is-disabled':disabled,
        'is-checked':checked,
    }"
    @click="switchValue"
    >
        <input
        class="vk-switch__input"
        type="checkbox"
        role="switch"
        :name="name"
        :disabled="disabled"
        @keydown.enter="switchValue"
        ref="input"
        />
        <div class="vk-switch__core" >
            <div class="vk-switch__core-inner">
                <span v-if="activeText||inactiveText" class="vk-switch__core-inner-text">
                {{ checked?activeText:inactiveText }}
                </span>
            </div>
            <div class="vk-switch__core-action" ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {SwtichProps,SwitchEvents}  from './types'
import {ref,computed, watch, onMounted} from 'vue'

defineOptions({
    name:'VkSwitch',
    //用于控制子组件是否继承父组件传入的非 prop 属性。
    inheritAttrs:false 
})

const props = withDefaults(defineProps<SwtichProps>(),{
    activeValue:true,
    inactiveValue:false
})
const emits =defineEmits<SwitchEvents>()

const innerValue = ref(props.modelValue)
const checked = computed(()=>innerValue.value === props.activeValue)  //是否被选中

watch(()=>props.modelValue,(newValue)=>{
    innerValue.value=newValue
})

const switchValue =()=>{
    if(props.disabled) return 
    //不能直接取反，innerValue.value不一定是布尔类型
    innerValue.value = checked.value ? props.inactiveValue:props.activeValue
    emits("change",innerValue.value)
    emits("update:modelValue",innerValue.value)
}

const input = ref<HTMLInputElement>()

//组件挂载到 DOM 后执一次
onMounted(()=>{
    input.value!.checked = checked.value
})
//当 checked 的值变化时，更新 DOM 元素的 checked 属性  
watch(checked,(val)=>{
    input.value!.checked=val
})

</script>