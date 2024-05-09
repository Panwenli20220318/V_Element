export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
    type?: ButtonType;  //不同样式
    size?: ButtonSize;  //不同大小
    plain?: boolean;  //plain 属性会使按钮看起来更简单、朴素，没有默认的边框和背景样式。
    round?: boolean;  //圆角
    circle?: boolean; //圆形按钮
    disabled?: boolean; //禁用属性
    nativeType?: NativeType;
    autofocus?: boolean;
    icon?: string;  //添加图标
    loading?: boolean; //添加加载图标
}

export interface ButtonInstance {
    btn: HTMLButtonElement
}