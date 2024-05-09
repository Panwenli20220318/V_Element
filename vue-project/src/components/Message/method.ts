import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'

let seed = 1

const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
    const id = `message_${seed++}`
    //创建dom节点
    const container = document.createElement('div')

    //1.通过这部可以实现销毁组件
    const destroy = () => {
        //从数组中删除
        const idx = instances.findIndex(instance => instance.id === id)
        if (idx === -1) return
        else instances.splice(idx, 1)

        render(null, container)
    }
    //2.包装 newProps ，添加这个函数，函数将在Message.vue中被调用
    const newProps = {
        ...props,
        id,
        onDestroy: destroy
    }
    // 使用 h 函数创建一个虚拟节点 vnode，该虚拟节点表示 MessageConstructor 组件，并带有传入的 props。  
    const vnode = h(MessageConstructor, newProps)

    // 使用 render 函数将虚拟节点 vnode 渲染为真实的 DOM 节点，并挂载到 container DOM 节点上。 
    render(vnode, container)

    //这里使用了非空断言操作符!，因为 TypeScript 默认会认为 container.firstElementChild 可能是 null，
    // 但在这里我们确定它不会是 null（因为 render 函数已经渲染了 vnode 到 container 中），所以使用 ! 来告诉 TypeScript 编译器我们确定它不是 null。 
    document.body.appendChild(container.firstElementChild!)

    const vm = vnode.component!
    const instance = {
        id,
        vnode,
        vm,
        props: newProps
    }
    instances.push(instance)

    return instance
}

export const getLastInstance = () => {
    //获取位置信息只需要最后一个
    return instances[instances.length - 1]
}

export const getLastBottomOffset = (id: string) => {
    const idx = instances.findIndex(instance => instance.id === id)
    console.log('idx', id, idx, instances.length)
    if (idx <= 0) return 0
    else {
        const prev = instances[idx - 1];
        return prev.vm.exposed!.bottomOffset.value
    }
}