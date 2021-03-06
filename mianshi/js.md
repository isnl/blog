#### 1. 介绍 js 的基本数据类型。

简单：
Undefined、Null、Boolean、Number、String
复杂：
Object
ECMAScript 2015 新增:Symbol(创建后独一无二且不可变的数据类型 )

#### 2. 介绍 js 有哪些内置对象？

Object 是 JavaScript 中所有对象的父对象

数据封装类对象：Object、Array、Boolean、Number 和 String
其他对象：Function、Arguments、Math、Date、RegExp、Error

#### 3. Js 面向对象的几种方式

1.对象的字面量

```js
var obj = {};
```

2.创建实例对象

```js
var obj = new Object();
```

3.构造函数模式

```js
function fn(){} , new fn();
```

4.工厂模式：用一个函数，通过传递参数返回对象。

```js
function fn(params) {
  var obj = new Object();
  obj.params = params;
  return obj;
}
fn(params);
```

5.原型模式：

```js
function clock(hour) {}
fn.prototype.hour = 0;
new clock();
```

首先，每个函数都有一个 prototype(原型)属性，这个指针指向的就是 clock.prototype 对象。而这个原型对象在默认的时候有一个属性 constructor，指向 clock，这个属性可
读可写。而当我们在实例化一个对象的时候，实例 new Clock 除了具有构造函数定义的属性和方法外（注意，只是构造函数中的）,还有一个指向构造函数的原型的指针，ECMAScript 管他叫[[prototype]]，这样实例化对象的时候，原型对象的方法并没有在某
个具体的实例中，因为原型没有被实例。

#### 4. Javascipt 的本地对象，内置对象和宿主对象

- 本地对象：
  Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError, 简单来说，本地对象就是 ECMA 一 262 定义的类.
- 内置对象
  ECMA 一 262 把内置对象（built 一 in object）定义为“由 ECMAScript 实
  现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已被实例化了。
  同样是“独立于宿主环境”。根据定义我们似乎很难分清“内置对象”与“本地对象”的区别。而 ECMA 一 262 只定义了两个内置对象，即 Global 和 Math （它们也是本地对象，根据定义，每个内置对象都是本地对象）。
  如此就可以理解了。内置对象是本地对象的一种。而其包含的两种对象中，Math 对象我们经常用到，可这个 Global 对象是啥东西呢？
  Global 对象是 ECMAScript 中最特别的对象，因为实际上它根本不存在，有点玩人的意思。大家要清楚，在 ECMAScript 中，不存在独立的函数，所有函数都必须是某个对象的方法。
  类似于 isNaN()、parseInt()和 parseFloat()方法等，看起来都是函数，而实际上，它们都是 Global 对象的方法。而且 Global 对象的方法还不止这些.
- 宿主对象
  ECMAScript 中的“宿主”就是我们网页的运行环境，即“操作系统”和“浏览器”。所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。所有的 BOM 和 DOM 对象都是宿主对象。因为其对于不同的“宿主”环境
  所展示的内容不同。其实说白了就是，ECMAScript 官方未定义的对象都属于宿主对象，
  因为其未定义的对象大多数是自己通过 ECMAScript 程序创建的对象。自定义的对象也
  是宿主对象。

#### 5. 输入 url 后的加载过程

- 查找域名对应 IP 地址
- 建立连接(TCP 的三次握手)
- 构建网页
- 断开连接(TCP 的四次挥手)

#### 6. TCP 传输的三次握手四次挥手策略

为了准确无误地把数据送达目标处，TCP 协议采用了三次握手策略。用 TCP 协议把
数据包送出去后，TCP 不会对传送 后的情况置之不理，它一定会向对方确认是否成功
送达。握手过程中使用了 TCP 的标志：SYN 和 ACK。
发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后，回传一个带有
SYN/ACK 标志的数据包以示传达确认信息。
最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。
若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发送相同的数据
包。
断开一个 TCP 连接则需要“四次挥手”：
第一次挥手：主动关闭方发送一个 FIN，用来关闭主动方到被动关闭方的数据传送，
也就是主动关闭方告诉被动关闭方：我已经不 会再给你发数据了(当然，在 fin 包之前发
送出去的数据，如果没有收到对应的 ack 确认报文，主动关闭方依然会重发这些数据)，
但是，此时主动关闭方还可 以接受数据。
第二次挥手：被动关闭方收到 FIN 包后，发送一个 ACK 给对方，确认序号为收到序
号+1（与 SYN 相同，一个 FIN 占用一个序号）。
第三次挥手：被动关闭方发送一个 FIN，用来关闭被动关闭方到主动关闭方的数据传
送，也就是告诉主动关闭方，我的数据也发送完了，不会再给你发数据了。
第四次挥手：主动关闭方收到 FIN 后，发送一个 ACK 给被动关闭方，确认序号为收
到序号+1，至此，完成四次挥手。

#### 7. 说几条 javasprit 的规范

1.不要在同一行声明多个变量。  
2.请使用 ===/!==来比较 true/false 或者数值  
3.使用对象字面量替代 new Array 这种形式  
4.不要使用全局函数。  
5.Switch 语句必须带有 default 分支  
6.函数不应该有时候有返回值，有时候没有返回值。
7.For 循环必须使用大括号
8.If 语句必须使用大括号
9.for in 循环中的变量 应该使用 var 关键字明确限定作用域，从而避免作用域污染。

#### 8.什么是 ajax 和 json，它们的优缺点

##### ajax

ajax 的全称：Asynchronous Javascript And XML。
异步传输+js+xml。实现无刷新状态更新页面和异步提交
所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。
Ajax 实现过程：

- 创建 XMLHttpRequest 对象,也就是创建一个异步调用对象
- 创建一个新的 HTTP 请求,并指定该 HTTP 请求的方法、URL 及验证信息
- 设置响应 HTTP 请求状态变化的函数
- 发送 HTTP 请求
- 获取异步调用返回的数据
- 使用 JavaScript 和 DOM 实现局部刷新
  **优点：**
- 不需要插件支持
- 用户体验极佳
- 提升 Web 程序性能
- 减轻服务器和宽带的负担
  **缺点：**
- 前进后退按钮被破坏
- 搜索引擎的支持不够
- 开发调试工具缺乏

##### JSON

JSON（JavaScript Object Notation）和 XML 一样也是一种简单文本格式。是一种比较流行的标准格式，是数据的载体，相对于 XML，JSON 更加易读、更便于肉眼检查。
在语法的层面上，JSON 与其他格式的区别是在于分隔数据的字符，JSON 中的分隔符限于单引号、小括号、中括号、大括号、冒号和逗号。
**优点：**

- 作为一种数据传输格式，JSON 与 XML 很相似，但是它更加灵巧。
- JSON 不需要从服务器端发送含有特定内容类型的首部信息。

**缺点：**

- 语法过于严谨
- 代码不易读
- eval 函数存在风险

#### 9. Ajax 同步和异步的区别，如何解决跨域问题

**同步：**
同步的概念应该是来自于 OS 中关于同步的概念:不同进程为协同完成某项工作而在先后次序上调整(通过阻塞,唤醒等方式).同步强调的是顺序性.谁先谁后.异步则不存在这种顺序性. 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作。
**异步：**
浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。
**跨域：**
jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面

#### 10. 说说你对作用域链的理解

作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到 window 对象即被终止，作用域链向下访问变量是不被允许的。

#### 11. http 状态码有那些，分别代表什么意思

1 开头：信息状态码

2 开头：成功状态码

3 开头：重定向状态码

4 开头：客户端错误状态码

5 开头：服务端错误状态码

1XX：信息状态码

| 状态码 | 含义     | 描述                                         |
| ------ | -------- | -------------------------------------------- |
| 100    | 继续     | 初始的请求已经接受，请客户端继续发送剩余部分 |
| 101    | 切换协议 | 请求这要求服务器切换协议，服务器已确定切换   |

2XX：成功状态码

| 状态码 | 含义       | 描述                                             |
| ------ | ---------- | ------------------------------------------------ |
| 200    | 成功       | 服务器已成功处理了请求                           |
| 201    | 已创建     | 请求成功并且服务器创建了新的资源                 |
| 202    | 已接受     | 服务器已接受请求，但尚未处理                     |
| 203    | 非授权信息 | 服务器已成功处理请求，但返回的信息可能来自另一个 | 来源 |
| 204    | 无内容     | 服务器成功处理了请求，但没有返回任何内容         |
| 205    | 重置内容   | 服务器处理成功，用户终端应重置文档视图           |
| 206    | 部分内容   | 服务器成功处理了部分 GET 请求                    |

3XX：重定向状态码
|状态码| 含义| 描述
|--|--|--|
|300| 多种选择| 针对请求，服务器可执行多种操作
|301| 永久移动| 请求的页面已永久跳转到新的 url
|302| 临时移动| 服务器目前从不同位置的网页响应请求，但请求仍继续使|用原有位置来进行以后的请求|
|303| 查看其他位置| 请求者应当对不同的位置使用单独的 GET 请求来检索|响应时，服务器返回此代码|
|304| 未修改| 自从上次请求后，请求的网页未修改过
|305| 使用代理| 请求者只能使用代理访问请求的网页
|307| 临时重定向| 服务器目前从不同位置的网页响应请求，但请求者应继|续使用原有位置来进行以后的请求

4XX：客户端错误状态码
|状态码| 含义| 描述
|--|--|--|
|400| 错误请求| 服务器不理解请求的语法
|401| 未授权| 请求要求用户的身份演验证
|403| 禁止| 服务器拒绝请求
|404| 未找到| 服务器找不到请求的页面
|405| 方法禁用| 禁用请求中指定的方法
|406| 不接受| 无法使用请求的内容特性响应请求的页面
|407| 需要代理授权| 请求需要代理的身份认证
|408| 请求超时| 服务器等候请求时发生超时
|409| 冲突| 服务器在完成请求时发生冲突
|410| 已删除| 客户端请求的资源已经不存在
|411| 需要有效长度| 服务器不接受不含有效长度表头字段的请求
|412| 未满足前提条件| 服务器未满足请求者在请求中设置的其中一个前提条件
|413| 请求实体过大| 由于请求实体过大，服务器无法处理，因此拒绝请求
|414| 请求 url 过长| 请求的 url 过长，服务器无法处理
|415| 不支持格式| 服务器无法处理请求中附带媒体格式
|416| 范围无效| 客户端请求的范围无效
|417| 未满足期望| 服务器无法满足请求表头字段要求

5XX：服务端错误状态码

| 状态码 | 含义       | 描述                                   |
| ------ | ---------- | -------------------------------------- |
| 500    | 服务器错误 | 服务器内部错误，无法完成请求           |
| 501    | 尚未实施   | 服务器不具备完成请求的功能             |
| 502    | 错误网关   | 服务器作为网关或代理出现错误           |
| 503    | 服务不可用 | 服务器目前无法使用                     |
| 504    | 网关超时   | 网关或代理服务器，未及时获取请求       |
| 505    | 不支持版本 | 服务器不支持请求中使用的 HTTP 协议版本 |

#### 12. HTTP(Hypertext Transfer Protocol)的请求方法

| 方法    | 概述                                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| GET     | 请求页面的详细信息，并返回实体主体。                                                                                                     |
| POST    | 向指定资源提交数据进行数据请求（例如提交表单，或者上传文件）。数据被含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| PUT     | 从客户端向服务器传送的数据取代指定的文档内容。                                                                                           |
| DELETE  | 请服务器删除指定的页面。                                                                                                                 |
| HEAD    | 类似与 Get 请求，只不过返回的响应中没有具体的内容，用于获取报头                                                                          |
| CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。                                                                                |
| OPTIONS | 允许客户端查看服务器的性能。                                                                                                             |
| TRACE   | 回显服务器收到的请求，主要用于测试或诊断。                                                                                               |

#### 13. 什么是闭包（closure）为什么要用它

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在
一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突
破作用链域，将函数内部的变量和方法传递到外部。
闭包的特性：

- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收机制回收

#### 14. 简单概括浏览器事件模型，如何获得资源 dom 节点

在各种浏览器中存在三种事件模型:原始事件模型( original event model),DOM2 事件
模型,IE 事件模型.其中原始的事件模型被所有浏览器所支持,而 DOM2 中所定义的事件
模型目前被除了 IE 以外的所有主流浏览器支持。
浏览器事件模型分为三个阶段
1、捕获阶段
2、目标阶段
3、冒泡阶段
Dom 节点获取方法：

- 1．通过 id 属性获取 document.getElementById()
- 2．通过 name 属性获取 document.getElementsByName()
- 3．通过标签名获取 document.getElementsByTagName()
- 4．通过 class 属性获取 document.getElementsByClassName()
- 5．原生 js 中的 querySelector 和 querySelectorAll 方法也同样可以获取到相应的
  dom 节点，相似于 jquery，但比 jq 更快

#### 15. 简述 ECMAScript6 的新特性

- 增加块作用域
- 增加 let const
- 解构赋值
- 函数参数扩展 （函数参数可以使用默认值、不定参数以及拓展参数）
- 增加 class 类的支持
- 增加箭头函数
- 增加模块和模块加载（ES6 中开始支持原生模块化啦）
- math, number, string, array, object 增加新的 API

#### 16. Apply 和 call 方法的异同

相同点:

- 两个方法产生的作用是完全一样的，都是改变上下文 this 指向的。第一个参数都是对象

不同点:

- call()方法参数将依次传递给借用的方法作参数，即 fn.call(thisobj, arg1,arg2,arg3...argn)，有 n 个参数
- apply()方法第一个参数是对象，第二个参数是数组 fn.apply(thisobj,arg)，此处的 arg 是一个数组,只有两个参数

\*注：bind 也是用来改变上下文 this 指向的，参数与 call 一致，返回的是个函数

#### 17. 在 javascript 中什么是伪数组，如何将伪数组转化为标准数组

这里把符合以下条件的对象称为伪数组（也称作是类数组）：
1，具有 length 属性
2，按索引方式存储数据
3，不具有数组的 push,pop 等方法
伪数组（类数组）：无法直接调用数组方法或期望 length 属性有什么特殊的行为，不具有数组的 push,pop 等方法，但仍可以对真正数组遍历方法来遍历它们。典型的是函数的 argument 参数，还有像调用 document.getElementsByTagName, document.childNodes 之类的,它们返回的 NodeList 对象都属于伪数组

#### 18. Javascript 的 typeof 返回哪些数据类型;列举 3 种强制类型 转换和 2 中隐式类型转换

**返回数据类型**
undefined
string
boolean
number
symbol(ES6)
Object
Function
**强制类型转换**
Number(参数) 把任何类型转换成数值类型。
parseInt(参数 1，参数 2) 将字符串转换成整数
parseFloat()将字符串转换成浮点数字
string(参数):可以将任何类型转换成字符串
Boolean() 可以将任何类型的值转换成布尔值。

**隐式类型转换**  
1.四则运算
加法运算符+是双目运算符，只要其中一个是 String 类型，表达式的值便是一个 String。
对于其他的四则运算，只有其中一个是 Number 类型，表达式的值便是一个 Number。
对于非法字符的情况通常会返回 NaN:
'1' _ 'a' // => NaN，这是因为 parseInt(a)值为 NaN，1 _ NaN 还是 NaN  
2.判断语句
判断语句中的判断条件需要是 Boolean 类型，所以条件表达式会被隐式转换为 Boolean。 其转换规则同 Boolean 的构造函数。比如:

```js
var obj = {};
if (obj) {
  while (obj);
}
```

3.Native 代码调用
JavaScript 宿主环境都会提供大量的对象，它们往往不少通过 JavaScript 来实现 的。 JavaScript 给这些函数传入的参数也会进行隐式转换。例如 BOM 提供的 alert 方 法接受 String 类型的参数:
alert({a: 1}); // => [object Object]

#### 原型和原型链

#### map 和 set

#### eventloop

#### reduce

#### 字符串常用方法

#### 数组常用方法

#### forEach for...of for...in 区别

#### 对象深浅拷贝

#### javascript 作用链域

#### this

#### js 延迟加载的方式有哪些？

defer 和 async、动态创建 DOM 方式（用得最多）、按需异步载入 js

#### amd,cmd,requirejs

#### ES6

#### 浏览器内核

#### nodejs?

事件驱动，物阻塞 I/O 适用于高并发应用

#### 三次握手四次挥手

#### http 协议(延伸 https 等)

#### 常见的 http 状态码

#### 从输入 url 到页面加载显示完成 发生了什么

#### 项目中有亮点的地方？

1.产品本身就是亮点，基于原生 js 开发的大屏可视化 sdk 库

### 难点呢

1.命令者模式实现撤销回退 2.发布订阅者模式实现图表联动
3.jsPlumb 实现图表联动 UI 构建 4.截取缩略图不出背景图的问题
