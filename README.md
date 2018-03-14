# hapi.server
测试数据配置

fail to publish as @jiadi0801/hapi.server

## 安装
```
npm install hapi.server -g
```

## 静态文件目录
* 一个`api.yml`文件
* 一个放response的文件夹

api.yml:
```
host: mipaimai.jd.com
port: 8000

resDir: resdata

apiList:
  - method: get
    path: /myMoneyList
    resPath: myMoneyList.json
```

文件夹： resDir: `resdata`

## 启动
```
afs
```
