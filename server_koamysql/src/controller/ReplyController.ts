import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import ReplyService from '@/modules/reply/ReplyService'

@Controller('/replymodule')
export default class EvaluateController {
  @post('/addReply')
  async addReply(ctx: Context) {
    const reply = ctx.request.body
    const replyRes = await ReplyService.addReply(reply)
    ctx.body = ctx.resSuccess(replyRes)
  }
}
