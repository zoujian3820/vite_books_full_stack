import { Op } from 'sequelize'
import { sequelize } from '@/modules/BaseDao'
import KeywordModel from '@/modules/decormodel/keyword'
import HistorykeywordModel from '@/modules/decormodel/historykeyword'

class SearchDao {
  static searchDao: SearchDao = new SearchDao()

  // 根据输入关键字搜索关键字列表
  searchKeywords(keyword: string) {
    return KeywordModel.findAll({
      raw: true,
      where: {
        keyword: { [Op.like]: `%${keyword}%` }
      }
    })
  }
  async findHistoryKeywords() {
    return await HistorykeywordModel.findAll({ raw: true })
  }
  // 查询是否存在该历史关键字
  async searchHistoryKeywords(historykeyword: string) {
    return await HistorykeywordModel.findOne({
      raw: true,
      where: {
        // historykeyword: { [Op.like]: `%${historykeyword}%` }
        historykeyword
      }
    })
  }
  // 查询前6条热门关键字
  async searchDecovery(limit: number = 6) {
    return await HistorykeywordModel.findAll({
      order: [['clickcount', 'desc']],
      raw: true,
      offset: 0,
      limit
    })
  }
  // 保存历史关键字方法
  async saveHistoryKeywords(historykeyword: string): Promise<any> {
    const sql = `
        insert into books.historykeyword(historykeyword, clickcount) 
        values('${historykeyword}', 1)
        `
    return await sequelize.query(sql)
  }
  // 更新历史关键字点击次数【每次加 1】
  async updateHistoryKeywordCount(historykeyword: string): Promise<any> {
    const sql = `
        update books.historykeyword set clickcount=clickcount+1
        where historykeyword='${historykeyword}'
        `
    return await sequelize.query(sql)
  }
  async delHistoryKeyword(): Promise<any> {
    const sql = `delete from books.historykeyword where 1=1`
    return await sequelize.query(sql)
  }
  async delDecoveryKeyword(limit: number = 6): Promise<any> {
    // 此种方式 limit 无法使用 limit 1, 2 或 limit 2 offset 1 这种模式
    // const sql = `delete from books.historykeyword order by clickcount desc limit ${limit}`

    // 使用子查询+临时表 实现 更复杂删除
    const sql = `
    DELETE FROM books.historykeyword 
    WHERE historykeywordid IN (
        SELECT historykeywordid
        FROM (
            SELECT historykeywordid 
            FROM books.historykeyword 
            ORDER BY clickcount DESC 
            LIMIT 0, ${limit}
        ) AS temp
    )
    `
    return await sequelize.query(sql)
  }
}

export default SearchDao.searchDao
