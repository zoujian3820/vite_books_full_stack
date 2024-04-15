export interface FirstCtgy {
  firstctgyId: number
  firstctgyname: string
}
export interface SecondCtgy {
  secondctgyid: number
  secctgyname: string
  thirdctgys: ThirdCtgy[]
}
export interface ThirdCtgy {
  thirdctgyid: number
  thirdctgyname: string
}
export interface CtgyState {
  firstCtgyList: FirstCtgy[]
  secondCtgyList: SecondCtgy[]
}
export const initCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: []
}
