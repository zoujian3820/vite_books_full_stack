class StringUtil {
  static isNotEmpty(str: string): boolean {
    return str !== null && str.length > 0
  }
  static getDataType(str: any): string {
    return Object.prototype.toString.call(str).slice(8, -1).toLocaleLowerCase()
  }
}

export const { isNotEmpty, getDataType } = StringUtil
