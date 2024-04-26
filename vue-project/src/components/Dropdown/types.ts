import type { TooltipProps } from '../Tooltip/types'
import type { VNode } from 'vue';

export interface MenuOption {
    label: string | VNode;
    key: string | number;
    disabled?: boolean;
    divided?: boolean; //分隔符
}

export interface DropdownProps extends TooltipProps {
    menuOptions: MenuOption[],
    hideAfterClick?: boolean;  //点击某一项的时候，关闭选项栏
}

export interface DropdownInstance {
    show: () => void;
    hide: () => void;
}    