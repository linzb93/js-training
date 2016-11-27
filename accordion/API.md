# API

|       参数        |    类型    |     默认值      | 可选值  |                    含义                    |
| :-------------: | :------: | :----------: | :--: | :--------------------------------------: |
|   activeSize    |  Number  |      0       | 700  |              手风琴组件中大尺寸元素的尺寸              |
|      speed      |  Number  |     500      | 600  |                切换速度，单位ms                 |
|       dir       |  String  |     ‘h’      | 'v'  |         切换方向，'h'表示水平方向，'v'表示竖直方向         |
|   css3Support   | Boolean  |    false     | true | 是否支持css3动画切换，性能比jQuery的animate方法好，建议使用。动画相关css需要自己写。 |
| beforeAnimation | Function | function(){} | ...  |                执行动画之前的函数                 |
| afterAnimation  | Function | function(){} | ...  |                执行动画之后的函数                 |