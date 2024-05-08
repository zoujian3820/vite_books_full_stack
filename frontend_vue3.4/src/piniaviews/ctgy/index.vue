<template>
    <div>
        <toSearch />
        <Ctgy />
        <tabbar :index="1" />
    </div>
</template>

<script setup lang="ts">
import toSearch from './components/toSearch.vue'
import Ctgy from './components/Ctgy.vue'
import tabbar from '@/piniaviews/common/tabbar.vue';

</script>
<style lang="scss" scoped></style>