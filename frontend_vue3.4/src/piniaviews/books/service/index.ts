import { storeToRefs } from 'pinia'
import FstToThrCtgy from '@/piniaviews/ctgy/service'
import bookStore, { Publisher } from '@/piniastore/book'
import { ref /*Ref*/ } from 'vue'
import ShopCartService from '@/piniaviews/books/service/shopcartService'
import { thirdAllCtgy } from '@/piniastore/ctgy'
import { BookInfo } from '@/piniastore/book/state'
import { Operate, getValArrOfObj } from '@/utils/goodstorageutil'
import { ElMessage } from 'element-plus'
import router from '@/router'

export default class Books {
  static store = bookStore()
  static storeRefs = storeToRefs(Books.store)
  static sortField = ref('') // 排序字段
  static ascOrDesc = ref('desc') // 降序(desc)还是升序(asc)排列图书
  static isReadAsc = ref(true) // 控制价格升序和降序的图标
  static isAutoCompSearch = ref(false)
  static isReadyOpen = ref(true)
  // static publisherPanelRef: Ref<HTMLBodyElement | undefined> = ref<HTMLBodyElement>()

  static bookDetail(isbn: string) {
    Books.store.storeISBN(isbn)
    router.push({ name: 'bookdetail' })
  }

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
  static init() {
    Books.getOperate()
    Books.findPublisersByAutoCompKey()
  }
  static async findPublisersByAutoCompKey() {
    if (Books.store.getOperate === Operate.AUTOCOMPKEYWORD) {
      await Books.store.findPublisersByAutoCompKey()
    }
  }
  static async findBksByPublishIds() {
    const publishids = getValArrOfObj(
      Books.store.publisherList.filter((item) => item.checked),
      'publishid'
    )
    if (publishids.length > 0) {
      await Books.store.findBksByPublishIds(publishids)
      Books.uptShopCartAndBkNum()
    } else {
      // ElMessage({
      //   message: '请至少选择一个出版社',
      //   center: true,
      //   type: 'warning'
      // })
      ElMessage.error('请至少选择一个出版社')
    }

    // Books.publisherPanelRef.value!.className = 'publisher-panel'
  }
  static onPubPanelClick(item: Publisher) {
    item.checked = !item.checked
  }

  static getOperate() {
    Books.isAutoCompSearch.value =
      Books.store.getOperate === Operate.AUTOCOMPKEYWORD ? true : false
  }
  static searchBooks(secondctgyid?: number) {
    // console.log('searchBooks=====')
    const operate = Books.store.getOperate
    if (operate === Operate.THRDCTGYID) {
      // Books.findBooksByThirdCtgyId(secondctgyid)
      Books.findAllBooksByScId(secondctgyid)
    } else if (operate === Operate.AUTOCOMPKEYWORD) {
      Books.findBksByAutoCompKeyword()
    }
  }
  static async findBksByAutoCompKeyword() {
    const autoComKeyword = Books.store.getAutoCompKeyword
    // console.log('autoComKeyword', autoComKeyword)
    await Books.store.findBooksByAutoCompKeyword(autoComKeyword)
    Books.uptShopCartAndBkNum()
  }

  static async findAllBooksByScId(
    secondctgyid?: number,
    sortField: string = 'originalprice',
    ascOrDesc: string = 'asc'
  ) {
    const scid = secondctgyid || FstToThrCtgy.store.getSecondCtgy.secondctgyid
    await Books.store.findAllBookListByScId(scid, sortField, ascOrDesc)

    Books.uptShopCartAndBkNum()
  }
  static async findBooksByThirdCtgyId(
    thirdctgyid?: number,
    sortField: string = 'originalprice',
    ascOrDesc: string = 'asc'
  ) {
    const tcid = thirdctgyid || FstToThrCtgy.store.getThirdCtgy.thirdctgyid
    await Books.store.findBooksByThirdCtgyId(tcid, sortField, ascOrDesc)

    Books.uptShopCartAndBkNum()
  }
  static async uptShopCartAndBkNum() {
    const shopCartList = ShopCartService.store.shopCartList
    // 购物车有数据就不请求，避免来回切页面时，购物车列表页面的选中状态被请求数据覆盖
    if (!shopCartList?.length) {
      // 获取购物车数据
      await ShopCartService.findCurUserShopCartList()
    }
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
