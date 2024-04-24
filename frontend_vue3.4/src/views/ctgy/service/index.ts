import { CtgyActions } from '@/store/actions'
import { CtgyGettersProxy } from '@/store/getters'
import { FirstCtgy, SecondCtgy, ThirdCtgy } from '@/store/state'
import { Ref, ref /*toRefs*/, watchEffect } from 'vue'
import router from '@/router'

export default class FstToThrCtgy {
  static firstCtgyActiveId: Ref<number> = ref(0)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])

  static secondCtgyList: Ref<SecondCtgy[]> = ref([])

  static async geFirstCtgys() {
    await CtgyActions.findFirstCtgyList()
    FstToThrCtgy.firstCtgyList.value = CtgyGettersProxy.getFirstCtgyList
    // FstToThrCtgy.firstCtgyActiveId.value =
    //   FstToThrCtgy.firstCtgyList.value[0].firstctgyId

    // await FstToThrCtgy.geSecondThrdCtgyList()
  }

  static changeTap(id: number) {
    FstToThrCtgy.firstCtgyActiveId.value = id
  }

  static async geSecondThrdCtgyList() {
    watchEffect(async () => {
      await CtgyActions.findSecThrdCtgyList(FstToThrCtgy.firstCtgyActiveId.value)
      FstToThrCtgy.secondCtgyList.value = CtgyGettersProxy.getSecondCtgyList
    })
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

  static toBookInfo(item: ThirdCtgy) {
    router.push({
      path: '/books',
      query: {
        thirdctgyid: item.thirdctgyid
      }
    })
  }
}
