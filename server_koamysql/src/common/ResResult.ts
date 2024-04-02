enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
}

export class ResResult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCCESS
    return { data, msg, code }
  }
  static fail(msg: any = '') {
    const code: Code = Code.SERVERERROR
    return { undefined, msg, code }
  }
}

export let { success, fail } = ResResult
