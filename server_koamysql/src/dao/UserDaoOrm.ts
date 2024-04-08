import './BaseDaoOrm'
import { Op, Sequelize } from 'sequelize'
import UserinfoModel from '../ormmodel/Userinfo'

class UserDaoOrm {
  static userDaoOrm: UserDaoOrm = new UserDaoOrm()
  findAllUser() {
    return UserinfoModel.findAll()
  }
  findByLike(key: string) {
    const searchKey = `%${key}%`
    return UserinfoModel.findAll({
      raw: true,
      where: {
        username: {
          [Op.like]: searchKey
        }
      }
    })
  }
  countUserinfo() {
    return UserinfoModel.findAll({
      raw: true,
      // group可填单个字符'address'，也可填数组，可根据多列数据分组
      group: ['address'],
      // 展示 address列和 valid列的计数 两列 根据地址address的分组数据
      // attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), '填一个别名，totalcount是总数']],
      attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), 'totalcount']],
      where: { valid: 1 }
    })
  }
}

export default UserDaoOrm.userDaoOrm
