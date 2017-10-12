app.support = {
    userAgent: navigator.userAgent.toLocaleLowerCase(),
    ie: function() {
        var isIE = app.support.userAgent.indexOf('msie') !== -1 || !!app.support.userAgent.match(/trident\/7\./) || app.support.userAgent.indexOf('edge') !== -1;
        if (isIE) {
            var isLteIE8 = isIE && !+[1, ],
            ieVer = 6,
            dm = document.documentMode;
            if (dm) {
                switch (dm) {
                    case 6:
                    ieVer = 6;
                    break;
                    case 7:
                    ieVer = 7;
                    break;
                    case 8:
                    ieVer = 8;
                    break;
                    case 9:
                    ieVer = 9;
                    break;
                    case 10:
                    ieVer = 10;
                    break;
                    case 11:
                    ieVer = 11;
                    break;
                }
            } else {
                if (navigator.userAgent.toLocaleLowerCase().indexOf('edge') !== -1) {
                    return ieVer = 'edge';
                } else if (isLteIE8 && !XMLHttpRequest) {
                    ieVer = 6;
                } else if (isLteIE8 && !document.documentMode) {
                    ieVer = 7;
                }
                if (isLteIE8 && document.documentMode) {
                    ieVer = 8;
                }
                if (!isLteIE8 && (function() { "use strict"; return !!this; }())) {
                    ieVer = 9;
                }
                if (isIE && !!document.attachEvent && (function() { "use strict"; return !this; }())) {
                    ieVer = 10;
                }
                if (isIE && !document.attachEvent) {
                    ieVer = 11;
                }
            }
            return ieVer;
        } else {
            return false;
        }
    },

    chrome: function() {
        if (app.support.userAgent.indexOf('chrome') !== -1 && app.support.userAgent.indexOf('edge') === -1) {
            return app.support.userAgent.replace(/^[\w\W]+chrome\/([0-9\.]+)[\w\W]+/, '$1');
        } else {
            return false;
        }
    }
};

/* 视频创建及兼容处理 */
app.video = {
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
        var setting = $.extend({}, app.video.setting, setting),
        $player = $(setting.container),
        isOldIE = app.support.ie() && app.support.ie() < 9,
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
                app.video.fullscreen($player.find('resources, embed')[0]);
            }
        }
    }
};

//placeholder兼容
app.placeholder = function(){
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