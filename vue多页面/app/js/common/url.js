/**
 * author: zhanghuan
 * created: 2018/1/22
 * describe: 接口配置文件
 */
"use strict";
define(function (require, exports, module) {
  top.window.basePath = '/API/';
  var base = top.window.basePath;
  var URL = {
    "test": base + 'hiring',
    "test2": 'static/mock/test.json'
  };
  module.exports = URL;
});