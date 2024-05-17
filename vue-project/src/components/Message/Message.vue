<template>
  <!--@after-leave 和 @enter事件是和 div 的 v-show="visible" 搭配进行使用的  -->
  <Transition 
  :name="transitionName"
  @after-leave="destoryComponent"
  @enter="updateHeight"
  >
    <div
    class="vk-message"
    v-show="visible"
    :class="{
        [`vk-message--${type}`]: type,
        'is-close': showClose
    }"
    role="alert"
    ref="messageRef"
    :style="cssStyle"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
    > 
        <div class="vk-message__content">
            <slot>
              <!-- {{ offset }}-{{ lastOffset }}-{{ topOffset }}-{{ height }}-{{ bottomOffset }} -->
                <RenderVnode :vNode="message" v-if="message" />
            </slot>
        </div>
        <div class="vk-message__close" v-if="showClose">
            <Icon @click.stop="close" icon="xmark"/>
        </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref,onMounted,computed} from 'vue'
import type { MessageProps } from './types'
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method'
import  useEventLister  from '../../hooks/useEventLister'

defineOptions({
    name:'VkMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  showClose: true,
  offset: 20,
  transitionName:'fade-up'
})
const visible = ref(false)

// const preInstance = getLastInstance()
// console.log('prev',preInstance)

const messageRef = ref<HTMLDivElement>()
//计算偏移高度，这个div的高度
const height = ref(0)
//上一个实例的BottomOffset，第一个是0
const lastOffset = computed(()=> getLastBottomOffset(props.id))
//这个div应该使用的top值
const topOffset = computed(()=> props.offset+lastOffset.value)
//这个元素为下一个元素预留的offset，也就是它最低端bottom的值
const bottomOffset = computed(()=>height.value+topOffset.value)

const cssStyle = computed(()=>({
  top:topOffset.value+'px'
}))

let timer:any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
          visible.value = false
        }, props.duration)
}
function clearTimer(){
  clearTimeout(timer)
}

// onMounted(async() => {
onMounted(() => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value=messageRef.value!.getBoundingClientRect().height
})

function keydown(e:Event){
  const event = e as KeyboardEvent
  if(event.code ==='Escape'){
    visible.value = false
  }
}
useEventLister(document,'keydown',keydown)

const close =()=>{
  visible.value = false
}

//用watch的好处是，可能有好几个地方会修改visible的值，一开始的const visible = ref(false)，watch不会执行
// 出现问题：渐隐的动画会来不及完成，组件就消失了，使用js钩子，对属性进行监听。
// watch(visible,(newValue)=>{
//     if(!newValue) props.onDestroy()
// })

//已经消失之后进行触发
function destoryComponent(){
  props.onDestory()
}

//enter之后进行触发
function updateHeight(){
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  bottomOffset
})
</script>