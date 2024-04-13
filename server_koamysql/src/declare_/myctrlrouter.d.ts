import 'koa'
import Router from 'koa-router'
import { success, fail } from '@/common/ResResult'

declare module 'koa' {
  export interface ContextDelegatedRequest {
    rootRouter: Router
    params: { [k: string]: string }
    resSuccess: typeof success
    resFail: typeof fail
  }
}
