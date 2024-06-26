import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

export interface FormItemProps {
    label: string;
    prop?: string;
}

// 添加 trigger 字段
export interface FormItemRule extends RuleItem {
    trigger?: string;
}

export type FormRules = Record<string, FormItemRule[]>
export interface FormProps {
    model: Record<string, any>;
    rules: FormRules;
}

export interface FormContext extends FormProps {
    addField: (field: FormItemContext) => void;
    removeField: (field: FormItemContext) => void;
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')

export interface FormValidateFailure {
    errors: ValidateError[] | null;
    fields: ValidateFieldsError;
}

export interface FormItemContext {
    prop: string;
    validate: (trigger?: string) => Promise<any>;
    resetField(): void;
    clearValidate(): void;
}
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')

export interface FormInstance {
    validate: () => Promise<any>;
    resetFields: (props?: string[]) => void;
    clearValidate: (props?: string[]) => void;
}

export interface FormItemInstance {
    validate: () => Promise<any>;
}