<template>
    <div class="goods">
        <i class="iconfont icon-right leftarrow" @click="$router.back"></i>
        <div class="pic" ref="picRef">
            <img class="img" :src="getImg(getBookDetail.bookpicname)" alt="">
        </div>
        <div class="goods-detail">
            <div class="price-detail">
                <div class="favourable">
                    <span class="discount-price">
                        <strong class="symbol">&yen;</strong>
                        <strong class="discountprice">{{ getBookDetail.discountprice }}</strong>
                    </span>
                    <span class="discount-condition">
                        <span class="inner">每满100减50</span>
                    </span>
                    <i class="jiangjia iconfont icon-jiangjia"></i>
                </div>
                <div class="other">
                    <span class="original-price">定价&yen;{{ getBookDetail.originalprice }}</span>
                    <span class="discount">{{ getBookDetail.discount }}</span>
                    <span class="reduction-notice">降价通知</span>
                </div>
            </div>
            <div class="line"></div>
            <div class="fullminus">
                <div class="fullminus-item">
                    <div class="fullminus-item-desc">
                        <strong class="symbol">&yen;</strong>
                        <span class="integerpart">10</span>
                        <span class="sale-price">满99</span>
                    </div>
                    <div class="fullminus-item-get">
                        领
                        <span class="radius-up"></span>
                        <span class="radius-down"></span>
                        <span class="connect-lin-1"></span>
                        <span class="connect-lin-2"></span>
                        <span class="connect-lin-3"></span>
                    </div>
                    <div class="fullminus-item-desc">
                        <strong class="symbol">&yen;</strong>
                        <span class="integerpart">10</span>
                        <span class="sale-price">满99</span>
                    </div>
                    <div class="fullminus-item-get">
                        领
                        <span class="radius-up"></span>
                        <span class="radius-down"></span>
                        <span class="connect-lin-1"></span>
                        <span class="connect-lin-2"></span>
                        <span class="connect-lin-3"></span>
                    </div>
                </div>

                <div class="extra-item-1">
                    <span class="yuan-field">N元场</span>
                    <span class="discount">3月49元5件 & 88元10件</span>
                    <span class="collect-coupons">领券<i class="iconfont icon-youjiantou"></i></span>
                </div>
                <div class="extra-item-2">
                    <span class="yuan-field">满额减</span>
                    <span class="discount">每满 &yen; 1000元减 &yen; 50元</span>
                    <span class="collect-coupons">领券<i class="iconfont icon-youjiantou"></i></span>
                </div>
            </div>
        </div>
        <div class="book-brief">
            <div class="descr">
                <span class="ziying">知书网自营</span>
                <span class="book-name">{{ getBookDetail.bookname }}</span>
            </div>
            <div class="book-introduce">
                本套丛书是特别为中国学生精心打造，量身定制的“新阅读”知识成长计划。它以先进的教学理念和趣味的教学内容形象讲解.
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import BookDetailService from '../service/bookdetailService';
const { storeRefs, init, onBookScroll, picRef } = BookDetailService
const { getBookDetail } = storeRefs
import getImg from '@/utils/imgUtil'

init()


onMounted(() => {
    window.addEventListener('scroll', onBookScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onBookScroll)
})

</script>
<style lang="scss" scoped>
// @import '@/assets/css/common.scss';
@import '@/assets/css/mixins.scss';

.goods {
    position: absolute;
    // top: 0.6rem;
    top: 0;
    left: 0;
    bottom: -5rem;

    .leftarrow {
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        opacity: 0.4;
        font-size: 0.4rem;
    }

    .pic {
        @include flex-box(center, flex-start);
        @include wh(5.4rem, 3.5rem);
        margin-top: 0.2rem;

        .img {
            @include wh(80%, 90%);
            object-fit: contain;
        }
    }

    &-detail {
        @include wh(5.4rem, 2.75rem);
        background-image: linear-gradient(#ff5244 35%, #ffc3bc, #fff);
        border-radius: 0.2rem 0.2rem 0 0;
        box-shadow: 0 -0.01rem 0.01rem 0.01rem gainsboro;
        overflow: hidden;

        .price-detail {
            @include wh(5.1rem, 1.04rem);
            padding: 0 0.15rem;
            color: #fff;
            font-size: 0.2rem;
            margin-top: 0.1rem;

            .favourable,
            .other {
                @include flex-box(flex-start, center);
                line-height: 0.4rem;
            }

            .favourable {
                .discount-price {
                    width: 0.94rem;
                    // text-shadow: 0 0 0.02rem gray;
                    font-size: 0.25rem;
                }

                .discount-condition {
                    flex: 1;

                    .inner {
                        border: 1px solid #fff;
                        padding: 0.05rem;
                        border-radius: 0.05rem;
                        text-shadow: 0 0.01rem 0.03rem 0.02rem #fff;
                    }
                }

                .jiangjia {
                    width: 0.7rem;
                    font-size: 0.3rem;
                    text-shadow: 0 0 0.02rem gray;
                }

            }

            .other {

                .original-price {
                    width: 1.25rem;
                    text-decoration: line-through;
                }

                .discount {
                    flex: 1;
                    text-shadow: 0 0 0.02rem gray;
                }

                .reduction-notice {}
            }
        }

        .line {
            height: 0.1rem;
            background-color: #e94230;
            margin: 0 0.05rem;
            border-radius: 0.1rem;
        }

        .fullminus {
            background-image: linear-gradient(#ffc3bc 5%, #fff 30%, #fff 30%, #fff 30%);
            height: 1.48rem;
            position: relative;
            top: -0.05rem;
            margin: 0 0.11rem;
            padding: 0.18rem 0 0 0.18rem;

            &-item {
                @include flex-box(flex-start, center);
                gap: 0.08rem;
                color: #fff;
                position: relative;

                &-desc,
                &-get {
                    height: 0.45rem;
                    background-color: #ff5347;
                    @include flex-box(center, center);
                    padding: 0 0.12rem;
                    border-radius: 0.1rem;
                }

                &-desc {
                    box-shadow: -0.01rem 0 0.04rem 0 #000;

                    .symbol {
                        font-size: 0.25rem;
                    }

                    .integerpart {
                        margin-right: 0.1rem;
                        font-size: 0.25rem;
                    }

                    .sale-price {}
                }

                &-get {
                    box-shadow: 0.01rem 0 0.04rem 0 #000;
                    position: relative;
                    margin-right: 0.1rem;
                }

                .radius-down,
                .radius-up {
                    position: absolute;
                    border: 0.02rem solid #ff5347;
                    height: 0.08rem;
                    left: -0.05rem;
                    border-top: none;
                    border-bottom-left-radius: 50% 100%;
                    border-bottom-right-radius: 50% 100%;
                    transform: rotate(90deg);
                }

                .radius-up {
                    top: 0.03rem;
                }

                .radius-down {
                    bottom: 0.03rem;
                }

                .connect-lin-1,
                .connect-lin-2,
                .connect-lin-3 {
                    @include wh(0.11rem, 0.02rem);
                    background-color: #ff5347;
                    position: absolute;
                    left: -0.09rem;
                }

                .connect-lin-1 {
                    top: 0.15rem;
                }

                .connect-lin-2 {
                    top: 0.21rem;
                }

                .connect-lin-3 {
                    top: 0.27rem;
                }

            }

            .extra-item-1,
            .extra-item-2 {
                @include flex-box(flex-start, center);
                gap: 0.24rem;
                height: 0.4rem;

                .yuan-field {
                    background-color: #f6e8e7;
                    width: 0.8rem;
                    padding: 0.03rem 0.05rem;
                    text-align: center;
                }

                .discount {
                    flex: 1;
                    color: #414141;
                    font-weight: bolder;
                }

                .collect-coupons {
                    width: 0.8rem;
                    color: #e24a56;
                    @include flex-box(center, center);

                    .iconfont {
                        font-size: 0.18rem;
                    }
                }

            }
        }
    }

    .book-brief {
        padding: 0 0.25rem;
        box-sizing: border-box;

        .descr {
            @include flex-box(flex-start, center);
            // height: 0.5rem;
            padding: 0.01rem 0 0.09rem;
            gap: 0.24rem;

            .ziying {
                background-color: #f34949;
                text-align: center;
                color: #fff;
                width: 1rem;
                padding: 0.03rem 0;
                border-radius: 0.04rem;
                box-shadow: 0.01rem 0.005rem 0.01rem 0.01rem gray;
            }

            .book-name {
                font-size: 0.23rem;
                font-weight: bolder;
                flex: 1;
                @include clamp(2);
            }
        }

        .book-introduce {
            font-size: 0.17rem;
            color: #8e8e8e;
            line-height: 0.26rem;
        }
    }
}
</style>