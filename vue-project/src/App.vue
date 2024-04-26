<script setup lang="ts">
import{ref,onMounted} from 'vue'
import Tooltip from './components/Tooltip/Tooltip.vue';
import Button from './components/Button/Button.vue';
import type {TooltipInstance} from './components/Tooltip/types'
import type {Options} from '@popperjs/core'

const trigger = ref<any>('click')

// onMounted(() => {
//   setTimeout(()=>{
//     trigger.value = 'hover'
//   },2000)
// })

const tooltipRef = ref<TooltipInstance | null>()

const open = ()=>{
    tooltipRef.value?.show()
}

const close = ()=>{
    tooltipRef.value?.hide()
}

const options:Partial<Options>={placement:"right",strategy:"fixed"}

</script>

<template>
    <div>
        <Tooltip :trigger="trigger" placement="right" ref="tooltipRef"  manual :popper-options="options">
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
            <template #content>
                <h1>Hello tooltip</h1>
            </template>
        </Tooltip>
        <Button size="large" @click="open">Open</Button>
        <Button size="large" @click="close">Close</Button>
    </div>
</template>
