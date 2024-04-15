import store from '@/store'

const ctgyGettersTarget = {
  getFirstCtgyList: [],
  getSecThrdCtgyList: []
}

const CtgyGettersProxy = new Proxy(ctgyGettersTarget, {
  get(ctgyGettersTarget, key) {
    if (key === 'getFirstCtgyList') {
      return store.getters['ctgyModule/getFirstCtgyList']
    } else if (key === 'getSecThrdCtgyList') {
      return store.getters['ctgyModule/getSecThrdCtgyList']
    }
  }
})

export { CtgyGettersProxy }
