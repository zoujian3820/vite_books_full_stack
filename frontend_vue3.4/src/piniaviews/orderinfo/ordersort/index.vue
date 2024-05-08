<template>
    <div class="container">
        <ordersorthead />
        <orderlist />
        <tabbar :index="3" />
    </div>
</template>

<script setup lang="ts">
import ordersorthead from './components/ordersorthead.vue'
import orderlist from './components/orderlist.vue'
import tabbar from '@/piniaviews/common/tabbar.vue'
</script>
<style lang="scss" scoped>
.container {
    width: 5.4rem;
    padding: 0 0.15rem;
}
</style>