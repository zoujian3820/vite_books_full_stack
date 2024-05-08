import {
  getNoReptItem,
  combineRelativeCtgy,
  combine,
  EleOfArr,
  getSubItemsFrmArr
} from '../commontypes'
import { OrdAndOrdDetailLst } from './entity'

export default function convert(ordAndordDetailLst: OrdAndOrdDetailLst) {
  //1.获取订单数组-orderinfoList
  let orderinfoList = getSubItemsFrmArr(
    ordAndordDetailLst,
    'orderid',
    'ordertime',
    'customerid',
    'orderstatus'
  )
  //2.去重后的订单数组-noReptordList
  let noReptordList = getNoReptItem(orderinfoList, 'orderid')
  //3.获取订单详情数组-ordDetailList
  let ordDetailList = getSubItemsFrmArr(
    ordAndordDetailLst,
    'orderid',
    'bookname',
    'bookpicname',
    'orderdetailid',
    'purcharsenum',
    'bookprice'
  )
  //4.给去重后的订单数组的每一个元素都增加{"orderDetai1List":[]}
  const relativeordAndDetailList = combineRelativeCtgy(noReptordList, 'orderDetailList', [])
  //5.根据第4步,定义返回给前端的关联订单和订单详情数组变量

  const lastRelativeordAndDetailLst: typeof relativeordAndDetailList = []
  //6.获取第4步数组的元素类型
  type relativeordAndDetail = EleOfArr<typeof relativeordAndDetailList>
  //7.迭代去重后的订单数组
  noReptordList.map((noReptord) => {
    // 7.1定义第3步订单详情数组类型的变量

    const lastordDetailList: typeof ordDetailList = []
    // 7.2迭代第3步订单详情数组并比较每一个详情中的订单d和去重后订单数组迭代出来的订单元素的1d,
    // 如果相同就保存到7.1的变量中

    ordDetailList.forEach((ordDetail) => {
      if (ordDetail.orderid === noReptord.orderid) {
        lastordDetailList.push({
          orderid: ordDetail.orderid,
          bookname: ordDetail.bookname,
          bookpicname: ordDetail.bookpicname,
          purcharsenum: ordDetail.purcharsenum,
          orderdetailid: ordDetail.orderdetailid,
          bookprice: ordDetail.bookprice
        })
      }
    })
    //7.3合并去重订单迭代出来的订单元素和7.1定义的变量{orderDetai1List:7.1变量}
    const lastRelativeordAndDetail: relativeordAndDetail = combine(noReptord, {
      orderDetailList: lastordDetailList
    })
    //7.4把7.3合并出来的结果保存到第5步的变量中
    lastRelativeordAndDetailLst.push(lastRelativeordAndDetail)
  })
  //返回给上层,也是最终返回给前端的订单和订单详情数组
  return lastRelativeordAndDetailLst
}
