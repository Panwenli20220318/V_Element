export type SwitchValueType = boolean | string | number;

export interface SwtichProps {
    modelValue: SwitchValueType;
    disabled?: boolean;
    activeValue?: SwitchValueType; //打开的值
    inactiveValue?: SwitchValueType; //关闭的值
    activeText?: string;
    inactiveText?: string;
    name?: string;
    id?: string;
    size?: 'small' | 'large';
}

export interface SwitchEvents {
    (e: "change", value: SwitchValueType): void
    (e: "update:modelValue", value: SwitchValueType): void
}