import request from '@/utils/axiosUtil'
import { Reply } from '@/piniastore/evaluate'

class ReplyApi {
  static replyApi: ReplyApi = new ReplyApi()

  addReply(reply: Reply) {
    return request.post('/replymodule/addReply', false, reply)
  }
}

export default ReplyApi.replyApi
