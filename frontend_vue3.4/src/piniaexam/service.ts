import { storeToRefs } from 'pinia'
import { testStore } from './store'
const store = testStore()

export default class Service {
  static getStore() {
    return storeToRefs(store)
  }
  static findUser(...args: [string, number]) {
    store.findUser(...args)
  }
  static changeState() {
    store.username = 'haha =='
  }
  static changeState2() {
    store.$patch((state) => {
      state.username = '明哈'
      state.age = 28
    })
  }
  static changeStateByActions() {
    store.changeUser('小林', 34)
  }
}
