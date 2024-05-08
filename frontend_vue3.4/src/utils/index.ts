export type CommonFunType = (...args: any) => any
export function debounce<T extends CommonFunType>(fn: T, wait: number = 200) {
  let timer: any = 0
  return function (...args: any) {
    timer && window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn(...args)
      timer = 0
    }, wait)
  }
}

export type EleOfArr<T> = T extends Array<infer E> ? E : never

export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

export function getSubItemsFrmArr<
  T extends ItemType<T>[],
  K extends keyof EleOfArr<T>
>(t: T, ...keys: K[]): Pick<EleOfArr<T>, K>[] {
  return t.map((item) => {
    return keys.reduce((pre, cur, index) => {
      return { ...pre, [keys[index]]: item[keys[index]] }
    }, {})
  }) as Pick<EleOfArr<T>, K>[]
}

export function getOneItemValuesFrmArr<
  T extends ItemType<T>[],
  K extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}

function getNoReptValsItem(arr: (number | string)[]) {
  const data: (number | string)[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}

export function getNoReptItem<
  T extends ItemType<T>[],
  K extends keyof EleOfArr<T> = keyof EleOfArr<T>
>(arr: T, k: K) {
  const data: ItemType<T>[] = []
  const oneItemValues: any[] = getOneItemValuesFrmArr(arr, k)
  const noReptOneItemValues = getNoReptValsItem(oneItemValues)
  arr.filter((item) => {
    if (noReptOneItemValues.includes(item[k])) {
      noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]), 1)
      data.push(item)
    }
  })
  return data
}

export function hasProps(obj: Record<string, any>) {
  return obj && Object.getOwnPropertyNames(obj).length
}

export const toFixed_ = (num: number): number => {
  if (num.toString().indexOf('.') !== -1) {
    return parseFloat(num.toFixed(2))
  }
  return num
}
