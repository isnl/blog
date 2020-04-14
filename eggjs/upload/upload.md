> 最近想着给 [艾特网 - 程序员导航站](https://iiter.cn) 后台扩展文件上传的功能。因为考虑到七牛云对象存储比较划算，而且每个月会==免费赠送 10GB==的标准存储空间，基本算是==白嫖==。所以就打算拿七牛云来练练手。[想注册七牛云的同学可以点这里](https://portal.qiniu.com/signup?code=1hl208ex1otoy)

![](https://ae01.alicdn.com/kf/U69253452f7ee440b8a05640c384293c3m.png)

### 安装依赖
七牛云官网中有 nodejs 版本的 sdk，我们通过 npm 来安装

```bash
npm install qiniu
```

再安装如下依赖，后面会用到

```bash
npm install await-stream-ready stream-wormhole
```
### 创建路由
router.js 文件中创建上传文件路由，映射 utils 这个 controller 下面的 uploadFiles 方法，这块可根据自己的业务需求自行调整。

```javascript
router.post("/upload", controller.utils.uploadFiles);
```
### 创建控制器
打开 utils 文件，创建 uploadFiles 方法，写入如下内容。

```javascript
async uploadFiles() {
    const { ctx } = this;
    const data = await ctx.service.utils.uploadFiles();
    if(data){
      ctx.body = data;
    }else{
      ctx.body = {
        message:"上传失败"
      }
    }
  }
```

### 创建service
在 service 中 utils.js 文件里完成上传逻辑

```javascript
const Service = require("egg").Service;
const fs = require("fs");
const path = require("path");
const qiniu = require("qiniu");
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");
const md5 = require("md5");
const bucket = ""; //要上传的空间名
const imageUrl = ""; // 空间绑定的域名
const accessKey = ""; //Access Key
const secretKey = ""; //Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
class utilsService extends Service {
  async uploadFiles() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename =
      md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const localFilePath = path.join(__dirname, "../public/uploads", filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject("");
            }
            if (respInfo.statusCode == 200) {
              resolve(imageUrl + respBody.key);
            } else {
              reject("");
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath);
          }
        );
      });
      if (imgSrc !== "") {
        return {
          url: imgSrc
        };
      } else {
        return false;
      }
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      return false;
    }
  }
}
module.exports = utilsService;
```

**注意：**

1. 代码中这一行的==Zone_z0==应该和自己空间的存储区域相对应，不然会报错，比方说自己空间是华北区的，对应的就是==Zone_z1==

```javascript
config.zone = qiniu.zone.Zone_z0;
```

![](https://ae01.alicdn.com/kf/U08d4d6eba8e440e8834ac0335e8a6362q.png)

2. Access Key 和 Secret Key 可以在这里查看
   [https://portal.qiniu.com/user/key](https://portal.qiniu.com/user/key)

### 上传测试

这里用的是 postman 测试
**Headers**

```javascript
{
  "Content-Type":"multipart/form-data"
}
```
**Body选择form-data类型**
创建一个key为file，右下角类型选择==File==类型，然后在value属性中选择一张图片。
![](https://ae01.alicdn.com/kf/Ub01c7c58e0aa4cbabf24e5c80fbb570aZ.png)

**点击蓝色的Send按钮即可上传**



至此，一个完整的 eggjs 结合七牛云存储的文件上传就完成啦。

本文参考如下文章：
[egg.js 上传文件](https://www.jianshu.com/p/56bfdae6f5c6)
[NodeJS + 七牛云实现图片上传](https://blog.csdn.net/qq_38209578/article/details/89553949)
