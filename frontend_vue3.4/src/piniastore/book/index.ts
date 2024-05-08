import { BookInfo, CurpageDataType } from './state'
import BookApi from '@/api/BookApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage, { Operate } from '@/utils/goodstorageutil'
import searchStore from '@/piniastore/search'
import { hasProps, toFixed_ } from '@/utils'

export default defineStore('bookStore', {
  state: () => {
    return initState
  },
  getters: {
    getAutoCompKeyword() {
      return searchStore().getAutoCompKeyword
    },
    getBookList(state) {
      return state.bookList.length
        ? state.bookList
        : ((goodStorage.get('bookList') || []) as BookInfo[])
    },
    getOperate(state): Operate {
      return state.operate || goodStorage.get('operate')
    },
    getBookDetail(state): BookInfo {
      return hasProps(state.bookDetail)
        ? state.bookDetail
        : goodStorage.get('bookDetail') || {}
    },
    getISBN(state): string {
      return state.isbn || goodStorage.get('ISBN')
    },
    isLastPage(state): boolean {
      return state.curPageAllData.curPageNo === state.curPageAllData.totalPageNum
    },
    getCurPageData(state): CurpageDataType {
      return state.curPageAllData.curPageDataList.length
        ? state.curPageAllData
        : goodStorage.get('curpageData') || state.curPageAllData
    },
    getCurPageBookList(state): BookInfo[] {
      return state.curPageAllData.curPageDataList.length
        ? state.curPageAllData.curPageDataList
        : goodStorage.get('curpageData')?.curPageDataList || []
    }
  },
  actions: {
    storeISBN(isbn: string) {
      this.isbn = isbn
      goodStorage.set('ISBN', isbn)
    },
    storeOperate(operate: Operate) {
      this.operate = operate
      goodStorage.set('operate', this.operate)
    },
    async findBookLstWithPager() {
      if (
        !this.curPageAllData.curPageNo ||
        this.curPageAllData.curPageNo < this.curPageAllData.totalPageNum
      ) {
        this.curPageAllData.curPageNo = this.curPageAllData.curPageNo + 1
        const { data }: AxiosResponse<CurpageDataType> =
          await BookApi.findBookLstWithPager(this.curPageAllData.curPageNo)
        // 如果是第一页，则直接覆盖
        if (this.curPageAllData.curPageDataList.length === 0) {
          const bookList = { data: data.curPageDataList } as AxiosResponse<
            BookInfo[]
          >

          this.curPageAllData = {
            ...data,
            curPageDataList: getCalcDstpriceData(bookList)
          }
        } else {
          const { curPageNo, totalPageNum } = data
          Object.assign(this.curPageAllData, { curPageNo, totalPageNum })

          const bookList = { data: data.curPageDataList } as AxiosResponse<
            BookInfo[]
          >

          this.curPageAllData.curPageDataList.push(...getCalcDstpriceData(bookList))
        }
        goodStorage.set('curpageData', this.curPageAllData)
      }
    },
    async findAllBookListByScId(
      secondCtgyid: number,
      sortField: string,
      ascOrDesc: string
    ) {
      const bookList: AxiosResponse<BookInfo[]> = await BookApi.getAllBookListByScId(
        secondCtgyid,
        sortField,
        ascOrDesc
      )
      this.bookList = getCalcDstpriceData(bookList)
      goodStorage.set('bookList', this.bookList)
    },
    async findBooksByThirdCtgyId(
      thirdCtgyid: number,
      sortField?: string,
      ascOrDesc?: string
    ) {
      const bookList: AxiosResponse<BookInfo[]> = await BookApi.getBookList(
        thirdCtgyid,
        sortField,
        ascOrDesc
      )

      console.log('bookList====>', bookList)

      this.bookList = getCalcDstpriceData(bookList)
      goodStorage.set('bookList', this.bookList)
    },
    async findBooksByAutoCompKeyword(keyword: string) {
      const bookList: AxiosResponse<BookInfo[]> =
        await BookApi.findBooksByAutoCompKeyword(keyword)

      this.bookList = getCalcDstpriceData(bookList)
      goodStorage.set('bookList', this.bookList)
    },
    async findBksByPublishIds(publishids: number[]) {
      const bookList: AxiosResponse<BookInfo[]> = await BookApi.findBksByPublishIds(
        publishids
      )

      this.bookList = getCalcDstpriceData(bookList)
      goodStorage.set('bookList', this.bookList)
    },
    async findPublisersByAutoCompKey() {
      const bookList: AxiosResponse<Publisher[]> =
        await BookApi.findPublisersByAutoCompKey(this.getAutoCompKeyword)

      this.publisherList = bookList.data.map((item) => ({ ...item, checked: true }))
    },
    async findBookDetailsByISBN() {
      const res: AxiosResponse<BookInfo> = await BookApi.findBookDetailsByISBN(
        this.getISBN
      )
      const { data } = res
      this.bookDetail = {
        ...data,
        discountprice: toFixed_(data.originalprice * data.discount)
      }
      goodStorage.set('bookDetail', this.bookDetail)
    }
  }
})

const getCalcDstpriceData = (list: AxiosResponse<BookInfo[]>) => {
  return list.data.map((item) => {
    return {
      ...item,
      discountprice: toFixed_(item.originalprice * item.discount)
    }
  })
}

type InitStateType = {
  bookList: BookInfo[]
  bookDetail: BookInfo
  operate: Operate
  publisherList: Publisher[]
  isbn: string
  curPageAllData: CurpageDataType
  headerRef: HTMLBodyElement | undefined
  headerHeight: number
  headerOPacity: { opacity: number }
}

const initState: InitStateType = {
  bookList: [],
  bookDetail: {} as BookInfo,
  operate: Operate.INIT,
  publisherList: [],
  isbn: '',
  curPageAllData: {
    curPageDataList: [],
    totalPageNum: 0,
    curPageNo: 0
  },
  headerRef: undefined,
  headerHeight: 0,
  headerOPacity: { opacity: 1 }
}

export interface Publisher {
  publishid: number
  publishername: string
  checked: boolean
}

export const SORT = {
  originalprice: 'originalprice',
  desc: 'desc',
  asc: 'asc'
}
