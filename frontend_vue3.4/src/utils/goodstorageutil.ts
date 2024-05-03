type EleOfArr<T> = T extends Array<infer E> ? E : never

// 如下限制结果为: T为数组数据类型，K为联合类型，数组: [{a:'q1',b:'ty'}] T: {a:string,b:string}
// K的可选值为：数组单个item对象中，所有的key值 K: a|b
export function getValArrOfObj<
  T extends any[],
  K extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(t: T, k: K) {
  return t.map(({ [k]: v }: E) => v, {})
}

import goodStorage from 'good-storage'

export enum OPTION {
  ACCUMU = 0, // 数组累加
  ADDORAPPOBJTOARR = 2, // 把对象添加或追加到数组
  NONE = -1 // 什么都不做
}

export enum Operate {
  INIT = 0,
  THRDCTGYID = 1, // thrdctgyid
  AUTOCOMPKEYWORD = 2 // autocompkeyword
}

export const isPlainObject = (val: unknown): val is object => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export const isString = (val: unknown): val is string => {
  return Object.prototype.toString.call(val) === '[object String]'
}

class Storage {
  static storage: Storage = new Storage()
  set(key: string, value: string): any
  set(key: string, value: object): any
  set(key: string, value: any[]): any
  set(key: string, value: Operate): any
  set(key: string, value: any[], option: OPTION): any
  set(key: string, value: string, option: OPTION): any

  set(
    key: string,
    value: object,
    option: OPTION,
    propkey: string,
    propvalue: any
  ): any
  set(
    key: string,
    value: any,
    option: OPTION = OPTION.NONE,
    propkey: string = '',
    propvalue?: any
  ) {
    if (isPlainObject(value) && option === OPTION.ADDORAPPOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      const KeyValsOfObj = getValArrOfObj(arr, propkey)
      if (propkey.length > 0 && propvalue) {
        if (!KeyValsOfObj.includes(propvalue)) {
          arr.push(value)
        } else {
          const index = KeyValsOfObj.indexOf(propvalue)
          if (index !== -1) arr[index] = value
        }
        goodStorage.set(key, arr)
        return arr
      } else {
        throw new Error('属性key不存在或值不存在')
      }
    } else if (option === OPTION.ACCUMU) {
      const arr: any[] = goodStorage.get(key, [])
      if (Array.isArray(value)) {
        arr.push(...value)
      } else if (isString(value) && !arr.includes(value)) {
        arr.push(value)
      }

      goodStorage.set(key, arr)
      return arr
    }
    goodStorage.set(key, value)
    return value
  }
  get(key: string): any
  get(key: string, option: OPTION): any
  get(key: string, option: OPTION = OPTION.NONE) {
    if (key) {
      if (option === OPTION.ACCUMU || option === OPTION.ADDORAPPOBJTOARR) {
        return goodStorage.get(key, [])
      } else {
        return goodStorage.get(key)
      }
    }
  }

  remove(key: string): any
  remove(key: string, option: OPTION, propkey: string, propvalue: any): any
  remove(
    key: string,
    option: OPTION = OPTION.NONE,
    propkey: string = '',
    propvalue?: any
  ) {
    if (option === OPTION.ADDORAPPOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propkey)
      const eleIndex = keyValsOfObj.indexOf(propvalue)
      if (eleIndex !== -1) {
        arr.splice(eleIndex, 1)
        goodStorage.set(key, arr)
      }
    } else {
      goodStorage.remove(key)
    }
  }
}

export default Storage.storage

// const arr = [
//   { username: 'wanwu', age: 23 },
//   { username: 'lisi', age: 33 }
// ]

// const arr2 = [
//   { username: 'zhansan', age: 23 },
//   { username: 'acho', age: 18 }
// ]

// const newAddShopCart = {
//   shopcartid: 5,
//   bookisbn: '978-7-212',
//   bookname: '云边有个小卖部',
//   bookpicname: '云边有个小卖部.png',
//   bookprice: '11',
//   userid: '1',
//   purcharsenum: '6'
// }

// export function Test() {
//   console.log('userinfolist:', Storage.storage.set('userlist', arr, OPTION.ACCUMU))
//   console.log('userinfolist:', Storage.storage.set('userlist', arr2, OPTION.ACCUMU))
//   console.log(
//     'userinfolist:',
//     Storage.storage.set('userlist', arr, OPTION.ADDORAPPOBJTOARR)
//   )
//   console.log(
//     'userinfolist:',
//     Storage.storage.set('userlist', arr2, OPTION.ADDORAPPOBJTOARR)
//   )

//   const arr3 = Storage.storage.set(
//     'shopcarlist',
//     newAddShopCart,
//     OPTION.ADDORAPPOBJTOARR,
//     'shopcartid',
//     50
//   )

//   console.log('arr:', arr3)
// }
