#### 1.CSS 优先级算法如何计算？

- 优先级就近原则，同权重情况下样式定义最近者为准;
- 载入样式以最后载入的定位为准;

优先级为:
同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
!important > id > class > tag
important 比 内联优先级高

#### 2.CSS 选择符有哪些？哪些属性可以继承？

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

#### 3.介绍一下标准的 CSS 的盒子模型？和低版本 IE 的盒子模型有什么不同的？

1、标准盒模型中 width 指的是内容区域 content 的宽度；height 指的是内容区域 content 的高度。
标准盒模型下盒子的大小 = content + border + padding + margin
2、怪异盒模型中的 width 指的是内容、边框、内边距总的宽度（content + border + padding）；height 指的是内容、边框、内边距总的高度
怪异盒模型下盒子的大小 = width（content + border + padding） + margin

##### 除此之外，我们还可以通过属性 box-sizing 来设置盒子模型的解析模式

可以为 box-sizing 赋三个值：

`content-box`： 默认值，border 和 padding 不算到 width 范围内，可以理解为是 W3c 的标准模型(default)

`border-box`：border 和 padding 划归到 width 范围内，可以理解为是 IE 的怪异盒模型

`padding-box`：将 padding 算入 width 范围

#### 4.如何居中 div？

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

#### 5.display 有哪些值？说明他们的作用。

- block 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- none 元素不显示，并从文档流中移除。
- inline 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
- list-item 象块类型元素一样显示，并添加样式列表标记。
- table 此元素会作为块级表格来显示。
- inherit 规定应该从父元素继承 display 属性的值。

#### 6.请解释一下 CSS3 的 Flexbox（弹性盒布局模型）,以及适用场景？

一个用于页面布局的全新 CSS3 功能，Flexbox 可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。
较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。
它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
常规布局是基于块和内联流方向，而 Flex 布局是基于 flex-flow 流可以很方便的用来做局中，能对不同屏幕大小自适应。
在布局上有了比以前更加灵活的空间。
