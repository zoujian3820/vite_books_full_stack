import './BaseDaoOrm'
import { Op } from 'sequelize'
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
}

export default UserDaoOrm.userDaoOrm
