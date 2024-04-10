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
      define: { timestamps: false, freezeTableName: true },
      // 数据库连接池配置, Sequelize默认就会使用连接池，只是下面配置用的很低
      pool: {
        // 最大连接对象的个数
        max: 300,
        // 最小连接数，服务一运行起来，就会直接先请求50个数据库连接，等待使用
        min: 50,
        // idle 一个连接在释放前可空闲的时间，单位为毫秒ms，
        // 在连接空闲（未使用）10 秒后从池中删除连接, 回归到未连接状态
        // 只有当连接池中连接数量大于最小连接数量时会生效
        idle: 10000,
        // 表示最大连接超时时间，一条sql查询在获取连接资源之前的最长等待时间，单位毫秒
        acquire: 60000
      }
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
