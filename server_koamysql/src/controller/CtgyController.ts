import { Context } from 'koa'
import { get, post, Controller } from '@/decorator'
import ctgyDao from '@/modules/ctgy/dao/CtgyDao'
import { findSecThrdCtgysByFstCtgyId } from '@modules/ctgy/defmodel'

@Controller('/ctgymodule')
class CtgyController {
  @get('/findSecThirdCtgys/:firstctgyid')
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = ctx.resSuccess(await ctgyDao.findSecThirdCtgys(parseInt(firstctgyid)))
  }

  @get('/findSecThirdCtgys2/:firstctgyid')
  async findSecThrdCtgysByFstCtgyId(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = ctx.resSuccess(await findSecThrdCtgysByFstCtgyId(parseInt(firstctgyid)))
  }
}
