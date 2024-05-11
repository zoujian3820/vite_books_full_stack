const colors = require('colors-console')

const NODE_ENV = (process.env.NODE_ENV || 'dev') === 'dev' ? 'dev' : 'prod'
// 端口 开发环境用3002 生产用8002
const PORT = NODE_ENV === 'dev' ? 3002 : 8002

module.exports = {
  apps: [
    {
      name: 'books',
      script: 'src/app.ts',
      ignore_watch: ['logs', 'mylog', 'dist', 'node_modules'],
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',
      interpreter: './node_modules/.bin/ts-node',
      // npm install ts-node -g 全局安装了 ts-node 所以直接用 ts-node 即可
      // interpreter: 'ts-node',
      instances: 2,
      watch: true,
      //   autorestart: true,
      exec_mode: 'cluster',
      env: {
        NODE_ENV,
        PORT
        // NODE_ENV: 'prod',
        // PORT: 8002
        // 'DB_HOST': '127.0.0.1',
        // 'DB_PORT': 3306,
        // 'DB_USER': 'root',
        // 'DB_PASSWORD': '123456',
      }
    }
  ]
}

console.log(colors('cyan', `在${PORT}端口监听ing...`))
