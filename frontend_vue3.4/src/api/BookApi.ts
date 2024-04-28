import request from '@/utils/axiosUtil'
class BookApi {
  static bookApi: BookApi = new BookApi()
  getBookList(thirdCtgyid: number, sortField: string = '', ascOrDesc: string = '') {
    const params: Record<string, string> = {}
    if (sortField) {
      params.sortField = sortField
      params.ascOrDesc = ascOrDesc || 'asc'
    }

    return request.get(`/booksmodule/findBooksByThirdCtgyId/${thirdCtgyid}`, false, {
      params
    })
  }
  getAllBookListByScId(
    secondctgyid: number,
    sortField: string = 'originalprice',
    ascOrDesc: string = 'asc'
  ) {
    // return request.get('/booksmodule/findBooksBySecondCtgyId', false, {
    //   params: { secondctgyid }
    // })
    return request.get(
      `/booksmodule/findBooksBySecondCtgyId/${secondctgyid}/${sortField}/${ascOrDesc}`,
      false
    )
  }
}

export default BookApi.bookApi
