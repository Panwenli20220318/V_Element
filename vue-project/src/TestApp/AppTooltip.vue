<script setup lang="ts">
import{ref} from 'vue'
import Tooltip from './components/Tooltip/Tooltip.vue';
import Button from './components/Button/Button.vue';
import type {TooltipInstance} from './components/Tooltip/types'
import type {Options} from '@popperjs/core'

const trigger = ref<any>('hover')

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
        <Tooltip manual :trigger="trigger" placement="right-start" ref="tooltipRef" :popper-options="options" :openDelay="1000" :closeDelay="1000">
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
            <template #content>
                <h1>Hello tooltip</h1>
            </template>
        </Tooltip>
        <div>
            <Button size="large" @click="open">Open</Button>
            <Button size="large" @click="close">Close</Button>
        </div>

    </div>
</template>
