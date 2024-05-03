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
