import mysql, { Connection } from 'mysql'
import DbConfig from '../conf/DbConfig'
// 所有Dao的通用Dao
class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  // 数据库的连接
  con!: Connection
  constructor() {
    this.connect()
  }
  async connect() {
    // 获取数据库的连接
    this.con = await mysql.createConnection(DbConfig.getConf())
  }
  async query<T>(sql: string) {
    return new Promise<T>((resolve, reject) => {
      // query增删改查都可以做
      this.con.query(sql, (err: any, result: T) => {
        if (err) {
          reject(err)
        } else {
          // 泛型T会传参resolve
          resolve(result)
        }
      })
    })
  }
}

export default BaseDao.baseDao
