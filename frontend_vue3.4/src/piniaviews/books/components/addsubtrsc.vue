<template>
    <div class="shopcart">
        <div class="addbtn" v-if="bookitem && bookitem.purcharsenum === 0">
            <div class="addbtn-inner" @click="addBookToShopCartWrapper($event, bookitem!)">添加到购物车</div>
        </div>
        <template v-else>
            <div class="shopcart-operate" v-if="bookitem && bookitem.purcharsenum > 0">
                <span class="shopcart-operate-minus" actionType="minus"
                    @click="appOrSubtrBookFrmShopCart(bookitem!, $event)" v-show="bookitem.purcharsenum > 1">
                    <i class="iconfont icon-jian" /></span>
                <span class="shopcart-operate-del" @click="delOneBookFrmSc(bookitem!)"
                    v-show="bookitem.purcharsenum === 1">
                    <i class="iconfont icon-shanchu" /></span>
                <span class="purchasenum">{{ bookitem.purcharsenum }}</span>
                <span class="shopcart-operate-add" actionType="add"
                    @click="appOrSubtrBookFrmShopCart(bookitem!, $event)"><i class="iconfont icon-jia" /></span>
            </div>
            <div class="shopcart-operate" v-else-if="shopcart && shopcart.bookisbn">
                <span class="shopcart-operate-minus" @click="appOrSubtrBookInShopCart(shopcart!, $event)"
                    actionType="minus" v-show="shopcart.purcharsenum > 1">
                    <i class="iconfont icon-jian" /></span>
                <span class="shopcart-operate-del" @click="delOneBookInSc(shopcart!)"
                    v-show="shopcart.purcharsenum === 1">
                    <i class="iconfont icon-shanchu" /></span>
                <span class="purchasenum">{{ shopcart.purcharsenum }}</span>
                <span class="shopcart-operate-add" @click="appOrSubtrBookInShopCart(shopcart!, $event)"
                    actionType="add"><i class="iconfont icon-jia" /></span>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { BookInfo } from '@/piniastore/book/state';
import ShopCartService from '@/piniaviews/books/service/shopcartService';
import { ShopCart } from '@/piniastore/shopcart/state';
const {
    // addBookToShopCart,
    addBookToShopCartWrapper,
    appOrSubtrBookFrmShopCart,
    delOneBookFrmSc,
    appOrSubtrBookInShopCart,
    delOneBookInSc
} = ShopCartService

// import shopcart from '@/piniastore/shopcart';
// shopcart().addBookToShopCart

// const props = defineProps({
//     str: String,
//     bookitem: {
//         type: Object,
//         default: () => ({})
//     }
// })

defineProps<{
    bookitem?: BookInfo,
    shopcart?: ShopCart
}>()


</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.shopcart {
    line-height: 1;

    &-operate {
        @include flex-box(center, center);
        gap: 0.3rem;

        .purchasenum {
            display: inline-block;
            font-size: 0.25rem;
            text-align: center;
        }

        .iconfont {
            font-size: 0.29rem;
        }

        &-add,
        &-minus {
            display: inline-block;
            text-align: center;
            color: #1985f1;
            padding: 0.2rem 0.1rem;
        }

        &-del {
            display: inline-block;
            text-align: center;
            color: #888;
            padding: 0.2rem 0.1rem;
        }
    }

    .addbtn {
        @include flex-box(center, center);
        margin-top: 0.18rem;

        &-inner {
            @include wh(80%, 0.32rem);
            line-height: 0.32rem;
            background-color: #fef3ed;
            color: #db8441;
            text-align: center;
            padding: 0.05rem;
            border-radius: 0.25rem;
            font-size: 0.2rem;
        }
    }
}
</style>