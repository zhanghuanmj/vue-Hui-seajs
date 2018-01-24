/**
 * author: zhanghuan
 * created: 2018/1/22
 * describe: 欢迎页面的首页
 */
"use strict";
define(function (require, exports, module) {
  var $public = require('public');
  var $url = require('url');
  var vm = new Vue({
    el: '#app',
    components: {
      "v-footer": require('footer')
    },
    filters: {

    },
    data: function () {
      return {
        msg: '欢迎大神使用本系统！！！'
      }
    },
    methods: {
      /*
      * params: 接收参数
      * return: 返回参数
      * function: 方法功能
      * */
      getTestData: function () {
        $public.getRequest({
          url: $url.test2,
          type: 'GET',
        }, function (res) {

        });
      }
    },
    mounted: function () {
      this.getTestData();
    },
    computed: {

    },
    watch: {

    }
  });
  module.exports = vm;
});