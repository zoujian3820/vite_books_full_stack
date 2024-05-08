import { Orderinfo } from './entity'
import OrdAndOrdDetailDao from './OrdAndOrdDetailDao'
import { addEntryToArr } from '../commontypes'
import ShopCartDao from '../shopcart/dao/ShopCartDao'
import convert from './moduletypes'

class OrdAndOrdDetailService {
  static ordAndOrdDetailService: OrdAndOrdDetailService = new OrdAndOrdDetailService()
  async submitOrder(ordAndOrdDetail: Orderinfo) {
    // 1.保存订单
    const orderinfo = {
      ordertime: ordAndOrdDetail.ordertime,
      customerid: ordAndOrdDetail.customerid,
      orderstatus: 1
    }
    const dbOrderid: number = (await OrdAndOrdDetailDao.addOrderinfo(orderinfo))[0]
    ordAndOrdDetail.orderid = dbOrderid
    // 2.拼接订单id和订单详情
    const orderDetailLst = ordAndOrdDetail.orderDetailList!
    const lastOrderDetailLst = addEntryToArr(orderDetailLst, 'orderid', dbOrderid)
    // 3.保存订单详情
    let dbOrderDetailId: number
    for (let orderDetail of lastOrderDetailLst) {
      dbOrderDetailId = (await OrdAndOrdDetailDao.addOrderDetail(orderDetail))[0]
      orderDetail.orderdetailid = dbOrderDetailId
      // 4.删除对应购物车列表图书记录
      await ShopCartDao.delOneBookFrmSc(orderDetail.shopcartid!)
    }
    ordAndOrdDetail.orderDetailList = lastOrderDetailLst
    return ordAndOrdDetail
  }
  async findCurUsrOrdAndOrdDetail(customerid: number) {
    return convert((await OrdAndOrdDetailDao.findCurUsrOrdAndOrdDetail(customerid))[0])
  }
  async uptOrdStatusByOrdId(orderid: number): Promise<number> {
    const uptRows: number = (await OrdAndOrdDetailDao.uptOrdStatusByOrdId(orderid))[0].affectedRows
    return uptRows
  }
}

export default OrdAndOrdDetailService.ordAndOrdDetailService
