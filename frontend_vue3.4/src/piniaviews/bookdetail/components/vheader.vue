<template>
    <div class="header" v-show="headAndDegree" :style="headerOpacity">
        <i class="left-arrow iconfont" @click="$router.back"></i>
        <div class="header-wrapper">
            <span @click="switchTab(index)" :class="{ itemActive: index === activeIndex }"
                v-for="(item, index) of navList" :key="index">
                <router-link :replace="replace" :to="{ name: item.name, query: { from: item.from } }">
                    {{ item.text }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BookDetailService, { EvaluateService } from '../service/bookdetailService';
const { headerOpacity } = BookDetailService
const { headAndDegree } = EvaluateService.storeRefs
const navList = [
    { text: '商品', from: 'evaluate', name: 'goods', url: '/goods' },
    { text: '详情', from: 'evaluate', name: 'goods', url: '/goods' },
    { text: '评论', from: 'goods', name: 'evaluate', url: '/evaluate' },
    { text: '相关', from: 'goods', name: 'evaluate', url: '/evaluate' },
]
const activeIndex = ref(0)
function switchTab(index: number) {
    activeIndex.value = index
}

const { replace } = defineProps({
    replace: {
        type: Boolean,
        default: false
    }
})

console.log(replace)

</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
@import '@/assets/css/mixins.scss';

.header {
    position: fixed;
    top: 0;
    left: 0;
    height: 0.5rem;
    z-index: 9;
    background-color: #fff;

    .left-arrow {
        position: absolute;
        top: 0.1rem;
        left: 0.2rem;
        font-size: 0.4rem;

        &.iconfont {
            @extend .zuojiantou;
        }
    }

    &-wrapper {
        @include flex-box(center, center);
        @include wh(5.4rem, 0.5rem);
        gap: 0.35rem;
        font-size: 0.25rem;
        color: #000;

        .itemActive {
            color: #f5344f;
            border-bottom: 0.04rem solid #f5344f;
        }

        a {
            color: inherit;
        }
    }

}
</style>