// export default class Userinfo {
//   userid!: number
//   username!: string
//   password!: string
//   address!: string
//   valid!: number
//   birth!: Date
// }

// type定义的也可用extends实现类型的复用
type Userinfo = {
  userid: number
  username: string
  password: string
  address: string
  valid: number
  birth: Date
}

export default Userinfo
