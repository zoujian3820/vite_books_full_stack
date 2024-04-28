const shopcartlist = [
  {
    shopcartid: 1,
    bookisbn: '978-7-201',
    bookname: '加量版漫画(幼儿园课外指导书)插画无',
    bookpicname: '6半小时漫画.png',
    bookprice: '50',
    userid: '1',
    purcharsenum: '1'
  },
  {
    shopcartid: 5,
    bookisbn: '978-7-212',
    bookname: '云边有个小卖部',
    bookpicname: '云边有个小卖部.png',
    bookprice: '11',
    userid: '1',
    purcharsenum: '2'
  }
]
const newAddShopCart = {
  shopcartid: 5,
  bookisbn: '978-7-212',
  bookname: '云边有个小卖部',
  bookpicname: '云边有个小卖部.png',
  bookprice: '11',
  userid: '1',
  purcharsenum: '6'
}

type EleOfArr<T> = T extends Array<infer E> ? E : never
// 获取当前数组shopcartlist中的 单个item数据类型
type SC = EleOfArr<typeof shopcartlist>
// 上面结果如下：
// type SC = {
//     shopcartid: number;
//     bookisbn: string;
//     bookname: string;
//     bookpicname: string;
//     bookprice: string;
//     userid: string;
//     purcharsenum: string;
// }

// 获取当前数组shopcartlist中的 单个item数据类型，并用 keyof 获取key值 转换成联合类型
type _Keys = keyof EleOfArr<typeof shopcartlist>
// 上面结果如下：
// type Keys = "userid" | "shopcartid" | "bookisbn" | "bookname" | "bookpicname" | "bookprice" | "purcharsenum"

// 如下限制结果为: T为数组数据类型，K为联合类型，数组: [{a:'q1',b:'ty'}] T: {a:string,b:string}
// K的可选值为：数组单个item对象中，所有的key值 K: a|b
function getValArrOfObj<
  T extends any[],
  K extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(t: T, k: K) {
  return t.map(({ [k]: v }: E) => v, {})
}

export function TestGsg() {
  console.log(getValArrOfObj(shopcartlist, 'shopcartid'))
  // 结果为: [1, 5]
}
