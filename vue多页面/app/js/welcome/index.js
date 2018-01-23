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
      getData: function () {
        $public.getRequest({
          url: $url.test2,
          type: 'GET',
        }, function (res) {
          console.log('d', res);
        });
      }
    },
    mounted: function () {
      this.getData();
    },
    computed: {

    },
    watch: {

    }
  });
  module.exports = vm;
});