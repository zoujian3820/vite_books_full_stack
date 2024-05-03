import { ShopCart, initShopcart } from './state'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import shopCartApi from '@/api/ShopCartApi'
import goodStorage from 'good-storage'
import Storage, { OPTION } from '@/utils/goodstorageutil'

export default defineStore('shopcartStrore', {
  state: () => {
    return {
      shopCartList: [...initShopcart]
    }
  },
  getters: {
    getShopCartList(state) {
      return state.shopCartList.length > 0
        ? state.shopCartList
        : ((goodStorage.get('shopCartList') || []) as typeof initShopcart)
    }
  },
  actions: {
    storeShopCartList(shopCartList: ShopCart[]) {
      this.shopCartList = shopCartList
      Storage.set('shopCartList', shopCartList)
    },
    // 获取所有购物车列表接口
    async findCurUserShopCartList(userid: number) {
      const result: AxiosResponse<ShopCart[]> = await shopCartApi.getShopCartList(
        userid
      )

      const localScLst: ShopCart[] = Storage.get(
        'shopCartList',
        OPTION.ADDORAPPOBJTOARR
      )

      this.shopCartList = result.data.map((item) => ({
        ...item,
        checked:
          localScLst.find(({ shopcartid }) => shopcartid === item.shopcartid)
            ?.checked || item.checked
      }))
      // goodStorage.set('shopCartList', result.data)
      Storage.set('shopCartList', this.shopCartList)
    },
    // 新增购物车接口
    async addBookToShopCart(shopcart: ShopCart) {
      const result: AxiosResponse<ShopCart> = await shopCartApi.addBookToShopCart(
        shopcart
      )
      // const dbShopCart: ShopCart = result.data

      // const index = this.shopCartList.findIndex(
      //   (item) => item.shopcartid === dbShopCart.shopcartid
      // )
      // if (index !== -1) {
      //   this.shopCartList.splice(index, 1, dbShopCart)
      // } else {
      //   this.shopCartList.push(dbShopCart)
      // }

      // const shopCartList: ShopCart[] = Storage.set(
      //   'shopCartList',
      //   dbShopCart,
      //   OPTION.ADDORAPPOBJTOARR,
      //   'shopcartid',
      //   dbShopCart.shopcartid
      // )

      // this.shopCartList = Storage.get('shopCartList', OPTION.ADDORAPPOBJTOARR)
      // this.shopCartList = shopCartList
      this.shopCartList = storeShopCart(result)
    },
    // 更新购物车接口
    async appOrSubtrBookFrmShopCart(shopcart: ShopCart) {
      const result: AxiosResponse<ShopCart> =
        await shopCartApi.appOrSubtrBookFrmShopCart(shopcart)
      this.shopCartList = storeShopCart(result)
    },
    async delOneBookFrmSc(shopcartid: number) {
      const { data }: AxiosResponse<number> = await shopCartApi.delOneBookFrmSc(
        shopcartid
      )
      if (data > 0) {
        // this.shopCartList = Storage.set(
        //   'shopCartList',
        //   this.shopCartList.filter((item) => item.shopcartid !== shopcartid)
        // )
        // this.shopCartList = this.shopCartList.filter(
        //   (item) => item.shopcartid !== shopcartid
        // )

        Storage.remove(
          'shopCartList',
          OPTION.ADDORAPPOBJTOARR,
          'shopcartid',
          shopcartid
        )

        this.shopCartList = Storage.get('shopCartList', OPTION.ADDORAPPOBJTOARR)
      }
      return data
    }
  }
})

function storeShopCart(result: AxiosResponse<ShopCart>) {
  const dbShopCart: ShopCart = result.data
  dbShopCart.checked = true
  // 更新购物车数据
  const shopCartList: ShopCart[] = Storage.set(
    'shopCartList',
    dbShopCart,
    OPTION.ADDORAPPOBJTOARR,
    'shopcartid',
    dbShopCart.shopcartid
  )
  return shopCartList
}
