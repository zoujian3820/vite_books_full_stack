// 第一步：Sequelize 连接mysql数据库
import DbConfig from '../conf/DbConfig'
import { Sequelize, Dialect } from 'sequelize'
// import { Sequelize } from 'sequelize-typescript'
class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    let { host, user, password, database, port } = DbConfig.getConf()
    // 创建Sequelize对象，参数分别为: 数据库名，用户，密码，配置
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      // 数据库类型：表示何种数据库
      // dialect: 此时为mysql
      dialect,
      define: {
        timestamps: false,
        freezeTableName: true
      }
    })
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm
