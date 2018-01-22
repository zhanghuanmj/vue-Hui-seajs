/**
 * @author: zhanghuan
 * @create: 2018/1/22
 * @describe: seajs主配置文件
 */
"use strict";
seajs.config({
  alias: {
    /*alias配置各模块别名，页面引入直接引入别名*/
    /*
    * =========================================
    * 公用的js
    * =========================================
    * */
    "seajsText": "seajs.text.js",
    "vue": "lib/vue.js",
    "layer": "lib/layer/2.4/layer.js",
    "url": "js/common/url.js",
    "public": "js/common/public.js",
    "footer": "js/common/footer.js",
    /*
     * =========================================
     * 其他模块的js
     * =========================================
     * */
    "welcomeIndex": "js/welcome/index.js"
  },
  preload: ["seajsText", "vue"], /*配置提取预加载模块，全局模块，所以页面都需要使用的模块*/
  debug: true // 调试模式
});
