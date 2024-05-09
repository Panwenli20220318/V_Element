import type { Ref, InjectionKey } from 'vue'

export type NameType = string | number

export interface CollapseProps {
    //1.接受一个modelValue
    modelValue: NameType[];
    //手风琴效果
    accordion?: boolean;
}

//定义了 Collapse 组件可以触发的事件。
export interface CollapseEmits {
    //2.自定义事件，通常用于更新 v - model 绑定的值。
    (e: 'update:modelValue', values: NameType[]): void;
    //用于通知父组件当 collapse 项的状态发生改变时（例如，某个项被打开或关闭）。
    (e: 'change', values: NameType[]): void
}

//使用provide-inject传值
export interface CollapseContext {
    activeNames: Ref<NameType[]>; // Ref 类型的数组
    handleItemClick: (name: NameType) => void
}
//InjectionKey 函数来对传参进行类型约束，确保组件间传递的数据类型是可见、透明的。
//Symbol确定唯一性
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')

export interface CollapseItemProps {
    name: NameType;  //为Item命名
    title?: string;
    disabled?: boolean;
}

