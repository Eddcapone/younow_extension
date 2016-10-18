// ==UserScript==
// @name         younow_extension
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  extend younow with more buttons
// @author       Eduard Fekete
// @include      *
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @require      http://code.jquery.com/jquery-latest.js
// @noframes
// ==/UserScript==

$(document).ready(function(){
    window.setTimeout(main, 1000);
});

function main()
{
    'use strict';
    
    var design=1;
    var intervall_speed_1=50;
    var intervall_speed_2=2500;
    var timer1 = "";
    var timer2 = "";
    var color_bright = "white";
    var color_dark   = "black";

    $('div#app').append('<input type="button" value="Bright Theme" id="design_switch">');
    $('div#playerheader').append('<input type="button" value="?" id="rotate_left">');
    $('div#playerheader').append('<input type="button" value="?" id="rotate_right">');    
    $("#design_switch").css("position","fixed").css("top", 13).css("left", 40).css("z-index","4001");
    $("#design_switch").trigger("click");
    
    $('input#rotate_left').css({
        "line-height":"10px",
        "float":"left"
    });
    $('input#rotate_right').css({
        "line-height":"10px",
        "float":"right"
    });

    function change_design_static(color)
    {
        $("input#rotate_right").css("background-color",color);
        $("input#rotate_left").css("background-color",color);
        $("div#app").css("background-color",color);
        $("div.player-toolbar").css("background-color",color);
        $("div#leftsidebar").css("background-color",color);
        $("div#topfan-slider").css("background-color",color);
        $("div#prev-fan").css("background-color",color);
        $("div#chatinput").css("background-color",color);
        $("div.fullscreen-wide").css("background-color",color);
        $("div.tab-icon").css("background-color",color);
        $("div#chatcomments").css("background-color",color);
        $("div.chatcomments-mediumlarge").css("background-color",color);
        $("div.result").css("background-color",color);
        $("div.explore_more").css("background-color",color);
        $("div.clearfix").css("background-color",color);
        $("div.actions").css("background-color",color);
        $("div.mini-player").css("background-color",color);
        $("div.player-toolbar-right").css("background-color",color);
        $("div.newFooter").css("background-color",color);
        $("#playerheader").css("background-color",color);
        $("div.settings-link").css("background-color",color);
        $("button.next-fan").css("background-color",color);
        $("button.prev-fan").css("background-color",color);
        $("html").css("background-color",color);
        
        $("div#audiencelist.audience").css("background-color",color);
        $("div .user-summary").css("background-color",color);
        $("div .user-summary div .user-description").css("background-color",color);
        $("div .comment-container").css("background-color",color);
        $("div.navigation ul li a").css("background-color",color);
        $("ul.list").css("background-color",color);

        $("span.selectUILanguages").css("background-color",color);
        $("span.selectUILanguage").css("background-color",color);
        $("span.selectUILanguage").css("background-color",color);
        $("span.selectUIInput").css("background-color",color);

        if (design === 0)
        {
            $("#design_switch")        .css("background-color", color).css("color","purple");
            $("div .broadcast-info a i") .css("color", color).css("color","#C7C3C3");
            $("div .broadcast-info a span") .css("color", color).css("color","#C7C3C3");
            $("div .title span") .css("color", color).css("color","#C7C3C3");
            $("div .title a") .css("color", color).css("color","purple");

            $("div .sidebar-header .tab-icon i").css("color","#C7C3C3");
            $("div .sidebar-header .tab-icon span").css("color","#C7C3C3");
        }
        else
        {
            $("#design_switch")        .css("background-color", color).css("color","black");
            $("div .broadcast-info a i") .css("color", color).css("color","black");
            $("div .broadcast-info a span") .css("color", color).css("color","black");
            $("div .title span") .css("color", color).css("color","black");
            $("div .title a") .css("color", color).css("color","#C7C3C3");

            $("div .sidebar-header .tab-icon i").css("color","black");
            $("div .sidebar-header .tab-icon span").css("color","black");
        }
    }

    function change_design_dynamic(color)
    {
        $("div.chatcomment").css("background-color",color);
        $("div.not-subscriber").css("background-color",color);
        $("button.not-subscribed").css("background-color",color);
        $("div.result").css("background-color",color);
        $("ul.dropdown-menu").css("background-color",color);
        $("div.d_content").css("background-color",color);
        $("div.d_item").css("background-color",color);
        $("div.chatcomments").css("background-color",color);
        $("div.gifttray-extension").css("background-color",color);
        $("div.gifttray-basic").css("background-color",color);
        $("div.audience").css("background-color",color);
        $("div.audience-summary").css("background-color",color);
        $("div.sidebar-container:nth-child(2)").css("background-color",color);
        $("span#guestpanel.sidebar-tab").css("background-color",color);
        $("div.summary-placeholder").css("background-color",color);

        $("div.modal-body").css("background-color",color);
        
       
        
        if (design === 0)
        {
            $("a.chat-name").css("color","#7E7E7C");
            $("input#rotate_right").css("color","#7E7E7C");
            $("input#rotate_left").css("color","#7E7E7C");
        }
        else
        {
            $("input#rotate_right").css("color","black");
            $("input#rotate_left").css("color","black");
            $("a.chat-name").css("color","black");
        }
    }
    
    //-------------------Drehung----------------------
    var degree = 0;
    
    $("input#rotate_left").on
    (
        "click",
        function()
        {
            degree -= 90;
            rotate(degree);
        }
    );
    
    $("input#rotate_right").on
    (
        "click",
        function()
        {
            degree += 90;
            rotate(degree);
        }
    );
    
    function rotate(degree)
    {
        $("div.center-in-mask").css({
            "left":"0px",
            "top":"0px",
            "transform" : "rotate("+degree+"deg)"
        });
    }
    
    //------------------------------------------

    $("#design_switch").on
    (
        "click",
        function()
        {
            if(design === 0)
            {
                design = 1;
                change_design_static(color_bright);
                $(this).val("Bright Theme");

                clearInterval(timer1);
                clearInterval(timer2);

                $("div.line-clamp").css("display","none");
                $("div.broadcaster-description").css("display","none");
                $("div.viewer-name").css("color","black");
                $("div.short-text").css("color","black");
                $("div#leftsidebar.panel-title").css("color","black");
                $("input#commentInput").css("background-color","white");
                $("div#playerheader .broadcast-info span").css("color","black");
                $("div#playerheader .broadcast-info a").css("color","black");
                $("div#playerheader .broadcast-info a i").css("color","black");
                $("div#leftsidebar .channel-menu-content .left-panel .panel-title span").css("color","black");

                timer2 = setInterval      //Für statische Inhalte
                (
                    function()
                    {
                        change_design_static(color_bright);
                    },
                    intervall_speed_2
                );

                timer1 = setInterval      //Für dynamische Inhalte
                (
                    function()
                    {
                        change_design_dynamic(color_bright);
                    },
                    intervall_speed_1
                );
            }
            else if (design === 1)
            {
                design = 0;
                change_design_static(color_dark);
                $(this).val("Dark Theme");

                clearInterval(timer1);
                clearInterval(timer2);

                $("div.line-clamp").css("display","none");
                $("div.broadcaster-description").css("display","none");
                $("div.viewer-name").css("color","white");
                $("div.short-text").css("color","white");
                $("input#commentInput").css("background-color","rgb(200,200,200)");

                $("div#playerheader .broadcast-info span").css("color","#7E7E7C");
                $("div#playerheader .broadcast-info a").css("color","#2a85d8");
                $("div#playerheader .broadcast-info a i").css("color","#7E7E7C");
                $("div#leftsidebar .channel-menu-content .left-panel .panel-title span").css("color","#7E7E7C");


                timer2 = setInterval      //Für statische Inhalte
                (
                    function()
                    {
                        change_design_static(color_dark);
                    },
                    intervall_speed_2
                );

                timer1 = setInterval      //Für dynamische Inhalte
                (
                    function()
                    {
                        change_design_dynamic(color_dark);
                    },
                    intervall_speed_1
                );
            }
        }
    );
}