## 定位：
本地开发数据源切换 / 数据接口定义
##技术栈：
Node / Express / MongoDb / Nginx / VueJs / PM2 / MockJs

## 简介：
1. 为了方便开发，本地使用Nginx反向代理，数据接口和静态资源分离，用web切换的方式来改变Nginx的指向
2. 同时当数据接口切到本地的时候，使用本地存储的数据来进行mock

## 项目初始化
* `clone git@**`
* 进入项目执行　`npm install`
* 安装 nginx https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-14-04-lts

* 配置nginx
    * 在 nginx.conf 配置 (路径一般为：/etc/nginx/nginx.conf)
```
http {
    # Mock项目中server文件所在位置（若无server文件，在 /home/mi/workspace/mock/下新建个server文件）
    include /home/mi/workspace/mock/server;
    # 注释掉其余的 include
    #include /etc/nginx/conf.d/*.conf;
    #include /etc/nginx/sites-enabled/*;
}
```
* 安装 mongodb www.mongodb.com


## 启动项目
* 启动 nginx ： sudo nginx
* 启动 mongod   ： mongod --port 27017 (默认端口)
* 启动 mock 服务器：项目根目录执行 `npm start`，正常启动后访问 http://localhost:3001/public/index.html 检验
