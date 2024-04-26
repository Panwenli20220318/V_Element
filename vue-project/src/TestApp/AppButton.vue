<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Button from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types'

const buttonRef = ref<ButtonInstance|null>(null)

console.log(buttonRef.value?.btn) //undefined
//这个 console.log 在 onMounted 外部，意味着它会在组件的 setup 函数执行时立即执行。
//在大多数情况下，此时组件还没有挂载到 DOM，因此 buttonRef.value 可能是 null。
//即使不是 null，它也不会指向实际的 DOM 元素，因为元素还没有被创建或挂载。

onMounted(()=>{
  console.log(buttonRef.value?.btn)
})


</script>

<template>
  <div>
    <Button ref="buttonRef" >Test Button</Button>
    <Button plain >Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br/><br/>

    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br/><br/>

    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br/><br/>

    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br/><br/>

  </div>
</template>

<style scoped>

</style>
