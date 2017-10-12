define(['jquery', 'config', 'en-us', 'zh-cn', 'store', 'jqueryconfirm'],
    function ($, Config, English, Chinese, Store, jqueryconfirm) {

        var utils = {
            lang: null,
            router: null,

            /**
             convert string to object of json
             **/
            stringToJson: function (str) {
                if (null == str || "" == str) {
                    str = 'null';
                }
                if (window.JSON && window.JSON.parse) {
                    return window.JSON.parse(str);
                }
            },
            /**
             convert object of json to string
             **/
            jsonToString: function (obj) {
                if (window.JSON && window.JSON.stringify) {
                    return window.JSON.stringify(obj);
                }
            },

            showMessage: function (options) {
                var defaults = {
                    opacity: 1,
                    //loading页面透明度
                    backgroundColor: "#fff",
                    //loading页面背景色
                    borderColor: "#bbb",
                    //提示边框颜色
                    borderWidth: 1,
                    //提示边框宽度
                    borderStyle: "solid",
                    //提示边框样式
                    loadingTips: "",
                    //提示文本
                    TipsColor: "#666",
                    //提示颜色
                    delayTime: 1000,
                    //页面加载完成后，加载页面渐出速度
                    zindex: 999,
                    //loading页面层次
                    sleep: 0
                    //设置挂起,等于0时则无需挂起

                }
                var options = $.extend(defaults, options);

                //获取页面宽高
                var _PageHeight = document.documentElement.clientHeight,
                    _PageWidth = document.documentElement.clientWidth;

                //在页面未加载完毕之前显示的loading Html自定义内容
                var _LoadingHtml = '<div id="loadingPage" style="position:fixed;left:0;top:0;_position: absolute;width:100%;height:' + _PageHeight + 'px;background:' + options.backgroundColor + ';opacity:' + options.opacity + ';filter:alpha(opacity=' + options.opacity * 100 + ');z-index:' + options.zindex + ';">'
                    + '"<div id="loadingTips" style="position: absolute; cursor1: wait; width: auto;border-color:' + options.borderColor + ';border-style:' + options.borderStyle + ';border-width:' + options.borderWidth + 'px; height:80px; line-height:80px; padding-left:80px; padding-right: 5px;border-radius:10px;  background: ' + options.backgroundColor + ' url(./img/ajax-loader.gif) no-repeat center; color:' + options.TipsColor + ';font-size:20px;">' + options.loadingTips + '</div>'
                    + '</div>';

                //呈现loading效果
                $("body").append(_LoadingHtml);

                //获取loading提示框宽高
                var _LoadingTipsH = document.getElementById("loadingTips").clientHeight,
                    _LoadingTipsW = document.getElementById("loadingTips").clientWidth;

                //计算距离，让loading提示框保持在屏幕上下左右居中
                var _LoadingTop = _PageHeight > _LoadingTipsH ? (_PageHeight - _LoadingTipsH) / 2 : 0,
                    _LoadingLeft = _PageWidth > _LoadingTipsW ? (_PageWidth - _LoadingTipsW) / 2 : 0;

                $("#loadingTips").css({
                    "left": _LoadingLeft + "px",
                    "top": _LoadingTop + "px"
                });
            },

            hideMessage: function () {
                $("#loadingPage").remove();
            },

            showAlert: function (option) {

            },

            /**
             * 获取当前应用的语言（中/英）
             */
            setLang: function (Store) {
                var self = this;
                if (Store.getLang() == 'en-us') {
                    self.lang = English;
                } else {
                    self.lang = Chinese;
                }
            },

            /**
             * 获取url页面，区分不同的路由add zcy 2015-05-13
             * @returns
             */
            getUrlpath: function () {
                var curUrl = _.clone(window.location.href);
                //判断是否包含带#的路径
                if (curUrl.indexOf("#") != -1) {
                    var urlAry = curUrl.split('#');
                    curUrl = urlAry[1];
                }
                return curUrl;
            },

            /**
             * 生成一个GUID
             * @returns {String}
             */
            genGuid: function () {
                var S4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            },

            setRouter: function (router) {
                this.router = router;
            },

            getRouter: function () {
                return this.router;
            },

            showAlert: function(options){
                var optionInit = {
                    title: '',
                    content: '警告',
                    buttons: {
                        confirm: {
                            text: '确定'
                        }
                    }
                };
                if(options.title){
                    optionInit.title = options.title;
                }

                if(options.content){
                    optionInit.content = options.content;
                }

                if(options.buttons){
                    optionInit.buttons = options.buttons;
                }

                $.alert(optionInit);
            },

            // 无需在浏览器的历史记录创建条目来更新URL
            backToPage: function(pageId){
                this.getRouter().navigate("forward/" + pageId, {trigger: true, replace: true});
            },
            jumpToPage: function(pageId){
                this.getRouter().navigate("forward/" + pageId, {trigger: true, replace: false});
            }
    };
        return utils;
    });
