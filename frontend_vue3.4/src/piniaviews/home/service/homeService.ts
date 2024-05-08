import { bookStore } from '@/piniastore'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { bottomNavList } from '../../common/compdata'

class HomeService {
  static store = bookStore
  static storeToRefs = storeToRefs(HomeService.store)
  static activeIdnex = ref(0)

  static change(index: number, item: (typeof bottomNavList)[0]) {
    HomeService.activeIdnex.value = index
    router.push(item.url)
  }
  static async findBookLstWithPager() {
    await HomeService.store.findBookLstWithPager()
  }
  static getScrollTop() {
    return (
      document.documentElement.scrollTop ||
      window.pageXOffset ||
      document.body.scrollTop
    )
  }
  static controlScrlOrHid(scrollMode: string) {
    document.documentElement.style.overflowY = scrollMode
    document.body.style.overflowY = scrollMode
  }
  static getClientHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight
  }
  static getFullHeight() {
    return document.documentElement.scrollHeight || document.body.scrollHeight
  }
  static init() {
    HomeService.store.headerHeight = HomeService.store.headerRef!.offsetHeight
  }
  static scrollHandler() {
    HomeService.headerScroll()
    HomeService.pageScroll()
  }
  static headerScroll() {
    const scrollTop = HomeService.getScrollTop()
    const headerHeight = HomeService.store.headerHeight
    if (scrollTop >= 0 && scrollTop <= headerHeight - 30) {
      HomeService.store.headerOPacity.opacity = 1 - scrollTop / headerHeight
      HomeService.store.headerRef!.style.display = 'block'
    } else {
      HomeService.store.headerRef!.style.display = 'none'
    }
  }
  static async pageScroll() {
    //1.获取页面滚动的距离（每次滚动条滚动时被卷进去的高度）
    const scrollTop = HomeService.getScrollTop()
    //2.获取屏幕可视区域的高度，高度和不同设备屏幕相关
    const clientHeight = HomeService.getClientHeight()
    //3.获取全部高度【可视区域高度+看不到的区域高度】
    const fullHeight = HomeService.getFullHeight()
    //4.计算何时出现正在加载动画，进入下一页
    if (scrollTop >= fullHeight - clientHeight - 20) {
      HomeService.controlScrlOrHid('hidden')
      await HomeService.findBookLstWithPager()
      HomeService.controlScrlOrHid('scroll')
    }
  }
}

export default HomeService
