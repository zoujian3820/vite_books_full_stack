<template>
    <div class="order-book">
        <div class="order-book-tag">
            <img :src="getImg('dangdang.png')" class="img" />
            <span classa="dangdang-own-business">当当自营</span>
        </div>
        <div class="order-book-list" v-if="getSubChkedSCLst && getSubChkedSCLst.length > 0">
            <div class="shopcart-book">
                <img v-for="item of getSubChkedSCLst" :key="item.bookisbn" :src="getImg(item.bookpicname)"
                    class="shopcart-book-img" />
            </div>
            <div v-show="showLeftArrow()" class="leftarrow" @click="lefScrollArrow">
                <i class="iconfont icon-youjiantou"></i>
            </div>
            <div v-show="showRightArrow()" class="rightarrow" @click="rigtScrollArrow">
                <i class="iconfont icon-youjiantou"></i>
            </div>
        </div>

        <div class="express" v-if="getSubChkedSCLst && getSubChkedSCLst.length > 0">
            <div class="left">配送</div>
            <div class="center">
                <div class="express-title">快递运输 免运费</div>
                <div>工作日、节假日均可送货</div>
                <div>
                    明日14:55前支付, 预计<span>2月14号(周一)送达</span>
                </div>
            </div>
            <i class="right iconfont icon-youjiantou"></i>
        </div>
    </div>
</template>
<script setup lang="ts">
import getImg from '@/utils/imgUtil'
import OrderService from '../service/orderService';
const { setCheckedSCLst, lefScrollArrow, rigtScrollArrow, showLeftArrow, showRightArrow } = OrderService
const { getSubChkedSCLst } = OrderService.storeRefs
// getCheckedSCLst
setCheckedSCLst()
</script>
<style lang="scss" scoped>
.order-book {
    width: 5.4rem;
    background-color: #fff;
    padding: 0.2rem 0.15rem;
    box-sizing: border-box;

    &-tag {
        font-size: 0.18rem;
        font-weight: bolder;

        .img {
            width: 0.29rem;
            height: 0.28rem;
            vertical-align: middle;
            margin-right: 0.2rem;
        }

        .dangdang-own-business {
            position: relative;
            top: 0.02rem;
        }
    }

    &-list {
        margin-left: 0.4rem;
        width: 4.8rem;
        display: flex;
        // align-items: center;
        gap: 0.2rem;
        position: relative;
        margin-top: 0.2rem;

        .shopcart-book {
            height: 1.15rem;
            display: flex;
            align-items: center;
            gap: 0.2rem;

            &-img {
                width: 1rem;
                height: 100%;
                object-fit: contain;
            }
        }
    }

    .rightarrow,
    .leftarrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 0.03rem;

        .iconfont {
            display: inline-block;
            font-size: 0.28rem;
            color: #333;
            font-weight: bolder;
        }
    }

    .leftarrow {
        left: 0.1rem;

        .iconfont {
            transform: rotate(180deg);
        }
    }

    .rightarrow {
        right: 0.3rem;
    }

    .express {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.2rem;
        padding-left: 1.2rem;
        box-sizing: border-box;
        margin-top: 0.18rem;

        .left {}

        .center {
            flex: 1;
            text-align: right;
            padding: 0 0.16rem 0 0.5rem;
            box-sizing: border-box;

            .express-title {
                font-weight: bolder;
            }

            span {
                color: #ea5340;
            }
        }
    }
}
</style>