import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
// import ShopCartDao from '@/modules/shopcart/dao/ShopCartDao'
import ShopCartService from '@/modules/shopcart/service/ShopCartService'

@Controller('/shopcartmodule')
class ShopcartController {
  @get('/findCurUserShopCartList/:userid')
  async findCurUserShopCartList(ctx: Context) {
    // console.log(ctx.req.headers, ctx.cookies.get('name'))

    // ctx.cookies.set('userid', '1')
    // ctx.set({
    //   'Xaa-Haha': '123',
    //   'Set-Cookie': ['foo=bar; Path=/; HttpOnly', 'age=23; Path=/; HttpOnly']
    // })
    // ctx.append('Set-Cookie', 'name=mrzou; Path=/; HttpOnly')

    const { userid } = ctx.params
    ctx.body = ctx.resSuccess(await ShopCartService.findCurUserShopCartList(parseInt(userid)))
  }

  @post('/addBookToShopCart')
  async addBookToShopCart(ctx: Context) {
    const userid = ctx.req.headers.userid as string
    // const userid = ctx.cookies.get('userid') || ''
    const shopCartRaw = ctx.request.body
    ctx.body = ctx.resSuccess(
      await ShopCartService.addBookToShopCart(shopCartRaw, parseInt(userid))
    )
  }
  @post('/appOrSubtrBookFrmShopCart')
  async appOrSubtrBookFrmShopCart(ctx: Context) {
    const userid = ctx.req.headers.userid as string
    const shopCartRaw = ctx.request.body
    ctx.body = ctx.resSuccess(
      await ShopCartService.appOrSubtrBookFrmShopCart(shopCartRaw, parseInt(userid))
    )
  }
  @del('/delOneBookFrmSc/:shopcartid')
  async delOneBookFrmSc(ctx: Context) {
    const userid = ctx.req.headers.userid as string
    const { shopcartid } = ctx.params
    ctx.body = ctx.resSuccess(
      await ShopCartService.delOneBookFrmSc(parseInt(shopcartid), parseInt(userid))
    )
  }
}
