import { Context } from 'koa'

import redisConf, { RedisClient } from '@/conf/RedisConfig'

import { get, post, Controller } from '@/decorator'
import ctgyDao from '@/modules/ctgy/dao/CtgyDao'
import ctgyService from '@/modules/ctgy/service/CtgyService'

import { findSecThrdCtgysByFstCtgyId } from '@modules/ctgy/defmodel'
import redisUtil from '@/common/RedisUtil'
@Controller('/ctgymodule')
class CtgyController {
  @get('/testRedis')
  async testRedis(ctx: Context) {
    const redisClient: RedisClient = redisConf.redisServerConf()

    redisClient.set('username1', 'wangwu')
    redisClient.hset('user1', 'name', 'acho')
    redisClient.hmset('user2', 'name', 'acho', 'age', 28, 'sex', 'woman')

    const getUsername1 = await redisClient.get('username1')
    const hgetUser1Name = await redisClient.hget('user1', 'name')
    const hgetallUser2 = await redisClient.hgetall('user2')
    const hgetallfirstCtgysHash = await redisUtil.hgetall('firstCtgysHash')
    // const hgetallfirstCtgysHash = await redisClient.hgetall('firstCtgysHash')

    ctx.body = ctx.resSuccess({
      get: getUsername1,
      hget: hgetUser1Name,
      hgetALL: hgetallUser2,
      hgetall: hgetallfirstCtgysHash
    })
  }

  @get('/findSecThirdCtgys/:firstctgyid')
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = ctx.resSuccess(await ctgyDao.findSecThirdCtgys(parseInt(firstctgyid)))
  }
  @get('/findFirstCtgys')
  async findFirstCtgys(ctx: Context) {
    ctx.body = ctx.resSuccess(await ctgyService.findFirstCtgys())
  }
  @get('/findSecThirdCtgys2/:firstctgyid')
  async findSecThrdCtgysByFstCtgyId(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = ctx.resSuccess(await findSecThrdCtgysByFstCtgyId(parseInt(firstctgyid)))
  }
}
