<template>
    <div class="wrapper">
        <vheader replace />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import vheader from './components/vheader.vue';
</script>
<style lang="scss" scoped>
.wrapper {
    width: 5.4rem;
}
</style>