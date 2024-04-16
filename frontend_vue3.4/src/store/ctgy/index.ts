import { Module } from 'vuex'
import { CtgyState, FirstCtgy, SecondCtgy, initCtgyState } from './state'
import CtgyApi from '@/api/CtgyApi'
import { AxiosResponse } from 'axios'
export const ctgyModule: Module<CtgyState, {}> = {
  namespaced: true,
  state: initCtgyState,
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList
    }
  },
  mutations: {
    storeFirstCtgyLst(state, firstCtgyList_: FirstCtgy[]) {
      state.firstCtgyList = firstCtgyList_
    },
    storeSecondCtgyLst(state, secondCtgyList: SecondCtgy[]) {
      state.secondCtgyList = secondCtgyList
    }
  },
  actions: {
    // async findFirstCtgyList({ state, commit, rootState }) {
    async findFirstCtgyList({ commit }) {
      const res = await CtgyApi.getFirstCtgyList()
      commit('storeFirstCtgyLst', res.data)
      console.log(res.data)
    },
    async findSecThrdCtgyList({ commit }, firstctgyId: number) {
      const res: AxiosResponse<SecondCtgy[]> = await CtgyApi.getSecThrdCtgyList(
        firstctgyId
      )
      res.data = res.data.map((item) => {
        return {
          ...item,
          subThirdctgys: item.thirdctgys.slice(0, 5),
          isReadyOpen: true
        }
      })
      commit('storeSecondCtgyLst', res.data)
      console.log(res.data)
    }
  }
  //   modules?
}
