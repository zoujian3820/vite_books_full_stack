import { Context } from 'koa'
import { get, post, del, Controller } from '@/decorator'
import SearchService from '@/modules/search/service/SearchService'

@Controller('/searchmodule')
class SearchController {
  @get('/searchKeywords/:keyword')
  async searchKeywords(ctx: Context) {
    const { keyword } = ctx.params
    ctx.body = ctx.resSuccess(await SearchService.searchKeywords(keyword))
  }

  // 增加或更新历史关键字，在service层有判断是增加还是更新
  @post('/addOrUpdateHistoryKeyword')
  async addOrUpdateHistoryKeyword(ctx: Context) {
    const { historykeyword } = ctx.request.body
    ctx.body = ctx.resSuccess(await SearchService.addOrUpdateHistoryKeyword(historykeyword))
  }

  // 查询是否存在该历史关键字
  @get('/searchHistoryKeywords/:historykeyword')
  async searchHistoryKeywords(ctx: Context) {
    const { historykeyword } = ctx.params
    ctx.body = ctx.resSuccess(await SearchService.searchHistoryKeywords(historykeyword))
  }

  @get('/findHistoryKeywords')
  async findHistoryKeywords(ctx: Context) {
    ctx.body = ctx.resSuccess(await SearchService.findHistoryKeywords())
  }

  @get('/searchDecovery/:limit')
  async searchHotHistoryKeywords(ctx: Context) {
    const limit = parseInt(ctx.params.limit)
    ctx.body = ctx.resSuccess(await SearchService.searchDecovery(limit))
  }

  @del('/delDecoveryKeyword/:limit')
  async delDecoveryKeyword(ctx: Context) {
    const limit = parseInt(ctx.params.limit)
    ctx.body = ctx.resSuccess(await SearchService.delDecoveryKeyword(limit))
  }

  @del('/delHistoryKeyword')
  async delHistoryKeyword(ctx: Context) {
    ctx.body = ctx.resSuccess(await SearchService.delHistoryKeyword())
  }
}
