import { getNoReptItem, combineRelativeCtgy, combine, EleOfArr, getSubItemsFrmArr } from '@modules/commontypes'

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
