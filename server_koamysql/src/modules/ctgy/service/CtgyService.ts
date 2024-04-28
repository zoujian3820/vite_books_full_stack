import RedisConfig, { RedisClient } from '@/conf/RedisConfig'
import FirstCtgys from '@modules/decormodel/firstCtgy'
import CtgyDao from '../dao/CtgyDao'
import redisUtil from '@/common/RedisUtil'

class CtgyService {
  static ctgyService: CtgyService = new CtgyService()
  async findFirstCtgys(): Promise<FirstCtgys[]> {
    // const redisClient: RedisClient = RedisConfig.redisServerConf()
    const firstCtgyRedis = await redisUtil.hget('firstCtgysHash', 'firstCtgys')

    // 第一次进来没有redis数据，查询mysql
    if (!firstCtgyRedis) {
      console.log('进入查询mysql数据库')
      const firstCtgys = await CtgyDao.findFirstCtgys()
      //   redisClient.hset('firstCtgysHash', 'firstCtgys', JSON.stringify(firstCtgys))
      redisUtil.hset('firstCtgysHash', 'firstCtgys', firstCtgys)
      return firstCtgys
    } else {
      console.log('进入redis缓存')
      //   return JSON.parse(firstCtgyRedis)
      return firstCtgyRedis
    }
  }
}

export default CtgyService.ctgyService
