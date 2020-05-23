const { Wechaty } = require("wechaty");
Wechaty.instance()
  .on("scan", qrcode => console.log("扫码登录：" + qrcode))
  .on("login", user => console.log("登录成功：" + user))
  .on("message", message => console.log("收到消息：" + message))
  .on("friendship", friendship => console.log("收到好友请求：" + friendship))
  .on("room-invite", invitation => console.log("收到入群邀请：" + invitation))
  .start();
