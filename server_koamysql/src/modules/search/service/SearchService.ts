import SearchDao from '../dao/SearchDao'
// import { combine } from '@/modules/commontypes'
import RedisUtil from '@/common/RedisUtil'

const redisObj_ = 'historyKeyword'
const redisKey_ = 'topSixSearch'

class SearchService {
  static searchService: SearchService = new SearchService()

  async addOrUpdateHistoryKeyword(historykeyword: string) {
    const dbHistoryKeyword = await SearchService.searchService.searchHistoryKeywords(historykeyword)
    if (dbHistoryKeyword) {
      const result: [{ affectedRows: number }, any] = await SearchDao.updateHistoryKeywordCount(
        historykeyword
      )
      // console.log('update===', result)
      RedisUtil.hdel(redisObj_, redisKey_)
      // affectedRows受影响更新的行数
      return result[0].affectedRows
    } else {
      const result: [number, number] = await SearchDao.saveHistoryKeywords(historykeyword)
      // console.log('save===', result)
      RedisUtil.hdel(redisObj_, redisKey_)
      return result[0]
    }
  }

  async searchKeywords(keyword: string) {
    return await SearchDao.searchKeywords(keyword)
  }

  async searchHistoryKeywords(historykeyword: string) {
    return await SearchDao.searchHistoryKeywords(historykeyword)
  }

  async findHistoryKeywords() {
    return await SearchDao.findHistoryKeywords()
  }

  async searchDecovery(limit: number) {
    const keywordRedis = await RedisUtil.hget(redisObj_, redisKey_)
    if (keywordRedis) {
      return keywordRedis
    } else {
      const keywordList = await SearchDao.searchDecovery(limit)
      RedisUtil.hset(redisObj_, redisKey_, keywordList)
      return keywordList
    }
  }

  async delDecoveryKeyword(limit: number) {
    const result: [{ affectedRows: number }, any] = await SearchDao.delDecoveryKeyword(limit)
    // console.log('========res', result)
    RedisUtil.hdel(redisObj_, redisKey_)

    // affectedRows受影响 被删除 的行数
    return result[0].affectedRows
  }
  async delHistoryKeyword() {
    const result: [{ affectedRows: number }, any] = await SearchDao.delHistoryKeyword()
    // console.log('========del', result)
    RedisUtil.hdel(redisObj_, redisKey_)

    return result[0].affectedRows
  }
}

export default SearchService.searchService
