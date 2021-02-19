这两天空出来个服务器，实战下`宝塔面板`结合`pm2`进程管理工具部署前端项目

来介绍下宝塔面板  
> 宝塔Linux面板是提升运维效率的服务器管理软件，支持一键LAMP/LNMP/集群/监控/网站/FTP/数据库/JAVA等100多项服务器管理功能。
有20个人的专业团队研发及维护，经过200多个版本的迭代，功能全，少出错且足够安全，已获得全球百万用户认可安装。  

个人理解为：一个`可视化运维`的控制面板。  

官网地址： [https://bt.cn](https://bt.cn)  

#### 安装
首先准备一台纯净的linux服务器，本文以CentOS7.6 64位为例。  
以下主机商必看（开端口教程，不开不能用）：  
腾讯云：https://www.bt.cn/bbs/thread-1229-1-1.html  
阿里云：https://www.bt.cn/bbs/thread-2897-1-1.html  
华为云：https://www.bt.cn/bbs/thread-3923-1-1.html

1.使用ssh工具连接服务器终端，填写服务器相关信息，进入终端，执行以下脚本。

> 墙裂推荐开源终端 [electerm](https://github.com/electerm/electerm)

```bash
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```
安装成功后是这个样子：  

![安装成功](https://static.iiter.cn/article/9507acf7acee77679ab9ca3a42cdee84.png)  


**Bt-Panel**  面板地址  
**username**  面板账号  
**password**  面板密码  

浏览器中打开面板地址输入账号密码即可进入面板首页。

面板设置中可以对面板相关信息进行设置，包括给面板绑定域名、修改初始用户名和密码等等。

![面板设置](https://static.iiter.cn/article/f17905147afbc6ea14038f79b1ad506b.png)

软件商店中有很多开发、运维常用的工具，比如Mysql,Nginx等等，这里列举下笔者的安装列表，大家可以参考下一并安装。

![软件列表](https://static.iiter.cn/article/10802b46aa33386abbb3bfce587b2ed7.png)

#### 部署`nuxtjs`项目

这里以部署`nuxtjs项目`为例，在左侧菜单栏中点击文件，将nuxt项目对应的所有文件上传至服务器(在线上传或使用ftp上传)，并在终端进入项目根目录安装依赖以及打包构建。  

![上传目录](https://static.iiter.cn/article/fe540956b7a34fc0283523ef589d76a3.png)

安装依赖&&打包构建  

```bash
npm install && npm run build
```

由于我们已经在软件商店中安装了nodejs环境和pm2，直接在终端中使用pm2启动nuxt工程即可。

```bash
pm2 start npm --name "mynuxt" -- run start
```

不出意外的话，浏览器地址输入 ip + 端口号 即可访问网站。

**注意：**
1. nuxt的默认端口号是3000，那就一定！一定！要开放服务器的3000端口，可参考顶部的开端口教程。
2. nuxt项目中默认host是localhost，如果启动出现问题可在`nuxt.config.js`中使用server将其重写为`0.0.0.0`或者`127.0.0.1`。当然，端口号也可以自定义

```js
module.exports = {
  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost
  }
}
```
##### 绑定域名
点击面板菜单拦中的网站，添加站点，输入域名，写好备注，选择根目录，提交

![绑定域名](https://static.iiter.cn/article/72a2725e289f91d3e9bd66c4b64d5a4d.png)

如果该域名已经指向至该服务器的ip地址，则输入域名即可访问了。

##### 开启SSL

点击设置，切换至ssl，四种方式傻瓜式配置ssl，笔者这里使用的是腾讯云免费的ssl证书，记得打开强制https

![设置ssl](https://static.iiter.cn/article/07c85c285905230cd74066fc4c72e264.png)

使用域名访问网站，发现会强制https。

艾特网就是一个典型的nuxt项目：[艾特网 - 程序员导航站](https://iiter.cn)  


其他诸如此类的`express`,`koa`,`eggjs`等项目的部署都大同小异。这里不再赘述。

1. 看到这里啦，点个 `赞` 支持一下吧。
2. 关注公众号 `前端糖果屋` 互相学习鸭。
3. 添加微信 `itRobot` ，拉你进 `技术交流群` 探讨人生。
   ![扫码立即关注](https://static.iiter.cn/mp_footer.png)