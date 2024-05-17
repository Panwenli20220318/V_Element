---
title: 开始使用
description: Mango-design 组件库（Vue3.3 + TS4 ）
---

# Mango-design 组件库（Vue3.3 + TS4 ）

## 安装
```
npm i @pwl2000917/element --save
```

## 开始使用

全局使用

```
// 引入所有组件
import VElement from '@pwl2000917/element'
// 引入样式
import '@pwl2000917/element/dist/style.css'

import App from './App.vue'
// 全局使用
createApp(App).use(VElement).mount('#app')
```
```
<template>
  <vk-button>我是 VkButton</vk-button>
</template>
```
<!-- 
单个导入

提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。
```
<template>
  <Button>我是 VkButton</Button>
</template>
<script>
  import { Button } from ' @pwl2000917/element'
  export default {
    components: { Button },
  }
</script>
``` -->