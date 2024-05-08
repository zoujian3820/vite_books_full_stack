import { storeToRefs } from 'pinia'
import bookStore from '@/piniastore/book'
import { ref, nextTick } from 'vue'
import router from '@/router'
import evaluateStrore, { Evaluate } from '@/piniastore/evaluate'
import { getOneItemValuesFrmArr } from '@/utils'
export default class BookDetailService {
  static store = bookStore()
  static storeRefs = storeToRefs(BookDetailService.store)
  static headerOpacity = ref({ opacity: 0 })
  static picRef = ref<HTMLBodyElement>()

  static init() {
    const query = router.currentRoute.value.query
    BookDetailService.scrollTopToZero()
    BookDetailService.setHeaderOpacity(0)
    if (query.from !== 'evaluate') {
      BookDetailService.searchBooksByISBN()
    }
  }
  static setHeaderOpacity(opacity: number) {
    BookDetailService.headerOpacity.value.opacity = opacity
  }
  static scrollTopToZero() {
    window.pageXOffset = 0
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  static async searchBooksByISBN() {
    await BookDetailService.store.findBookDetailsByISBN()
  }
  static onBookScroll() {
    const scrollTop =
      window.pageXOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop
    const picHeight = BookDetailService.picRef.value!.offsetHeight

    if (scrollTop > 90) {
      BookDetailService.headerOpacity.value.opacity = scrollTop / picHeight
    } else {
      BookDetailService.headerOpacity.value.opacity = 0
    }
  }
}

export class EvaluateService {
  static store = evaluateStrore()
  static storeRefs = storeToRefs(EvaluateService.store)
  static goodEvalNums = ref(0)
  static mediumEvalsNums = ref(0)
  static negativeEvalsNums = ref(0)
  static evalRplLst = ref<Evaluate[]>([])
  static cancelRplShowIndx = ref(-1)
  static evalLstRef = ref<HTMLBodyElement>()

  static ctrHeadAndDegree(isShow: boolean) {
    EvaluateService.store.headAndDegree = isShow
  }
  static controlScrlOrHid(scrollMode: string) {
    document.documentElement.style.overflowY = scrollMode
    document.body.style.overflowY = scrollMode
  }
  static scrollToTopNum(top: number) {
    window.pageXOffset = top
    document.body.scrollTop = top
    document.documentElement.scrollTop = top
  }
  static checkInScreen(index: number) {
    const lstRef: HTMLBodyElement = EvaluateService.evalLstRef.value!
    const targetItmEl = lstRef.querySelectorAll('.evaluate-item')[index]
    const top = targetItmEl.getBoundingClientRect().top
    if (top < 0) {
      EvaluateService.scrollToTopNum(0)
    }
  }
  static reply(event: Event, index: number) {
    EvaluateService.cancelRplShowIndx.value = index
    EvaluateService.ctrHeadAndDegree(false)
    nextTick(() => {
      EvaluateService.checkInScreen(index)
      EvaluateService.changeClassName(event, 'reply-panel-show')
      EvaluateService.controlScrlOrHid('hidden')
    })
  }
  static cancelReply(event: Event) {
    EvaluateService.cancelRplShowIndx.value = -1
    EvaluateService.changeClassName(event, 'reply-panel')
    EvaluateService.controlScrlOrHid('scroll')
    EvaluateService.ctrHeadAndDegree(true)
  }
  static changeClassName(event: Event, className: string) {
    const rplEle = event.currentTarget as HTMLBodyElement
    const rplPanel = rplEle.parentElement!.nextElementSibling! as HTMLBodyElement
    rplPanel.className = className
  }
  static async searchEvalRplLst() {
    await EvaluateService.store.findEvalRplLst()
    EvaluateService.evalRplLst.value = EvaluateService.store.getEvalRplLst
    EvaluateService.calcEvalDegrees()
  }
  static convertRatingToStar(evaluatedegree: EvalDegree) {
    return { 1: 5, 2: 3, 3: 1 }[evaluatedegree]
  }
  static convertScore(evaluatedegree: EvalDegree) {
    return { 1: '10', 2: '6', 3: '2' }[evaluatedegree]
  }
  static restoreEvalNum() {
    EvaluateService.goodEvalNums.value = 0
    EvaluateService.mediumEvalsNums.value = 0
    EvaluateService.negativeEvalsNums.value = 0
  }
  static getEvalRplLst(evaluatedegree?: EvalDegree) {
    EvaluateService.evalRplLst.value = EvaluateService.store.evalRepLst
    if (evaluatedegree) {
      EvaluateService.evalRplLst.value = EvaluateService.evalRplLst.value.filter(
        (evrp) => {
          return evrp.evaluatedegree === evaluatedegree
        }
      )
    }
  }
  static showAllEvalRplLst() {
    return EvaluateService.getEvalRplLst()
  }
  static showGoodEvalRplLst() {
    return EvaluateService.getEvalRplLst(EvalDegree.goodEvals)
  }
  static showMediumEvalRplLst() {
    return EvaluateService.getEvalRplLst(EvalDegree.mediumEvals)
  }
  static showNegativeEvalRplLst() {
    return EvaluateService.getEvalRplLst(EvalDegree.negativeEvals)
  }
  static calcEvalDegrees() {
    EvaluateService.restoreEvalNum()
    const evalDegrees: EvalDegree[] = getOneItemValuesFrmArr(
      EvaluateService.store.evalRepLst,
      'evaluatedegree'
    )
    evalDegrees.forEach((evalDegree) => {
      switch (evalDegree) {
        case EvalDegree.goodEvals:
          EvaluateService.goodEvalNums.value++
          break
        case EvalDegree.mediumEvals:
          EvaluateService.mediumEvalsNums.value++
          break
        case EvalDegree.negativeEvals:
          EvaluateService.negativeEvalsNums.value++
          break
      }
    })
  }
}

enum EvalDegree {
  goodEvals = 1,
  mediumEvals = 2,
  negativeEvals = 3
}
