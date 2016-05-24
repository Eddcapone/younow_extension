// ==UserScript==
// @name         younow_design_switch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  switch between bright/dark theme on younow
// @author       Eduard Fekete
// @match        https://www.younow.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready
(
    function()
    {
        'use strict';
        var design=1;
        var intervall_speed_1=100;
        var intervall_speed_2=2500;
        var timer1 = "";
        var timer2 = "";
        var color_bright = "white";
        var color_dark   = "black";

        $('div#app').append('<input type="button" value="Bright Theme" id="design_switch">');
        $("#design_switch").css("position","fixed").css("top", 13).css("left", 20).css("z-index","3001");

        function change_design_static(color)
        {
            $("body").css("background-color",color);
            $("div.player-toolbar").css("background-color",color);
            $("div#topfan-slider").css("background-color",color);
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
            $("button.next-fan").css("background-color",color);
            $("div#audiencelist.audience").css("background-color",color);

            $("span.selectUILanguages").css("background-color",color);
            $("span.selectUILanguage").css("background-color",color);
            $("span.selectUILanguage").css("background-color",color);
            $("span.selectUIInput").css("background-color",color);

            if (design === 0)
            {
                $("#design_switch").css("background-color", color).css("color","purple");
            }
            else
            {
                $("#design_switch").css("background-color", color).css("color","black");
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
            $("div.guest").css("background-color",color);
            if (design === 0)
            {
                $("a.chat-name").css("color","#7E7E7C");
            }
            else
            {
                $("a.chat-name").css("color","black");
            }
        }


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
);