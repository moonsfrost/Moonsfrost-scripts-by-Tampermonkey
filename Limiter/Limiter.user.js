// ==UserScript==
// @name         Limiter
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  To focus on your study
// @author       Moonsfrost
// @match        */*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_unregisterMenuCommand
// ==/UserScript==

function reset(){
    var s = ["mcmod.cn","ngabbs.com","mcbbs.net","bilibili.com"];
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

function remove(need){
    var s = GM_getValue("banlist");
    for(var i=0;i<s.length;i++){
        if(s[i]==need){
            s[i] = s[s.length-1];
            s.pop();
        }
    }
    GM_setValue("banlist",s);
}

function getList(){
    var s = GM_getValue("banlist");
    var LIST = s.join(" ");
    return LIST;
}


function RemoveSiteFunction(){
    var now =window.location.host;
    remove(now);
}
function RemoveChooseFunction(){
    var need = prompt("Write the website you want to remove.\n"+getList());
    remove(need);
}

function ToShowList(){
    alert(getList());
}

let show = GM_registerMenuCommand("Show the banned list",ToShowList);
let clear = GM_registerMenuCommand("Clear All the set(Only default left)",cc);
let add = GM_registerMenuCommand("Add this website to banned list",add_website);
let remove1 = GM_registerMenuCommand("Remove this website from the list",RemoveSiteFunction);
let remove2 = GM_registerMenuCommand("Choose the website you want to remove",RemoveChooseFunction);

(function() {
    'use strict'
    var s = GM_getValue("banlist");
    if(s==undefined) {
        reset();
        s=GM_getValue("banlist");
    }
    var now = window.location.host;
    for(var i = 0;i < s.length;i++){
        if(now.indexOf(s[i])!=-1) limit_behaviour();
    }
})();