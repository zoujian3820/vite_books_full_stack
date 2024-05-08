import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import searchStore, { HistoryKeyword, initKeywordVal } from '@/piniastore/search'
import router from '@/router'
import bookStore from '@/piniastore/book'
import goodstorageutil, { Operate } from '@/utils/goodstorageutil'
import FstToThrCtgy from '@/piniaviews/ctgy/service'
import { thirdAllCtgy } from '@/piniastore/ctgy'
import { debounce } from '@/utils'

export default class SearchService {
  static store = searchStore()
  static bookStore = bookStore()

  static storeRefs = storeToRefs(SearchService.store)
  static isOpenAutoComplete = ref(false)
  static init() {
    // 获取搜索历史关键字 初始数据
    SearchService.findHistoryKeywords()
    // 获取热搜关键字 初始数据
    SearchService.searchDecovery()
  }
  static getKeywordFrmStore() {
    return SearchService.store.keyword
  }
  static async searchBooksByKey(historykeyword: string) {
    SearchService.showOrCloseAutoComplete(false)
    await SearchService.store.addOrUpdateHistoryKeyword(historykeyword)
    SearchService.bookStore.storeOperate(Operate.AUTOCOMPKEYWORD)
    SearchService.store.storeAutoCompKeyword(historykeyword)

    // 从搜索进到图书列表 books页面，默认三级分类为 全选
    FstToThrCtgy.switchThrdCtgyActiveId.value = thirdAllCtgy.thirdctgyid
    FstToThrCtgy.store.storeThirdCtgy(thirdAllCtgy)

    const { firstctgyId } = goodstorageutil.get('firstCtgy') || { firstctgyId: 1 }
    const { secondctgyid } = goodstorageutil.get('secondCtgy') || { secondctgyid: 1 }
    // const { thirdctgyid } = goodstorageutil.get('thirdCtgy')
    // 跳至book页面
    router.push({
      path: '/books',
      query: {
        firstctgyid: firstctgyId,
        secondctgyid,
        // 搜索默认三级分类 选全部
        thirdctgyid: thirdAllCtgy.thirdctgyid
      }
    })
  }
  static showOrCloseAutoComplete(flag: boolean) {
    SearchService.isOpenAutoComplete.value = flag
  }
  static searchKeywords = debounce(async () => {
    const keyword = SearchService.getKeywordFrmStore()
    if (!keyword) {
      SearchService.showOrCloseAutoComplete(false)
    } else {
      await SearchService.store.searchKeyword(keyword)
      SearchService.showOrCloseAutoComplete(true)
    }
  }, 400)
  static closeKeywords() {
    if (!SearchService.getKeywordFrmStore()) {
      SearchService.store.storeKeyword(initKeywordVal)
    }
    SearchService.showOrCloseAutoComplete(false)
  }
  static resetKeyword() {
    if (SearchService.getKeywordFrmStore() === initKeywordVal) {
      SearchService.store.storeKeyword()
    } else {
      SearchService.showOrCloseAutoComplete(true)
    }
  }
  static async addOrUpdateHistoryKeyword(keyword: string) {
    await SearchService.store.addOrUpdateHistoryKeyword(keyword)
  }
  static findHistoryKeywords() {
    const { getHistoryKeywordList } = SearchService.store
    if (getHistoryKeywordList.length > 0) {
      SearchService.store.historyKeywordList = getHistoryKeywordList
    } else {
      SearchService.store.findHistoryKeywords()
    }
  }
  static searchDecovery() {
    // const { getHistoryKeywordObjList } = SearchService.store
    // if (getHistoryKeywordObjList.length > 0) {
    //   SearchService.store.historyKeywordObjList = getHistoryKeywordObjList
    // } else {
    SearchService.store.searchDecovery()
    // }
  }

  static async ondelHistoryKwd() {
    await SearchService.store.delHistoryKeyword()
  }

  static async ondelDecoveryKwd() {
    await SearchService.store.delDecoveryKeyword()
  }

  static ontapHistoryitem(keyword: string) {
    // 跳至book页面
    SearchService.searchBooksByKey(keyword)
  }
  static ontapDecoveryitem(item: HistoryKeyword) {
    // 跳至book页面
    SearchService.searchBooksByKey(item.historykeyword)
  }
}

// type CommonFunType = (...args: any) => any
// function debounce<T extends CommonFunType>(fn: T, wait: number = 200) {
//   let timer: any = 0
//   return function () {
//     timer && window.clearTimeout(timer)
//     timer = window.setTimeout(() => {
//       fn()
//       timer = 0
//     }, wait)
//   }
// }
