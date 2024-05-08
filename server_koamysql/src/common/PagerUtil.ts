import { toNumber } from '@/common/StringUtil'
import { Sequelize } from 'sequelize'
class PagerUtil {
  static pagerUtil: PagerUtil = new PagerUtil()

  private firstRecNocurPage!: number //每一页的第一条记录号是多少
  private pagesize: number = 4 //每一贞，总共最大多少条i记录
  private curPageNo: number = 1 //当前是第几页，默认第1页
  private totalPageNum: number = 0
  private curPageDataList: any[] = []

  getFirstRecNocurPage(curPageNo_: string, pagesize_: string = '0') {
    //获取每一页第一条记录数
    this.curPageNo = toNumber(curPageNo_) || this.curPageNo
    this.pagesize = toNumber(pagesize_) || this.pagesize
    this.firstRecNocurPage = (this.curPageNo - 1) * this.pagesize
    return this.firstRecNocurPage
  }
  getTotalPageNum(totalRecNum: number) {
    //获取总页数
    if (totalRecNum % this.pagesize == 0) {
      this.totalPageNum = totalRecNum / this.pagesize
    } else {
      this.totalPageNum = Math.floor(totalRecNum / this.pagesize) + 1
    }
    // return this.totalPageNum
  }
  get PageSize() {
    //获取每一贞，总共最大多少条i记录
    return this.pagesize
  }
  saveCurPageData(_curPageDataList: any[]) {
    //保存当前页数据【保存返回给前端的分页相关数据】
    this.curPageDataList = _curPageDataList
  }
  getCurPageData() {
    //当前页数据【获取返回给前端的分页相关数据】
    return {
      curPageNo: this.curPageNo,
      curPageDataList: this.curPageDataList,
      totalPageNum: this.totalPageNum
    }
  }
}

const Pager = PagerUtil.pagerUtil
export default Pager

type PageParamsType = [
  curPageNo: string,
  basePagerSql: string,
  recTotalNumSql: string,
  countPageField: string
]
export function pagerDecorator(sequelize: Sequelize) {
  // { (...args: any[]): any }
  return (targetPrototype: any, methodname: string, dataProps: PropertyDescriptor) => {
    const targetMethod = dataProps.value
    dataProps.value = async function (...args: PageParamsType) {
      const [curPageNo, basePagerSql, recTotalNumSql, countPageField] = args

      const firstRecNo = Pager.getFirstRecNocurPage(curPageNo)
      const sql = `${basePagerSql} LIMIT ${Pager.PageSize} OFFSET ${firstRecNo}`
      const curPageDataList = (await sequelize.query(sql))[0]
      const totalRecNumObj: any = (await sequelize.query(recTotalNumSql))[0][0]

      // 分页总页数
      Pager.getTotalPageNum(totalRecNumObj[`count(${countPageField})`])
      Pager.saveCurPageData(curPageDataList)
    }
  }
}
