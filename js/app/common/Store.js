define(['jquery', 'utils', 'underscore'], function ($, utils, _) {

    var Store = {
        cacheData: {},
        /**
         * 添加一个临时存储的数据
         * @param key:String
         * @param data:Object
         */
        setTempData: function (key, data) {
            this.cacheData[key] = data;
        },

        /**
         * 获取一个临时存储的数据
         * @param key:String
         */
        getTempData: function (key) {
            return this.cacheData[key];
        },

        /**
         * 添加一个基于HMTL5本地存储的数据
         * @param key:String
         * @param data:Object
         */
        setData: function (key, data) {
            window.localStorage.setItem(key, utils.jsonToString(data));
        },

        /**
         * 获取一个基于HMTL5本地存储的数据
         * @param key:String
         */
        getData: function (key) {
            var data = null;
            try {
                data = utils.stringToJson(window.localStorage.getItem(key));
            } catch (ex) {
            }
            return data;
        },

        removeData: function (key) {
            window.localStorage.removeItem(key);
        },

        setToken: function (token) {
            this.setData('$token', token);
        },

        getToken: function () {
            return this.getData('$token');
        },

        /**
         * 判断系统语言
         * 仅第一次加载系统的时候判断
         */
        getLang: function () {
            var lang = this.getData('$lang') || navigator.language || navigator.browserLanguage || 'zh-cn';
            if (/zh\-\w+/i.test(lang)) {
                lang = "zh-cn";
            } else {
                lang = "en-us";
            }
            return lang;

        },
        setLang: function (name) {
            this.setData('$lang', name);
            utils.lang = name;
        },
    };
    return Store;
});