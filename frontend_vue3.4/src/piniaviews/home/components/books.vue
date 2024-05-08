<template>
    <div class="dangdang-books">
        <div class="dangdang-books-wrapper" ref="booksRef">
            <div @click="bookDetail(book.ISBN)" class="dangdang-books-item" v-for="book of getCurPageBookList"
                :key="book.ISBN">
                <div class="dangdang-books-pic">
                    <img class="bookpic" :src="getImg(book.bookpicname)" />
                </div>
                <div class="dangdang-books-summary">
                    <div class="dangdang-books-title">
                        {{ book.bookname }}
                    </div>
                    <div class="dangdang-books-favourable">
                        <span class="se1f-support">自营</span>
                        <span class="coupons">券</span>
                        <span class="free-shipping">包邮</span>
                    </div>
                    <div class="price-and-addcart">
                        <span class="price-and-addcart">
                            <span class="originalprice">&yen;{{ book.originalprice }}</span>
                            <span class="discountprice">&yen;{{ book.discountprice }}</span>
                        </span>
                        <span class="shopcart">
                            <i class="iconfont icon-gouwuche gouwucheicon"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="!isLastPage" style="position: relative;padding-top: 0.2rem;">
            <Loading />
        </div>
        <div class="toBottom" v-show="isLastPage" style="position: relative;">到底了~</div>
    </div>
</template>

<script setup lang="ts">
import Loading from './Loading.vue';
import getImg from '@/utils/imgUtil'
import HomeService from '../service/homeService';
import booksService from '@/piniaviews/books/service'

const { findBookLstWithPager } = HomeService
const { getCurPageBookList, isLastPage } = HomeService.storeToRefs
const { bookDetail } = booksService

findBookLstWithPager()

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.dangdang-books {
    position: absolute;
    top: 4.95rem;
    left: 0;
    width: 5.4rem;
    padding: 0.1rem 0.1rem 1rem 0.1rem;
    box-sizing: border-box;
    background-color: #f2f2f2;

    .dangdang-books-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 5.2rem;
        gap: 0.1rem;
    }

    .dangdang-books-item {
        width: 2.55rem;
        background-color: #fff;
        border-radius: 0.1rem;
        overflow: hidden;
        padding: 0.1rem;
        box-sizing: border-box;

        .dangdang-books-pic {
            width: 2.48rem;
            height: 2.48rem;
            display: flex;
            justify-content: center;
            align-items: center;

            .bookpic {
                width: 70%;
                height: 95%;
                display: block;
                object-fit: contain;
            }
        }

        .dangdang-books-summary {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;

            .dangdang-books-title {
                color: #333;
                font-weight: bolder;
                font-size: 0.17rem;
                line-height: 0.22rem;
                margin-top: 0.1rem;
                @include clamp(2);
            }

            .dangdang-books-favourable {
                display: flex;
                gap: 0.1rem;

                .se1f-support {
                    padding: 0.005rem 0.05rem;
                    border-radius: 0.05rem;
                    text-shadow: 0 0.005rem #f7f7f7;
                    background-color: #eb636d;
                    color: #fff;
                    font-size: 0.16rem;
                }

                .coupons,
                .free-shipping {
                    padding: 0.005rem 0.05rem;
                    border-radius: 0.05rem;
                    border: 1px solid #d96d70;
                    box-shadow: 0 0, 0, 0.01rem #d96d70;
                    text-shadow: 0 0.005rem #d96d70;
                    background-color: #fff;
                    color: #7f7f7f7f;
                    font-size: 0.16rem;
                }
            }

            .price-and-addcart {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .price-and-addcart {
                    font-weight: bolder;
                    color: #999;
                    font-size: 0.18rem;

                    .originalprice {
                        text-decoration: line-through;
                    }

                    .discountprice {
                        color: #d96d70;
                        margin-left: 0.07rem;
                    }
                }

                .shopcart {
                    background-color: #eb636d;
                    color: #fff;
                    border-radius: 50%;
                    width: 0.2rem;
                    height: 0.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .gouwucheicon {
                        font-size: 0.14rem;
                    }
                }
            }
        }
    }

    .toBottom {
        text-align: center;
        line-height: 0.3rem;
        color: #666;
        font-size: 0.18rem;
        padding-top: 0.2rem;
    }
}
</style>