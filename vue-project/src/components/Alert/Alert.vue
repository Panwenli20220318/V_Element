<template>
  <Transition name="vk-alert-fade">
    <!--  Transition 动画效果和子元素 v-if 配合实现-->
    <div
      class="vk-alert"
      v-if="visible"
      :class="{
        [`vk-alert__${type}`]: type,
        [`vk-alert__${effect}`]: effect
      }"
    >
      <div class="vk-alert__content">
        {{content}}
        <span>
         <slot></slot>
        </span>
      </div>
      <div class="vk-alert__close" v-if="closable">
        <Icon  icon="xmark" @click="hideAlert"></Icon>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps,AlertEmits } from './types'

import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'VkAlert'
})

withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true
})

const visible = ref(true);
const emits = defineEmits<AlertEmits>()

const hideAlert = ()=>{
  visible.value = false;
  emits('close')
}

defineExpose({
  hide: () => hideAlert()
})

</script>