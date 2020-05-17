## <center>express 实战微信公众号开发一(环境搭建)</center>

### 说在前头

上回书说到，咱们公众号之前的技术支持是 PHP。
而且是在咱技术尚不成熟的条件下做的。
现在咱们将技术栈转到 nodejs 这边的一个 express 框架。
咱来看看 express 官网对其自身的描述。

> express，基于 Node.js 平台，快速、开放、极简的 Web 开发框架

### 工欲善其事，必先利其器

- 首先得申请一个微信个人订阅号，当然有能力认证到企业的更好，有更丰富的 API 可以使用。这个在微信公众平台申请就可以。这里给出申请地址：[个人订阅号申请](https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN&token=)
- 要用 express，nodejs，npm 包管理器当然必不可少啦。在这里可以下载:
  [nodejs 下载地址](http://nodejs.cn/download/)，根据个人操作系统下载对应**安装包**，然后傻瓜式安装即可。
  **注 1**：最好选择 v8.9.0 以上的版本下载，可以免去日后一些版本不兼容的问题。
  **注 2**：windows 下载.msi 安装包，macOs 下载.pkg 安装包，安装的时候会有 add path 选项，环境变量会自动配置进系统，安装完之后不用再手动配置系统环境变量，这是安装包较二进制文件（压缩包）比较方便的地方。
  安装完成后，点击桌面 开始 ，输入 cmd，打开命令提示符，输入 node -v，回车,输入 npm -v，回车，出现版本号说明安装成功。
  ![nodejs安装成功](https://shop.io.mi-img.com/app/shop/img?id=shop_6292e64c9929c963b6708320692e8a94.png)

### 用 express 脚手架生成工程

- 全局安装
  ```bash
  npm i express-generator -g
  ```
- 生成目录名为 wechat-express 的工程
  ```bash
  express -e wechat-express
  ```
- 进入工程根目录
  ```bash
  cd wechat-express
  ```
- 安装依赖(使用淘宝源安装会快很多，相信我)
  ```bash
  npm install --registry=https://registry.npm.taobao.org
  ```
- 运行
  ```bash
  npm start
  ```
- 打开浏览器查看
  ![](https://shop.io.mi-img.com/app/shop/img?id=shop_4632c333284590fe9e714ab638278427.png)

### 配置 nodemon，让 nodejs 开发更便利。

官网是这样介绍的：

> Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development

> 译： Nodemon 是一个实用程序，它将监视源代码中的任何更改并自动重新启动服务器。适合在开发环境中使用它。

咱们都知道 nodejs 开发，修改了源代码之后需要重新运行才能看到最新的运行结果。那 nodemon 的出现呢，就是监听源代码中的==任何更改==，并自动重启服务器。

#### 安装 nodemon

```bash
npm install nodemon //yarn add nodemon
```

#### 使用 nodemon

- 首先在工程根目录下创建**nodemon.json**文件，写入以下内容

  ```json
  {
    "restartable": "rs",
    "ignore": [".git", ".svn", "node_modules/**/node_modules"],
    "verbose": true,
    "execMap": {
      "js": "node --harmony"
    },
    "watch": [],
    "env": {
      "NODE_ENV": "development"
    },
    "ext": "js json"
  }
  ```

- 再打开**package.jso**n 文件，给 script 属性中添加一行，保存。

  ```json
  "scripts": {
    "start": "nodemon app.js",
    "nodemon": "nodemon app.js" //多加这一行
  },
  ```

- 运行
  ```bash
  npm run nodemon
  ```
- 运行之后是这个样子的，可以发现随意改变下文件，保存，工程就会自动重启
  ![](https://shop.io.mi-img.com/app/shop/img?id=shop_76af715da604d026329b90d45af8d989.png)

### 创建微信 Token 验证路由

- 根目录下打开终端，安装**jssha**这个加解密的库

```bash
npm install jssha
```

- 然后在工程的 **routes** 文件夹下创建一个 **wechat.js** 文件，写入以下内容
  > 注意：wechat.js 文件中有个**自定义 Token**，这个 Token 必须为**英文或数字**，长度为**3-32 字符**。

```javascript
const express = require("express");
const router = express.Router();
const jsSHA = require("jssha");
/**
 * 授权验证
 */
router.get("/", function (req, res, next) {
  const token =
    "这里是你的自定义Tken，与公众平台的Token相对应，不然会验证不成功";
  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  let signature = req.query.signature, //微信加密签名
    timestamp = req.query.timestamp, //时间戳
    nonce = req.query.nonce, //随机数
    echostr = req.query.echostr; //随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  let array = [token, timestamp, nonce];
  array.sort();

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  let tempStr = array.join("");
  let shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.update(tempStr);
  let scyptoString = shaObj.getHash("HEX");

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (signature === scyptoString) {
    console.log("验证成功");
    res.send(echostr);
  } else {
    console.log("验证失败");
    res.send("验证失败");
  }
});
module.exports = router;
```

- 打开根目录下 app.js 文件，引入该路由并注册

```javascript
const wechatRouter = require("./routes/wechat");
```

```javascript
app.use("/wechat", wechatRouter);
```

本地验证路由地址毫无疑问就是 http://localhost:3000/wehat
完后将整个工程打包放到线上环境，这里推荐使用**宝塔面板**结合**pm2 进程管理**工具部署 express 工程，真的会简化好多操作！！！
假定我们部署后映射的线上域名是 https://www.iiter.cn
ok 我们接下来打开微信公众平台配置。

### 微信公众平台配置

点击左侧菜单栏 开发 -> 基本配置 右侧开启服务器配置
![image.png](https://i.loli.net/2020/02/27/pVE9UTBWShMLgC5.png)
然后填写服务器配置
![image.png](https://i.loli.net/2020/02/27/Yt1DiIVbMjK2Efr.png)
URL 为线上的 验证 Token 的路由地址，当然是 https://www.iiter.cn/wechat
Token 这里的 Token 就是刚刚上一步自定义的 Token，复制过来粘贴即可。
EncodingAESKey 点击随机生成即可。
消息加解密方式选择明文模式
确认无误的话，点击提交。
验证成功则会弹出验证成功的消息。
打开公众号，随意输入文字发送，公众号会回复给你相同的文字。
![image.png](https://i.loli.net/2020/02/27/wzjKcWY8ksu9Ppt.png)
下一篇我们讲讲如何处理用户消息，实现自定义回复功能。

1. 看到这里啦，点个 `赞` 支持一下吧。
2. 关注公众号 `前端糖果屋` 互相学习鸭。
3. 添加微信 `uumovies` ，拉你进 `技术交流群`，一起探讨人生。
   ![202052154453](https://static.iiter.cn/mp_footer.png)
