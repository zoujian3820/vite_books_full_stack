import request from '@/utils/axiosUtil'
import { ShopCart } from '@/piniastore/shopcart/state'
class ShopCartApi {
  static shopCartApi: ShopCartApi = new ShopCartApi()
  // 获取用户所有购物车列表接口
  getShopCartList(userid: number) {
    return request.get(`/shopcartmodule/findCurUserShopCartList/${userid}`, false)
  }
  // 新增购物车数据接口
  addBookToShopCart(shopcart: ShopCart) {
    return request.post('/shopcartmodule/addBookToShopCart', false, shopcart)
  }
  // 更新购物车接口
  appOrSubtrBookFrmShopCart(shopcart: ShopCart) {
    return request.post('/shopcartmodule/appOrSubtrBookFrmShopCart', false, shopcart)
  }
  // 删除购物车商品
  delOneBookFrmSc(shopcartid: number) {
    return request.delete(`/shopcartmodule/delOneBookFrmSc/${shopcartid}`, false)
  }
}

export default ShopCartApi.shopCartApi
