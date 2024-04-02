// JsDoc方式给ctx.params提示
// /**
//  * @param {Context & { params: { username: string } }} ctx
//  */
import { Context } from 'koa'
import Router from 'koa-router'

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

router.get('/findUserinfo/:username', async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = ctx.resSuccess(`您好：${username}`)
})

router.post('/addUser', async (ctx: Context) => {
  const user: Userinfo = ctx.request.body
  ctx.body = ctx.resSuccess(`您好：${user.username}, 年龄：${user.age}`)
})

interface Userinfo {
  username: string
  password: string
  age: number
}

// export default router

// src\common\AllRouterLoader.ts 中使用require导入所有二级路由文件，所以改用node方法导出
module.exports = router
