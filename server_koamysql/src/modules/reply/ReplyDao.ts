import { sequelize } from '@/modules/BaseDao'
import { ReplyRaw } from './util'

class ReplyDao {
  static replyDao: ReplyDao = new ReplyDao()

  async addReply(reply: ReplyRaw) {
    const sql = `
    insert into books.reply (replycontent,replydate,evalid,replyor) 
    values ('${reply.replycontent}','${reply.strReplyDate}',${reply.evalid},'${reply.replyor}')
    `
    return await sequelize.query(sql)
  }
}

export default ReplyDao.replyDao
