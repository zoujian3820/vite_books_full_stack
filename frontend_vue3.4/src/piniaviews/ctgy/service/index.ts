import { FirstCtgy, SecondCtgy, ThirdCtgy } from '@/piniastore/state'
import { Ref, ref /*toRefs*/, watchEffect, nextTick, WatchStopHandle } from 'vue'
import { storeToRefs } from 'pinia'
import ctgyStore, { thirdAllCtgy } from '@/piniastore/ctgy'
import router from '@/router'
import { useRoute } from 'vue-router'
import Books from '@/piniaviews/books/service'

export default class FstToThrCtgy {
  static store = ctgyStore()
  static storeRefs = storeToRefs(FstToThrCtgy.store)
  static firstCtgyActiveId: Ref<number> = ref(0)
  static switchThrdCtgyActiveId: Ref<number> = ref(0)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])
  static secondCtgyList: Ref<SecondCtgy[]> = ref([])

  static findCurFirstCtgy() {
    // 后面带个 ! 表示一定有值
    return FstToThrCtgy.store.firstCtgyList.find(
      (item) => item.firstctgyId === FstToThrCtgy.firstCtgyActiveId.value
    )!
  }

  static findCurThirdCtgy() {
    // 后面带个 ! 表示一定有值
    return FstToThrCtgy.store.thirdCtgyList.find(
      (item) => item.thirdctgyid === FstToThrCtgy.switchThrdCtgyActiveId.value
    )!
  }

  static openOrCollapseInBook(isReadyOpen: boolean) {
    FstToThrCtgy.store.storeIsReadyOpen(isReadyOpen)
  }

  static storeFirstCtgy() {
    const firstCtgy = FstToThrCtgy.findCurFirstCtgy()
    FstToThrCtgy.store.storeFirstCtgy(firstCtgy)
  }

  static async geFirstCtgys() {
    await FstToThrCtgy.store.findFirstCtgyList()

    // FstToThrCtgy.firstCtgyActiveId.value =
    //   FstToThrCtgy.store.firstCtgyList[0].firstctgyId

    // FstToThrCtgy.storeFirstCtgy()
  }
  static changeThrdCtgyActiveId(thrdCtgyActiveId: number) {
    FstToThrCtgy.switchThrdCtgyActiveId.value = thrdCtgyActiveId
    if (thrdCtgyActiveId !== -1) {
      const curThirdCtgy = FstToThrCtgy.findCurThirdCtgy()
      if (curThirdCtgy) {
        FstToThrCtgy.store.updateThirdCtgySortById(thrdCtgyActiveId)
        FstToThrCtgy.store.storeThirdCtgy(curThirdCtgy)
        Books.findBooksByThirdCtgyId()
      }
    } else {
      // 全部
      FstToThrCtgy.store.storeThirdCtgy(thirdAllCtgy)
      Books.findAllBooksByScId()
    }
  }
  static changeTap(id: number) {
    FstToThrCtgy.firstCtgyActiveId.value = id
    FstToThrCtgy.storeFirstCtgy()
  }

  static openOrCollapse(event: Event, secondctgy: SecondCtgy) {
    secondctgy.isReadyOpen = !secondctgy.isReadyOpen
    const curEle: HTMLBodyElement = <HTMLBodyElement>event.currentTarget //as HTMLBodyElement
    const parentEle = curEle.parentNode as HTMLBodyElement

    if (parentEle) {
      if (secondctgy.isReadyOpen) {
        parentEle.style.paddingBottom = '0'
      } else if (secondctgy.thirdctgys.length % 3 === 0) {
        parentEle.style.paddingBottom = '0.5rem'
      }
    }
  }

  static async geSecondThrdCtgyList() {
    await FstToThrCtgy.store.findSecThrdCtgyList(
      FstToThrCtgy.firstCtgyActiveId.value
    )
  }

  static watchFirstCtgyActiveIdHandle(): WatchStopHandle {
    return watchEffect(async (onInvallidate) => {
      onInvallidate(() => {})
      await FstToThrCtgy.geSecondThrdCtgyList()
    })
  }

  static findCurAllCtgyById(params: AllCtgyIdMap) {
    const { firstCtgyList, secondCtgyList } = FstToThrCtgy.store

    if (firstCtgyList.length && secondCtgyList.length) {
      const firtstCtgy = firstCtgyList.find(
        (item) => item.firstctgyId === params.firstctgyid
      )!
      const secondctgy = secondCtgyList.find(
        (item) => item.secondctgyid === params.secondctgyid
      )!
      const thirdctgy = secondctgy.thirdctgys.find(
        (item) => item.thirdctgyid === params.thirdctgyid
      )!

      return { firtstCtgy, secondctgy, thirdctgy }
    }
  }
  static updateCurAllCtgy(params: AllCtgyIdMap) {
    const curCtgy = FstToThrCtgy.findCurAllCtgyById(params)

    if (curCtgy) {
      FstToThrCtgy.store.storeFirstCtgy(curCtgy.firtstCtgy)
      FstToThrCtgy.store.storeSecondCtgy(curCtgy.secondctgy)
      FstToThrCtgy.store.storeThirdCtgy(curCtgy.thirdctgy || {})

      FstToThrCtgy.store.storeThirdCtgyList(curCtgy.secondctgy.thirdctgys)
      FstToThrCtgy.store.storeSubThirdCtgyList(curCtgy.secondctgy.subThirdctgys)

      FstToThrCtgy.store.storeIsReadyOpen(curCtgy.secondctgy.isReadyOpen)

      FstToThrCtgy.switchThrdCtgyActiveId.value = params.thirdctgyid
    } else {
      console.log('一二级分类，还没拿到数据')
    }
  }

  static toBookInfo(firstctgyid: number, secondctgyid: number, thirdctgyid: number) {
    FstToThrCtgy.updateCurAllCtgy({
      firstctgyid,
      secondctgyid,
      thirdctgyid
    })

    // 点二分分类 点岁馆进来，默认处理为全部三级分类
    if (thirdctgyid === thirdAllCtgy.thirdctgyid) {
      FstToThrCtgy.store.storeThirdCtgy(thirdAllCtgy)
    }

    router.push({
      path: '/books',
      query: {
        thirdctgyid,
        secondctgyid,
        firstctgyid
      }
    })
  }

  static back() {
    router.back()
  }

  static async persistentBookSearchData() {
    const { query } = useRoute()
    const { firstctgyid, secondctgyid, thirdctgyid } = query
    // const R2 = useRouter()
    // R2.push('/')
    if (firstctgyid && secondctgyid && thirdctgyid) {
      const params = {
        firstctgyid: Number(firstctgyid),
        secondctgyid: Number(secondctgyid),
        thirdctgyid: Number(thirdctgyid)
      }

      const hasCtgyData = FstToThrCtgy.findCurAllCtgyById(params)

      if (!hasCtgyData) {
        FstToThrCtgy.firstCtgyActiveId.value = params.firstctgyid
        await FstToThrCtgy.geFirstCtgys()
        await FstToThrCtgy.geSecondThrdCtgyList()
        await nextTick()
        FstToThrCtgy.updateCurAllCtgy(params)

        // 点二分分类 点岁馆进来，默认处理为全部三级分类
        if (params.thirdctgyid === thirdAllCtgy.thirdctgyid) {
          FstToThrCtgy.store.storeThirdCtgy(thirdAllCtgy)
        }
      }
    }
  }
}

type AllCtgyIdMap = {
  thirdctgyid: number
  secondctgyid: number
  firstctgyid: number
}
