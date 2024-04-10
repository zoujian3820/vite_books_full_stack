import Router from 'koa-router'
import ctgyDao from '@/modules/ctgy/dao/CtgyDao'
import { Context } from 'koa'

const router = new Router()
router.prefix('/ctgymodule')

router.get('/findSecThrdCtgys/:firstctgyid', async (ctx: Context) => {
  const { firstctgyid } = ctx.params
  const result = await ctgyDao.findSecThrdCtgys(firstctgyid)
  ctx.body = ctx.resSuccess(result)
})

module.exports = router
