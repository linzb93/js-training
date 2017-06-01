# database.js

database.js是一个用处理数据库的方式处理对象数组的Javascript插件。



## 兼容性

IE7及以上的浏览器



## 快速上手

### 引入插件

```javascript
<script src="database.js"></script>
```



### 创建实例

```javascript
var store = [{
  name: 'Mike',
  age: 19
}, {
  name: 'Jack',
  age: 30
}];

var db = new DB(store);

//插入数据
db.push({
  name: 'Lee',
  age: 25
});

//更新数据
db.update({age: 20}, function(item, index) {
  return item.name === 'Mike'
});

//查询数据
db.filter('name', function(item) {
  return item.age < 30;
});
//输出：['Mike', 'Lee']
```



## API

### 属性

#### `length`  Number

数据库内数据的数量

---

### 方法

#### Database的方法

#### push(data)

data类型：Object

#### push(datas)

datas类型：Array

往数据库内添加数据。

---

#### update(entry, function(item, index))

erntry类型：Object

function(item, index)类型：Function。两个参数第一个是数据库内数据的值，第二个是该数据的索引值。

更新数据库内的数据。

---

#### filter([keys], function(item, index))

keys类型：String。要获取的数据键名，是可选值。在API方法里面参数加上 ‘[]’ 符号的表示参数是可选值。

function(item, index)类型：Function。两个参数第一个是数据库内数据的值，第二个是该数据的索引值。

查询数据库内的数据。

参数里面不带keys的，方法返回一个搜索结果Result的对象实例，Result是内部函数，不可调用。参数带keys的，返回Result的find方法的返回值。

---

#### remove(function(item, index))

function(item, index)类型：Function。两个参数第一个是数据库内数据的值，第二个是该数据的索引值。

删除数据库内的数据。

---

#### Result的方法

#### find(keys)

keys类型：String。要获取的数据键名。

获取搜索结果对应键名的数据。如果要查询多个键名对应的数据，键名之间请加空格。

如果键名只有一个，返回的是集合不含Array和Object的数组，否则返回一个集合是Object的数组。

---

#### sum(key)

key类型：String。要求和的数据键名。

对搜索结果的数据键名对应的键值进行求和，返回求和的值。

只支持一个key。

---

#### average(key)

key类型：String。要求平均数的数据键名。

对搜索结果的数据键名对应的键值进行求平均数，返回求平均数的值。

只支持一个key。

---

#### orderBy(key, [isDesc])

key类型：String。要求根据键名对搜索结果数据。

isDesc类型：Boolean。默认为false，为true时逆序排列。

对搜索结果按照键名对应键值进行排序。返回排序后的搜索结果。

---

#### min(key)

key类型：String。要求根据键名对搜索结果数据。

返回按照键名对应键值排序后的数组首个元素，即最小值。

---

#### max(key)

key类型：String。要求根据键名对搜索结果数据。

返回按照键名对应键值排序后的数组最后一个元素，即最大值。

---

#### eq(key, index)

key类型：String。要求根据键名对搜索结果数据。

index类型：Number。获取排序后的数据索引值。

返回按照键名对应键值排序后的数组索引值对应的元素。

---

#### take(key, index)

key类型：String。要求根据键名对搜索结果数据。

index类型：Number。获取排序后的数据索引值及之前/之后的数据。

返回按照键名对应键值排序后的数组索引值对应的元素及之前/之后的元素。若index不小于0，返回之前的元素，否则返回之后的元素。

---

#### some(function(item, index))

function(item, index)类型：Function。两个参数第一个是搜索结果数据的值，第二个是该数据的索引值。

如果有一个数据满足条件，返回true，否则返回false。

---

#### every(function(item, index))

function(item, index)类型：Function。两个参数第一个是搜索结果数据的值，第二个是该数据的索引值。

如果有一个不数据满足条件，返回false，否则返回true。

---

#### forEach(function(item, index))

function(item, index)类型：Function。两个参数第一个是搜索结果数据的值，第二个是该数据的索引值。

对搜索结果的每一项执行传入的函数。

---

#### 工具类函数

database.js暴露了原先只在内部使用的一些工具类方法。以下是Database.utils的函数：

#### each(array, [isReverse], function(item, index))

array类型：Array。遍历的数组。

isReverse：Boolean。是否逆序遍历。

function(item, index)类型：Function。两个参数第一个是数组里面的元素，第二个是该元素的索引值。

对数组进行遍历。

#### type(obj)

obj类型：任意。

返回该数据的类型。



## License

MIT licensed

Copyright (C) 2017 linzb93