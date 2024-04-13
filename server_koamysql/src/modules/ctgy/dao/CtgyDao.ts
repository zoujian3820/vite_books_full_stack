// import { Op, Sequelize } from 'sequelize'
import { sequelize } from '@modules/BaseDao'
// import convert from '@/tstypes/three'
import convert from '../moduletypes'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThirdCtgys(firstctgyId: number) {
    const sql = `
     select * from books.secondctgy sc inner join books.thirdctgy tc 
     on tc.secctgyid=sc.secondctgyid 
     where sc.firstctgyId='${firstctgyId}'
     `
    const secThrCtgys: any[] = (await sequelize.query(sql))[0]
    return convert(secThrCtgys)
  }
}

export default CtgyDao.ctgyDao
