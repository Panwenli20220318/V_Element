import type { Ref, InjectionKey } from 'vue'

export type NameType = string | number

export interface CollapseProps {
    modelValue: NameType[];  //1.接受一个modelValue
    accordion?: boolean;
}

export interface CollapseEmits {
    (e: 'update:modelValue', values: NameType[]): void  // 2.自定义事件，通常用于更新 v - model 绑定的值。
}

export interface CollapseItemProps {
    name: NameType;
    title?: string;
    disabled?: boolean;
}

//InjectionKey 函数来对传参进行类型约束，确保Collapse组件和CollapseItem组件间传递的数据类型是可见、透明的。
//Symbol确定唯一性
export interface CollapseContext {
    activeNames: Ref<NameType[]>; // Ref 类型的数组
    handleItemClick: (name: NameType) => void
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')

