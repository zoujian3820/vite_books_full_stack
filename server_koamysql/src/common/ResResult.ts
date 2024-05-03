export enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
  UNAUTHORIZEDERROR = 401,
  NOTFOUNDERROR = 404,
  FORBIDDENERROR = 403,
  PARAMERROR = 400
}

export class ResResult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCCESS
    return { data, msg, code }
  }
  static fail(msg: any = '', code: Code = Code.SERVERERROR) {
    // const code: Code = Code.SERVERERROR
    return { undefined, msg, code }
  }
}

export let { success, fail } = ResResult
