/**
 * author: zhanghuan
 * created: 2018/1/22
 * describe: 公共js方法
 */
"use strict";
define(function(require, exports, module) {
  require('layer');

  var $public = function() {
    this.init.apply(this, arguments);
  };
  $public.prototype = {
    init: function() {

    },
    // ajax请求
    getRequest: function(options, callback) {
      var self = this;
      var type = options.type ? options.type : "POST";
      var url = options.url;
      var data = options.data || {};
      var headers = options.headers || {};
      var getTime = new Date().getTime();
      var ind = -1;
      if (url.indexOf('?') > -1) {
        url = url + '&_=' + getTime;
      } else {
        url = url + '?_=' + getTime;
      }

      return $.ajax({
        type: type,
        dataType: 'json',
        timeout: 20000,
        url: url,
        data: data,
        traditional: true,
        headers: headers,
        beforeSend: function (xhr) {
          //加载层-默认风格
          ind = layer.load();
        },
        success: function(res) {
          if (res.code === 1) {
            callback && callback(res);
            return false;
          }

          if (res.code === 0) {
            var ind = layer.confirm(res.msg || '抱歉，请求出错了！', {
              btn: ['确定', '取消'] //按钮
            }, function () {
              layer.close(ind);
            }, function () {
              layer.close(ind);
            });
          }
          return false;
        },
        error: function (err) {
          layer.msg('网络错误，请刷新页面重试！');
          return false;
        },
        complete: function(XHR, TS) {
          layer.close(ind);
        }
      });
    },
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  };
  module.exports = new $public();
});