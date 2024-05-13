import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import {
  defineConfig,
  CommonServerOptions,
  PluginOption,
  PreviewOptions
} from 'vite'
// 安装@types/node包 能在ts项目中使用esmodule的方式引用node模块不报错
import fs from 'fs'
import dotenv, { DotenvParseOutput } from 'dotenv'
import path from 'path'
// import { toNumber } from './src/utils/stringUtil'

// https://vitejs.dev/config/
// export default defineConfig({
//   base: "dang",
//   plugins: [vue()]
// })

// command: 'build' | 'serve';
// mode: string;
// isSsrBuild?: boolean;
// isPreview?: boolean;

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig(({ mode }) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode}`
  console.log(`curEnvFileName: ${curEnvFileName}`)
  let server: CommonServerOptions = {}
  let preview: PreviewOptions = {}
  const plugins: PluginOption = []
  const envData = fs.readFileSync(`./${curEnvFileName}`)
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  console.log('envMap:', envMap)

  if (mode === 'development') {
    plugins.push(VueDevTools())
    server = {
      host: envMap.VITE_HOST,
      port: Number(envMap.VITE_PORT),
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN
        }
      }
    }
    console.log(`我是${mode}开发环境`, server)
  } else if (mode === 'production') {
    // 生产发布前，使用preview在本地先预览
    // preview = {
    //   // host: envMap.VITE_HOST,
    //   host: '0.0.0.0',
    //   port: Number(envMap.VITE_PORT),
    //   proxy: {
    //     [envMap.VITE_BASE_URL]: {
    //       target: envMap.VITE_PROXY_DOMAIN
    //     }
    //   }
    // }
    server = {
      // 发生产只需要这两项，接口用 nginx 转发
      host: envMap.VITE_HOST,
      port: Number(envMap.VITE_PORT)
    }
    console.log(`我是${mode}生产环境`, server)
  }
  return {
    base: envMap.VITE_ROUTER_BASE_URL || '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()]
      }),
      Components({
        resolvers: [VantResolver()]
      }),
      ...plugins
    ],
    preview,
    server,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      // 关闭资源转base64
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 把node_modules中第三方的包，按模块拆分成单个的代码块文件
            // element-plus打包出来、包特大，本想单独做了细致拆分，按组件名拆分包，一个组件一个文件
            // 但会打包后页面会产生报错白屏，应该是名字改了后，文件之间的依赖关系变了，导致找不到文件
            if (id.includes('node_modules')) {
              // element-plus/es/index.mjs
              // element-plus/es/constants/aria.mjs
              // element-plus/es/components/table/src/store/current.mjs
              const path_ = id.toString().split('node_modules/')[1].toString()
              // element-plus
              const chunkName = path_.split('/')[0].toString()
              return chunkName

              // if (chunkName === 'element-plus') {
              //   // 适用这种组件element-plus/es/components/table/src/store/current.mjs
              //   const eplCompReg = /^element-plus\/es\/components\/(.)*\/src\/(.)*/
              //   // 创建一个正则表达式，用于匹配并删除开头的路径部分
              //   const stReg = /^element-plus\/es\/components\//
              //   // 创建一个正则表达式，用于匹配并删除结尾的文件扩展名部分
              //   const edReg = /\/src\/(.)*/gm

              //   // 适用这种组件element-plus/es/constants/aria.mjs  element-plus/es/index.mjs
              //   const stReg_ = /^element-plus\/es\//

              //   if (eplCompReg.test(path_)) {
              //     const compName = path_.replace(stReg, '').replace(edReg, '')
              //     return `${chunkName}_${compName}`
              //   } else {
              //     const ph_str = path_.replace(stReg_, '')
              //     if (ph_str.indexOf('/') !== -1) {
              //       return chunkName + '_' + ph_str.split('/')[0]
              //     } else {
              //       return chunkName + '_' + ph_str.split('.')[0]
              //     }
              //   }
              // } else {
              //   return chunkName
              // }
            }
          }
        }
      }
    }
  }
})
