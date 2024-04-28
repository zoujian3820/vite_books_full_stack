import redisUtil from '@/common/RedisUtil'

import ShopcartModel from '@/modules/decormodel/shopcart'
import ShopCartDao from '../dao/ShopCartDao'
import { ShopCartRaw, ShopCartRaw_ } from '../raw'
import { combine } from '@/modules/commontypes'

const _objname = 'userShopCarHash'
const delRedisHash = (userid: number) => {
  if (userid) {
    const _key = `${_objname}_${userid}`
    redisUtil.hdel(_objname, _key)
  }
}

class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService()
  async findCurUserShopCartList(userid: number): Promise<ShopcartModel[]> {
    const _key = `${_objname}_${userid}`
    const userShopcartRedis = await redisUtil.hget(_objname, _key)

    // 第一次进来没有redis数据，查询mysql
    if (!userShopcartRedis) {
      console.log('进入查询mysql数据库')
      const userShopcart = await ShopCartDao.findCurUserShopCartList(userid)
      redisUtil.hset(_objname, _key, userShopcart)
      return userShopcart
    } else {
      console.log('进入redis缓存')
      return userShopcartRedis
    }
  }
  async addBookToShopCart(shopCart: ShopCartRaw, userid: number) {
    const result = await ShopCartDao.addBookToShopCart(shopCart)
    // 每当新增或更新购物车，都要先清除redis，防止用户购物车接口被取缓存
    delRedisHash(userid)
    return combine({ shopcartid: result[0] }, shopCart)
  }
  async appOrSubtrBookFrmShopCart(shopCart: ShopCartRaw_, userid: number) {
    // 每当新增或更新购物车，都要先清除redis，防止用户购物车接口被取缓存
    delRedisHash(userid)
    await ShopCartDao.appOrSubtrBookFrmShopCart(shopCart)
    return shopCart
  }
  async delOneBookFrmSc(shopcartid: number, userid: number) {
    delRedisHash(userid)
    return await ShopCartDao.delOneBookFrmSc(shopcartid)
  }
}

export default ShopCartService.shopCartService
