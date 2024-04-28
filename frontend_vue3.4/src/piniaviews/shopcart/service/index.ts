import shopcartStore from '@/piniastore/shopcart'
import { storeToRefs } from 'pinia'
import { BookInfo } from '@/piniastore/book/state'
import { ShopCart } from '@/piniastore/shopcart/state'
import Books from '@/piniaviews/books/service'
import { ElMessageBox } from 'element-plus'
import { computed, reactive } from 'vue'

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
  static store = shopcartStore()
  static storeRefs = storeToRefs(ShopCartService.store)
  static ball: BallType = reactive({ showorhidden: false })

  static getSonEle(ele: Element, innerEleName: string) {
    return <HTMLBodyElement>ele.getElementsByClassName(innerEleName)[0]
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
    await ShopCartService.store.findCurUserShopCartList(1)
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
  // 新增购物车
  static async addBookToShopCart(event: Event, bookItem: BookInfo) {
    const shopcart: ShopCart = {
      userid: 1,
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
    // 更新购物车数据到图片列表
    // Books.uptBookNumWithSCLstNum()
    Books.updateBookNum(shopcart.purcharsenum, bookItem.ISBN)
  }

  static async appOrSubtrBookFrmShopCart(bookItem: BookInfo, event: Event) {
    const targetEl = <HTMLBodyElement>event.currentTarget
    const actionType: string = targetEl.getAttribute('actionType')!

    const findShopcart = findShopcartByisbn(bookItem)!

    async function handlerFn(purcharsenum: number) {
      await ShopCartService.store.appOrSubtrBookFrmShopCart({
        ...findShopcart,
        purcharsenum
      })
      // 更新购物车数据到图片列表
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
  static async delOneBookFrmSc(bookItem: BookInfo) {
    try {
      await ElMessageBox.confirm('确定从购物车中删除这本书？', '删除', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '再想想',
        center: true
      })

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
  static refreshShopCartList() {
    const store = ShopCartService.store
    const totalCount = computed(() =>
      store.shopCartList.reduce((pre, cur) => pre + cur.purcharsenum, 0)
    )
    const totalPrice = computed(() =>
      parseFloat(
        store.shopCartList
          .reduce((pre, cur) => pre + cur.bookprice * cur.purcharsenum, 0)
          .toFixed(2)
      )
    )
    return { totalCount, totalPrice }
  }
}
