import { BookInfo } from './state'
import BookApi from '@/api/BookApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage from 'good-storage'

export default defineStore('bookStore', {
  state: () => {
    return {
      bookList: [] as BookInfo[]
    }
  },
  getters: {
    getBookList(state) {
      return state.bookList.length
        ? state.bookList
        : ((goodStorage.get('bookList') || []) as BookInfo[])
    }
  },
  actions: {
    async findAllBookListByScId(secondCtgyid: number) {
      const bookList: AxiosResponse<BookInfo[]> = await BookApi.getAllBookListByScId(
        secondCtgyid
      )
      this.bookList = bookList.data
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

      bookList.data = bookList.data.map((item) => {
        return {
          ...item,
          discountprice: toFixed_(item.originalprice * item.discount)
        }
      })

      this.bookList = bookList.data
      goodStorage.set('bookList', this.bookList)
    }
  }
})

const toFixed_ = (num: number): number => {
  if (num.toString().indexOf('.') !== -1) {
    return parseFloat(num.toFixed(2))
  }
  return num
}
