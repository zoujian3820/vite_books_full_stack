import ReplyDao from './ReplyDao'
import { ReplyRaw } from './util'

class ReplyService {
  static replyService: ReplyService = new ReplyService()
  async addReply(reply: ReplyRaw) {
    // 调用ReplyDao的addReply方法
    const result = await ReplyDao.addReply(reply)
    return { ...reply, replyid: result[0] }
  }
}

export default ReplyService.replyService
