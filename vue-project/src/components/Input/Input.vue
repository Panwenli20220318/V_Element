<template>
    <div
    class="vk-input"
    :class="{
        [`vk-input--${type}`]:type,
        [`vk-input--${size}`]:size,
        'is-disabled':disabled,
        'is-prepend':$slots.prepend,
        'is-append':$slots.append,
        'is-prefix':$slots.prefix,
        'is-suffix':$slots.suffix,
        'is-focus':isFocus
    }">
    <!-- 如果父组件传递了名为 "prepend" 的插槽内容给当前组件，那么 $slots.prepend 就会存在并且是真值（truthy）。 -->
        <!-- input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend slot -->
            <div v-if="$slots.prepend" class="vk-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="vk-input__wrapper">
                <!-- prefix slot -->
                <span v-if="$slots.prefix" class="vk-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <input 
                ref="inputRef"
                class="vk-input__inner" 
                v-bind="attrs"
                :type="showPassword?(passwordVisible?'text':'password') : type" 
                :disabled="disabled"
                v-model="innerValue"
                :placeholder="placeholder" 
                :readonly="readonly"
                :autocomplete="autocomplete" 
                :autofocus="autofocus" 
                :form="form"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange">
                <!-- suffix slot -->
                 <span v-if="$slots.suffix || showClear || showPasswordArea" class="vk-input__suffix" @click="keepFocus">
                    <slot name="suffix"></slot>
                    <Icon 
                    class="vk-input__clear"
                    icon="circle-xmark" 
                    v-if="showClear"
                    @mousedown="clear"
                    >
                    </Icon>
                    <Icon  
                    v-if="showPasswordArea && passwordVisible"
                    class="vk-input__password"
                    icon="eye" 
                    @click="togglePasswordVisible"
                    >
                    </Icon> 
                    <Icon  
                    v-if="showPasswordArea && !passwordVisible"
                    class="vk-input__password"
                    icon="eye-slash" 
                    @click="togglePasswordVisible"
                    >
                    </Icon>
                </span>
            </div>
            <!-- append slot -->
            <div v-if="$slots.append" class="vk-input__append">
                <slot name="append"></slot>
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea  
            ref="inputRef"
            class="vk-textarea__wrapper" 
            v-bind="attrs"
            :disabled="disabled"
            v-model="innerValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :placeholder="placeholder" 
            :readonly="readonly"
            :autocomplete="autocomplete" 
            :autofocus="autofocus" 
            :form="form" 
            >
            </textarea>
        </template> 
    </div>
</template>
<script setup lang="ts">
import {ref,watch,computed, useAttrs,nextTick} from 'vue'
import type {Ref} from 'vue'
import type {InputProps,InputEmits} from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
    name:'VkInput',
    inheritAttrs:false
})
const attrs =useAttrs()
const props = withDefaults(defineProps<InputProps>(),{
    type:'text',
    modelValue:'',
    autocomplete:'off'
})

const innerValue =ref(props.modelValue)
const emits = defineEmits<InputEmits>()
const handleInput =()=>{
    emits('update:modelValue',innerValue.value)
    emits('input',innerValue.value)
}
const handleChange =()=>{
    emits('change',innerValue.value)
}
//外部值更新，本地值也要进行更新
watch(()=>props.modelValue,(newValue)=>{
    innerValue.value = newValue
})

const isFocus= ref(false)
const showClear = computed(()=>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
const handleFocus =(event:FocusEvent)=>{
    isFocus.value = true,
    emits('focus',event)
}
const handleBlur =(event:FocusEvent)=>{
    isFocus.value = false,
    emits('blur',event)
}
const clear = ()=>{
    innerValue.value=''
    emits('update:modelValue','')
    emits('clear')
    emits('input','')
    emits('change','')
}

const passwordVisible= ref(false)
const showPasswordArea = computed(()=>
    props.showPassword && !props.disabled && !!innerValue.value
)
const togglePasswordVisible =()=>{
    passwordVisible.value = !passwordVisible.value
}

const inputRef =ref () as Ref<HTMLInputElement>

//点击"眼睛"显示关闭密码，input保持focus状态
const keepFocus =async()=>{
    await nextTick()
    inputRef.value.focus()
} 

defineExpose({
    inputRef
})
</script>