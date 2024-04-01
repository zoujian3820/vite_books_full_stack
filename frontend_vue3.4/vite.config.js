import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
// 安装@types/node包 能在ts项目中使用esmodule的方式引用node模块不报错
import fs from 'fs';
import dotenv from 'dotenv';
// import path from "path"
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
export default defineConfig(({ mode }) => {
    const envFileName = '.env';
    const curEnvFileName = `${envFileName}.${mode}`;
    console.log(`curEnvFileName: ${curEnvFileName}`);
    let server = {};
    const envData = fs.readFileSync(`./${curEnvFileName}`);
    const envMap = dotenv.parse(envData);
    console.log('envMap:', envMap);
    if (mode === 'development') {
        server = {
            host: envMap.VITE_HOST,
            port: Number(envMap.VITE_PORT),
            proxy: {
                [envMap.VITE_BASE_URL]: {
                    target: envMap.VITE_PROXY_DOMAIN,
                },
            },
        };
        console.log(`我是${mode}开发环境`, server);
    }
    else if (mode === 'production') {
        server = {
            host: envMap.VITE_HOST,
            port: Number(envMap.VITE_PORT),
        };
        console.log(`我是${mode}生产环境`, server);
    }
    return {
        plugins: [vue()],
        server,
    };
});
//# sourceMappingURL=vite.config.js.map