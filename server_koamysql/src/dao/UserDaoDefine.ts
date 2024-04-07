import { Op } from 'sequelize'
import { model } from '../definemodel'
import Userinfo from '../model/Userinfo'

class UserDaoDefind {
  static userDaoDefine: UserDaoDefind = new UserDaoDefind()
  static async addUser(userinfo: Userinfo) {
    // 已在GlobalException.ts中做全局错误拦截处理，此处无需try catch
    const result = await model.create(userinfo)
    // 单个数可用toJSON，数组得用map展开单个toJSON
    return result.toJSON()
  }
  static findAllUser() {
    // 反回所有数据
    // 此方法可加raw去除其他无用结构数据
    return model.findAll({ raw: true })
  }
  static findByProps() {
    // 只反回所有数据中的  设定的列值
    return model.findAll({ raw: true, attributes: ['username', 'password'] })
  }
  static findByUsmAndPsw(username: string, password: string) {
    // 查询用户和密码，只有一条数据，所以用findOne
    return model.findOne({
      raw: true,
      where: {
        // or and like模糊查询 聚合查询  分页查询
        [Op.and]: [{ username }, { password }]
      }
    })
  }
  static findByLike(key: string) {
    const searchKey = `%${key}%`
    return model.findAll({
      raw: true,
      where: {
        username: {
          // like模糊查询
          // [Op.like]: '王%'
          [Op.like]: searchKey
        }
      }
    })
  }
  static findByUsmAndAddr() {
    return model.findAll({
      raw: true,
      where: {
        // 模糊查询
        [Op.and]: [{ username: { [Op.like]: '小%' } }, { address: '上海' }]
      }
    })
  }
}

// export type Userinfo = {
//   userid: number
//   username: string
//   password: string
//   address: string
//   valid: number
//   birth: Date
// }

export const { addUser, findAllUser, findByProps, findByUsmAndPsw, findByLike, findByUsmAndAddr } = UserDaoDefind
