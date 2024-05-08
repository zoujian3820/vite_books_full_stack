<template>
    <div class="container">
        <vheader title="确认订单" />
        <pay />
        <orderbooks />
        <bottom />
    </div>
</template>

<script setup lang="ts">
import vheader from '@/components/vheader.vue'
import pay from './components/pay.vue'
import orderbooks from './components/orderbooks.vue'
import bottom from './components/bottom.vue'
</script>
<style lang="scss" scoped>
.container {
    background-color: #f2f2f2;
    min-height: 100vh;
}
</style>