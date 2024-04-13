import { secThrCtgys, ItemType, EleOfArr, getSubItemsFrmArr } from './one'
import { getNoReptItem } from './two'

function combineRelativeCtgy<T extends ItemType<T>[]>(arr: T, relativeKey: string, relativeValues: any) {
  return arr.map((item) => {
    return combine(item, { [relativeKey]: JSON.parse(JSON.stringify(relativeValues)) })
  })
}

type SecThrCtgyList = {
  secondctgyid: number
  secondname: string
  firstctgyId: number
  thirdctgyid: number
  thirdname: string
  secctgyid: number
}[]

export default function convert(secThrCtgys: SecThrCtgyList) {
  let secCtgyList = getSubItemsFrmArr(secThrCtgys, 'secondctgyid', 'secondname', 'firstctgyId')
  let noReptSecCtgyList = getNoReptItem(secCtgyList, 'secondctgyid')
  let thrdCtgyList = getSubItemsFrmArr(secThrCtgys, 'thirdctgyid', 'thirdname', 'secctgyid')
  const relativeSecThrCtgyList = combineRelativeCtgy(noReptSecCtgyList, 'thirdctgys', [])
  // 最终的二级三级分类保存数组
  const lastSecThrCtgyList: typeof relativeSecThrCtgyList = []
  //   type LastSecThrCtgy = EleOfArr<typeof relativeSecThrCtgyList>
  //   noReptSecCtgyList.map((noReptSecCtgy) => {
  //     const lastThrdList: typeof thrdCtgyList = []
  //     thrdCtgyList.forEach((thrdCtgy) => {
  //       if (noReptSecCtgy.secondctgyid === thrdCtgy.secctgyid) {
  //         lastThrdList.push({ ...thrdCtgy })
  //       }
  //     })
  //     const lastSecThrCtgy: LastSecThrCtgy = combine(noReptSecCtgy, { thirdctgys: lastThrdList })
  //     lastSecThrCtgyList.push(lastSecThrCtgy)
  //   })

  for (let scItem of noReptSecCtgyList) {
    const thirdctgys: typeof thrdCtgyList = []
    let i = 0
    while (thrdCtgyList[i]) {
      if (scItem.secondctgyid === thrdCtgyList[i].secctgyid) {
        thirdctgys.push(thrdCtgyList[i])
        thrdCtgyList.splice(i, 1)
      } else {
        i++
      }
    }
    lastSecThrCtgyList.push({ ...scItem, thirdctgys })
  }

  //   for (const scItem of relativeSecThrCtgyList) {
  //     scItem.thirdctgys = []
  //     for (const tcItem of thrdCtgyList) {
  //       if (tcItem.secctgyid === scItem.secondctgyid) {
  //         scItem.thirdctgys.push({ ...tcItem })
  //       }
  //     }
  //   }

  //   for (const scItem of relativeSecThrCtgyList) {
  //     const thirdctgys: typeof thrdCtgyList = []
  //     for (const tcItem of thrdCtgyList) {
  //       if (tcItem.secctgyid === scItem.secondctgyid) {
  //         thirdctgys.push({ ...tcItem })
  //       }
  //     }
  //     lastSecThrCtgyList.push({ ...scItem, thirdctgys })
  //   }

  //   console.log(relativeSecThrCtgyList[0])
  //   console.log(lastSecThrCtgyList[0])
  return lastSecThrCtgyList
}

// convert()

type T = [{ secondctgyid: string; secondname: string }, { secondctgyid: number; thirdctgyid: number; thirdname: string }]

type TNumber = T[number]
type UnionToFn<U> = U extends any ? (args: U) => void : never
type TestUnionToFn = UnionToFn<TNumber>

type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (args: infer I) => void ? I : never
type TestUnionToIntersection<U> = UnionToIntersection<T[number]>

function combine<T extends object[]>(...args: T): UnionToIntersection<T[number]>
function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur, index) => {
    return { ...pre, ...cur }
  }, {})
}

// const combineObj = combine({ username: '小李', age: '23' }, { phone: '111' })
