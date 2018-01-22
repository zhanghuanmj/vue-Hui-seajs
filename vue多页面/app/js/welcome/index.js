/**
 * author: zhanghuan
 * created: 2018/1/22
 * describe: 欢迎页面的首页
 */
"use strict";
define(function (require, exports, module) {
  var vm = new Vue({
    el: '#app',
    components: {
      "v-footer": require('footer')
    },
    filters: {

    },
    data: function () {
      return {
        msg: '欢迎大神使用本系统'
      }
    },
    methods: {

    },
    mounted: function () {

    },
    computed: {

    },
    watch: {

    }
  });
  module.exports = vm;
});