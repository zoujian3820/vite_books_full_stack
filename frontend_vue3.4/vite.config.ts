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
      assetsInlineLimit: 0
    }
  }
})
