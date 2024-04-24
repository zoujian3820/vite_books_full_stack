import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { LmgUtil } from './utils/imgUtil'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from './store'
import router from './router'
import { createPinia } from 'pinia'

LmgUtil.storageLmgList()

console.log('环境变量', import.meta.env)
createApp(App)
  .use(router)
  .use(store)
  .use(createPinia())
  .use(ElementPlus, { size: 'small' })
  .mount('#app')
