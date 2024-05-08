import { ref } from 'vue'
import evaluateStrore, { Reply } from '@/piniastore/evaluate'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import goodstorageutil from '@/utils/goodstorageutil'
import { Userinfo } from '@/piniastore/userinfo'
import { EvaluateService } from './bookdetailService'
// import { ElMessageBox } from 'element-plus'
import { showToast } from 'vant'

export default class ReplyService {
  static store = evaluateStrore()
  static storeRef = storeToRefs(ReplyService.store)

  static defaultEndRplLstIndex = 2
  static endRplLstIndex = ref(ReplyService.defaultEndRplLstIndex)
  static replycontent = ref('')
  static showReplyLst(replyLst: Reply[], endRplLstIndex: number) {
    return replyLst.slice(0, endRplLstIndex)
  }
  static foldRplLst(replyLst: Reply[]) {
    ReplyService.endRplLstIndex.value = replyLst.length
  }
  static collapsRplLst() {
    ReplyService.endRplLstIndex.value = ReplyService.defaultEndRplLstIndex
  }
  static async addReply(event: Event, evaluateid: number) {
    const replyEle = event.currentTarget as HTMLBodyElement
    const replyTexarea = replyEle.previousElementSibling! as HTMLInputElement
    const replyContent = ReplyService.replycontent.value
    const replytime = dayjs(new Date()).format('YYYY-MM-DD')
    const replyor = goodstorageutil.get<Userinfo>('userinfo').username
    const replyPanelEle = replyEle.parentElement!.parentElement! as HTMLBodyElement
    if (!replyContent.trim()) return showToast('回复内容不能为空！') //ElMessageBox.alert('回复内容不能为空！', '提示')

    await ReplyService.store.addReply({
      evalid: evaluateid,
      replycontent: replyContent,
      strReplyDate: replytime,
      replyor: replyor
    })
    EvaluateService.evalRplLst.value = ReplyService.store.getEvalRplLst
    replyPanelEle.className = 'reply-panel'
    // 回复后清空输入框
    replyTexarea.value = ''
    // 去除回复前的界面控制
    EvaluateService.cancelRplShowIndx.value = -1
    EvaluateService.controlScrlOrHid('scroll')
    EvaluateService.ctrHeadAndDegree(true)
  }
}
