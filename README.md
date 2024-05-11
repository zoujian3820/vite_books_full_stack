# vite_books_full_stack
做的一个图书商店全栈项目

前端使用vue3.4 + ts + vite5.2.0 + pinia 开始用vuex后面改pinia了

```
"axios": "^1.6.8",
"dayjs": "^1.11.11",
"dotenv": "^16.4.5",
"good-storage": "^1.1.1",
"pinia": "^2.1.7",
"vant": "^4.9.0",
"vue": "^3.4.21",
"vue-router": "^4.3.0",
"vuex": "^4.1.0"
```

后端使用 ts写项目 koa做路由 sequelize+mysql调用数据库 

redis+jwt做token单点登录,双令牌token静默续期(前端配合在axios响应拦截器中实现) 

log4js日志 及 pm2管理项目，实现后台运行多进程充分利cpu资源，防项目挂掉自动重启，项目更改自动重启执行，pm2项目运行日志 等等



