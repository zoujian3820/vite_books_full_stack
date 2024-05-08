<template>
    <div class="loading">
        <div class="loading_img">
            <img :src="getImg('loading.png')" />
        </div>
        <span>正在加载...</span>
    </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil';
</script>
<style lang="scss" scoped>
.loading {
    display: flex;
    gap: 0.1rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 5.2rem;
    color: #666;
    font-size: 0.18rem;

    .loading_img {
        width: 0.42rem;
        height: 0.42rem;
        animation: loading 1s linear infinite;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

    }
}


@keyframes loading {
    0% {
        -webkit-transform: rotate(0);
    }

    50% {
        -webkit-transform: rotate(180deg);
    }

    100% {
        -webkit-transform: rotate(360deg);

    }
}
</style>