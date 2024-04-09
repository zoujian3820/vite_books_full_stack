import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import DbConfig from '@/conf/DbConfig'
import path from 'path'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    // 创建sequelize对象，参数分别为，数据库名称，数据据库类型，密码, 配置
    let { host, user, password, database, port } = DbConfig.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      // 表示是何种数据库，此时为mysql
      dialect,
      define: { timestamps: false, freezeTableName: true }
    })
    // this.addModels()
  }
  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decormodel')
    this.sequelize.addModels([modelPath])
  }
}
const baseDao = BaseDao.baseDao
baseDao.addModels()
// export default BaseDao.baseDao
export const { sequelize } = baseDao
