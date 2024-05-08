import request from '@/utils/axiosUtil'

class EvaluateApi {
  static evaluateApi: EvaluateApi = new EvaluateApi()

  findEvalReplyLst(isbn: string) {
    // 登录接口
    return request.get(`/evaluatemodule/findEvalReplyLst/${isbn}`, false)
  }
}

export default EvaluateApi.evaluateApi
