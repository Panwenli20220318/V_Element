<script setup lang="ts">
import {ref} from 'vue'
import Button from './components/Button/Button.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import type {MenuOption} from './components/Dropdown/types'
import { h } from 'vue'

const trigger = ref<any>('click')
const options :MenuOption[] =[
  { key: 1, label: 'item1' },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: h('h1', 'this is bold') }
]
</script>

<template>
    <div>
    <Dropdown :trigger="trigger" :menuOptions="options">
        <Button size="large">The Dropdown</Button>
    </Dropdown>
    </div>
</template>
