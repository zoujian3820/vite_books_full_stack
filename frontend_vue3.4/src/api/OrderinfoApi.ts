import request from '@/utils/axiosUtil'
import { Orderinfo } from '@/piniastore/orderinfo/state'

class OrderinfoApi {
  static orderinfoApi: OrderinfoApi = new OrderinfoApi()

  addOrdAndOrDetail(ordAndOrdDetail: Orderinfo) {
    // 登录接口
    return request.post(
      '/ordAndOrdDetailModule/addOrdAndOrDetail',
      false,
      ordAndOrdDetail
    )
  }
  findCurUsrOrdAndOrdDetail(customerid: number) {
    return request.get(
      `/ordAndOrdDetailModule/findCurUsrOrdAndOrdDetail/${customerid}`,
      false
    )
  }
  uptOrdStatusByOrdId(orderid: number) {
    return request.get(
      `/ordAndOrdDetailModule/uptOrdStatusByOrdId/${orderid}`,
      false
    )
  }
}

export default OrderinfoApi.orderinfoApi
