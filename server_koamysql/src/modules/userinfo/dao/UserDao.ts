import { Op, Sequelize } from 'sequelize'
import { model as defmodel } from '../defmodel'
// 装饰器模型不适用增加数据, 只适全查询
import model from '@modules/decormodel/Userinfo'
import { sequelize } from '@modules/BaseDao'

// type定义的也可用extends实现类型的复用
export type Userinfo = {
  userid: number
  username: string
  password: string
  address: string
  valid: number
  birth: Date
}

class UserDao {
  static userDao: UserDao = new UserDao()
  async testSql(firstctgyId: number) {
    // let sql: string = `select * from books.secondctgy sc inner join books.thirdctgy tc on sc.secondctgyid=tc.secctgid where sc.firstctgyId=${firstctgyId}`

    let sql = `
    select tc.thirdctgyid, tc.thirdname, tc.secctgyid, sc.secondname, sc.firstctgyId 
    from books.thirdctgy tc left outer join books.secondctgy sc 
    on tc.secctgyid=sc.secondctgyid`
    return await sequelize.query(sql)
  }
  async addUser(userinfo: Userinfo) {
    // 已在GlobalException.ts中做全局错误拦截处理，此处无需try catch
    const result = await defmodel.create(userinfo)
    // 单个数可用toJSON，数组得用map展开单个toJSON
    return result.toJSON()
  }
  findAllUser() {
    // 反回所有数据
    // 此方法可加raw去除其他无用结构数据
    return defmodel.findAll({ raw: true })
  }
  findByProps() {
    // 只反回所有数据中的  设定的列值
    return model.findAll({ raw: true, attributes: ['username', 'password'] })
  }
  findByUsmAndPsw(username: string, password: string) {
    // 查询用户和密码，只有一条数据，所以用findOne
    return model.findOne({
      raw: true,
      where: {
        // or and like模糊查询 聚合查询  分页查询
        [Op.and]: [{ username }, { password }]
      }
    })
  }
  findByLike(key: string) {
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
  findByUsmAndAddr() {
    return model.findAll({
      raw: true,
      where: {
        // 模糊查询
        [Op.and]: [{ username: { [Op.like]: '小%' } }, { address: '上海' }]
      }
    })
  }
  countUserinfo() {
    // 分组聚合查询
    return model.findAll({
      raw: true,
      // group可填单个字符'address'，也可填数组，可根据多列数据分组
      group: ['address'],
      // 展示 address列和 valid列的计数 两列 根据地址address的分组数据
      // attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), '填一个别名，totalcount是总数']],
      attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), 'totalcount']],
      where: { valid: 1 }
    })

    // [{ address: '广州', totalcount: 3 }, { address: '重庆', totalcount: 1 }]
    // +-----------------------------+-----------+
    // | address                     | totalcount |
    // +-----------------------------+-----------+
    // | 广州                        |         3 |
    // | 重庆                        |         1 |
    // +-----------------------------+-----------+
  }
  findUserWithPager(offset: number, pageSize: number) {
    // 分页查询
    return model.findAll({
      raw: true,
      // 2：起始位置第3个（0，1，2）对应（1, 2, 3）
      offset,
      // 3：截取3条
      limit: pageSize
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

// export const { addUser, findAllUser, findByProps, findByUsmAndPsw, findByLike, findByUsmAndAddr } = UserDaoDefind
export default UserDao.userDao
