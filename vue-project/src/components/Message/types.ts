import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
    message?: string | VNode;
    duration?: number;  //关闭的时长
    showClose?: boolean; //是否出现关闭按钮
    type?: 'success' | 'info' | 'warning' | 'danger'
    onDestroy: () => void;
    offset?: number
    id: string;
    transitionName?: string
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id'>
//createMessageProps 的定义意味着它包含 MessageProps 中的所有属性，除了 onDestory。
//这可能是为了在创建消息通知时不需要提供 onDestory prop，因为该 prop 可能在消息通知被实际创建或挂载到 DOM 时才需要被设置。

export interface MessageContext {
    id: string;
    vnode: VNode;
    vm: ComponentInternalInstance;
    props: MessageProps
}