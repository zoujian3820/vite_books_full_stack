// import { Op, Sequelize } from 'sequelize'
import { sequelize } from '@modules/BaseDao'
import BooksModel from '@modules/decormodel/books'
import { Op } from 'sequelize'
import { getNoReptItem } from '@modules/commontypes'
import PagerUtil, { pagerDecorator } from '@/common/PagerUtil'

class BooksDao {
  static booksDao: BooksDao = new BooksDao()
  // async findBookLstWithPager(curPageNo: string): Promise<any> {
  //   const firstRecNo = PagerUtil.getFirstRecNocurPage(curPageNo)
  //   const sql = `SELECT * FROM books.books LIMIT ${PagerUtil.PageSize} OFFSET ${firstRecNo}`
  //   const curPageDataList = (await sequelize.query(sql))[0]
  //   const totalRecNumObj = (
  //     await sequelize.query(`select count(isbn) as totalNum from books.books`)
  //   )[0][0] as { totalNum: number }

  //  // 分页总页数
  //   const totalPageNum = PagerUtil.getTotalPageNum(totalRecNumObj.totalNum)
  //   console.log(totalPageNum)
  //   return curPageDataList
  // }

  // @PagerDecorator(sequelize, `select * from books.books`)
  async findBookLstWithPager(curPageNo: string) {
    const countPageField = 'isbn'
    const basePagerSql = `select * from books.books `
    const recTotalNumSql = `select count(${countPageField}) from books.books`
    await this.bookPager(curPageNo, basePagerSql, recTotalNumSql, countPageField)
    return PagerUtil.getCurPageData()
  }

  @pagerDecorator(sequelize)
  bookPager(
    curPageNo: string,
    basePagerSql: string,
    recTotalNumSql: string,
    countPageField: string
  ) {}
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
  async findBookDetailsByISBN(ISBN: string) {
    return await BooksModel.findOne({
      raw: true,
      where: { ISBN }
    })
  }
}

export default BooksDao.booksDao
