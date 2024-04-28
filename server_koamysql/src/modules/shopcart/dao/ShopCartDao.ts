import { sequelize } from '@modules/BaseDao'
import ShopcartModel from '@/modules/decormodel/shopcart'
import { ShopCartRaw, ShopCartRaw_ } from '../raw'

class ShopCartDao {
  static shopCartDao: ShopCartDao = new ShopCartDao()
  // 获取用户购物车商品列表接口
  async findCurUserShopCartList(userid: number) {
    return await ShopcartModel.findAll({
      raw: true,
      where: { userid }
    })
  }
  // 添加购物车接口
  async addBookToShopCart(shopCart: ShopCartRaw): Promise<[any, any]> {
    const sql = `
      insert into books.shopcart(bookisbn, bookname, bookpicname, bookprice, userid, purcharsenum) 
      values('${shopCart.bookisbn}', '${shopCart.bookname}', '${shopCart.bookpicname}', ${shopCart.bookprice}, ${shopCart.userid}, ${shopCart.purcharsenum})
    `
    return await sequelize.query(sql)
  }
  // 更新购物车商品 加车数量 接口
  async appOrSubtrBookFrmShopCart(shpoCart: ShopCartRaw_): Promise<[any, any]> {
    const sql = `
      update books.shopcart set purcharsenum=${shpoCart.purcharsenum} 
      where shopcartid=${shpoCart.shopcartid}
    `
    return await sequelize.query(sql)
  }
  // 删除购物车商品接口
  async delOneBookFrmSc(shopcartid: number) {
    // 返回的数字为：删除的数据条目数
    return await ShopcartModel.destroy({ where: { shopcartid } })
  }
}

export default ShopCartDao.shopCartDao
