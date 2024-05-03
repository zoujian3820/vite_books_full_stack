import 'koa'
import Router from 'koa-router'
import { success, fail } from '@/common/ResResult'
import { request } from '@/utils/axiosUtil'

declare module 'koa' {
  export interface ContextDelegatedRequest {
    rootRouter: Router
    params: { [k: string]: string }
    query: { [k: string]: string }
    resSuccess: typeof success
    resFail: typeof fail
  }
}
