<template>
    <div class="bottom-nav-wrapper">
        <div class="bottom-nav">
            <div @click="change(index, item)" :class="{
                active: index === activeIdnex
            }" class="nav-item" v-for="(item, index) in bottomNavList" :key="index">
                <i class="icon" :class="item.icon"></i>
                <span class="bottom-nav-item-title">{{ item.text }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router';
import { bottomNavList } from './compdata'
import { EleOfArr } from '@/utils/goodstorageutil'

const props = defineProps<{ index: number }>()
const activeIdnex = ref(props.index)

// function change(index: number, item: (typeof bottomNavList)[0]) {
function change(index: number, item: EleOfArr<typeof bottomNavList>) {
    activeIdnex.value = index
    router.push(item.url)
}

</script>
<style lang="scss" scoped>
.bottom-nav-wrapper {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #eee;

    .bottom-nav {
        display: flex;
        align-items: center;
    }

    .nav-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 0.8rem;

        &.active {
            color: #d96d70;
        }
    }

    .bottom-nav-item-title {
        font-size: 0.2rem;
    }

    .icon {
        font-size: 0.38rem;
    }
}
</style>
