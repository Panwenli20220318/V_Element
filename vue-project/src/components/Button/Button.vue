<template>
    <!-- 添加button原生属性：disabled,autofocus,type -->
    <button ref="btn" class="vk-button" :class="{
        [`vk-button--${type}`]:type,
        [`vk-button--${size}`]:size,
        'is-plain':plain,  //当 plain 为真值时，类名 is-plain 会被添加。
        'is-round':round,
        'is-circle':circle,
        'is-disabled':disabled
    }" 
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType">
        <!-- spin表示该图标应该旋转 -->
        <Icon icon="spinner" spin v-if="loading" />  
        <Icon :icon="icon" v-if="icon" />
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type{ButtonProps} from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
    name:'VkButton'
})

withDefaults(defineProps<ButtonProps>(),{
    nativeType:'button'
})

//子组件暴露值给父组件使用，值为btn，类型为 HTMLButtonElement
const btn = ref<HTMLButtonElement>()
defineExpose({
    btn
})

</script>

