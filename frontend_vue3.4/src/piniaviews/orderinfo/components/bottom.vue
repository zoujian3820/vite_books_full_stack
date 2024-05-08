<template>
    <ActionBar>
        <template v-if="getSubChkedSCLst.length">
            <ActionBarButton color="#5a5b59" type="warning" :text="payMoney" />
            <ActionBarButton @click="addOrdAndOrdDetailLst" color="#fc260b" type="danger" text="提交订单" />
        </template>
        <template v-else>
            <ActionBarButton @click="toOrderList" color="#5a5b59" type="danger" text="订单已提交或暂无订单" />
        </template>
    </ActionBar>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ActionBar, ActionBarButton } from 'vant'
import OrderService from '../service/orderService';
import ShopCartService from '@/piniaviews/books/service/shopcartService';
const { totalPrice } = ShopCartService.refreshShopCartList()
const { getSubChkedSCLst } = ShopCartService.storeRefs
const { addOrdAndOrdDetailLst, toOrderList } = OrderService
const payMoney = computed(() => `实付: ￥ ${totalPrice.value}`)

</script>
<style lang="scss" scoped></style>