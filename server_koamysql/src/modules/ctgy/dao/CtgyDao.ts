import findSecThrdCtgysByFstCtgyId from '../defmodel/OneToMany'
class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()
  async findSecThrdCtgys(firstctgyid: string) {
    return await findSecThrdCtgysByFstCtgyId(parseInt(firstctgyid))
  }
}

export default CtgyDao.ctgyDao
