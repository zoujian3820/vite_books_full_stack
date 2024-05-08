import { sequelize } from '@/modules/BaseDao'
import { OrderDetail, Orderinfo } from './entity'

class OrdAndOrdDetailDao {
  static ordAndOrdDetailDao: OrdAndOrdDetailDao = new OrdAndOrdDetailDao()
  async addOrderinfo(orderinfo: Orderinfo): Promise<[any, any]> {
    const ordSql = `
        insert into 
        orderinfo(ordertime, customerid, orderstatus) 
        values('${orderinfo.ordertime}', ${orderinfo.customerid}, ${orderinfo.orderstatus})
    `
    return await sequelize.query(ordSql)
  }
  async addOrderDetail(orderDetail: OrderDetail): Promise<[any, any]> {
    const ordSql = `
    insert into 
        orderdetail(
            bookname,
            bookprice,
            bookpicname,
            purcharsenum,
            orderid
        ) 
    values(
        '${orderDetail.bookname}',
        ${orderDetail.bookprice},
        '${orderDetail.bookpicname}',
        ${orderDetail.purcharsenum},
        ${orderDetail.orderid}
    )
`
    return await sequelize.query(ordSql)
  }
  async findCurUsrOrdAndOrdDetail(customerid: number): Promise<[any, any]> {
    const sql = `
    select 
      od.orderid,
      date_format(od.ordertime, '%Y-%m-%d %H:%i:%s') AS ordertime,
      od.customerid,
      od.orderstatus,
      
      oe.bookprice,
      oe.bookname,
      oe.bookpicname,
      oe.bookpicname,
      oe.orderdetailid,
      oe.purcharsenum
    from 
      orderinfo as od 
    inner join 
      orderdetail as oe 
    ON od.orderid=oe.orderid 
    AND od.customerid=${customerid}
    `
    return await sequelize.query(sql)
  }
  async uptOrdStatusByOrdId(orderid: number): Promise<[any, any]> {
    const uptOrdStatusSql = `
    update orderinfo set orderstatus=-1 where orderid=${orderid}
    `
    return await sequelize.query(uptOrdStatusSql)
  }
}

export default OrdAndOrdDetailDao.ordAndOrdDetailDao
