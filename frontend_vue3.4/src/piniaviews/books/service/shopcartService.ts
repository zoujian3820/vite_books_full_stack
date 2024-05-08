import shopcartStore from '@/piniastore/shopcart'
import { storeToRefs } from 'pinia'
import { BookInfo } from '@/piniastore/book/state'
import { ShopCart } from '@/piniastore/shopcart/state'
import Books from '@/piniaviews/books/service'
// import { ElMessageBox } from 'element-plus'
import { showDialog, showConfirmDialog } from 'vant'
import { computed, reactive, ref } from 'vue'
import router from '@/router'
import goodstorageutil from '@/utils/goodstorageutil'

function findShopcartByisbn(bookItem: BookInfo) {
  return ShopCartService.store.shopCartList.find(
    (item) => item.bookisbn === bookItem.ISBN
  )
}

type BallType = {
  showorhidden: boolean
  addBtnTarget?: EventTarget | null
}

export default class ShopCartService {
  static isSelectAll = ref(false)
  static store = shopcartStore()
  static storeRefs = storeToRefs(ShopCartService.store)
  static ball: BallType = reactive({ showorhidden: false })

  static getSonEle(ele: Element, innerEleName: string) {
    return <HTMLBodyElement>ele.getElementsByClassName(innerEleName)[0]
  }
  static updateIsSelectALL() {
    const shopcartLst = ShopCartService.store.getShopCartList
    const isSelectAll =
      !!shopcartLst.length && shopcartLst.every((item) => item.checked)

    ShopCartService.isSelectAll.value = isSelectAll
    return shopcartLst
  }
  static checkEveryCheckbox() {
    // 点击选中购物车商品后，检测全选，并把当前选中状态数据(checked)更新到store
    ShopCartService.store.storeShopCartList(ShopCartService.updateIsSelectALL())
  }
  static selectAll() {
    const { getShopCartList, storeShopCartList } = ShopCartService.store
    storeShopCartList(
      getShopCartList.map((item) => ({
        ...item,
        checked: ShopCartService.isSelectAll.value
      }))
    )
  }
  static toHome() {
    router.push('/')
  }
  static toShopCarList() {
    router.push('/shopcartlist')
  }
  // 小球加车抛物线飞入动画 钩子方法回调
  static beforeDrop(ele: Element) {
    document.body.scrollHeight
    // 1.获取加车按钮对象
    const addBtnEle = <HTMLBodyElement>ShopCartService.ball.addBtnTarget
    // 2.计算底部小球移动到按钮对象位置的坐标
    const curBallEle = ele as HTMLBodyElement
    const addBtnRect = addBtnEle.getBoundingClientRect()
    // const x = addBtnRect.left - 35
    // const y = -(window.innerHeight - addBtnRect.top - 45)

    const holderEle = curBallEle.parentNode?.querySelector('.holder')
    const curEleRect = holderEle!.getBoundingClientRect()
    const x =
      addBtnRect.left - curEleRect.left + (addBtnRect.width - curEleRect.width) / 2
    const y = addBtnRect.bottom - curEleRect.bottom - addBtnRect.height / 2

    // 外层控制Y轴
    curBallEle.style.transform = `translate3d(0, ${y}px, 0)`
    const inner = curBallEle.querySelector('.inner') as HTMLBodyElement
    // 内层控制X轴
    inner.style.transform = `translate3d(${x}px, 0, 0)`
  }
  static dropping(ele: Element, done: (...arg: any) => any) {
    // 由于vuek中的动画执行是放在nextTick中，而nextTick是要等dom更新完才执行
    // 所以用 document.body.scrollHeight 触发重绘使dom更新  提前执行nextTick 这样动画才能生效
    document.body.scrollHeight
    const curBallEle = ele as HTMLBodyElement
    curBallEle.style.transform = 'translate3d(0, 0, 0)'

    const inner = curBallEle.querySelector('.inner') as HTMLBodyElement
    inner.style.transform = 'translate3d(0, 0, 0)'
    done()
  }
  static afterDrop(ele: Element) {
    ShopCartService.ball.showorhidden = false
    ShopCartService.ball.addBtnTarget = undefined
  }
  // 加车时，先调用此方法开始小球动画
  static drop(event: Event) {
    // 保存当前加车按钮对象
    ShopCartService.ball.addBtnTarget = event.currentTarget
    // 先展示小球
    ShopCartService.ball.showorhidden = true
  }
  // static async findCurUserShopCartList(userid: number) {
  static async findCurUserShopCartList() {
    const userid = parseInt(goodstorageutil.get('userid')) || -1
    await ShopCartService.store.findCurUserShopCartList(userid)
  }

  static uptBookNumWithSCLstNum(books: BookInfo[]) {
    const shopCartList = ShopCartService.store.shopCartList
    shopCartList.forEach((ShopCartService) => {
      books.forEach((book) => {
        if (ShopCartService.bookisbn === book.ISBN) {
          book.purcharsenum = ShopCartService.purcharsenum
        }
      })
    })
  }
  static async addBookToShopCartWrapper(event: Event, bookItem: BookInfo) {
    if (goodstorageutil.get('access_token')) {
      ShopCartService.addBookToShopCart(event, bookItem)
    } else {
      // ElMessageBox.confirm('请先登录', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   router.push('/login')
      // })

      await showDialog({
        title: '提示',
        message: '请先登录'
      })
      router.push('/login')
    }
  }
  // 新增购物车
  static async addBookToShopCart(event: Event, bookItem: BookInfo) {
    const shopcart: ShopCart = {
      userid: goodstorageutil.get('userid'),
      checked: false,
      bookisbn: bookItem.ISBN,
      bookname: bookItem.bookname,
      bookpicname: bookItem.bookpicname,
      bookprice: bookItem.discountprice,
      purcharsenum: 1
    }

    // 加车时开始小球加车抛物线飞入动画
    ShopCartService.drop(event)

    await ShopCartService.store.addBookToShopCart(shopcart)
    // 更新购物车数据到图书列表
    // Books.uptBookNumWithSCLstNum()
    Books.updateBookNum(shopcart.purcharsenum, bookItem.ISBN)
  }
  static async appOrSubtrBookInShopCart(shopcart: ShopCart, event: Event) {
    const targetEl = <HTMLBodyElement>event.currentTarget
    const actionType: string = targetEl.getAttribute('actionType')!

    async function handlerFn(purcharsenum: number) {
      await ShopCartService.store.appOrSubtrBookFrmShopCart({
        ...shopcart,
        purcharsenum
      })
    }

    switch (actionType) {
      case 'add':
        handlerFn(shopcart.purcharsenum + 1)
        return
      case 'minus':
        handlerFn(shopcart.purcharsenum - 1)
        return
    }
  }
  static async appOrSubtrBookFrmShopCart(bookItem: BookInfo, event: Event) {
    const targetEl = <HTMLBodyElement>event.currentTarget
    const actionType: string = targetEl.getAttribute('actionType')!

    const findShopcart = findShopcartByisbn(bookItem)!

    async function handlerFn(purcharsenum: number) {
      await ShopCartService.store.appOrSubtrBookFrmShopCart({
        ...findShopcart,
        bookprice: bookItem.discountprice,
        purcharsenum
      })
      // 更新购物车数据到图书列表
      Books.updateBookNum(purcharsenum, bookItem.ISBN)
    }

    if (findShopcart) {
      switch (actionType) {
        case 'add':
          // 加车时开始小球加车抛物线飞入动画
          ShopCartService.drop(event)
          handlerFn(bookItem.purcharsenum + 1)
          return
        case 'minus':
          handlerFn(bookItem.purcharsenum - 1)
          return
      }
    }
  }
  static async delOneBookInSc(shopcart: ShopCart) {
    try {
      // await ElMessageBox.confirm('确定从购物车中删除这本书？', '删除', {
      //   type: 'warning',
      //   confirmButtonText: '确定',
      //   cancelButtonText: '再想想',
      //   center: true
      // })
      await showConfirmDialog({
        title: '删除',
        message: '确定从购物车中删除这本书？',
        cancelButtonText: '再想想'
      })
      await ShopCartService.store.delOneBookFrmSc(shopcart.shopcartid!)
    } catch (error) {
      console.log(error)
    }
  }
  static async delOneBookFrmSc(bookItem: BookInfo) {
    try {
      await showConfirmDialog({
        title: '删除',
        message: '确定从购物车中删除这本书？',
        cancelButtonText: '再想想'
      })
      // await ElMessageBox.confirm('确定从购物车中删除这本书？', '删除', {
      //   type: 'warning',
      //   confirmButtonText: '确定',
      //   cancelButtonText: '再想想',
      //   center: true
      // })

      const findShopcart = findShopcartByisbn(bookItem)!
      if (findShopcart && findShopcart.shopcartid) {
        const delNum = await ShopCartService.store.delOneBookFrmSc(
          findShopcart.shopcartid!
        )
        // 删除购物车商品成功后，更新购物车数据到图片列表
        delNum > 0 && Books.updateBookNum(0, bookItem.ISBN)
      }
    } catch (error) {
      console.log(error)
    }
  }
  static back() {
    router.back()
  }
  static refreshShopCartList() {
    const store = ShopCartService.store
    const totalCount = computed(() =>
      store.getShopCartList
        .filter((item) => item.checked)
        .reduce((pre, cur) => pre + cur.purcharsenum, 0)
    )
    const totalPrice = computed(() =>
      procDecimalZero(
        store.getShopCartList
          .filter((item) => item.checked)
          .reduce((pre, cur) => pre + cur.bookprice * cur.purcharsenum, 0)
      )
    )
    return { totalCount, totalPrice }
  }
}

function procDecimalZero(num: number) {
  let strValue = num.toString()
  const splitValues = strValue.split('.')
  if (splitValues.length === 1) {
    // 整数
    strValue = strValue + '.00'
  } else if (splitValues.length > 1) {
    // 只有一位小数
    if (splitValues[1].length === 1) {
      strValue = strValue + '0'
    } else if (splitValues[1].length > 2) {
      // 大于两位小数
      strValue = num.toFixed(2).toString()
    }
  }
  return strValue as any as number
}
