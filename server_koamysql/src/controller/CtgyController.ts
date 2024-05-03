import { Context } from 'koa'
import redisConf, { RedisClient } from '@/conf/RedisConfig'
import { get, post, Controller } from '@/decorator'
import ctgyDao from '@/modules/ctgy/dao/CtgyDao'
import ctgyService from '@/modules/ctgy/service/CtgyService'
import { findSecThrdCtgysByFstCtgyId } from '@modules/ctgy/defmodel'
import redisUtil from '@/common/RedisUtil'
// import MyJwt from '@/common/MyJwt'

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
    // const payloadData = await MyJwt.verifyJWTToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6MSwidXNlcm5hbWUiOiJ6aGFuZ3NhbiIsInBhc3N3b3JkIjoiMTIzNCIsImFkZHJlc3MiOiLlub_lt54iLCJ2YWxpZCI6MX0sImlhdCI6MTcxNDY2NjA2OSwiZXhwIjoxNzE0NjY2MDY5fQ.jJDA-iZ9ji8SC2TXK2AZV-fA1cJPs6E0ET5pshaHgkU',
    //   1
    // )
    // console.log('payloadData', payloadData)

    ctx.body = ctx.resSuccess(await ctgyService.findFirstCtgys())
  }
  @get('/findSecThirdCtgys2/:firstctgyid')
  async findSecThrdCtgysByFstCtgyId(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = ctx.resSuccess(await findSecThrdCtgysByFstCtgyId(parseInt(firstctgyid)))
  }
}
