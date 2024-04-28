import { storeToRefs } from 'pinia'
import FstToThrCtgy from '@/piniaviews/ctgy/service'
import bookStore from '@/piniastore/book'
import { ref } from 'vue'
import ShopCartService from '@/piniaviews/shopcart/service'
import { thirdAllCtgy } from '@/piniastore/ctgy'
import { BookInfo } from '@/piniastore/book/state'

export default class Books {
  static store = bookStore()
  static storeRefs = storeToRefs(Books.store)
  static sortField = ref('') // 排序字段
  static ascOrDesc = ref('desc') // 降序(desc)还是升序(asc)排列图书
  static isReadAsc = ref(true) // 控制价格升序和降序的图标

  static sortBook(_sortField: string) {
    if (
      Books.sortField.value === 'originalprice' &&
      _sortField === 'originalprice'
    ) {
      Books.isReadAsc.value = !Books.isReadAsc.value
    }
    Books.sortField.value = _sortField
    Books.ascOrDesc.value = Books.ascOrDesc.value === 'desc' ? 'asc' : 'desc'

    FstToThrCtgy.store.getThirdCtgy.thirdctgyid === thirdAllCtgy.thirdctgyid
      ? Books.findAllBooksByScId(
          FstToThrCtgy.store.getSecondCtgy.secondctgyid,
          Books.sortField.value,
          Books.ascOrDesc.value
        )
      : Books.findBooksByThirdCtgyId(
          FstToThrCtgy.store.getThirdCtgy.thirdctgyid,
          Books.sortField.value,
          Books.ascOrDesc.value
        )
  }
  static async findAllBooksByScId(
    secondctgyid?: number,
    sortField: string = 'originalprice',
    ascOrDesc: string = 'asc'
  ) {
    const scid = secondctgyid || FstToThrCtgy.store.getSecondCtgy.secondctgyid
    await Books.store.findAllBookListByScId(scid, sortField, ascOrDesc)
    // 获取购物车数据
    await ShopCartService.findCurUserShopCartList()
    // 更新每本书的当前购物车添加数量
    Books.uptBookNumWithSCLstNum()
  }
  static async findBooksByThirdCtgyId(
    thirdctgyid?: number,
    sortField: string = 'originalprice',
    ascOrDesc: string = 'asc'
  ) {
    const tcid = thirdctgyid || FstToThrCtgy.store.getThirdCtgy.thirdctgyid
    await Books.store.findBooksByThirdCtgyId(tcid, sortField, ascOrDesc)
    // 获取购物车数据
    await ShopCartService.findCurUserShopCartList()
    // 更新每本书的当前购物车添加数量
    Books.uptBookNumWithSCLstNum()
  }

  static updateBookNum(bookNum: number, curbookisbn?: string) {
    const bookList = Books.store.getBookList
    for (let i = 0; i < bookList.length; i++) {
      const book: BookInfo = bookList[i]
      if (curbookisbn && curbookisbn === book.ISBN) {
        book.purcharsenum = bookNum
        break
      } else if (!curbookisbn) {
        book.purcharsenum = bookNum
      }
    }
    return bookList
  }

  // 更新每本书的当前购物车添加数量
  static uptBookNumWithSCLstNum() {
    // const bookList = Books.store.bookList
    // bookList.forEach((book) => {
    //   // 每本书的当前购物车添加数量 初始设为0
    //   book.purcharsenum = 0
    // })

    ShopCartService.uptBookNumWithSCLstNum(this.updateBookNum(0))
  }
}
