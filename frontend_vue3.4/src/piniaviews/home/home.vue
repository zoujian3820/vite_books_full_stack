<template>
    <div class="container">
        <div class="head-wrapper" :style="headerOPacity" ref="headerRef">
            <vheader />
        </div>
        <Nav />
        <books />
        <tabbar :index="0" />
    </div>
</template>

<script setup lang="ts">
import vheader from './components/vheader.vue';
import Nav from './components/nav.vue';
import books from './components/books.vue';
import tabbar from '@/piniaviews/common/tabbar.vue';
import { onMounted, onUnmounted } from 'vue';
import HomeService from './service/homeService';
const { scrollHandler, init } = HomeService
const { headerOPacity, headerRef } = HomeService.storeToRefs
onMounted(() => {
    init()
    window.addEventListener('scroll', scrollHandler)
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
})
</script>
<style lang="scss" scoped>
.container {
    width: 5.4rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
    overflow: hidden;

    .head-wrapper {
        position: fixed;
        background-color: #fff;
        z-index: 999;
    }
}
</style>