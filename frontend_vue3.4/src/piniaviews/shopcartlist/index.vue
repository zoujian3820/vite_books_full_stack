<template>
    <div class="shopcartlist">
        <vheader title="知书网" />

        <div class="items" v-if="getShopCartList.length > 0">
            <div class="item" v-for="item of getShopCartList" :key="item.shopcartid">
                <div class="content">
                    <input type="checkbox" class="iconfont check" @change="checkEveryCheckbox" v-model="item.checked">
                    <div class="pic">
                        <img class="bookimg" alt="" :src="getImg(item.bookpicname)">
                    </div>
                    <div class="descri">
                        <div class="book-title">{{ item.bookname }}</div>
                        <div class="price">
                            <span class="curprice">&yen;{{ item.bookprice }}</span>
                            <span class="addsubtrcbktosc">
                                <addsubtrsc :shopcart="item" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-shopcart" v-else>
            <i class="iconfont icon-iconkonggouwuche empty-icon" />
            <div class="empty-tip">您的购物车还空着呢？快去逛逛吧</div>
            <button class="button" @click="toHome">去逛逛</button>
        </div>
        <div class="cal">
            <span class="checkall">
                <input type="checkbox" class="iconfont check" :class="{ highlight: getShopCartList.length > 0 }"
                    v-model="isSelectAll" @change="selectAll" />
                <span class="label">全选</span>
                <span class="total">
                    合计：<span class="money">&yen;{{ totalPrice }}</span>
                </span>
            </span>
            <span class="pay" :class="{ highlight: getShopCartList.length > 0 }">去结算({{ totalCount }})</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil'
import addsubtrsc from '@/piniaviews/books/components/addsubtrsc.vue';
import vheader from '@/components/vheader.vue';
import ShopCartService from '@/piniaviews/books/service/shopcartService';
import { onMounted } from 'vue';
const { storeRefs, refreshShopCartList, back, isSelectAll, selectAll, checkEveryCheckbox, updateIsSelectALL, toHome } = ShopCartService
const { getShopCartList } = storeRefs
const { totalPrice, totalCount } = refreshShopCartList()

onMounted(() => {
    // 更新全选按钮状态
    updateIsSelectALL()
})

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.shopcartlist {

    .iconfont[type="checkbox"] {
        color: #666;
        appearance: none;
        @include wh(0.33rem, 0.33rem);

        &::before {
            font-size: 0.33rem;
            content: "\e65c";
        }

        &:checked {
            color: #1985f1;

            &::before {
                font-size: 0.33rem;
                content: "\e60f";
            }
        }
    }

    .items {
        position: absolute;
        top: 0.86rem;
        bottom: 0.865rem;
        z-index: 0;
        display: grid;
        grid-template-columns: 5.14rem;
        grid-template-rows: repeat(auto-fill, 2.1rem);
        row-gap: 0.2rem;
        padding: 0 0.13rem;
        box-sizing: border-box;
        @include scroll;

        .item {
            height: 2.1rem;

            .content {
                @include flex-box(flex-start, center);

                .pic {
                    @include wh(1.539rem, 2.16rem);
                    @include flex-box(center, center);

                    .bookimg {
                        @include wh(80%, 70%);
                    }
                }

                .descri {
                    width: 3.21rem;
                    font-size: 0.23rem;

                    .book-title {
                        height: 0.8rem;
                        color: #272727;
                    }

                    .price {
                        height: 1rem;
                        color: #ea5340;
                        width: 100%;
                        font-size: 0.2rem;
                        @include flex-box(flex-start, center);

                        .curprice {
                            flex: 1;
                        }

                        .addsubtrcbktosc {
                            flex: 2;
                        }
                    }
                }
            }
        }
    }

    .empty-shopcart {
        padding-top: 1.5rem;

        .empty-icon,
        .empty-tip,
        .button {
            display: block;
            margin: 0 auto;
            text-align: center;
            font-size: 0.21rem;
            color: #999;
            margin-bottom: 0.3rem;
        }

        .empty-icon {
            font-size: 1.4rem;
        }

        .button {
            @include flex-box(center, center);
            @include wh(1.1rem, 0.42rem);
            background-color: #ea5340;
            border: 0;
            border-radius: 0.42rem;
            color: #fff;
        }
    }

    .cal {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        margin: 0 0.13rem;
        background-color: #fff;
        font-size: 0.22rem;
        @include wh(5.14rem, 0.86rem);
        @include flex-box(space-between, center);

        .checkall {
            @include flex-box(flex-start, center);
            gap: 0.1rem;

            .total {
                font-weight: bolder;
            }

        }

        .pay {
            @include wh(1.8rem, 0.6rem);
            @include flex-box(center, center);
            color: #fff;
            border-radius: 0.288rem;
            text-shadow: 0 0 0.01rem #3f3f3f;
            margin-right: 0.03rem;
            background-color: #ea5340;
        }

        .check,
        .pay {
            opacity: 0.6;
            pointer-events: none;

            &.highlight {
                opacity: 1;
                pointer-events: auto;
            }
        }

    }
}
</style>