import { secThrCtgys, ItemType, EleOfArr } from './one'
function getOneItemValuesFrmArr<
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

// console.log(getNoReptItem(secThrCtgys, 'secondctgyid'))
