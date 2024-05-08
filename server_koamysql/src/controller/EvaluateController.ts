import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import EvaluateDao from '@/modules/evaluate/dao/EvaluateDao'

@Controller('/evaluatemodule')
export default class EvaluateController {
  @get('/findEvalReplyLst/:isbn')
  async findEvalReplyLst(ctx: Context) {
    const { isbn } = ctx.params
    const evalReplyLst = await EvaluateDao.findEvalReplyLst(isbn)
    ctx.body = ctx.resSuccess(evalReplyLst)
  }
}
