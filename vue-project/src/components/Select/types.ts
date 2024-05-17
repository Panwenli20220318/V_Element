import type { VNode } from 'vue'

// 选项属性
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]

export interface SelectProps {
    // v-model
    modelValue: string;
    // 选项
    options?: SelectOption[];
    // 一些基本表单属性
    placeholder: string;
    disabled: boolean;
    // 可清空
    clearable?: boolean;
    // 自定义菜单
    renderLabel?: RenderLabelFunc;
    // 可筛选
    filterable?: boolean;
    filterMethod: CustomFilterFunc;
    // 远程搜索
    // remoteMethod?: (value: any) => Promise<SelectOption[]>
}

//被选中的状态
export interface SelectStates {
    inputValue: string;
    selectedOption: null | SelectOption
    mouseHover: boolean;
}

export interface SelectEmits {
    (e: 'change', value: string): void;
    (e: 'update:modelValue', value: string): void;
    (e: 'visible-change', value: boolean): void;
    (e: 'clear'): void;
}