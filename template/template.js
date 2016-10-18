(function() {

    function wrap(str) {
        return '{{a}}'.replace('a', str);
    }

    function unwrap(str) {
        return str.slice(2,-2);
    }

    function removeRepeat(arr) {
        arr = arr.sort();
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1]) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    }

    function Template(dom, json, count) {
        this.json = json;
        this.count = count || json.length;
        this.tempHtml = dom.innerHTML;
    }

    Template.prototype = {
        getKey: function() {
            var keyArr = this.tempHtml.match(/{{\S*}}/g);
            for (var i = 0, len = keyArr.length; i < len; i++) {
                keyArr[i] = unwrap(keyArr[i]);
            }
            return removeRepeat(keyArr);
        },
        render: function() {
            var keyArr = this.getKey();
            var html = '';

            for (var i = 0; i < this.count; i++) {
                var re = this.tempHtml;
                for (var j = 0; j < keyArr.length; j++) {
                    re = re.replace(new RegExp(wrap(keyArr[j]), "g"), this.json[i][keyArr[j]]);
                }
                html += re;
            }
            return html;
        }
    }

    window.Template = Template;
})();