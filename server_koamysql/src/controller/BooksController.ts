import { Context } from 'koa'
import { get, post, Controller } from '@/decorator'
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
  @get('/findBooksBySecondCtgyId/:secondctgyid/:sortField/:ascOrDesc')
  async findBooksBySecondCtgyId(ctx: Context) {
    // const secondctgyid = Number(ctx.query.secondctgyid)
    const { secondctgyid, sortField, ascOrDesc } = ctx.params
    // if (!isNaN(secondctgyid)) {
    if (secondctgyid) {
      ctx.body = ctx.resSuccess(
        await BooksDao.findBooksBySecondCtgyId(parseInt(secondctgyid), sortField, ascOrDesc)
      )
    }
  }

  @get('/findBooksByAutoCompKeyword/:autoCompKeyword')
  async findBooksByAutoCompKeyword(ctx: Context) {
    const { autoCompKeyword } = ctx.params
    ctx.body = ctx.resSuccess(await BooksDao.findBooksByAutoCompKeyword(autoCompKeyword))
  }

  @get('/findPublisersByAutoCompKey/:autoCompKeyword')
  async findPublisersByAutoCompKey(ctx: Context) {
    const { autoCompKeyword } = ctx.params
    ctx.body = ctx.resSuccess(await BooksDao.findPublisersByAutoCompKey(autoCompKeyword))
  }

  @post('/findBksByPublishIds')
  async findBksByPublishIds(ctx: Context) {
    const publishids: number[] = ctx.request.body
    ctx.body = ctx.resSuccess(await BooksDao.findBksByPublishIds(publishids))
  }
}
