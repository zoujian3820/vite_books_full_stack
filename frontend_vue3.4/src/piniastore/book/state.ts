export interface BookInfo {
  ISBN: string
  bookname: string
  author: string
  publishid: number
  publishername: string
  monthsalecount: number
  purcharsenum: number // ++ 每本书的当前购物车添加数量 初始值为0
  bookpicname: string
  secondctgyid: number
  thirdctgyid: number
  discountprice: number // ++
  discount: number // 折扣
  disPercent: number // 折扣*100 ++
  originalprice: number
  integerpart: number // 整数部分 ++
  fractpart: number // 小数部分 ++
  isDecimal: boolean // 是否是小数 ++
  ranking: number // ++
}
