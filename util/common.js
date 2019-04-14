(function() {
    // 工具函数
    var util = {};

    // 防抖
    util.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
    
        var later = function() {
            var last = new Date() - timestamp;
    
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };
    
        return function() {
            context = this;
            args = arguments;
            timestamp = new Date();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
    
            return result;
        };
    };
    
    // 节流
    util.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : new Date();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = new Date();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    
    // 时间前面补0
    util.padStart0 = function(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num.toString();
    };

    // 获取url的query
    util.getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results == null ? "": decodeURIComponent(results[1]);
    };

    // 浏览器版本检测
    util.support = {
        userAgent: navigator.userAgent.toLocaleLowerCase(),
        ie: function() {
            var e = -1 !== util.support.userAgent.indexOf("msie") || !!util.support.userAgent.match(/trident\/7\./) || -1 !== util.support.userAgent.indexOf("edge");
            if (e) {
                var t = e && !+[1]
                , o = 6
                , r = document.documentMode;
                if (r) {
                    switch (r) {
                        case 6:
                        o = 6;
                        break;
                        case 7:
                        o = 7;
                        break;
                        case 8:
                        o = 8;
                        break;
                        case 9:
                        o = 9;
                        break;
                        case 10:
                        o = 10;
                        break;
                        case 11:
                        o = 11
                    }
                }
                else {
                    if (-1 !== navigator.userAgent.toLocaleLowerCase().indexOf("edge"))
                        return o = "edge";
                    t && !XMLHttpRequest ? o = 6 : t && !document.documentMode && (o = 7),
                    t && document.documentMode && (o = 8),
                    !t && function() {
                        return !!this
                    }() && (o = 9),
                    e && document.attachEvent && function() {
                        return !this
                    }() && (o = 10),
                    e && !document.attachEvent && (o = 11)
                }
                return o
            }
            return !1
        },
        chrome: function() {
            return -1 !== util.support.userAgent.indexOf("chrome") && -1 === util.support.userAgent.indexOf("edge") ? util.support.userAgent.replace(/^[\w\W]+chrome\/([0-9\.]+)[\w\W]+/, "$1") : !1
        }
    };

    // 视频创建及兼容处理
    util.video = {
        setting: {
            container: '',
            url: '',
            poster: '',
            width: 800,
            height: 500,
            loop: true,
            autoplay: true,
            controls: true,
            fullscreen: false
        },

        fullscreen: function(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },

        create: function(setting) {
            var setting = $.extend({}, util.video.setting, setting),
            $player = $(setting.container),
            isOldIE = util.support.ie() && util.support.ie() < 9,
            wmp = '';

            /* 如果是初次创建视频,则拼接html模板并插入到页面，并挂上关闭弹窗事件 */
            if ($player.length && setting.url) {
                var str = '';

                if (!isOldIE) {
                    str += '<video src="' + setting.url + '" width="' + setting.width + '" height="' + setting.height + '"' + (setting.autoplay ? ' autoplay="autoplay"' : '') + (setting.loop ? ' loop="loop"' : '') + (setting.controls ? ' controls="controls"' : '') + '>你的浏览器不支持video标签</video>';
                } else {
                    str += '<embed src="' + setting.url + '" width="' + setting.width + '" height="' + setting.height + '" ' + (setting.autoplay ? ' autostart="true" ' : '') + (setting.loop ? ' loop="loop" ' : '') + (setting.controls ? ' controls="controls" ' : '') + ' quality="high" type="video/mp4" align="middle" allowScriptAccess="always" allowFullScreen="true">';
                }

                $player.html(str);

                if (setting.fullscreen) {
                    util.video.fullscreen($player.find('resources, embed')[0]);
                }
            }
        }
    };

    //placeholder兼容
    util.placeholder = function(){
        if(! 'placeholder' in document.createElement('input')){
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        }
    };

    // 业务代码
    var app = {};

    app.goTop = function() {
        var $side = $('.side');
        $('.btn-totop').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });
        if ($(window).scrollTop() > 300) {
            $side.addClass('on');
        } else {
            $side.removeClass('on');
        }
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $side.addClass('on');
            } else {
                $side.removeClass('on');
            }
        });
    };

    // 提醒弹窗
    app.dialog = function(options) {
        var html = '\
        <div class="dialog" id="dialog">\
            <div class="overlay"></div>\
            <div class="dialog-main">\
                <a class="close" href="javascript:;" title="">×</a>\
                <h3>' + options.title + '</h3>\
                <div class="dialog-content">\
                    <p>' + options.content + '</p>\
                </div>\
                <div class="dialog-btn">\
                    <a class="submit" href="javascript:;" title="">确定</a>\
                </div>\
            </div>\
        </div>';
        $('body').append(html);
        $('#dialog').find('.close, .submit').on('click', function() {
            $(this).off('click');
            options.onClose && options.onClose();
            $(this).parents('#dialog').remove();
        });
    }

    // 确认弹窗
    app.confirm = function(options) {
        var html = '\
        <div class="dialog" id="dialog-confirm">\
            <div class="overlay"></div>\
            <div class="dialog-main">\
                <a class="close" href="javascript:;" title="">×</a>\
                <h3>' + options.title + '</h3>\
                <div class="dialog-content">\
                    <p>' + options.content + '</p>\
                </div>\
                <div class="dialog-btn">\
                    <a class="submit" href="' + (options.okUrl || 'javascript:;') + '" title="">' + options.okTxt + '</a>\
                    <a class="cancel" href="' + (options.cancelUrl || 'javascript:;') + '" title="">' + options.cancelTxt + '</a>\
                </div>\
            </div>\
        </div>';
        $('body').append(html);
        $('#dialog-confirm').find('.submit').on('click', function() {
            $(this).off('click');
            options.onOk && options.onOk();
            $(this).parents('#dialog').remove();
        });
        $('#dialog-confirm').find('.close, .cancel').on('click', function() {
            $(this).off('click');
            options.onCancel && options.onCancel();
            $(this).parents('#dialog-confirm').remove();
        });
    }

    app.goTop();
    
    window.util = util;
    window.app = app;
})();