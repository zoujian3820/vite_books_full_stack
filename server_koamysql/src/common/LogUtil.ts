import log4js from 'log4js'
// 日志级别 trace < debug < info < warn < error < fatal
enum Levelinfo {
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal'
}

class LogUtil {
  // 单例模式
  static logUtil: LogUtil = new LogUtil()
  logInstancel!: log4js.Logger
  private constructor() {
    this.config()
  }
  config() {
    log4js.configure({
      // appenders：级别输出目的地和输出文件名的格式配置
      appenders: {
        // 输出目的地配置，供categories使用
        console: { type: 'console' },
        debug_file: { type: 'file', filename: 'mylog/debug.log' },
        info_file: {
          type: 'dateFile',
          filename: 'mylog/info',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true
        },
        warn_file: {
          type: 'dateFile',
          filename: 'mylog/warn',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true
        },
        error_file: {
          type: 'dateFile',
          filename: 'mylog/error',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true
        }
      },
      // 指定日志级别和输出目标的对应关系
      categories: {
        // default默认指debug 且default是固定关键字不能改，
        // 表示debug级别遏制的配置
        default: {
          // 不同级别的目的地
          appenders: ['console', 'debug_file'],
          // 日志级别, 当输出的日志级别高于这个级别就能输出，低于就不能
          level: Levelinfo.debug
        },
        info: {
          appenders: ['console', 'info_file'],
          level: Levelinfo.info
        },
        warn: {
          appenders: ['console', 'warn_file'],
          level: Levelinfo.warn
        },
        error: {
          appenders: ['console', 'error_file'],
          level: Levelinfo.error
        }
      }
    })
  }
  getCategories(level: Levelinfo) {
    this.logInstancel = log4js.getLogger(level)
  }
  debug(input: string) {
    this.getCategories(Levelinfo.debug)
    this.logInstancel.debug(input)
  }
  info(input: string) {
    this.getCategories(Levelinfo.info)
    // 输出级别 info 等于或高于上行代码中设置的级别就可输出
    // 如info级别比debug高
    this.logInstancel.info(input)
  }
  warn(input: string) {
    this.getCategories(Levelinfo.warn)
    this.logInstancel.warn(input)
  }
  error(input: string) {
    this.getCategories(Levelinfo.error)
    this.logInstancel.error(input)
  }
}

export default LogUtil.logUtil
