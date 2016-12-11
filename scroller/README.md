# jquery.scroller.js

## 简介

jquery.scroller.js是一款自定义滚动条的插件。

## 功能概述

有拖拽滚动、鼠标滚轮滚动、键盘方向键滚动、滚动至特定区域等功能。

## 兼容性

IE7+

## 使用方法

### 引入文件

* jquery.js(1.8.0+)
* jquery.scroller.css
* jquery.scroller.js

```javascript
<link rel="stylesheet" type="text/css" href="jquery.scroller.css">
...
<script type="text/javascript" src="jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="jquery.scroller.js"></script>
```

### HTML结构

```html
<div class="content">
  <p>...........</p>
</div>
```

### 参数调用方法

```javascript
$('.content').scroller({
  mousewheel: true,
  scrollGap: 300
});
```

## API

### 配置参数

|        名称         |  数据类型   |  默认值  |             含义             |
| :---------------: | :-----: | :---: | :------------------------: |
|        dir        | String  |  'v'  |  滚动方向，'v'表示竖直方向，'h'表示水平方向  |
|     scrollGap     | Number  |  50   | 使用鼠标滚轮或键盘方向键滚动时，每次内容区滚动的距离 |
|       speed       | Number  |  300  |         每次滚动动画执行时间         |
|    mousewheel     | Boolean | false |         是否使用鼠标滚轮滚动         |
|        key        | Boolean | false |        是否使用键盘方向键滚动         |
| resetAfterImgLoad | Boolean | false |      是否在图片加载完毕后重置滚动条       |

### 事件

|        名称         |                   传入参数                   |     含义     |
| :---------------: | :--------------------------------------: | :--------: |
| scroller.scrollTo | pos(Number): 移动的位置；useAnimate(Boolean): 是否使用动画 | 滚动条移动至特定位置 |
|     (Number)      |                    无                     |   重置滚动条    |



## License

MIT licensed

Copyright (C) 2016 linzb93