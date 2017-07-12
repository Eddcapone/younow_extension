// ==UserScript==
// @name         younow_extension
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  extend younow with more buttons
// @author       Eduard Fekete
// @include      *younow*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant unsafeWindow
// @grant window.close
// @grant window.focus
// @require http://code.jquery.com/jquery-latest.js
// @noframes
// ==/UserScript==

//Jquery appenden (sicher ist sicher)
var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

var debug = 0;

var timer1 = "";
var timer2 = "";
var intervall_speed_1=50;
var intervall_speed_2=2000;
var design= 1;
var mirrored=0;
var degree = 0;
var color_bright = "white";
var color_dark   = "black";


var ban = [
    {username: "Blitzlicht", onlyRemovePicture: true},
];

const regexChatName = /^"\\n\s+(.+)\\n\s+"$/g;
const regexChatNameProfile = /(\d+)[\\n\\t]+([\W\w]+(?=\\n\\t))/g;

if (debug === 0) { console.log = function() {}; }

$(document).ready(function(){

    $("#blockPic a").on("click", function() {
        console.info("test");
    });

    var t1 = setInterval(function(){ create_elements(); },2500);
    var t2 = setInterval(function(){ getChatNames(); }, 1000);
});

function checkUserInList(username, list)
{
    if (list.indexOf(username) === -1)
        return false; //nicht in der Liste enthalten
    else
        return true; //in der Liste enthalten
}

function getChatNames()
{
    $('a.chat-name').each(function(i, obj) {
        var name = $(this).html();

        //String im Klartext anzeigen (mit special Chars)
        name = JSON.stringify(name);
        var match = regexChatName.exec(name);

        if (match !== null) {
            if (match[1] !== null) {
                for(var x in ban) {
                    if (checkUserInList(match[1], ban[x].username)) {
                        console.info("User '"+match[1]+"' wird verbannt");

                        if (ban[x].onlyRemovePicture) {
                            $(this).closest("div.comment-content").prev().remove();  //Profilbild löschen (besser noch wäre es zu ersetzen)
                        } else {
                            $(this).closest("div.comment-content").prev().remove();  //Profilbild löschen (besser noch wäre es zu ersetzen)
                            $(this).closest("div.comment-content").remove();         //Content löschen
                        }
                    }
                }
            }
        }
    });
}

function rotate(degree)
{
    console.log("rotate("+degree+")");

    $("div.center-in-mask").css({
        "left":"0px",
        "top":"0px",
        "transform" : "rotate("+degree+"deg)"
    });
}

function change_design_static(color)
{
    console.log("change_design_static("+color+")");

    $("div .user-summary div .user-description").css("background-color",color);
    $("div .user-summary")						.css("background-color",color);

    $("div.chatcomments-mediumlarge")	.css("background-color",color);
    $("div.player-toolbar-right")		.css("background-color",color);
    $("input#rotate_right")				.css("background-color",color);
    $("input#rotate_left")				.css("background-color",color);
    $("div#app")						.css("background-color",color);
    $("div.player-toolbar")				.css("background-color",color);
    $("div#leftsidebar")				.css("background-color",color);
    $("div#topfan-slider")				.css("background-color",color);
    $("div#prev-fan")					.css("background-color",color);
    $("div#chatinput")					.css("background-color",color);
    $("div.fullscreen-wide")			.css("background-color",color);
    $("div.tab-icon")					.css("background-color",color);
    $("div#chatcomments")				.css("background-color",color);

    $("div.result")						.css("background-color",color);
    $("div.explore_more")				.css("background-color",color);
    $("div.clearfix")					.css("background-color",color);
    $("div.actions")					.css("background-color",color);
    $("div.mini-player")				.css("background-color",color);

    $("div.newFooter")					.css("background-color",color);
    $("#playerheader")					.css("background-color",color);
    $("div.settings-link")				.css("background-color",color);
    $("button.next-fan")				.css("background-color",color);
    $("button.prev-fan")				.css("background-color",color);
    $("html")							.css("background-color",color);

    $("div#audiencelist.audience")		.css("background-color",color);
    $("div.comment-container")			.css("background-color",color);
    $("div.navigation ul li a")			.css("background-color",color);
    $("ul.list")						.css("background-color",color);

    $("span.selectUILanguages")			.css("background-color",color);
    $("span.selectUILanguage")			.css("background-color",color);
    $("span.selectUILanguage")			.css("background-color",color);
    $("span.selectUIInput")				.css("background-color",color);

    if (design === 0)
    {
        $("#design_switch")        		.css("background-color", color).css("color","green");
		$("#mirror_switch")        		.css("background-color", color).css("color","green");
        $("div .broadcast-info a i") 	.css("color", color).css("color","#C7C3C3");
        $("div .broadcast-info a span") .css("color", color).css("color","#C7C3C3");
        $("div .title span") 			.css("color", color).css("color","#C7C3C3");
        $("div .title a") 				.css("color", color).css("color","purple");

        $("div .sidebar-header .tab-icon i")	.css("color","#C7C3C3");
        $("div .sidebar-header .tab-icon span")	.css("color","#C7C3C3");
    }
    else
    {
        $("#design_switch")        		.css("background-color", color).css("color","black");
        $("div .broadcast-info a i") 	.css("color", color).css("color","black");
        $("div .broadcast-info a span") .css("color", color).css("color","black");
        $("div .title span") 			.css("color", color).css("color","black");
        $("div .title a") 				.css("color", color).css("color","#C7C3C3");

        $("div .sidebar-header .tab-icon i")	.css("color","black");
        $("div .sidebar-header .tab-icon span")	.css("color","black");
    }
}

function change_design_dynamic(color)
{
    console.log("change_design_dynamic("+color+")");

    $("div.modal-body")					.css("background-color",color);
    $("div.chatcomment")				.css("background-color",color);
    $("div.not-subscriber")				.css("background-color",color);
    $("button.not-subscribed")			.css("background-color",color);
    $("div.result")						.css("background-color",color);
    $("ul.dropdown-menu")				.css("background-color",color);
    $("div.d_content")					.css("background-color",color);
    $("div.d_item")						.css("background-color",color);
    $("div.chatcomments")				.css("background-color",color);
    $("div.gifttray-extension")			.css("background-color",color);
    $("div.gifttray-basic")				.css("background-color",color);
    $("div.audience")					.css("background-color",color);
    $("div.audience-summary")			.css("background-color",color);
    $("div.sidebar-container:nth-child(2)")	.css("background-color",color);
    $("span#guestpanel.sidebar-tab")		.css("background-color",color);
    $("div.summary-placeholder")			.css("background-color",color);

    if (design === 0) {
        $("a.chat-name")			.css("color","#7E7E7C");
        $("input#rotate_right")		.css("color","#7E7E7C");
        $("input#rotate_left")		.css("color","#7E7E7C");
    } else {
        $("input#rotate_right")		.css("color","black");
        $("input#rotate_left")		.css("color","black");
        $("a.chat-name")			.css("color","black");
    }
}



function create_elements()
{
    //Wenn das Profilfenster geöffnet ist
    if ($(".modal-dialog").length == 1) {
        //Wenn der "Button" noch nicht an die Report Liste angehängt wurde
        if($(".modal-dialog").find("ul.mini-scroll > li#blockPic").length == 0) {
            console.info("element existiert noch nicht");

            //Username fetchen
            $username = $("div.modal-body .name b").html();

            //String im Klartext anzeigen (mit special Chars)
            $username = JSON.stringify($username);

            console.info($username);

            var match = regexChatNameProfile.exec($username);

            if (match !== null) {
                if (match[1] !== null) {
                    console.info("LEVEL = " + match[1]);
                }

                if (match[2] !== null) {
                    console.info("USERNAME = " + match[2]);

                    var user_profile = '<li id="blockPic"><a>'+match[2]+'</a></li>';

                    $("ul.mini-scroll").append(user_profile);
                }
            }
        } else {
            console.info("element existiert bereits°");
        }
    }

    console.log("create_elements()");

    var cex_counter_all = 0;
    var check_rl = $('#rotate_left').length;
    var check_rr = $('#rotate_right').length;
    var check_ds = $('#design_switch').length;
	var check_ms = $('#mirror_switch').length;

    if (check_rl === 0) {
        $('div#playerheader').append('<input type="button" value="⟲" id="rotate_left">');
        if ($('#rotate_left').length === 1) {
            console.log("\trotate_left wurde erstellt.");

            $('input#rotate_left').css({
                "line-height":"10px",
                "float":"left"
            });

            $("input#rotate_left").on("click", function() {
                degree -= 90;
                console.log("rotate_left on click degree:"+degree);
                rotate(degree);
            });
        } else {
            console.log("\trotate_left konnte nicht erstellt werden.");
        }
    } else if (check_rl === 1) {
        console.log("\trotate_left existiert.");
    }

    //--------------------------------------------

    if (check_rr === 0) {
        $('div#playerheader').append('<input type="button" value="⟳" id="rotate_right">');
        if ($('#rotate_right').length === 1) {
            //console.log("\trotate_right wurde erstellt.");

            $('input#rotate_right').css({
                "line-height":"10px",
                "float":"right"
            });

            $("input#rotate_right").on("click",function() {
                degree += 90;
                console.log("rotate_right on click degree:"+degree);
                rotate(degree);
            });
        }
        else {
            console.log("\trotate_right konnte nicht erstellt werden.");
        }
    } else if (check_rr === 1) {
        console.log("\trotate_right existiert.");
    }

    //--------------------------------------------

    if (check_ds === 0) {
        $('div#app').append('<input type="button" value="Bright Theme" id="design_switch">');		
		
        if ($('#design_switch').length === 1) {
            console.log("\tdesign_switch wurde erstellt.");

            $("#design_switch").css("position","fixed").css("top", 8).css("left", 10).css("z-index","4001");
            $("#design_switch").trigger("click");

            
        } else {
            console.log("\tButton design_switch konnte nicht erstellt werden.");
        }
		
		
    } else if (check_ds === 1) {
        console.log("\ttButton design_switch existiert.");
    }
	
	if (check_ms === 0) {
		$('div#app').append('<input type="button" value="Mirror Video" id="mirror_switch">');
		
        if ($('#mirror_switch').length === 1) {
            console.log("\tButton mirror_switch wurde erstellt.");

            $("#mirror_switch").css("position","fixed").css("top", 33).css("left", 10).css("z-index","4001");
            //$("#mirror_switch").trigger("click");

            
        } else {
            console.log("\tButton mirror_switch konnte nicht erstellt werden.");
        }
	} else {
		console.log("\ttButton mirror_switch existiert.");
	}
}

function setCookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays===null) ?
        "" :
        ";expires="+exdate.toUTCString());
}

$("body").on("click", "#design_switch", function() {
	if(design === 0) {

		console.log("design_switch on click design:"+design);

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

		//Für statische Inhalte
		timer2 = setInterval(function() {
			change_design_static(color_bright);
		},intervall_speed_2);

		//Für dynamische Inhalte
		timer1 = setInterval(function() {
			change_design_dynamic(color_bright);
		},intervall_speed_1);

	} else if (design === 1) {
		console.log("design_switch on click design:"+design);
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

		//Für statische Inhalte
		timer2 = setInterval(function() {
			change_design_static(color_dark);
		},intervall_speed_2);

		//Für dynamische Inhalte
		timer1 = setInterval(function() {
			change_design_dynamic(color_dark);
		},intervall_speed_1);
	}
});

$("body").on("click","#mirror_switch", function() {
	var x;
	
	if (mirrored === 1) {
		x = 0;
		mirrored = 0;
	} else {
		x = 180;
		mirrored = 1;
	}
	$(".player-main").css({
		"transform": "rotateY("+ x +"deg)",
		"-webkit-transform": "rotateY("+ x +"deg)",
		"-moz-transform": "rotateY("+ x +"deg)",
	});
});
