<script setup lang="ts">
import { ref,onMounted} from 'vue'
import type { NameType} from './components/Collapse/types';
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue';


const openedValue =ref<NameType[]>([])

//在onMounted使用定时器更新了openedValue，必须在Collapse中使用watch进行重新赋值，组件进行重新渲染
onMounted(() => {
  setTimeout(()=>{
    openedValue.value=['a','b']
  },2000)
})

</script>

<template>
    <div>
    <Collapse v-model="openedValue">
        <Item name="a">
            <template #title> 
                <h1> Title A</h1> 
            </template> 
            <div> this is content a aaa </div>
        </Item>
        <Item name="b" title="Title B">
            <div> this is bbbbb test </div>
        </Item>
        <Item name="c" title="Disabled Title" disabled>
            <div> this is cccc test </div>
        </Item>
    </Collapse>
    {{openedValue}}
</div>

</template>



 