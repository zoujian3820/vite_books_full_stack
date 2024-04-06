// JsDoc方式给ctx.params提示
// /**
//  * @param {Context & { params: { username: string } }} ctx
//  */
import { Context } from 'koa'
import Router from 'koa-router'
import logger from '../common/LogUtil'
import Userinfo from '../model/Userinfo'
import userDao from '../dao/UserDao'

// 对Context接口进行扩展，添加params属性
// interface CustomContext extends Context {
//   params: {
//     username: string
//   }
// }
// 使用泛型，扩展一个params的提示
// const router = new Router<CustomContext>()
const router = new Router()

router.prefix('/usermodule')

router.get('/findUserinfo/:username/:password', async (ctx: Context) => {
  const { username, password } = ctx.params
  logger.debug(`执行路由请求findUserinfo开始...${username + '_' + password}`)
  const userinfos: Userinfo[] = await userDao.findUserinfo(username, password)
  // console.log('userinfos', userinfos)
  ctx.body = ctx.resSuccess(userinfos) //`您好：${username}`)
})

router.post('/addUser', async (ctx: Context) => {
  const user: Userinfo = ctx.request.body
  ctx.body = ctx.resSuccess(`您好：${user.username}, 地址：${user.address}`)
})

// export default router

// src\common\AllRouterLoader.ts 中使用require导入所有二级路由文件，所以改用node方法导出
module.exports = router
