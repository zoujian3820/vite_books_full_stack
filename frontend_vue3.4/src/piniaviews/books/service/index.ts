import { storeToRefs } from 'pinia'
import FstToThrCtgy from '@/piniaviews/ctgy/service'
import bookStore from '@/piniastore/book'
import { ref } from 'vue'

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

    Books.findBooksByThirdCtgyId(
      FstToThrCtgy.store.getThirdCtgy.thirdctgyid,
      Books.sortField.value,
      Books.ascOrDesc.value
    )
  }
  static findAllBooksByScId(secondctgyid?: number) {
    Books.store.findAllBookListByScId(
      secondctgyid || FstToThrCtgy.store.getSecondCtgy.secondctgyid
    )
  }
  static findBooksByThirdCtgyId(
    thirdctgyid?: number,
    sortField?: string,
    ascOrDesc?: string
  ) {
    Books.store.findBooksByThirdCtgyId(
      thirdctgyid || FstToThrCtgy.store.getThirdCtgy.thirdctgyid,
      sortField,
      ascOrDesc
    )
  }
}
