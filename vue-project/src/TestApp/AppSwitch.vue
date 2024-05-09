<script setup lang="ts">
import { ref } from 'vue'
import Switch from './components/Switch/Switch.vue'

const test = ref(false)
const judge = ref('right')
const select = ref(true)

</script>

<template>
    <div>
        <Switch v-model="test" size="large"/>
        <Switch v-model="test" disabled/>
        <Switch v-model="test" size="small"/>
        <br>
        
        <Switch v-model="judge" activeValue="right" inactiveValue="wrong"/>
        <h4>model-value: {{judge}}</h4>

        <Switch v-model="select" activeText="ON" inactiveText="OFF"/>

    </div>
</template>
