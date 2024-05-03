// import { Op, Sequelize } from 'sequelize'
// import { sequelize } from '@modules/BaseDao'
import BooksModel from '@modules/decormodel/books'
import { Op } from 'sequelize'
import { getNoReptItem } from '@modules/commontypes'
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

  async findBooksByAutoCompKeyword(autoCompKeyword: string): Promise<any> {
    return await BooksModel.findAll({
      raw: true,
      where: {
        bookname: { [Op.like]: `%${autoCompKeyword}%` }
      }
    })
  }

  async findPublisersByAutoCompKey(autoCompKeyword: string) {
    const books = await BooksModel.findAll({
      raw: true,
      attributes: ['publishid', 'publishername'],
      where: {
        bookname: { [Op.like]: `%${autoCompKeyword}%` }
      }
    })
    return getNoReptItem(books, 'publishid')
  }

  async findBksByPublishIds(publishids: number[]) {
    return await BooksModel.findAll({
      raw: true,
      where: {
        publishid: { [Op.in]: publishids }
      }
    })
  }
}

export default BooksDao.booksDao
