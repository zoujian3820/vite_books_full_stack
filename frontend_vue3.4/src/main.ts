import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { LmgUtil } from './utils/imgUtil'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from './store'
import router from './router'
import { createPinia } from 'pinia'
// import { Test } from './utils/goodstorageutil'
// Test()

import { Toast } from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'

import dayjs, { PluginFunc } from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.extend(isLeapYear as PluginFunc) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

LmgUtil.storageLmgList()

console.log('环境变量', import.meta.env)
const app = createApp(App)
// app.config.globalProperties.$dayjs = dayjs

app
  .use(router)
  .use(store)
  .use(createPinia())
  .use(Toast)
  .use(ElementPlus, { size: 'small' })
  .mount('#app')
