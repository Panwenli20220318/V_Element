import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
    content?: string;
    trigger?: 'hover' | 'click';
    placement?: Placement;
    manual?: boolean;
    popperOptions?: Partial<Options>;  //必选转可选
    transition?: string  //添加动画
}

export interface TooltipInstance {
    show: () => void;
    hide: () => void
}