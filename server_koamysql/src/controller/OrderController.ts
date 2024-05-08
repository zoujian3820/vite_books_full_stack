import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import OrdAndOrdDetailService from '@/modules/orderinfo/OrdAndOrdDetailService'

@Controller('/ordAndOrdDetailModule')
export default class EvaluateController {
  @post('/addOrdAndOrDetail')
  async addOrdAndOrDetail(ctx: Context) {
    const ordAndOrdDetail = ctx.request.body
    const lastOrderDetailLst = await OrdAndOrdDetailService.submitOrder(ordAndOrdDetail)
    ctx.body = ctx.resSuccess(lastOrderDetailLst)
  }

  @get('/findCurUsrOrdAndOrdDetail/:customerid')
  async findCurUsrOrdAndOrdDetail(ctx: Context) {
    const { customerid } = ctx.params
    const curUsrOrdAndOrdDetailLst = await OrdAndOrdDetailService.findCurUsrOrdAndOrdDetail(
      parseInt(customerid)
    )
    ctx.body = ctx.resSuccess(curUsrOrdAndOrdDetailLst)
  }

  @get('/uptOrdStatusByOrdId/:orderid')
  async uptOrdStatusByOrdId(ctx: Context) {
    const { orderid } = ctx.params
    ctx.body = ctx.resSuccess(await OrdAndOrdDetailService.uptOrdStatusByOrdId(parseInt(orderid)))
  }
}
