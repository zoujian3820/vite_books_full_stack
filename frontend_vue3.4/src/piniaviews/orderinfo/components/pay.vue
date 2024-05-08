<template>
    <div class="pay-method">
        <span class="pay-txt">支付方式</span>
        <span class="pay-type">
            <!-- <img class="pay-type-img" :src="getImg('zhifubao.png')" /> -->
            <i class="pay-type-img iconfont icon-zhifubaozhifu" />
            <span class="pay-type-txt">支付宝支付</span>
            <i class="iconfont icon-youjiantou arrow"></i>
        </span>
    </div>
</template>

<script setup lang="ts">
// import getImg from '@/utils/imgUtil'

</script>
<style lang="scss" scoped>
.pay-method {
    width: 5.4rem;
    padding: 0 0.15rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.2rem;
    line-height: 0.7rem;
    background-color: #fff;
    margin: 0.05rem 0 0.07rem;

    .pay-txt {
        color: #666;
    }

    .pay-type {
        display: flex;
        align-items: center;

        .pay-type-img {
            color: #009fe8;
            font-size: 0.22rem;
            margin-right: 0.1rem;
        }

        .pay-type-txt {
            font-weight: bolder;
            color: #333;
        }

        .arrow {}
    }
}
</style>