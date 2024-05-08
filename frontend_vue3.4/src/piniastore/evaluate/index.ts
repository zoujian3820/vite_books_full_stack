import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import Storage from '@/utils/goodstorageutil'
import EvaluateApi from '@/api/EvaluateApi'
import { bookStore } from '@/piniastore'
import ReplyApi from '@/api/ReplyApi'

export default defineStore('evaluateStrore', {
  state: () => {
    return initEvaluateState
  },
  getters: {
    getBookISBN() {
      return bookStore.getISBN
    },
    getEvalRplLst(state): Evaluate[] {
      return state.evalRepLst.length ? state.evalRepLst : Storage.get('evalRepLst')
    }
  },
  actions: {
    async findEvalRplLst() {
      const result: AxiosResponse<Evaluate[]> = await EvaluateApi.findEvalReplyLst(
        this.getBookISBN
      )
      this.evalRepLst = result.data
      Storage.set('evalRepLst', result.data)
    },
    async addReply(reply: Reply) {
      const result: AxiosResponse<Reply> = await ReplyApi.addReply(reply)
      const evalRepLst = this.getEvalRplLst
      const dbEvalRepLst = evalRepLst.map((evalRep) => {
        if (evalRep.evaluateid === result.data.evalid) {
          evalRep.replyLst.push(result.data)
        }
        return evalRep
      })

      this.evalRepLst = dbEvalRepLst
      Storage.set('evalRepLst', dbEvalRepLst)
    }
  }
})

export interface Reply {
  replyid?: number
  replycontent: string
  replydate?: Date
  strReplyDate: string
  replyor: string
  evalid: number
}

export type Evaluate = {
  evaluateid: number
  content: string
  evaluator: string
  isbn: string
  headportrai: string
  givealikenum: number
  evaluatedegree: number
  pubdate: Date
  isanonymous: number
  replyLst: Reply[]
}

type EvaluateState = {
  evalRepLst: Evaluate[]
  headAndDegree: boolean
}

const initEvaluateState: EvaluateState = {
  evalRepLst: [],
  headAndDegree: true
}
