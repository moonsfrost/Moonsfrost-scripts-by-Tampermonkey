// ==UserScript==
// @name         Limiter
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  To focus on your study
// @author       Moonsfrost
// @match        *.bilibili.com
// @match        *.mcmod.cn
// @match        *.mcbbs.net
// @match        *.ngabbs.com
// @match        ngabbs.com/*
// @match        www.zhihu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict'
    var d = new Date();
    var h = d.getHours();
    var day = d.getDay();
    if((8<=h&&h<=12)||(14<=h&&h<=17)||(19<=h&&h<=21)){
        document.querySelector("body").remove();
        window.setTimeout(function() { alert('This website has been banned because it is your STUDY time now!') }, 60);
    }
})();