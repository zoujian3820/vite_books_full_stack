import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { LmgUtil } from './utils/imgUtil'

LmgUtil.storageLmgList()

console.log('环境变量', import.meta.env)
createApp(App).mount('#app')
