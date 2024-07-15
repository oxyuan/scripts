// ==UserScript==
// @name         Bypass Weibo Redirect
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  自动跳过微博的中间跳转页面，直接访问目标地址
// @author       oxyuan
// @match        https://weibo.cn/sinaurl?u=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 解析当前URL并获取参数
    const urlParams = new URLSearchParams(window.location.search);
    const targetURL = urlParams.get('u');

    if (targetURL) {
        // 如果目标地址存在，立即跳转
        window.location.replace(decodeURIComponent(targetURL));
    }
})();

/**
 * Code comments:
 * 
 * @run-at document-start: 确保脚本在文档开始加载时立即执行，减少因页面加载而产生的延迟。
 * window.location.search: 直接获取查询字符串，通过URLSearchParams解析参数。
 * window.location.replace: 可以替换当前页面的历史记录，避免用户回退时再次触发重定向。
 */