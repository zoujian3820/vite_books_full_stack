export const secThrCtgys = [
  {
    secondctgyid: 1,
    secondname: '0-2岁',
    firstctgyId: 1,
    thirdctgyid: 1,
    thirdctgyname: '图画故事',
    secctgyid: 1
  },
  {
    secondctgyid: 1,
    secondname: '0-2岁',
    firstctgyId: 1,
    thirdctgyid: 2,
    thirdctgyname: '认知',
    secctgyid: 1
  },
  {
    secondctgyid: 1,
    secondname: '0-2岁',
    firstctgyId: 1,
    thirdctgyid: 3,
    thirdctgyname: '益智游戏',
    secctgyid: 1
  },
  {
    secondctgyid: 1,
    secondname: '0-2岁',
    firstctgyId: 1,
    thirdctgyid: 4,
    thirdctgyname: '纸板书',
    secctgyid: 1
  },
  {
    secondctgyid: 1,
    secondname: '0-2岁',
    firstctgyId: 1,
    thirdctgyid: 5,
    thirdctgyname: '艺术课堂',
    secctgyid: 1
  },
  {
    secondctgyid: 1,
    secondname: '0-2岁',
    firstctgyId: 1,
    thirdctgyid: 6,
    thirdctgyname: '入园准备',
    secctgyid: 1
  },
  {
    secondctgyid: 2,
    secondname: '3-6岁',
    firstctgyId: 1,
    thirdctgyid: 7,
    thirdctgyname: '绘本',
    secctgyid: 2
  },
  {
    secondctgyid: 2,
    secondname: '3-6岁',
    firstctgyId: 1,
    thirdctgyid: 8,
    thirdctgyname: '科普百科',
    secctgyid: 2
  },
  {
    secondctgyid: 2,
    secondname: '3-6岁',
    firstctgyId: 1,
    thirdctgyid: 9,
    thirdctgyname: '少儿英语',
    secctgyid: 2
  },
  {
    secondctgyid: 2,
    secondname: '3-6岁',
    firstctgyId: 1,
    thirdctgyid: 10,
    thirdctgyname: '乐高学习',
    secctgyid: 2
  },
  {
    secondctgyid: 2,
    secondname: '3-6岁',
    firstctgyId: 1,
    thirdctgyid: 11,
    thirdctgyname: '入学准备',
    secctgyid: 2
  },
  {
    secondctgyid: 3,
    secondname: '7-10岁',
    firstctgyId: 1,
    thirdctgyid: 12,
    thirdctgyname: '文学',
    secctgyid: 3
  },
  {
    secondctgyid: 3,
    secondname: '7-10岁',
    firstctgyId: 1,
    thirdctgyid: 13,
    thirdctgyname: '科普百科',
    secctgyid: 3
  },
  {
    secondctgyid: 3,
    secondname: '7-10岁',
    firstctgyId: 1,
    thirdctgyid: 14,
    thirdctgyname: '卡通动漫',
    secctgyid: 3
  },
  {
    secondctgyid: 3,
    secondname: '7-10岁',
    firstctgyId: 1,
    thirdctgyid: 15,
    thirdctgyname: '童话',
    secctgyid: 3
  },
  {
    secondctgyid: 3,
    secondname: '7-10岁',
    firstctgyId: 1,
    thirdctgyid: 16,
    thirdctgyname: '少儿英语',
    secctgyid: 3
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 17,
    thirdctgyname: '励志',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 18,
    thirdctgyname: '地理',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 19,
    thirdctgyname: '政治',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 20,
    thirdctgyname: '趣味幽默',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 21,
    thirdctgyname: '少儿英语',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 22,
    thirdctgyname: '益智游戏',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 23,
    thirdctgyname: '艺术课堂',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 24,
    thirdctgyname: '游戏/手工',
    secctgyid: 4
  },
  {
    secondctgyid: 4,
    secondname: '11-14岁',
    firstctgyId: 1,
    thirdctgyid: 25,
    thirdctgyname: '绘画',
    secctgyid: 4
  }
]

// 第一步：获取数组当中元素的类型：
// 把EleOfArr这个数组传过来，和Array<infer E>做泛型约束比较,
// infer E相当于声明一个类型变量，这个变量的类型取决于传入的泛型 T
// 如果这个数组符合这个泛型的特点(相同)的话，
// 就拿取这个数组中的元素类型
export type EleOfArr<T> = T extends Array<infer E> ? E : never

/*
// 通过 EleOfArr<typeof secThrCtgys> 
// 可以直接获取到 secThrCtgys 中的数据类型, 结果如下：
type SecThrCtgy = {
  secondctgyid: number
  secondname: string
  firstctgyId: number
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
}
*/
type SecThrCtgy = EleOfArr<typeof secThrCtgys>
type MyPick = Pick<SecThrCtgy, 'secondctgyid' | 'secondname' | 'firstctgyId'>
type MyPicks = MyPick[]

// 第二步：获取指定key组成的数组
type K = keyof EleOfArr<typeof secThrCtgys>
type Keys = K[]
let keys: Keys = ['secondctgyid', 'secondname']

export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}
// type ResItType = ItemType<typeof secThrCtgys>
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

// const res = getSubItemsFrmArr(secThrCtgys, 'firstctgyId', 'secondctgyid', 'secondname')
// console.log(res)
