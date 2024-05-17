<template>
    <div class="vk-form-item"
    :class="{
        'is-error':validateStatus.state === 'error',
        'is-success': validateStatus.state === 'success',
        'is-loading': validateStatus.loading,
        'is-required': isRequired
    }">
        <label class="vk-form-item__label ">
            <slot name="label" :label="label"> 
                {{ label }}
            </slot>
        </label>
        <div class="vk-form-item__content">
            <slot :validate="validate"></slot>
             <div class="vk-form-item__error-msg" v-if="validateStatus.state === 'error'">
                {{validateStatus.errorMsg}}
            </div>
        </div>
        <!-- {{ innerValue}}-{{ itemRules }} -->
    </div>
</template>

<script setup lang="ts">
import type {FormItemProps,FormValidateFailure,FormItemContext} from './types'
import {inject,computed,reactive,provide,onMounted,onUnmounted} from 'vue'
import {formContextKey,formItemContextKey } from './types'
import {isNil} from 'lodash-es'
//下载 npm install async-validator --save
import  Schema  from 'async-validator'

defineOptions({
    name:'VkFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)

//获取需要验证的内容
const innerValue = computed(()=>{
    const model = formContext?.model
    if(model && props.prop && !isNil(model[props.prop])) {
        return model[props.prop]
    }else{
        return null
    }
})
//获取对应的自定义的验证规则，应该item可能对应多个验证规则
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

//isRequired
const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})

//验证状态
const validateStatus = reactive({
    state:'init',
    errorMsg:'',
    loading:false  //现在状态是否在loading
})

let initialValue: any = null

// 根据trigger获取rules
const getTriggeredRules = (trigger?: string)=>{
    const rules = itemRules.value
    if(rules){
        return rules.filter(rule=>{
            // 如果 rule 没有 trigger 属性或 trigger 参数未提供，则将该 rule 包括在结果数组中。
            if(!rule.trigger || !trigger) return true
            return rule.trigger && rule.trigger===trigger
        })
    }else return []
}

//表单验证：该函数基于 async-validator的 Schema 和 validate 方法来验证表单项的值。
const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules
    })
    validateStatus.loading = true
    return validator.validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
        console.log(e.errors)
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

//清空
const clearValidate =()=>{
    validateStatus.state = 'init',
    validateStatus.errorMsg = '',
    validateStatus.loading = false
}
//恢复初始状态
const resetField =()=>{
    clearValidate()
    const model = formContext?.model
    if(model && props.prop && !isNil(model[props.prop])) {
        model[props.prop] = initialValue
    }
}

const context:FormItemContext = {
    prop:props.prop||'',
    validate,
    clearValidate,
    resetField
}
provide(formItemContextKey,context)

onMounted(()=>{
    if(props.prop){
        formContext?.addField(context)
        initialValue = innerValue.value
    }
})
onUnmounted(()=>{
     formContext?.removeField(context)
})
</script>