使用 nodejs 快速搭建 MQTT 服务器及实时推送、获取数据

[toc]

### MQTT 的概念

> MQTT(Message Queue Telemetry Transport，翻译成中文为消息队列遥测传输)是 ISO 标准(ISO/IEC PRF 20922)下基于发布/订阅范式的消息协议。它工作在 TCP/IP 协议族上，是为硬件性能低下的远程设备以及网络状况糟糕的情况下而设计的发布/订阅型消息协议，为此，它需要一个消息中间件 。<br>
> MQTT 是一个基于客户端-服务器的消息发布/订阅传输协议。MQTT 协议是轻量、简单、开放和易于实现的，这些特点使它适用范围非常广泛。在很多情况下，包括受限的环境中，如：机器与机器（M2M）通信和物联网（IoT）。其在，通过卫星链路通信传感器、偶尔拨号的医疗设备、智能家居、及一些小型化设备中已广泛使用。

看到这，我们可能或许大概已经明白，MQTT 这货就是个通信协议，且被广泛应用在 M2M、IoT、智能家居等环境中。下面这张图，可以让我们更清楚的了解它具体的应用场景
![](https://ae01.alicdn.com/kf/Ubcb9e11c371b416a81c695b1d63f4d9bD.png)

### 和其他传输协议的区别

看到这里就有人想不明白了，MQTT 既然也是一个基于客户端-服务器的消息发布/订阅传输协议，那么它和我们平常所使用的 websocket 有什么区别呢？
借用百度物联网产品经理的知乎回答：

两者的应用场景不一样：

- MQTT 是为了物联网场景设计的基于 TCP 的 Pub/Sub 协议，有许多为物联网优化的特性，比如适应不同网络的 QoS、层级主题、遗言等等。
- WebSocket 是为了 HTML5 应用方便与服务器双向通讯而设计的协议，HTTP 握手然后转 TCP 协议，用于取代之前的 Server Push、Comet、长轮询等老旧实现。两者之所有有交集，是因为一个应用场景：如何通过 HTML5 应用来作为 MQTT 的客户端，以便接受设备消息或者向设备发送信息，那么 MQTT over WebSocket 自然成了最合理的途径了。

### MQTT 客户端的语言支持

- Java
- Javascript
- C/C++
- Python
- Ruby
- Objective-C

### 搭建基于 nodejs 的 MQTT 服务器

#### 创建服务端

1.先从初始化一个 ==package.json== 开始。

```bash
npm init
```

2.安装 mqtt 服务器必要依赖项 ==mosca== ==mqtt==

```bash
npm install mosca mqtt
```

3.根目录下创建 ==mqtt.js== 文件，写入以下内容，创建 mqtt 简易服务器。

```javascript
const mosca = require("mosca");
const MqttServer = new mosca.Server({
  port: 1883
});
MqttServer.on("clientConnected", function(client) {
  //当有客户端连接时的回调.
  console.log("client connected", client.id);
});
/**
 * 监听MQTT主题消息
 * 当客户端有连接发布主题消息时
 **/
MqttServer.on("published", function(packet, client) {
  var topic = packet.topic;
  switch (topic) {
    case "temperature":
      // console.log('message-publish', packet.payload.toString());
      //MQTT可以转发主题消息至其他主题
      //MqttServer.publish({ topic: 'other', payload: 'sssss' });
      break;
    case "other":
      console.log("message-123", packet.payload.toString());
      break;
  }
});

MqttServer.on("ready", function() {
  //当服务开启时的回调
  console.log("mqtt is running...");
});
```

#### 创建客户端推送

根目录下创建 ==publish.js== 推送文件,写入以下内容：

```javascript
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://127.0.0.1:1883"); //连接到mqtt服务端
//写个定时器定时每隔3秒定时推送天气信息，此业务可替换为自己的实际需求
setInterval(function() {
  const value = Math.ceil(Math.random() * 40);
  client.publish("temperature", value.toString(), { qos: 0, retain: true });
}, 3000);
```

#### 创建客户端接收

根目录下创建 ==subscribe.js== 接收文件，写入以下内容：

```javascript
const mqtt = require("mqtt");
// const mqtt = require('./node_modules/mqtt/dist/mqtt.min.js')
const client = mqtt.connect("mqtt://127.0.0.1:1883"); //指定服务端地址和端口

client.on("connect", function() {
  console.log("服务器连接成功");
  // connected = client.connected
  client.subscribe("temperature", { qos: 1 }); //订阅主题为test的消息
});
client.on("message", function(top, message) {
  console.log("当前topic：", top);
  console.log("当前温度：", message.toString());
});
```

#### 测试功能

1.启动服务端 ==mqtt.js==
根目录下命令行输入 node mqtt.js/node mqtt 运行服务端,启动成功出现以下信息:
![](https://ae01.alicdn.com/kf/U19100ec25e2e4c90ba1e0a38e60606e7b.png)

<!-- ![](http://img04.sogoucdn.com/app/a/100520146/87298107F4129F0575FCB2CDCA25CE6D)
![](https://shop.io.mi-img.com/app/shop/img?id=shop_87298107f4129f0575fcb2cdca25ce6d.png)
![](https://graph.baidu.com/resource/1164411f071b845002a1a01575464481.jpg)
![](https://image.suning.cn/uimg/ZR/share_order/157546448474768234.jpg)
![](http://yanxuan.nosdn.127.net/a9303424f31d6bfd410896dc25b417ef.png) -->

2.启动推送客户端 ==publish.js==
根目录下命令行输入 node publish.js/node publish 运行推送客户端 3.启动接收客户端 ==subscribe.js==
根目录下命令行输入 node subscribe.js/node subscribe 运行接收客户端，不出意外，控制台将会每隔 5 秒打印以下信息：
![](https://ae01.alicdn.com/kf/Uac9141e0ad3146d2bb886069bf056be7J.gif)

<!-- ![](http://img01.sogoucdn.com/app/a/100520146/66AE3164B8F7379A3B66ACEC881A6CC1)
![](https://shop.io.mi-img.com/app/shop/img?id=shop_66ae3164b8f7379a3b66acec881a6cc1.gif)
![](https://graph.baidu.com/resource/116f702a558e743cc13af01575465263.jpg)
![](https://image.suning.cn/uimg/ZR/share_order/157546526496535510.jpg)
![](http://yanxuan.nosdn.127.net/d9899f05c790cf1a9f0e2de3a85c4884.gif) -->

至此，一个基于 nodejs 的简易 mqtt 服务器就搭建完成了。
本文首发地址：[https://iiter.cn/blogs/13](https://iiter.cn/blogs/13)
github 源代码：[github](https://github.com/isnl/mqtt-server)
