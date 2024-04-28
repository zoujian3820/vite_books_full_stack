import ShopcartModel from '@/modules/decormodel/shopcart'
import { pick } from 'lodash'

// 用pick提取出以下6个字段类型待用，其他摒弃
export type ShopCartRaw = Pick<
  ShopcartModel,
  'bookisbn' | 'bookname' | 'bookpicname' | 'bookprice' | 'userid' | 'purcharsenum'
>

export type ShopCartRaw_ = Pick<
  ShopcartModel,
  'shopcartid' | 'bookisbn' | 'bookname' | 'bookpicname' | 'bookprice' | 'userid' | 'purcharsenum'
>
