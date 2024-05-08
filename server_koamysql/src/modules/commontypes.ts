export type EleOfArr<T> = T extends Array<infer E> ? E : never

export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

export function getSubItemsFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(
  t: T,
  ...keys: K[]
): Pick<EleOfArr<T>, K>[] {
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
  let oneItemValues: any[] = getOneItemValuesFrmArr(arr, k)
  let noReptOneItemValues = getNoReptValsItem(oneItemValues)
  arr.filter((item) => {
    if (noReptOneItemValues.includes(item[k])) {
      noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]), 1)
      data.push(item)
    }
  })
  return data
}

export function combineRelativeCtgy<T extends ItemType<T>[]>(
  arr: T,
  relativeKey: string,
  relativeValues: any
) {
  return arr.map((item) => {
    return combine(item, { [relativeKey]: JSON.parse(JSON.stringify(relativeValues)) })
  })
}

type T = [
  { secondctgyid: string; secondname: string },
  { secondctgyid: number; thirdctgyid: number; thirdctgyname: string }
]

type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (
  args: infer I
) => void
  ? I
  : never

export function combine<T extends object[]>(...args: T): UnionToIntersection<T[number]>
export function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur, index) => {
    return { ...pre, ...cur }
  }, {})
}

export function addEntryToArr<T extends EleOfArr<T>[], K extends keyof EleOfArr<T>>(
  arr: T,
  k: K,
  v: any
) {
  return arr.map((item) => {
    item[k] = v
    return item
  })
}
