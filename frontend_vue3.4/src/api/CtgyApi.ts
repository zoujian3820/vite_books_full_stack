import request from '@/utils/axiosUtil'

class CtgyApi {
  static api: CtgyApi = new CtgyApi()
  getFirstCtgyList() {
    return request.get('/ctgymodule/findFirstCtgys', false)
  }
  getSecThrdCtgyList(firstctgyId: number) {
    return request.get(`/ctgymodule/findSecThirdCtgys/${firstctgyId}`, false)
  }
}

export default CtgyApi.api
