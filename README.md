for test

##　准备工作
因为需要使用nginx来代理，所以请先安装nginx， 然后将以下代码配置到nginx.conf（一般在`/etc/nginx/nginx.conf`)）中
* 注销掉其他端口为80的server
```
 include /home/mi/workspace/mock/server;
```

## 启动命令

```
sudo npm run
```

* 请用管理员权限启动，因为nginx修改需要最高权限

## 页面开发
```
webpack --watch
```
