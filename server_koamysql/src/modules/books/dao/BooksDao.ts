// import { Op, Sequelize } from 'sequelize'
// import { sequelize } from '@modules/BaseDao'
import BooksModel from '@modules/decormodel/books'
class BooksDao {
  static booksDao: BooksDao = new BooksDao()
  async findBooksByThirdCtgyId(
    thirdctgyid: number,
    sortField: string = '',
    ascOrDesc: string = ''
  ) {
    const order: [string, string][] = []
    if (sortField) {
      order.push([sortField, ascOrDesc || 'asc'])
    }
    return await BooksModel.findAll({
      raw: true,
      // order: [[排序的字段名, 排序的方式（升序asc 还是 降序desc）]],
      order, //: [[sortField, ascOrDesc]],
      where: { thirdctgyid }
    })
  }

  async findBooksBySecondCtgyId(
    secondctgyid: number,
    sortField: string = 'originalprice',
    ascOrDesc: string = 'asc'
  ) {
    return await BooksModel.findAll({
      raw: true,
      order: [[sortField, ascOrDesc]],
      where: { secondctgyid }
    })
  }
}

export default BooksDao.booksDao
