<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <i :class="{ hightlight: totalCount > 0 }" class="iconfont icon-gouwuche" />
                <div v-show="totalCount > 0" class="num">{{ totalCount }}</div>
            </div>
            <div class="content-right" :class="{ hightlight: totalPrice > 0 }">
                <template v-if="totalCount > 0">
                    <div class="totalPrice">&yen; {{ totalPrice }}</div>
                    <div class="toPay">去支付<i class="iconfont icon-youjiantou" /></div>
                </template>
                <div class="empty-text" v-else>去添加商品到购物车</div>
            </div>

            <!-- 小球加车抛物线飞入动画 -->
            <div class="ball-container">
                <Transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.showorhidden">
                        <div class="inner"></div>
                    </div>
                </Transition>
                <!-- 占位获取坐标 -->
                <div class="ball holder"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Transition } from 'vue';
import ShopCartService from '@/piniaviews/shopcart/service';
const { beforeDrop, dropping, afterDrop, ball } = ShopCartService
const { totalCount, totalPrice } = ShopCartService.refreshShopCartList()

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    @include wh(100%, 0.73rem);

    .content {
        @include flex-box(center, center);
        @include wh(100%, 0.73rem);
        gap: 0.3rem;

        &-left {
            @include wh(1.095rem, 0.53rem);
            position: relative;

            .icon-gouwuche {
                font-size: 0.4rem;
                color: #666;

                &.hightlight {
                    color: #000;
                }
            }

            .num {
                position: absolute;
                left: 0.3rem;
                top: -0.05rem;
                font-size: 0.15rem;
                background-color: #fe463c;
                color: #fff;
                padding: 0.01rem 0.06rem;
                border-radius: 0.15rem;
                text-align: center;
            }
        }

        &-right {
            @include wh(3.5rem, 0.53rem);
            @include flex-box(center, center);
            font-size: 0.29rem;
            color: #fff;
            background-color: #f3655e;
            border-radius: 0.53rem;
            gap: 0.06rem;
            opacity: 0.6;

            &.hightlight {
                opacity: 1;
            }

            .empty-text {
                font-size: 0.22rem;
            }

            .totalPrice {
                font-weight: bold;
            }

            .toPay {
                font-size: 0.18rem;

                .iconfont {
                    font-size: 0.18rem;
                }
            }
        }
    }
}

.ball-container {
    .ball {
        position: fixed;
        left: 0.43rem;
        bottom: 0.5rem;
        @include wh(0.16rem, 0.16rem);
        border-radius: 50%;
        // 贝塞尔曲线定义参考 https://github.com/zoujian3820/blog/blob/master/note/css/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.md
        // 外层用贝塞尔曲线动画
        transition: all 0.4s cubic-bezier(0.48, -0.35, 0.78, 0.45);

        .inner {
            @include wh(0.16rem, 0.16rem);
            border-radius: 50%;
            background-color: #1985f1;
            // 内层用线性动画 linear
            transition: all 0.4s linear;
        }
    }

    .holder {
        opacity: 0;
        pointer-events: none;
    }
}
</style>