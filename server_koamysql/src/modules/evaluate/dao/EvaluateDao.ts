// import { Op } from 'sequelize'
import { sequelize } from '@/modules/BaseDao'
// import EvaluateModel from '@/modules/decormodel/evaluate'
import convert from '../convert'

class EvaluateDao {
  static evaluateDao: EvaluateDao = new EvaluateDao()

  async findEvalReplyLst(isbn: string) {
    const sql = `
    SELECT
        * 
    FROM
        evaluate AS ea
        LEFT OUTER JOIN books.reply AS rp ON ea.evaluateid = rp.evalid 
    WHERE
        ea.isbn = '${isbn}'
    `
    const evalReplyLst: any[] = (await sequelize.query(sql))[0]
    return convert(evalReplyLst)
  }
}

export default EvaluateDao.evaluateDao
