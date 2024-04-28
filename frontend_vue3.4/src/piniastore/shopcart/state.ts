export type ShopCart = {
  userid: number
  checked: boolean
  shopcartid?: number
  bookisbn: string
  bookname: string
  bookpicname: string
  bookprice: number
  purcharsenum: number // 每本书的当前购物车添加数量 初始值为0
}

export const initShopcart: ShopCart[] = []
