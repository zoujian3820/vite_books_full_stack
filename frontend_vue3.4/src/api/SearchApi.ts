import request from '@/utils/axiosUtil'

class SearchApi {
  static api: SearchApi = new SearchApi()

  searchKeywords(Keyword: string) {
    return request.get(`/searchmodule/searchKeywords/${Keyword}`, false)
  }

  addOrUpdateHistoryKeyword(historykeyword: string) {
    return request.post('/searchmodule/addOrUpdateHistoryKeyword', false, {
      historykeyword
    })
  }

  findHistoryKeywords() {
    return request.get('/searchmodule/findHistoryKeywords', false)
  }

  searchDecovery(limit: number = 6) {
    return request.get(`/searchmodule/searchDecovery/${limit}`, false)
  }

  delDecoveryKeyword(limit: number = 6) {
    return request.delete(`/searchmodule/delDecoveryKeyword/${limit}`, false)
  }

  delHistoryKeyword() {
    return request.delete('/searchmodule/delHistoryKeyword', false)
  }
}

export default SearchApi.api
