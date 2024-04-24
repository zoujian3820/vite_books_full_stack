import { Context } from 'koa'
import { get, Controller } from '@/decorator'
import BooksDao from '@/modules/books/dao/BooksDao'

@Controller('/booksmodule')
class BooksController {
  @get('/findBooksByThirdCtgyId/:thirdctgyid')
  async findBooksByThirdCtgyId(ctx: Context) {
    const { thirdctgyid } = ctx.params
    const { sortField, ascOrDesc } = ctx.query

    ctx.body = ctx.resSuccess(
      await BooksDao.findBooksByThirdCtgyId(
        parseInt(thirdctgyid),
        String(sortField || ''),
        String(ascOrDesc || '')
      )
    )
  }
  @get('/findBooksBySecondCtgyId')
  async findBooksBySecondCtgyId(ctx: Context) {
    const secondctgyid = Number(ctx.query.secondctgyid)
    if (!isNaN(secondctgyid)) {
      ctx.body = ctx.resSuccess(await BooksDao.findBooksBySecondCtgyId(secondctgyid))
    }
  }
}
