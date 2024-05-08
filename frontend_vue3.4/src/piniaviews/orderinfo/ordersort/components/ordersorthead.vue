<template>
    <div class="order-header">
        <div class="order-search">
            <i class="iconfont icon-youjiantou" @click="$router.back"></i>
            <i class="iconfont icon-fangdajing fangdajing"></i>
            <input type="text" placeholder="搜索我的订单" class="keyword-input" />
        </div>
        <div class="order-status">
            <div class="order-status-item" v-for="(order) in orderinfos" :key="order.orderstatus"
                @click="changeTab(order)"
                :class="{ item_active: activeIndex === order.orderstatus && activeIndex !== 4 }">
                <span> {{ order.strOrderstatus }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import OrderService from '../../service/orderService';
const { changeTab, activeIndex } = OrderService

const orderinfos = [
    { orderstatus: 0, strOrderstatus: '全部订单' },
    { orderstatus: 1, strOrderstatus: '待付款' },
    { orderstatus: 2, strOrderstatus: '待收货' },
    { orderstatus: 3, strOrderstatus: '待评价' },
    { orderstatus: -1, strOrderstatus: '已取消' },
    { orderstatus: 4, strOrderstatus: '|' },
    { orderstatus: 5, strOrderstatus: '筛选' },
]

</script>
<style lang="scss" scoped>
.order-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.38rem;
    padding: 0.15rem 0.15rem;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 999;

    .order-search {
        display: flex;
        align-items: center;
        height: 0.65rem;
        background-color: #f6f6f6;
        border-radius: 1rem;
        padding: 0 0.15rem 0 0;
        box-sizing: border-box;

        .fangdajing {
            margin-left: 0.2rem;
            margin-right: 0.1rem;
            font-size: 0.31rem;
        }

        .icon-youjiantou {
            display: inline-block;
            font-size: 0.31rem;
            transform: rotate(180deg);
            padding: 0.15rem 0.15rem 0.15rem 0;
        }

        .keyword-input {
            height: 100%;
            flex: 1;
            border: none;
            font-size: 0.2rem;
            background: none;
            color: #333;
        }
    }

    .order-status {
        display: flex;
        align-items: center;

        &-item {
            // flex: 1;
            text-align: center;
            font-size: 0.2rem;
            font-weight: bolder;
            line-height: 0.55rem;
            color: #333;
            margin-right: 0.237rem;

            &:last-child {
                margin-right: 0;
            }
        }

        .item_active {
            color: #fc260b;

            span {
                padding: 0.04rem 0;
                border-bottom: 0.03rem solid #fc260b;
            }
        }
    }
}
</style>