import { defineStore } from 'pinia'
import SearchApi from '@/api/SearchApi'
import { AxiosResponse } from 'axios'
import goodstorageutil, { OPTION } from '@/utils/goodstorageutil'

export default defineStore('searchStrore', {
  state: () => {
    return initState
  },
  getters: {
    getKeyword(state) {
      return state.keyword
    },
    getAutoCompKeyword(state): string {
      return state.autoCompKeyword
        ? state.autoCompKeyword
        : goodstorageutil.get('autoCompKeyword')
    },
    getHistoryKeywordList(state): string[] {
      return state.historyKeywordList.length > 0
        ? state.historyKeywordList
        : goodstorageutil.get('historykeywordlist', OPTION.ACCUMU)
    },
    getHistoryKeywordObjList(state): HistoryKeyword[] {
      return state.historyKeywordObjList.length > 0
        ? state.historyKeywordObjList
        : goodstorageutil.get('historykeywordObjlist', OPTION.ACCUMU)
    }
  },
  actions: {
    storeAutoCompKeyword(autoCompKeyword: string) {
      this.autoCompKeyword = autoCompKeyword
      goodstorageutil.set('autoCompKeyword', autoCompKeyword)
    },
    storeKeyword(keyword: string = '') {
      this.keyword = keyword
    },
    async searchKeyword(keyword: string) {
      const keywordList: AxiosResponse<Keyword[]> = await SearchApi.searchKeywords(
        keyword
      )
      this.keywordList = keywordList.data
    },
    async addOrUpdateHistoryKeyword(historykeyword: string) {
      const result: AxiosResponse<number> =
        await SearchApi.addOrUpdateHistoryKeyword(historykeyword)
      if (result.data > 0) {
        this.historyKeywordList = goodstorageutil.set(
          'historykeywordlist',
          historykeyword,
          OPTION.ACCUMU
        )
      }
    },
    async findHistoryKeywords() {
      const result: AxiosResponse<HistoryKeyword[]> =
        await SearchApi.findHistoryKeywords()

      this.historyKeywordList = goodstorageutil.set(
        'historykeywordlist',
        result.data.map((item) => item.historykeyword)
      )
    },
    async searchDecovery() {
      const result: AxiosResponse<HistoryKeyword[]> =
        await SearchApi.searchDecovery()

      this.historyKeywordObjList = goodstorageutil.set(
        'historykeywordObjlist',
        result.data
      )
    },
    async delHistoryKeyword() {
      const res: AxiosResponse<number> = await SearchApi.delHistoryKeyword()
      if (res.data > 0) {
        this.historyKeywordList = goodstorageutil.set('historykeywordlist', [])
      }
    },
    async delDecoveryKeyword() {
      const limit = 6
      const res: AxiosResponse<number> = await SearchApi.delDecoveryKeyword(limit)
      if (res.data > 0) {
        this.historyKeywordObjList = goodstorageutil.set(
          'historykeywordObjlist',
          this.historyKeywordObjList.slice(limit)
        )
      }
    }
  }
})

export interface Keyword {
  keywordid: number
  keyword: string
}

export interface HistoryKeyword {
  historykeywordid: number
  historykeyword: string
  clickcount: number
}

/*
不用export导出的话，TS会报错如下：
导出类的公共静态属性“store”具有或正在使用外部模块“src/piniastore/search/index"”中的名称“Keyword”，但不能为其命名。ts(4026)

因为TS中定义的interface、type，使用了就必须要导出，使其在其他地方也能用，否则就会在外部调用处报错
此时若把export导出去除 src\piniaviews\search\service\index.ts中的 static store = searchStore() 这段代码就会报上面的错
*/
export type initStateType = {
  keyword: string
  keywordList: Keyword[]
  historyKeywordList: string[]
  historyKeywordObjList: HistoryKeyword[]
  autoCompKeyword: string
}

export const initKeywordVal = '请输入图书搜索关键字'
const initState: initStateType = {
  keyword: initKeywordVal,
  autoCompKeyword: '',
  keywordList: [],
  historyKeywordList: [],
  historyKeywordObjList: []
}
