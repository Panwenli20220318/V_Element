<template>
    <button ref="btn" class="vk-button" :class="{
        [`vk-button--${type}`]:type,
        [`vk-button--${size}`]:size,
        'is-plain':plain,
        'is-round':round,
        'is-circle':circle,
        'is-disabled':disabled
    }" 
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type{ButtonProps} from './types'

defineOptions({
    name:'VkButoon'
})

withDefaults(defineProps<ButtonProps>(),{
    nativeType:'button'
})

const btn = ref<HTMLButtonElement>()
defineExpose({
    btn
})
</script>

<style scoped>
</style>

