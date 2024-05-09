<script setup lang="ts">
import {onMounted}from 'vue'
// import Message from './components/Message/Message.vue';
import {createMessage} from './components/Message/methods'
import Button from './components/Button/Button.vue';

onMounted(()=>{
    createMessage({message:'hello world',duration:3000})
    createMessage({type:'success',message:'hello world again',duration:0})
    createMessage({type:'warning',message:'hello world three',duration:0})
    createMessage({type:'danger',message:'hello world four',duration:0})
})

const add = () => {
  createMessage({ message: 'hello world', duration: 0, showClose: true })
}

</script>

<template>
    <div>
       <Button size="large" @click="add">Message</Button>
    </div>
</template>

