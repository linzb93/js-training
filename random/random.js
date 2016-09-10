(function() {
    function Randomjs(option) {
        var d = {
        source: [],    //随机数组的来源
        edge: [],      //生成随机数的范围
        number: 1,     //生成随机数的数量
        group: 1       //随机数组分组的个数
    }
        var o = extend(d, option);
        var resultArr = [];

        if (o.source) {
            resultArr = randomArr(o.source);
        }

        if (o.edge) {
            resultArr = createRandomList(o.edge[0], o.edge[1], o.number);
        }

        return resultArr;
    }

    function extend(o1, o2) {
        for (var key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    }

    function randomArr(arr) {
        var length = arr.length,
            r,
            temp;
        for (var i = 0; i < length - 1; i++) {
            r = Math.floor(Math.random() * length);
            temp = arr[i];
            arr[i] = arr[r];
            arr[r] = temp;
        }
        return arr;
    }

    function createRandomList(min, max, num) {
        var arr = [],
            delta = max - min + 1;
        for (var  i = 0; i < num; i++) {
            arr.push(Math.floor(Math.random() * delta) + min);
        }
        return arr;
    }

    window.Randomjs = Randomjs;
})();