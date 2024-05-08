<template>
    <div class="nav">
        <div class="nav-item-list">
            <div class="nav-item" v-for="(item, index) in navItems" :key="index">
                <a :href="item.href">
                    <img :src="getImg(item.img)" class="nav-item-icon" />
                    <div class="nav-item-title">{{ item.name }}</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil'
import { navItems } from '@/piniaviews/common/compdata.js'
</script>
<style lang="scss" scoped>
.nav {
    position: absolute;
    top: 3rem;
    width: 5.2rem;

    .nav-item-list {
        // height: 2.3rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 0.2rem;
        column-gap: 0.1rem;
        justify-items: center;
        align-items: center;
        // background-color: red;
        overflow: hidden;

        .nav-item {
            width: 0.7rem;
            // height: 1rem;
            overflow: hidden;

            a {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                .nav-item-icon {
                    width: 0.4rem;
                    height: 0.4rem;
                    object-fit: contain;
                }

                .nav-item-title {
                    font-size: 0.2rem;
                    color: #333;
                    line-height: 0.3rem;
                    margin-top: 0.06rem;
                }
            }
        }
    }
}
</style>
