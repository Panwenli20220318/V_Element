---
title: 开始使用
description: Vue3.3 + TS4 高仿 ElementPlus 打造自己的组件库
---

# Vue3.3 + TS4 高仿 ElementPlus 打造自己的组件库

## 安装
```
npm i @vikingmute/v-element --save
```

## 开始使用

全局使用

```
// 引入所有组件
import VElement from '@vikingmute/v-element'
// 引入样式
import '@vikingmute/v-element/dist/style.css'

import App from './App.vue'
// 全局使用
createApp(App).use(VElement).mount('#app')
```
```
<template>
  <vk-button>我是 VkButton</vk-button>
</template>
```

单个导入

提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。
```
<template>
  <Button>我是 VkButton</Button>
</template>
<script>
  import { Button } from ' @vikingmute/v-element'
  export default {
    components: { Button },
  }
</script>
```