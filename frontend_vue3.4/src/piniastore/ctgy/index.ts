import { FirstCtgy, SecondCtgy, ThirdCtgy } from './state'
import CtgyApi from '@/api/CtgyApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage from 'good-storage'
import { hasProps } from '@/utils'

export const thirdAllCtgy: ThirdCtgy = {
  thirdctgyid: -1,
  thirdctgyname: '全部'
}
export const subThirdCtgySliceNum = 5

export default defineStore('ctgyStore', {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[],
      secondCtgyList: [] as SecondCtgy[],
      thirdCtgy: {} as ThirdCtgy,
      secondCtgy: {} as SecondCtgy,
      firstCtgy: {} as FirstCtgy,
      thirdCtgyList: [] as ThirdCtgy[],
      subThirdCtgyList: [] as ThirdCtgy[],
      isReadyOpen: true
    }
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList
    },
    getThirdCtgyList(state) {
      return state.thirdCtgyList?.length
        ? state.thirdCtgyList
        : ((goodStorage.get('thirdCtgyList') || []) as ThirdCtgy[])
    },
    getSubThirdCtgyList(state) {
      return state.subThirdCtgyList?.length
        ? state.subThirdCtgyList
        : ((goodStorage.get('subThirdCtgyList') || []) as ThirdCtgy[])
    },
    getIsReadyOpen(state) {
      return state.isReadyOpen || goodStorage.get('isReadyOpen')
    },
    getThirdCtgy(state) {
      return hasProps(state.thirdCtgy)
        ? state.thirdCtgy
        : ((goodStorage.get('thirdCtgy') || state.thirdCtgy) as ThirdCtgy)
    },
    getSecondCtgy(state) {
      return hasProps(state.secondCtgy)
        ? state.secondCtgy
        : ((goodStorage.get('secondCtgy') || state.secondCtgy) as SecondCtgy)
    },
    getFirstCtgy(state) {
      return hasProps(state.firstCtgy)
        ? state.firstCtgy
        : ((goodStorage.get('firstCtgy') || state.firstCtgy) as FirstCtgy)
    }
  },
  actions: {
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      goodStorage.set('thirdCtgy', thirdCtgy)
      this.thirdCtgy = thirdCtgy
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      goodStorage.set('secondCtgy', secondCtgy)
      this.secondCtgy = secondCtgy
    },
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      goodStorage.set('firstCtgy', firstCtgy)
      this.firstCtgy = firstCtgy
    },
    storeThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      goodStorage.set('thirdCtgyList', thirdCtgyList)
      this.thirdCtgyList = thirdCtgyList
    },
    storeSubThirdCtgyList(subThirdCtgyList: ThirdCtgy[]) {
      goodStorage.set('subThirdCtgyList', subThirdCtgyList)
      this.subThirdCtgyList = subThirdCtgyList
    },
    storeIsReadyOpen(isReadyOpen: boolean) {
      goodStorage.set('isReadyOpen', isReadyOpen)
      this.isReadyOpen = isReadyOpen
    },
    updateThirdCtgySortById(thirdctgyid: number) {
      const trds = this.thirdCtgyList
      const index = trds.findIndex((item) => item.thirdctgyid === thirdctgyid)

      if (~index && thirdctgyid !== -1) {
        const targetCtgy = trds.splice(index, 1)

        this.thirdCtgyList = [...targetCtgy, ...trds]
        this.subThirdCtgyList = this.thirdCtgyList.slice(0, subThirdCtgySliceNum)
      }
    },
    async findFirstCtgyList() {
      const res = await CtgyApi.getFirstCtgyList()
      this.firstCtgyList = res.data
    },
    async findSecThrdCtgyList(firstctgyId: number) {
      const res: AxiosResponse<SecondCtgy[]> = await CtgyApi.getSecThrdCtgyList(
        firstctgyId
      )
      res.data = res.data.map((item) => {
        return {
          ...item,
          subThirdctgys: item.thirdctgys.slice(0, subThirdCtgySliceNum),
          isReadyOpen: true
        }
      })
      this.secondCtgyList = res.data
    }
  }
})
