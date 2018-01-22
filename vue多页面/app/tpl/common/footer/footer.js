/**
 * author: zhanghuan
 * created: 2018/1/22
 * describe: 页脚
 */
"use strict";
define(function (require, exports, module) {
  require('./footer.css');
  module.exports = {
    name: "footer",
    template: require('./footer.tpl'),
    props: [],
    data: function () {
      return {
        footerMsg: '这是footer，做为公共组件调用'
      }
    },
    methods: {

    },
    mounted: function () {

    },
    computed: {

    }
  };
});