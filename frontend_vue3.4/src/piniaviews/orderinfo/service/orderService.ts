import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { showToast } from 'vant'
// import goodstorageutil, { Operate } from '@/utils/goodstorageutil'

import { shopcartStore, orderinfoStore } from '@/piniastore'
import { watchEffect } from 'vue'
import { Orderinfo } from '@/piniastore/orderinfo/state'
import { getRestTimesAndSecs } from '@/piniastore/orderinfo'
import timeConversion from '@/utils/timeConversion'

export default class OrderService {
  static store = shopcartStore
  static ordStore = orderinfoStore
  static storeRefs = storeToRefs(OrderService.store)
  static ordStoreRefs = storeToRefs(OrderService.ordStore)
  static orderLst = ref<Orderinfo[]>([])
  static activeIndex = ref(0)

  static sliceNum = 4
  static startIndex = ref(0)

  static changeTab(orderinfo: { orderstatus: number; strOrderstatus: string }) {
    if (orderinfo?.orderstatus === 4 || orderinfo?.orderstatus === 5) return
    OrderService.activeIndex.value = orderinfo.orderstatus
    OrderService.getOrderStateLst(
      orderinfo.orderstatus ? (orderinfo as Orderinfo) : undefined
    )
  }
  static getOrderStateLst(orderinfo?: Orderinfo) {
    if (orderinfo?.orderstatus === 4 || orderinfo?.orderstatus === 5) return
    OrderService.orderLst.value = OrderService.ordStore.getOrderinfoLst
      .filter((order) => {
        return orderinfo ? order.orderstatus === orderinfo.orderstatus : true
      })
      .sort((a, b) => {
        return new Date(b.ordertime).getTime() - new Date(a.ordertime).getTime()
      })
  }
  static async findCurUsrOrdAndOrdDetail() {
    await OrderService.ordStore.findCurUsrOrdAndOrdDetail()
    OrderService.getOrderStateLst()
  }
  static toOrderList() {
    router.push({ name: 'ordersort' })
  }
  static async addOrdAndOrdDetailLst() {
    await OrderService.ordStore.addOrdAndOrDetail()
    OrderService.clearShopCartCache()
    OrderService.toOrderList()
  }
  static clearShopCartCache() {
    OrderService.store.storeShopCartList([])
  }
  static setCheckedSCLst() {
    OrderService.store.setCheckedSCLst()
    OrderService.getSubChkSCLst()
  }
  static showLeftArrow() {
    return OrderService.startIndex.value > 0
  }
  static showRightArrow() {
    return (
      OrderService.startIndex.value + OrderService.sliceNum <=
      OrderService.store.getCheckedSCLst.length - 1
    )
  }
  static lefScrollArrow() {
    OrderService.startIndex.value = OrderService.startIndex.value - 1
  }
  static rigtScrollArrow() {
    OrderService.startIndex.value = OrderService.startIndex.value + 1
  }
  static getSubChkSCLst() {
    watchEffect(() => {
      console.log('OrderService.getSubChkSCLst.watchEffect')
      OrderService.store.subChkedSCLst = OrderService.store.getCheckedSCLst.slice(
        OrderService.startIndex.value,
        OrderService.startIndex.value + OrderService.sliceNum
      )
    })
  }
  static async cancelOrder(order: Orderinfo) {
    await OrderService.ordStore.uptOrdStatusByOrdId(order.orderid!)
    showToast('订单已取消')
  }
  static loopCutDownTime() {
    watchEffect(() => {
      console.log('OrderService.loopCutDownTime.watchEffect')
      OrderService.ordStore.getOrderinfoLst.forEach((order) => {
        if (order.orderstatus === 1) {
          order.countdownfn = setInterval(async () => {
            //1、如果支付时间结束了,就更新订单状态
            const rest = getRestTimesAndSecs(order)
            if (rest.restSecs === 0) {
              clearInterval(Number(order.countdownfn))
              await OrderService.cancelOrder(order)
            } else {
              //2.如果支付时间没有结束,就刷新页面倒计时时间
              order.countDownTime = timeConversion(rest.restTimes)
            }
          }, 1000)
        } else {
          return
        }
      })
    })
  }
}
