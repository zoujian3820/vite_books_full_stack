import { defineStore } from 'pinia'
import OrderinfoApi from '@/api/OrderinfoApi'
import { Orderinfo, OrderDetail } from './state'
import { Userinfo } from '@/piniastore/userinfo/index'
import { ShopCart } from '../state'
import { AxiosResponse } from 'axios'
import goodstorageutil, { OPTION } from '@/utils/goodstorageutil'
import { hasProps } from '@/utils'
import dayjs from 'dayjs'
import timeConversion from '@/utils/timeConversion'

export default defineStore('ordAndOrdDetailStrore', {
  state: () => {
    return initOrdAndOrdDetailState
  },
  getters: {
    getOrdAndOrdDetails(state): Orderinfo {
      return hasProps(state.ordAndOrdDetails)
        ? state.ordAndOrdDetails
        : goodstorageutil.get('ordAndOrdDetails') || {}
    },
    getOrderinfoLst(state): Orderinfo[] {
      return state.orderinfoLst.length > 0
        ? state.orderinfoLst
        : goodstorageutil.get('orderinfoLst', OPTION.ARR)
    }
  },
  actions: {
    async addOrdAndOrDetail() {
      // 1，封装订单对象
      const customerid = goodstorageutil.get<Userinfo>('userinfo').userid
      const orderinfo: Orderinfo = {
        ordertime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        orderstatus: 1,
        customerid
      }
      // 2.封装订单详情对象

      const orderDetailList: OrderDetail[] = []
      const chkedSCLst = goodstorageutil.get<ShopCart[]>('chkedSCLst')

      chkedSCLst.forEach((chkedSC) => {
        const { bookname, bookpicname, bookprice, purcharsenum } = chkedSC
        orderDetailList.push({
          bookname,
          bookpicname,
          bookprice,
          purcharsenum,
          shopcartid: chkedSC.shopcartid
        })
      })

      // 3.合并订单和订单详情列表
      const lastOrdAndOrdDetailLst: Orderinfo = {
        ...orderinfo,
        orderDetailList
      }
      // 4.调用接口执行后端订单和订单详情添加功能
      const dbOrdAndOrdDetailLst: AxiosResponse<Orderinfo> =
        await OrderinfoApi.addOrdAndOrDetail(lastOrdAndOrdDetailLst)
      // 5.保存后端回传的订单和订单详情state和缓存中
      this.ordAndOrdDetails = dbOrdAndOrdDetailLst.data
      goodstorageutil.set('ordAndOrdDetails', dbOrdAndOrdDetailLst.data)
    },
    async findCurUsrOrdAndOrdDetail() {
      const customerid = goodstorageutil.get<Userinfo>('userinfo').userid
      const orderinfoLst: AxiosResponse<Orderinfo[]> =
        await OrderinfoApi.findCurUsrOrdAndOrdDetail(customerid)

      this.orderinfoLst = setOrEndTimeAndCutDownTime(
        convertordstatus(orderinfoLst.data)
      )
      goodstorageutil.set('orderinfoLst', this.orderinfoLst)
    },
    async uptOrdStatusByOrdId(orderid: number) {
      await OrderinfoApi.uptOrdStatusByOrdId(orderid)
      this.getOrderinfoLst.forEach((order) => {
        if (order.orderid === orderid) {
          order.orderstatus = -1
          order.strOrderstatus = '订单已取消'
        }
      })
    }
  }
})

type InitOrdAndOrdDetailState = {
  ordAndOrdDetails: Orderinfo
  orderinfoLst: Orderinfo[]
}

const initOrdAndOrdDetailState: InitOrdAndOrdDetailState = {
  ordAndOrdDetails: {} as Orderinfo,
  orderinfoLst: []
}

export function convertordstatus(orderinfoLst: Orderinfo[]) {
  return orderinfoLst.map((orderinfo) => {
    switch (orderinfo.orderstatus) {
      case 1:
        orderinfo.strOrderstatus = '等待付款'
        break
      case 2:
        orderinfo.strOrderstatus = '交易成功'
        break
      case 3:
        orderinfo.strOrderstatus = '待评价'
        break
      case -1:
        orderinfo.strOrderstatus = '订单已取消'
        break
    }
    return orderinfo
  })
}

function setOrEndTimeAndCutDownTime(orderinfoList: Orderinfo[]) {
  return orderinfoList.map((item) => {
    if (item.orderstatus === 1) {
      const orderTime = new Date(item.ordertime!)
      // 3.1设置结束时间和现在时间的时间差. 增加倒计时的时间 60s
      item.orderEndTime = orderTime.getTime() + 60000
    }
    getCutDownTime(item)
    return item
  })
}

export function getRestTimesAndSecs(orderinfo: Orderinfo) {
  //3.1设置结束时间和现在时间的时间差.
  const restTimes = orderinfo.orderEndTime! - new Date().getTime()
  const restSecs = Math.floor(restTimes / 1000)
  return { restTimes, restSecs }
}

function getCutDownTime(orderinfo: Orderinfo) {
  const rest = getRestTimesAndSecs(orderinfo)
  if (rest.restSecs > 0) {
    orderinfo.countDownTime = timeConversion(rest.restTimes)
  }
}
