#### 1. 你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?

IE: trident 内核
Firefox：gecko 内核
Safari:webkit 内核
Opera:以前是 presto 内核，Opera 现已改用 Google Chrome 的 Blink 内核
Chrome:Blink(基于 webkit，Google 与 Opera Software 共同开发)

#### 2. 每个 HTML 文件里开头都有个很重要的东西，Doctype，知道这是干什么的吗？

<!DOCTYPE> 声明位于文档中的最前面的位置，处于 <html> 标签之前。此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范。（重点：告诉浏览器按照何种规范解析页面）

#### 3. img 的 alt 与 title 有何异同？ strong 与 em 的异同？

a:alt(alt text):为不能显示图像、窗体或 applets 的用户代理（UA），alt 属性用来指定替换文字。替换文字的语言由 lang 属性指定。(在 IE 浏览器下会在没有 title 时把 alt 当成  tool tip 显示)
title(tool tip):该属性为设置该属性的元素提供建议性的信息。

strong:粗体强调标签，强调，表示内容的重要性
em:斜体强调标签，更强烈强调，表示内容的强调点

#### 4. 渐进增强和优雅降级

渐进增强  progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
优雅降级  graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
区别：优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。

#### 5. 为什么利用多个域名来存储网站资源会更有效？

- CDN 缓存更方便
- 突破浏览器并发限制
- 节约 cookie 带宽
- 节约主域名的连接数，优化页面响应速度
- 防止不必要的安全问题

#### 6. Cookie、session 和 localStorage、以及 sessionStorage 之间的区别

**先来说说 cookie 和 Web Storage 的区别**

Web Storage 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用。
除此之外，Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie。但是 Cookie 也是不可以或缺的：Cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在  ，而 Web Storage 仅仅是为了在本地“存储”数据而生。

**再说说共同点**

都是保存在浏览器端、且同源的

**三者之间有何区别呢？**

1. cookie 数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递，而 sessionStorage 和 localStorage 不会自动把数据发送给服务器，仅在本地保存。cookie 数据还有路径（path）的概念，可以限制 cookie 只属于某个路径下
2. 存储大小限制也不同，cookie 数据不能超过 4K，同时因为每次 http 请求都会携带 cookie、所以 cookie 只适合保存很小的数据，如会话标识。sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大
3. 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的 cookie 过期时间之前有效，即使窗口关闭或浏览器关闭
4. 作用域不同，sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面；localstorage 在所有同源窗口中都是共享的；cookie 也是在所有同源窗口中都是共享的
5. web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者
6. web Storage 的 api 接口使用更方便

#### 7.网页中常见的图片格式有哪些？

png-8，png-24，jpeg，gif，svg。
但是上面的那些都不是面试官想要的最后答案。面试官希望听到是 Webp。（是否有关注新技术，新鲜事物）
科普一下 Webp：WebP 格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有 JPEG 的 2/3，并能节省大量的服务器带宽资源和数据空间。Facebook Ebay 等知名网站已经开始测试并使用 WebP 格式。
在质量相同的情况下，WebP 格式图像的体积要比 JPEG 格式图像小 40%

#### 8. 在 css/js 代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次 js 请求一般情况下有哪些地方会有缓存处理？

dns 缓存，cdn 缓存，浏览器缓存，服务器缓存。

#### 9. 对于有大量图片加载的网站，你有何解决方案？

- 图片懒加载，在页面上的未可视区域可以添加一个滚动条事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。
- 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。
- 如果图片为 css 图片，可以使用 CSSsprite，SVGsprite，Iconfont、Base64 等技术。
- 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。
- 如果图片展示区域小于图片的真实大小，则因在服务器端根据业务需要先行进行图片压缩，图片压缩后大小与展示一致。

#### 10.HTML 结构的语义化

- 为了在没有 CSS 的情况下，页面也能呈现出很好地内容结构、代码结构:为了裸奔时好看；

- 用户体验：例如 title、alt 用于解释名词或解释图片信息的标签尽量填写有含义的词语、label 标签的活用；

- 有利于 SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；

- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以有意义的方式来渲染网页；

- 便于团队开发和维护，语义化更具可读性，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

#### 11. 有哪项方式可以对一个 DOM 设置它的 CSS 样式？

- 外部样式表，引入一个外部 css 文件
- 内部样式表，将 css 代码放在  `<head>`  标签内部
- 内联样式，将 css 样式直接定义在  HTML  元素内部

#### 12.CSS 优先级算法如何计算？

- 优先级就近原则，同权重情况下样式定义最近者为准;
- 载入样式以最后载入的定位为准;

优先级为:
同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
!important > id > class > tag
important 比 内联优先级高

#### 13.CSS 选择符有哪些？哪些属性可以继承？

- 1.id 选择器（ # myid）
- 2.类选择器（.myclassname）
- 3.标签选择器（div, h1, p）
- 4.相邻选择器（h1 + p）
- 5.子选择器（ul > li）
- 6.后代选择器（li a）
- 7.通配符选择器（ \* ）
- 8.属性选择器（a[rel = "external"]）
- 9.伪类选择器（a:hover, li:nth-child）

可继承的样式： font-size font-family color, UL LI DL DD DT;
不可继承的样式：border padding margin width height ;

#### 14.介绍一下标准的 CSS 的盒子模型？和低版本 IE 的盒子模型有什么不同的？

1、标准盒模型中 width 指的是内容区域 content 的宽度；height 指的是内容区域 content 的高度。
标准盒模型下盒子的大小 = content + border + padding + margin
2、怪异盒模型中的 width 指的是内容、边框、内边距总的宽度（content + border + padding）；height 指的是内容、边框、内边距总的高度
怪异盒模型下盒子的大小 = width（content + border + padding） + margin

**除此之外，我们还可以通过属性 box-sizing 来设置盒子模型的解析模式**

可以为 box-sizing 赋三个值：

`content-box`： 默认值，border 和 padding 不算到 width 范围内，可以理解为是 W3c 的标准模型(default)

`border-box`：border 和 padding 划归到 width 范围内，可以理解为是 IE 的怪异盒模型

`padding-box`：将 padding 算入 width 范围

#### 15.如何居中 div？

1. 水平居中：给 div 设置一个宽度，然后添加 margin:0 auto 属性

   ```css
   div {
     width: 200px;
     margin: 0 auto;
   }
   ```

2. 让绝对定位的 div 居中
   ```css
   div {
     position: absolute;
     width: 300px;
     height: 300px;
     margin: auto;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background-color: pink; /* 方便看效果 */
   }
   ```
3. 水平垂直居中一
   确定容器的宽高 宽 500 高 300 的层
   设置层的外边距
   ```css
   div {
     position: relative; /* 相对定位或绝对定位均可 */
     width: 500px;
     height: 300px;
     top: 50%;
     left: 50%;
     margin: -150px 0 0 -250px; /* 外边距为自身宽高的一半 */
     background-color: pink; /* 方便看效果 */
   }
   ```
4. 水平垂直居中二
   未知容器的宽高，利用 `transform` 属性
   ```css
   div {
     position: absolute; /* 相对定位或绝对定位均可 */
     width: 500px;
     height: 300px;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     background-color: pink; /* 方便看效果 */
   }
   ```
5. 水平垂直居中三
   利用 flex 布局
   实际使用时应考虑兼容性
   ```css
   .container {
    display: flex;
    align-items: center; /_ 垂直居中 _/
    justify-content: center; /_ 水平居中 _/
   }
   .container div {
    width: 100px;
    height: 100px;
    background-color: pink; /_ 方便看效果 _/
   }
   ```

#### 16.display 有哪些值？说明他们的作用。

- block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- none 元素不显示，并从文档流中移除。
- inline 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
- list-item 象块类型元素一样显示，并添加样式列表标记。
- table 此元素会作为块级表格来显示。
- inherit 规定应该从父元素继承 display 属性的值。

#### 17.请解释一下 CSS3 的 Flexbox（弹性盒布局模型）,以及适用场景？

一个用于页面布局的全新 CSS3 功能，Flexbox 可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。
较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。
它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
常规布局是基于块和内联流方向，而 Flex 布局是基于 flex-flow 流可以很方便的用来做局中，能对不同屏幕大小自适应。
在布局上有了比以前更加灵活的空间。

#### 18. 什么是 Css Hack？ie6,7,8 的 hack 分别是什么？

针对不同的浏览器写不同的 CSS code 的过程，就是 CSS hack。

#### 19. 行内元素和块级元素的具体区别是什么？行内元素的 padding 和 margin 可设置吗？

块级元素(block)特性：
总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;
宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;
内联元素(inline)特性：
和相邻的内联元素在同一行;
宽度(width)、高度(height)、内边距的 top/bottom(padding-top/padding-bottom)和外边距的 top/bottom(margin-top/margin-bottom)都不可改变（也就是 padding 和 margin 的 left 和 right 是可以设置的），就是里面文字或图片的大小。
那么问题来了，浏览器还有默认的天生 inline-block 元素（拥有内在尺寸，可设置高宽，但不会自动换行），有哪些？
答案：`<input>` 、`<img>` 、`<button>` 、`<texterea>` 、`<label>`。

#### 20. 什么是外边距重叠？重叠的结果是什么？

外边距重叠就是 margin-collapse。
在 CSS 当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。
折叠结果遵循下列计算规则：

- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
- 两个外边距一正一负时，折叠结果是两者的相加的和。

#### 21. rgba()和 opacity 的透明效果有什么不同？

rgba()和 opacity 都能实现透明效果，但最大的不同是 opacity 作用于元素，以及元素内的所有内容的透明度，
而 rgba()只作用于元素的颜色或其背景色。（设置 rgba 透明的元素的子元素不会继承透明效果！）

#### 22. px 和 em 的区别。

px 和 em 都是长度单位，区别是，px 的值是固定的，指定是多少就是多少，计算比较容易。em 得值不是固定的，并且 em 会继承父级元素的字体大小。
浏览器的默认字体高都是 16px。所以未经调整的浏览器都符合: 1em=16px。那么 12px=0.75em, 10px=0.625em。
