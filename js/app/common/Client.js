define(['jquery', 'underscore', 'backbone', 'store', 'utils', 'en-us', 'zh-cn', 'config', 'store', 'jqueryconfirm'],
    function ($, _, Backbone, Store, Utils, English, Chinese, Config, Store, jqueryconfirm) {
        var Client = {
            baseUrl: null,
            //当前请求
            currentRequest: null,
            isAbort: false,

            /**
             初始化ajax
             **/
            initialize: function () {
                var self = this;
                self.baseUrl = Config.get('baseUrl');
                $.ajaxSetup({
                    //连接120秒为超时
                    timeout: 120 * 1000,
                    beforeSend: function (xhr) {
                        var token = Store.getToken();
                        xhr.setRequestHeader('token', token);
                    },

                    //网络错误时
                    error: function (xhr, status, e) {
                        var msg = status;
                        Utils.hideMessage();
                        //网络连接错误
                        if (msg == "error") {
                            // 后台运行的请求，在网络有问题是不做提示。
                            var ignoreAlert = [];
                            if (!_.contains(ignoreAlert, xhr.flag)) {
                                setTimeout(function () {
                                    Utils.showAlert({content: Utils.lang.connection_failed});
                                }, 500);
                            }
                        } else if (msg == "abort") {//主动终止Ajax请求

                        } else if (msg == "timeout") {//网络连接超时
                            if (xhr.flag && !("".indexOf(xhr.flag) > -1)) {
                                Utils.showAlert({content: Utils.lang.connection_timeout});
                            }
                        }
                    },

                    dataFilter: function (data, type) {
                        //json obj
                        var dataTemp = Utils.stringToJson(data);

                        if (dataTemp && dataTemp.data == 'token error') {
                            Utils.hideMessage();
                        } else {
                            return data;
                        }

                    }

                });
            },
            /**
             * 终止异步请求
             */
            abortAjax: function () {
                var self = this;
                if (self.currentRequest) {
                    self.currentRequest.abort();
                    self.isAbort = true;
                }
            },

            /**
             * 处理URL
             * @param  {String} _url 原始URL
             * @return {String}      处理过的URL
             */
            wrapUrl: function (_url) {
                if (_url.indexOf('?') > -1) {
                    _url += "&_t=" + Utils.genGuid();
                } else {
                    _url += "?_t=" + Utils.genGuid();
                }
                return _url;
            },

            post: function (data, path, callback, type, errCall, abortCall) {
                var self = this;
                var tmpUrl = self.wrapUrl(self.baseUrl + path);
                var flagStr = path.split('/')[2];
                self.isAbort = false;
                if (type == null) {
                    self.currentRequest = $.post(tmpUrl, data, function (rs) {
                        if (!self.isAbort) {
                            callback(rs);
                        }
                    });
                } else if (type == 'json') {
                    if (!errCall) {
                        errCall = function () {
                        };    //10-18 ajax请求失败的操作函数
                    }
                    if (!abortCall) {
                        abortCall = function () {
                        };   //10-18 终止ajax后操作函数
                    }
                    self.currentRequest = $.ajax({
                        type: "POST",
                        url: tmpUrl,
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: function (_data) {
                            abortCall();   //10-18添加终止ajax后方法
                            if (!self.isAbort) {
                                callback(_data);
                            }
                        },
                        error: errCall     //10-18添加请求失败方法
                    });
                }
                self.currentRequest.flag = flagStr;
                flagStr = null;

            },

            get: function (data, path, callback, type) {
                var self = this;
                var tmpUrl = self.wrapUrl(self.baseUrl + path);
                var flagStr = path.split('/')[2];
                self.isAbort = false;
                if (type == null) {
                    self.currentRequest = $.get(tmpUrl, data, function (rs) {
                        if (!self.isAbort) {
                            callback(rs);
                        }
                    });
                } else if (type == 'json') {
                    self.currentRequest = $.ajax({
                        type: "GET",
                        url: tmpUrl,
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: function (_data) {
                            if (!self.isAbort) {
                                callback(_data);
                            }
                        }
                    });
                }
                self.currentRequest.flag = flagStr;
                flagStr = null;
            },

            /**
             登陆
             **/
            login: function (data, callback) {
                var self = this;
                self.post(data, '/admin/login', function (rs) {
                    if (rs && rs.state == 1 && Store && Store.setToken) {
                        Store.setToken(rs.data.token);
                    }
                    if(callback){
                        callback(rs);
                    }
                });
            },

            /**
             测试用
             **/
            testApiPost: function (data, callback) {
                var self = this;
                self.post(data, '/api/iGSA/getCookiesUserData', function (rs) {
                    if(callback){
                        callback(rs);
                    }
                }, 'json');
            },
        };
        return Client;
    });

