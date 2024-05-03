import { BookInfo } from './state'
import BookApi from '@/api/BookApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage, { Operate } from '@/utils/goodstorageutil'
import searchStore from '@/piniastore/search'

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
    }
  },
  actions: {
    storeOperate(operate: Operate) {
      this.operate = operate
      goodStorage.set('operate', this.operate)
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
    }
  }
})

const toFixed_ = (num: number): number => {
  if (num.toString().indexOf('.') !== -1) {
    return parseFloat(num.toFixed(2))
  }
  return num
}

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
  operate: Operate
  publisherList: Publisher[]
}

const initState: InitStateType = {
  bookList: [],
  operate: Operate.INIT,
  publisherList: []
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
