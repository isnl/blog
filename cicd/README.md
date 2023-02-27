是这样的朋友们，我们公司是个小公司，在职同事用一个手指头都能数过来，没有运维，项目也没有CI/CD。所以每次的部署项目呢，都需要前端同学打包构建压缩后，发给后端同学，让后端去帮忙部署。最近的一个小项目啊刚提测，需要每天下班后更新一个测试版本，如果流程上过不去的bug呢，还得改了之后实时部署。这一来二去呢，后端没觉得不好意思，我倒觉得不好意思了。
贴个更包的聊天记录图
严格来说，一套完整的 CI/CD 流程，其实并不简单，像一些大点的公司，大多数情况下都会有专门的运维岗去做这件事。
当然！对于一个小公司来说，本着开源节流、能省则省的原则，部署方案还是回归于最原始的操作。
所以这个自动化部署脚本就诞生了
提前声明啊，此方案并不适用于所有前端项目的构建部署，只是对于那些每次需要手动更包，打包扔服务器的同学做一些简化操作。
那其实现有的代码管理网站基本都提供了很多个类似的，持续集成的方案。
Github可以通过actions去实现，咱们得艾特网其实就是通过actions去实现的自动化部署。
再比如说码云的Gitee Go，

github的actions录屏看main.yml

好了，言归正传，我们这里不关注代码仓库的持续集成
这里我们使用的nodejs版本是V14.20.1
首先梳理下流程：
构建 -> 打包 -> 压缩 -> 连接服务器 ->上传压缩包至服务器 -> 在服务器对应目录执行解压缩操作 -> webhook通知钉钉或企微
这是一个细化后的简易自动化部署流程。
ok    正式开始吧
首先我们需要安装以下几个第三方依赖
cnpm i adm-zip request crypto node-sssh moment -D
接下来我们对这几个第三方依赖做一个解读
●adm-zip是一款纯javascript实现的适用于nodejs的数据解压缩库
●request是一个数据请求库
●crypto 是一个通用的加密库
●node-ssh 用来在nodejs环境中与我们的服务器进行连接
●moment  一个javascript日期处理库

给`package.json`中写入如下代码

```json
{
  "upload": "vue-cli-service build && node upload.js"
}
```

并在项目根目录下面创建`upload.js`文件
写入如下内容：

```js
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");
const request = require("request");
const cjs = require("crypto");
const { NodeSSH } = require("node-ssh");
const moment = require("moment");
const ssh = new NodeSSH();
const CONFIG = {
  zipFolder: path.join(__dirname, `./dist`),
  zipName: "dist.zip",
  nginxPath: "/home/nginx/www/cicd/",
  host: "192.168.0.3",
  username: "root",
  password: "123456",
};

function dingtalk() {
  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
  let dingdingUrl =
    "https://oapi.dingtalk.com/robot/send?access_token=xxxxxx";

  const messageData = {
    msgtype: "markdown",
    markdown: {
      title: "部署成功",
      text: `<font color="#00dd00" size="1">自动化部署进度</font>\n**状态：**已成功部署\n**操作时间：**${nowTime}\n**项目地址：** http://192.168.0.3:10092/#/home\n`,
    },
  };

  const secret =
    "SEC57f88ed49c4f1141729091fa37c1487c36a80e10e9257c04071e40dc7b9b8a34";
  const timestamp = new Date().getTime();
  const stringToSign = timestamp + "\n" + secret;
  const base = cjs
    .createHmac("sha256", secret)
    .update(stringToSign)
    .digest("base64");
  const sing = encodeURIComponent(base);
  dingdingUrl = dingdingUrl + `&timestamp=${timestamp}&sign=${sing}`;

  request.post(
    dingdingUrl,
    {
      json: messageData,
      encoding: "utf-8",
      headers: {
        "Content-Type": "application/json",
      },
    },
    function (error) {
      if (error) {
        console.log("dingtalk error......", error);
      } else {
        process.exit();
      }
    }
  );
}

(async function () {
  const { zipFolder, zipName, nginxPath, host, username, password } = CONFIG;
  const file = new AdmZip();
  await file.addLocalFolder(zipFolder);
  const zipPath = path.join(__dirname, `./${zipName}`);
  // 如果有压缩包则先删除
  const isExist = fs.existsSync(zipPath);
  if (isExist) {
    fs.unlinkSync(zipPath);
  }
  await file.writeZip(zipPath);

  ssh
    .connect({
      host,
      username,
      password,
    })
    .then(() => {
      ssh
        .putFile(zipPath, `${nginxPath}${zipName}`)
        .then(() => {
          ssh
            .execCommand(`unzip -o ${zipName}`, { cwd: nginxPath })
            .then(() => {
              console.log(
                "\x1B[32m%s\x1B[0m",
                "***************************************"
              );
              console.log(
                "\x1B[32m%s\x1B[0m",
                "****************部署成功****************"
              );
              console.log(
                "\x1B[32m%s\x1B[0m",
                "***************************************"
              );
              dingtalk();
            })
            .catch(err => {
              console.log("unZipError", err);
            });
        })
        .catch(err => {
          console.log("putFileError", err);
        });
    })
    .catch(err => {
      console.log("connectError", err);
    });
})();
```

接下来我们对代码进行解读
先初始化ssh连接

```js
const ssh = new NodeSSH();
```

写入一个配置文件，这个配置文件里面包含了：

- 1.项目中需要打包的目录路径，我这里是项目根目录下的dist文件夹。
- 2.打包生成的压缩产物名称，我这里是dist.zip
- 3.ngnixPath指的是你服务器中对应的前端项目存放的根目录
- 4.host是服务器IP地址
- 5.username是服务器账号
- 6.password是服务器密码

第一行，通过对象解构得到这些配置变量，
初始化一个AdmZip对象的实例，将打包的目录路径通过addLocalFolder方法写入到实例中，
严谨一点，这个时候我们需要通过fs的existsSync方法判断是否存在当前压缩包，存在则先给它删除掉。
接下来则通过writeZip的方法将实例中的目录压缩成压缩包

通过ssh实例的connect方法传入Host/username/password参数连接服务器

连接成功之后，通过putFile方法将本地目录中刚刚压缩的压缩包上传至服务器。

上传成功，通过execCommand方法执行shell命令，对其压缩包进行解压缩。

解压缩成功之后，发送钉钉推送，部署成功

至此一个简易的自动化部署流程就完成了。
