<script setup lang="ts">
import { NDivider } from 'naive-ui';
defineProps<{
    title: string
}>();
</script>
<template>
    <div class="demo-card">
        <div class="demo-card--head">{{ title }}</div>
        <slot name="top"></slot>
        <NDivider></NDivider>
        <slot name="bottom"></slot>
    </div>
</template>
<style lang="less" scoped>
.demo-card  {
    width: 800px;
    padding: 10px 30px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 6px 4px;
    &--head {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>