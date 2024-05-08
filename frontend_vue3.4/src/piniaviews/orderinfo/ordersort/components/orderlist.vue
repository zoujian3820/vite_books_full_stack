<template>
    <div class="order">
        <div class="order-list" v-for="order in orderLst" :key="order.orderid">
            <div class="order-status">
                <img class="logo" :src="getImg('dangdang.png')" />
                <span class="ziying">当当自营</span>
                <span class="order-status-text">{{ order.strOrderstatus }}</span>
                <i class="iconfont icon-shanchu shanchu" />
            </div>
            <div class="order-sbumit-info" v-if="order.orderstatus === 1">
                <div>订单提交成功</div>
                <div>{{ order.ordertime }}</div>
            </div>
            <div class="order-detail-list" v-for="detail of order.orderDetailList" :key="detail.orderdetailid">
                <div class="book-detail">
                    <div class="book-pick">
                        <img :src="getImg(detail.bookpicname)" alt="" class="img">
                    </div>
                    <div class="book-name-num">
                        <span class="book-name">{{ detail.bookname }}</span>
                        <span class="book-num">x{{ detail.purcharsenum }}</span>
                    </div>
                </div>
                <div class="book-numandprice">
                    <span>共{{ detail.purcharsenum }}件商品</span>
                    <span>需付款：&yen;{{ detail.bookprice }}</span>
                </div>
                <div class="other">
                    <div class="cut-down" v-if="order.orderstatus === 1">
                        <span>
                            <i class="hot iconfont icon-daojishi"></i>
                            <span class=text>支付结束：</span>
                            <span class="countdowntime" v-html="order.countDownTime"></span>
                        </span>
                    </div>
                    <div class="pay-or-cancelor" v-if="order.orderstatus === 1">
                        <span @click="cancelOrder(order)" class="cancel-order">取消订单</span>
                        <span class="immidate-pay">立即支付</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-order" v-if="orderLst.length === 0">
            <Empty description="您暂无订单" image-size="1.6rem" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Empty } from 'vant';
import getImg from '@/utils/imgUtil';
import OrderService from '../../service/orderService';
const { orderLst, findCurUsrOrdAndOrdDetail, loopCutDownTime, cancelOrder } = OrderService
findCurUsrOrdAndOrdDetail()
loopCutDownTime()

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.order {
    position: absolute;
    top: 1.38rem;
    left: 0;
    width: 100%;
    padding-bottom: 1rem;

    &-list {
        padding: 0 0.15rem 0.2rem;
        font-size: 0.2rem;
        background-color: #fff;
        border-bottom: 1px solid #eee;

        &:last-child {
            border-bottom: 0;
        }

        .order-status {
            display: flex;
            align-items: center;
            padding: 0.05rem 0;

            .order-status-text {
                color: #fc260b;
            }

            .logo {
                width: 0.4rem;
                height: 0.4rem;
                object-fit: contain;
                margin-right: 0.1rem;
            }

            .ziying {
                font-weight: bolder;
                flex: 1;
            }

            .shanchu {
                color: #777;
                padding: 0.15rem 0 0.15rem 0.15rem;
            }
        }

        .order-sbumit-info {
            color: #333;
            line-height: 0.28rem;
        }

        .order-detail-list {
            border-bottom: 1px solid #eee;
            padding: 0.1rem 0 0.2rem;

            &:last-child {
                border-bottom: 0;
            }

            .book-detail {
                display: flex;
                margin-top: 0.1rem;
                font-size: 0.19rem;

                .book-pick {
                    width: 1rem;
                    min-width: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .img {
                        width: 85%;
                        display: block;
                        object-fit: contain;
                    }
                }

                .book-name-num {
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    flex: 1;

                    .book-name {
                        @include clamp(2);
                    }

                    .book-num {
                        color: #666;
                    }
                }
            }

            .book-numandprice {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 0.2rem;
                font-size: 0.19rem;
            }

            .other {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.2rem;

                .cut-down {
                    .text {
                        margin-left: 0.05rem;
                    }
                }

                .pay-or-cancelor {
                    display: flex;
                    gap: 0.15rem;

                    span {
                        width: 1.1rem;
                        height: 0.4rem;
                        background-color: #fc260b;
                        color: #fff;
                        border-radius: 1rem;
                        text-align: center;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .cancel-order {
                        background-color: #fff;
                        color: #666;
                        border: 1px solid #666;
                    }
                }
            }
        }

    }

    .empty-order {
        text-align: center;
        font-size: 0.2rem;
        color: #666;
        margin-top: 0.4rem;
    }
}
</style>