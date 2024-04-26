import { defineComponent } from 'vue'

const RenderVnode = defineComponent({  //定义了一个名为 RenderVnode 的组件
    props: {
        vNode: {  //定义了一个名为 vNode 的属性，它可以是字符串或对象类型，并且它是必需的
            type: [String, Object],
            required: true
        }
    },
    setup(props) {
        return () => props.vNode
    }
})

export default RenderVnode