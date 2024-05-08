export type Orderinfo = {
  orderid?: number //订单id
  ordertime: string //订单时间
  customerid: number //顾客id，就是当前登录用户
  orderstatus: number //订单状态
  orderDetailList?: OrderDetail[]
}

export type OrderDetail = {
  orderdetailid?: number
  bookname: string
  bookprice: number
  bookpicname: string
  purcharsenum: number
  orderid?: number
  // 这个属性数据表没有，是接受前端传递过来的值，
  // 保证提交某个订单详情后 删除购物车列表中对应的图书信息
  shopcartid?: number
}

export type OrdAndOrdDetailLst = {
  orderid: number
  ordertime: string
  customerid: number
  orderstatus: number
  bookname: string
  bookpicname: string
  orderdetailid: number
  purcharsenum: number
  bookprice: number
}[]
