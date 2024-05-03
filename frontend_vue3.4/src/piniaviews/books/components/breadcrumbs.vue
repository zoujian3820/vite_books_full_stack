<template>
    <div class="breadcrumbs">
        <div>{{ getFirstCtgy.firstctgyname }}</div>
        <i class="iconfont icon-youjiantou" />
        <div>{{ getSecondCtgy.secondname }}</div>
    </div>
</template>

<script setup lang="ts">
import FstToThrCtgy from '@/piniaviews/ctgy/service';
const { getFirstCtgy, getSecondCtgy } = FstToThrCtgy.storeRefs
</script>
<style lang="scss" scoped>
.breadcrumbs {
    display: flex;
    align-items: center;
    font-size: 0.23rem;
    padding: 0.12rem 0;
    font-weight: bolder;
    text-shadow: 0 0 0.01rem black;
    gap: 0.1rem;

    .icon-youjiantou {
        font-size: 0.18rem;
        text-shadow: none;
    }
}
</style>