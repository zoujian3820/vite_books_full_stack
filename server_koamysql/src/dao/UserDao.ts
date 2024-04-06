// import { isNotEmpty } from '../common/StringUtil'
import { isNotEmpty } from '../common'
import BaseDao from './BaseDao'
import Userinfo from '../model/Userinfo'

class UserDao {
  static userDao: UserDao = new UserDao()
  findUserinfo(username: string, password: string) {
    // 后面加where 1=1和不加查询结果是一样的
    // 只是个小技巧为了后面，方便加条件，可以直接用 and username=xxx
    let sql = `select * from userinfo where 1=1 `
    if (isNotEmpty(username)) {
      // 值要加引号，否则报错 Unknown column 'xxxx' in 'where clause'"
      sql += ` and username="${username}"`
    }
    if (isNotEmpty(password)) {
      sql += ` and password="${password}"`
    }
    return BaseDao.query<Userinfo[]>(sql)
  }
}

export default UserDao.userDao
