<template>
    <div class="header">
        <div class="left">
            <i class="iconfont icon-youjiantou" @click="back" />
        </div>
        <div class="header-text">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

defineProps<{ title: string }>()

function back() {
    router.back()
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.header {
    @include wh(100%, 0.54rem);
    @include flex-box(flex-start, center);
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    padding: 0.13rem 0;

    .left {
        @include wh(0.54rem, 100%);
        @include flex-box(center, center);
        position: absolute;
        left: 0;
        top: 0;

        .icon-youjiantou {
            font-size: 0.31rem;
            transform: rotate(180deg);
        }
    }


    &-text {
        flex: 1;
        font-size: 0.25rem;
        font-weight: bolder;
        text-align: center;
    }
}
</style>