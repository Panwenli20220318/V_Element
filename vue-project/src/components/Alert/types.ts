export interface AlertProps {
    content?: string
    type: 'success' | 'info' | 'warning' | 'danger'
    effect?: 'light' | 'dark'
    closable?: boolean // 是否显示 close 图标
}

export interface AlertEmits {
    (e: 'close'): void;
}
