// ==UserScript==
// @name         Limiter
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  To focus on your study
// @author       Moonsfrost
// @match        *.bilibili.com/*
// @match        *.mcmod.cn/*
// @match        *.mcbbs.net/*
// @match        *.ngabbs.com/*
// @match        ngabbs.com/*
// @match        www.zhihu.com/*
// @match        localhost/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_unregisterMenuCommand
// ==/UserScript==

function reset(){
    var s = ["mcmod.cn","ngabbs.com","mcbbs.net","bilibili.com","www.zhihu.com"];
    GM_setValue("banlist",s);
   // alert(s);
}

function limit_behaviour(){
    var d = new Date();
    var h = d.getHours();
    var day = d.getDay();
    if((8<=h&&h<=11)||(14<=h&&h<=17)||(19<=h&&h<=21)){
        document.querySelector("body").remove();
        window.setTimeout(function() { alert('This website has been banned because it is your STUDY time now!') }, 60);
    }
}

function add_website(){
    var site = window.location.host;
    var temp = GM_getValue("banlist");
    temp.push(site);
    GM_setValue("banlist",temp);
}

function cc(){
    var flag = prompt("Do You Really want to reset?\nIf SO, please type \"YES\".");
    if(flag=="YES") reset();
    else alert("You have been canceled the operator.");
}

let clear = GM_registerMenuCommand("Clear All the set(Only default left)",cc);

let add = GM_registerMenuCommand("Add this website to banned list",add_website);

(function() {
    'use strict'
    var s = GM_getValue("banlist");
    if(s==undefined) reset();
    //alert(s);
    limit_behaviour();
})();