// JsDoc方式给ctx.params提示
// /**
//  * @param {Context & { params: { username: string } }} ctx
//  */
import { Context } from 'koa'
import Router from 'koa-router'
import logger from '../common/LogUtil'
import Userinfo from '../model/Userinfo'
import userDao from '../dao/UserDao'
import { addUser, findAllUser, findByProps, findByUsmAndPsw, findByLike, findByUsmAndAddr } from '../dao/UserDaoDefine'

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
/* 以下用的mysql手动写sql语句查询 */
router.get('/findUserinfo/:username/:password', async (ctx: Context) => {
  const { username, password } = ctx.params
  logger.debug(`执行路由请求findUserinfo开始...${username + '_' + password}`)
  const userinfos: Userinfo[] = await userDao.findUserinfo(username, password)
  // console.log('userinfos', userinfos)
  ctx.body = ctx.resSuccess(userinfos) //`您好：${username}`)
})

/* 以下使用 sequelize 操作mysql数据库 */
// 查找用户信息，传用户名和密码
router.get('/findByUsmAndPsw/:username/:password', async (ctx: Context) => {
  const { username, password } = ctx.params
  const userinfos: Userinfo | null = await findByUsmAndPsw(username, password)
  ctx.body = ctx.resSuccess(userinfos)
})

router.get('/findByUsmAndAddr/:key', async (ctx: Context) => {
  const { key } = ctx.params
  const userinfos: Userinfo[] = await findByUsmAndAddr()
  ctx.body = ctx.resSuccess(userinfos)
})

router.get('/findByLike/:key', async (ctx: Context) => {
  const { key } = ctx.params
  const userinfos: Userinfo[] = await findByLike(key)
  ctx.body = ctx.resSuccess(userinfos)
})

router.get('/findByProps', async (ctx: Context) => {
  const userinfos: Userinfo[] = await findByProps()
  ctx.body = ctx.resSuccess(userinfos)
})

router.get('/findAllUser', async (ctx: Context) => {
  const userinfos: Userinfo[] = await findAllUser()
  ctx.body = ctx.resSuccess(userinfos)
})

router.post('/addUser', async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body
  const dbUserinfo: Userinfo = await addUser(userinfo)
  // ctx.body = ctx.resSuccess(`您好：${userinfo.username}, 地址：${userinfo.address}`)
  // console.log('addUser result', dbUserinfo)
  ctx.body = ctx.resSuccess(dbUserinfo)
})

// export default router

// src\common\AllRouterLoader.ts 中使用require导入所有二级路由文件，所以改用node方法导出
module.exports = router
