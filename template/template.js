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

    //avoid XSS
    function strFormat(str) {
        return str.replace(/&/g, '&amp;')//&
                  .replace(/</g, '&lt;')//左尖号
                  .replace(/>/g, '&gt;')//右尖号
                  .replace(/"/g, '&quot;')//双引号"
                  .replace(/'/g, '&#039;');//IE下不支持&apos;'
    }

    function TemplateCls(dom, json, count) {
        this.json = json;
        this.count = count || json.length;
        this.tempHtml = dom.innerHTML;
    }

    TemplateCls.prototype = {
        getKey: function() {
            var keyArr = this.tempHtml.match(/{{[^}]*}}/g);
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
                    if (this.json[i][keyArr[j]] === 'undefined') {
                        throw new Error('There did not exist the key ' + keyArr[j]);
                    }
                    var newStr = strFormat(this.json[i][keyArr[j]]);
                    re = re.replace(new RegExp(wrap(keyArr[j]), "g"), newStr);
                }
                html += re;
            }
            return html;
        }
    }

    function template(dom, json, count) {
        return new TemplateCls(dom, json, count).render();
    }

    window.template = template;
})();
