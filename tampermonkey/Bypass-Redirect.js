// ==UserScript==
// @name         Bypass Redirects
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  自动跳过中间跳转页面，直接访问目标地址
// @author       oxyuan
// @match        https://weibo.cn/sinaurl?u=*
// @match        https://www.oschina.net/action/GoToLink?url=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// URL与参数名称的映射表
const urlMappings = [
    { host: 'weibo.cn', path: '/sinaurl', param: 'u' },
    { host: 'oschina.net', path: '/action/GoToLink', param: 'url' }
];

(function() {
    'use strict';

    // 通用跳转处理函数
    function bypassRedirect(paramName) {
        const urlParams = new URLSearchParams(window.location.search);
        const targetURL = urlParams.get(paramName);

        if (targetURL) {
            window.location.replace(decodeURIComponent(targetURL));
        }
    }

    // 遍历映射表，查找匹配的URL
    urlMappings.forEach(mapping => {
        if (window.location.hostname.includes(mapping.host) && window.location.pathname === mapping.path) {
            bypassRedirect(mapping.param);
        }
    });
})();
