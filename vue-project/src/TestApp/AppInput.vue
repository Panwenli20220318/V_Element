<script setup lang="ts">
import Input from './components/Input/Input.vue'
</script>

<template>
  <div>
    <Input size="small" clearable>
      <template #prepend>prepend</template>
      <template #prefix>prefix</template>
    </Input>
    <Input size="large">
      <template #suffix>suffix</template>
      <template #append>append</template>
    </Input>
    <Input type="textarea"></Input>
    <Input showPassword></Input>
  </div>
</template>
