/****************************************************************************
 JSCommunicator
 http://jscommunicator.org

 Copyright (C) 2013  Daniel Pocock http://danielpocock.com
 Copyright (C) 2014  Juliana Louback http://julianalouback.com

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 2 of the License, or (at your option)
 any later version.  The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

 You may distribute non-source (e.g., minimized or compacted) forms of
 that code without the full copy of the GNU GPL normally required
 provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.
****************************************************************************/
(function(a){window.i18n={initI18n:function(b){url_prefix="";JSCommSettings.webserver&&JSCommSettings.webserver.url_prefix&&(url_prefix=JSCommSettings.webserver.url_prefix);if(JSCommSettings.i18n.default_lang)try{i18n.loadBundles(url_prefix,JSCommSettings.i18n.default_lang)}catch(c){}else try{i18n.loadBundles(url_prefix,jQuery.i18n.browserLang())}catch(d){}b?(a("#lang_selection").show(),a.ajax({type:"GET",url:url_prefix+"available_languages.xml",dataType:"xml",success:function(b){a(b).find("language").each(function(){var b=
a(this).find("display").text(),c=a(this).find("code").text();a("#lang_selection").append("<option value="+c+">"+b+"</option>")})}}),jQuery("#lang_selection").change(function(){var b=a(this).val();i18n.loadBundles(url_prefix,"lang_selection"!=b?b:null)})):a("#lang_selection").hide()},loadBundles:function(a,c){jQuery.i18n.properties({name:"Messages",path:a+"internationalization/",mode:"both",language:c,callback:function(){i18n.internationalize()}})},internationalize:function(){jQuery("#error #js").empty().append(jQuery.i18n.prop("error_js"));
jQuery("#error #webrtc").empty().append(jQuery.i18n.prop("error_webrtc"));jQuery("#error #no-config").empty().append(jQuery.i18n.prop("error_no_config"));jQuery("#error #ua-init-failure").empty().append(jQuery.i18n.prop("error_ua_init_failure"));jQuery("#error #reg-fail").empty().append(jQuery.i18n.prop("error_reg_fail"));jQuery("#error #call-attempt-failed").empty().append(jQuery.i18n.prop("error_call_attempt_failed"));jQuery("#error #dynamic").empty().append(jQuery.i18n.prop("error_dynamic"));jQuery("#jsc-login-display-name .jsc-login-label").empty().append(jQuery.i18n.prop("jsc_login_display_name"));
jQuery("#jsc-login-sip-uri .jsc-login-label").empty().append(jQuery.i18n.prop("jsc_login_sip_uri"));jQuery("#jsc-login-password .jsc-login-label").empty().append(jQuery.i18n.prop("jsc_login_password"));jQuery("#jsc-login-button").val(jQuery.i18n.prop("jsc_login_button")).change();jQuery("#ws #ws_link").empty().append(jQuery.i18n.prop("ws_link"));jQuery("#ws #connected").empty().append(jQuery.i18n.prop("ws_state_connected"));jQuery("#ws #disconnected").empty().append(jQuery.i18n.prop("ws_state_disconnected"));
jQuery("#reg #reg-label").empty().append(jQuery.i18n.prop("sip_reg"));jQuery("#reg #state .up").empty().append(jQuery.i18n.prop("sip_reg_up"));jQuery("#reg #state .down").empty().append(jQuery.i18n.prop("sip_reg_down"));jQuery("#control #reg-button").val(jQuery.i18n.prop("button_reg")).change();jQuery("#control #de-reg-button").val(jQuery.i18n.prop("button_dereg")).change();jQuery("#dial-controls #dest #dest_label").empty().append(jQuery.i18n.prop("sip_dest_address"));jQuery("#chat #new-chat #chat_dest_label").empty().append(jQuery.i18n.prop("sip_dest_address"));
jQuery("#dial-controls #dialing-actions #call-audio").attr("title",jQuery.i18n.prop("button_call_audio"));jQuery("#dial-controls #dialing-actions #call-video").attr("title",jQuery.i18n.prop("button_call_audio_video"));jQuery("#session-controls #state .session-outgoing").val(jQuery.i18n.prop("session_state_outgoing")).change();jQuery("#session-controls #state .session-incoming").val(jQuery.i18n.prop("session_state_incoming")).change();jQuery("#session-controls #state .session-accepted").val(jQuery.i18n.prop("session_state_incoming")).change();
jQuery("#session-controls #state .session-active").val(jQuery.i18n.prop("session_state_active")).change();jQuery("#session-actions #session-cancel").attr("title",jQuery.i18n.prop("button_session_cancel"));jQuery("#session-actions #session-reject").attr("title",jQuery.i18n.prop("button_session_reject"));jQuery("#session-actions #session-answer").attr("title",jQuery.i18n.prop("button_session_answer"));jQuery("#session-actions #session-answer-video").attr("title",jQuery.i18n.prop("button_session_answer_video"));
jQuery("#session-actions #session-hangup").attr("title",jQuery.i18n.prop("button_session_answer_hang_up"));jQuery("#video-session #video-controls #video-control-self-view").val(jQuery.i18n.prop("button_video_control_self_view")).change();jQuery("#video-session #video-controls #video-control-self-hide").val(jQuery.i18n.prop("button_video_control_self_hide")).change();jQuery("#video-session #video-controls #video-control-fullscreen").val(jQuery.i18n.prop("button_video_control_full_screen")).change();
jQuery("#welcome").text(jQuery.i18n.prop("welcome"));jQuery("#call h3").text(jQuery.i18n.prop("call"));jQuery("#chat h3").text(jQuery.i18n.prop("chat"));jQuery("#address").attr("placeholder",jQuery.i18n.prop("enter_contact"));jQuery("#chat-address").attr("placeholder",jQuery.i18n.prop("enter_contact"));jQuery(".inactive").attr("placeholder",jQuery.i18n.prop("type_to_chat"));jQuery("#start-chat").attr("title",jQuery.i18n.prop("start_chat"));jQuery("#jsc-logout-button").attr("title",jQuery.i18n.prop("logout"));
jQuery(".no-contact").text(jQuery.i18n.prop("no_contact"));jQuery("#remember-label").text(jQuery.i18n.prop("remember_me"))}}})(jQuery);
(function(a){window.JSCommManager={currentURL:null,phone:null,current_session:null,first_run:!0,credentials:{display_name:null,uri:null,sip_auth_user:null,sip_auth_password:null,sip_auth_user_full_uri:!0},init:function(){window.console||(window.console={});window.console.log||(window.console.log=function(){});window.console.error||(window.console.error=function(){});if(WebRTCSupported()){if(!window.JSCommSettings)return JSCommUI.show_error("no-config"),Arbiter.publish("jsc/unavailable/config",null,
{async:!0}),!1;JSCommSettings.i18n.translate&&i18n.initI18n(JSCommSettings.i18n.show_menu);this.currentURL=parseUri(window.location.toString());if(this.currentURL.queryKey.dial){var b=JSCommSettings.dialing.auto_dial.use_video;this.currentURL.queryKey.video&&(b=a.parseJSON(decodeURIComponent(this.currentURL.queryKey.video)));JSCommSettings.dialing.auto_dial={default_destination:decodeURIComponent(this.currentURL.queryKey.dial),on_startup:!0,use_video:b}}this.credentials=JSCommSettings.user;this.start_ua()}else JSCommUI.show_error("webrtc"),
Arbiter.publish("jsc/unavailable/webrtc",null,{async:!0})},start_login:function(){JSCommUI.show_login()},start_ua:function(){var a=!1;this.credentials.uri&&null!=this.credentials.sip_auth_password&&(a=!0);if(a){if(!this.credentials.sip_auth_user||0==this.credentials.sip_auth_user.length)this.credentials.sip_auth_user_full_uri?this.credentials.sip_auth_user=this.credentials.uri.substr(4):(a=this.credentials.uri.indexOf("@")-4,this.credentials.sip_auth_user=this.credentials.uri.substr(4,a)),console.log("auth username has been automatically derived from the user SIP address: "+
this.credentials.uri+" => "+this.credentials.sip_auth_user);a=JSCommSettings.turn_servers;if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++){if(!a[c].username||0==a[c].username.length)a[c].username=this.credentials.sip_auth_user,a[c].password=this.credentials.sip_auth_password}else if(!a.username||0==a.username.length)a.username=this.credentials.sip_auth_user,a.password=this.credentials.sip_auth_password;JSCommSettings.user=this.credentials;try{this.JsSIPSettings=
getJsSIPSettings(JSCommSettings),this.phone=new JsSIP.UA(this.JsSIPSettings)}catch(d){return console.log(d.toString()),JSCommUI.show_error("ua-init-failure"),!1}JSCommUI.init();this.phone.on("connected",function(a){JSCommManager.link_up()});this.phone.on("disconnected",function(a){JSCommManager.link_down()});this.phone.on("registered",function(a){JSCommManager.registration_up()});this.phone.on("unregistered",function(a){JSCommManager.registration_down()});this.phone.on("registrationFailed",function(a){console.log("Registration failure: "+
a.toString());JSCommManager.registration_failure()});this.phone.on("newRTCSession",function(a){JSCommManager.session_start(a)});this.phone.on("newTransaction",function(a){console.log("newTransaction");var b=a.data.transaction;if(b&&b.request_sender&&b.request_sender.applicant&&"outgoing"==b.request_sender.applicant.direction){if(console.log("outgoing call"),(a=b.request)&&a.method&&"INVITE"==a.method&&a.body){var c=a.body.search("typ relay");0>c&&(console.log("No relay candidate found in SDP"),JSCommSettings.session.require_relay_candidate&&
(console.log("require_relay_candidate is set yet no relay candidate found, call prohibited"),b.onTransportError(),Arbiter.publish("jsc/unavailable/relay",null,{async:!0})));c=a.body.search("a=crypto");console.log("pos = "+c);0>c&&(console.log("Doing workaround for Asterisk issue 22961"),b=a.body.replace(/ RTP/g," UDP/TLS/RTP"),a.body=b)}}else if(b&&(a=b.request)&&a.method&&"INVITE"==a.method&&a.body)console.log("fixing incoming SDP if necessary..."),b=a.body.replace(/ UDP.TLS.RTP/g," RTP"),a.body=
b});this.phone.on("newMessage",function(a){JSCommManager.message_received(a)});Arbiter.subscribe("jsc/destination/set",{async:!0},function(a){JSCommManager.set_destination(a)});this.phone.start()}else JSCommUI.init(),this.start_login()},init_first_connection:function(){console.log("First connection");this.first_run=!1;var a=JSCommSettings.dialing.auto_dial.default_destination;if(a){this.set_destination(a);var c=JSCommSettings.dialing.auto_dial.use_video;JSCommSettings.dialing.auto_dial.on_startup&&
this.make_call(a,c)}else JSCommUI.set_destination("",!JSCommSettings.dialing.edit_destination,JSCommSettings.dialing.show_destination)},set_destination:function(a){JSCommUI.set_destination(a,!JSCommSettings.dialing.edit_destination,JSCommSettings.dialing.show_destination)},link_up:function(){JSCommUI.link_up();this.first_run&&this.init_first_connection();Arbiter.publish("jsc/ua/idle",null,{async:!0})},link_down:function(){JSCommUI.link_down();Arbiter.publish("jsc/ua/notready",null,{async:!0})},registration_up:function(){JSCommUI.registration_up()},
registration_down:function(){JSCommUI.registration_down()},registration_failure:function(){JSCommUI.registration_failure()},session_start:function(a){var c=a.data.session;if(null!=this.current_session)console.log("rejecting new session, a session is already active"),c.terminate();else{this.current_session=c;Arbiter.publish("jsc/ua/incall",null,{async:!0});a=c.remote_identity.uri.toAor().toString();var d="<"+a+">",e="";c.remote_identity.display_name&&(d=c.remote_identity.display_name+" "+d,e=c.remote_identity.display_name);
console.log("peer_name: "+d);var f;"incoming"===c.direction?(f="incoming",Arbiter.publish("jsc/call/incoming",a,{async:!0})):(f="trying",Arbiter.publish("jsc/call/outgoing",a,{async:!0}));var g=0<c.getLocalStreams().length&&0<c.getLocalStreams()[0].getVideoTracks().length||0<c.getRemoteStreams().length&&0<c.getRemoteStreams()[0].getVideoTracks().length;JSCommUI.session_start(f,d,e,a,g);c.on("progress",function(a){JSCommUI.session_progress("incoming"===c.direction?"incoming":"trying")});c.on("failed",
function(a){JSCommUI.session_failed(a.data.cause);delete JSCommManager.current_session;Arbiter.publish("jsc/call/failed",null,{async:!0});Arbiter.publish("jsc/ua/idle",null,{async:!0})});a=function(a){JSCommUI.session_connect(c,a);Arbiter.publish("jsc/call/connected",null,{async:!0})};console.log('only one of the event handlers "confirmed" or "started" will be registered and the other generates a log error which can be ignored');c.on("confirmed",a);c.on("started",a);c.on("newDTMF",function(a){"remote"===
a.data.originator&&(dtmf_char=a.data.dtmf.tone,JSCommUI.incoming_dtmf(dtmf_char),Arbiter.publish("jsc/call/dtmf",dtmf_char,{async:!0}))});c.on("ended",function(a){JSCommUI.session_end();delete JSCommManager.current_session;Arbiter.publish("jsc/call/end",null,{async:!0});Arbiter.publish("jsc/ua/idle",null,{async:!0})})}},message_received:function(a){JSCommUI.new_message(a)},register:function(){this.phone.register()},deregister:function(){this.phone.unregister()},make_call:function(a,c){try{var d=[];
JSCommSettings.extra_headers&&(d=JSCommSettings.extra_headers);this.phone.call(a,{mediaConstraints:{audio:!0,video:c},RTCConstraints:{optional:[{DtlsSrtpKeyAgreement:"true"}]},turn_servers:this.JsSIPSettings.turn_servers,extraHeaders:d})}catch(e){JSCommUI.show_error_tmp("call-attempt-failed"),console.log("make_call failed: "+e.toString()),console.log(e)}},cancel_call:function(){this.current_session.terminate()},reject_call:function(){this.current_session.terminate()},answer_call:function(a){this.current_session.answer({mediaConstraints:{audio:!0,
video:a}})},hangup_call:function(){this.current_session.terminate()},send_dtmf:function(a){var c=100;JSCommSettings.session.dtmf_duration&&(c=JSCommSettings.session.dtmf_duration);this.current_session.sendDTMF(a,{duration:c})},sendMessage:function(a,c){try{this.phone.sendMessage(a,c)}catch(d){throw d;}}}})(jQuery);
(function(a){window.JSCommUI={soundPlayer:null,soundLoop:null,url_prefix:"",init_done:!1,init:function(){this.init_done?console.log("JSCommUI.init() called more than once"):(console.log("starting init"),a("#error #js").hide(),JSCommSettings.webserver.url_prefix&&(this.url_prefix=JSCommSettings.webserver.url_prefix),JSCommUI.link_down(),soundPlayer=document.createElement("audio"),a("#jsc-login-display-name-field").keypress(function(b){13==b.which&&a("#jsc-login-sip-address-field").focus()}),a("#jsc-login-sip-address-field").keypress(function(b){13==
b.which&&a("#jsc-login-password-field").focus()}),a("#jsc-login-password-field").keypress(function(a){13==a.which&&JSCommUI.do_login()}),a("#reg-button").click(function(){JSCommManager.register()}),a("#de-reg-button").click(function(){JSCommManager.deregister()}),a("#dest #address").keypress(function(a){13==a.which&&JSCommUI.make_call(JSCommSettings.dialing.prefer_video)}),a("#call-audio").click(function(){JSCommUI.make_call(!1)}),a("#call-video").click(function(){JSCommUI.make_call(!0)}),a("#session-cancel").click(function(){JSCommManager.cancel_call()}),
a("#session-reject").click(function(){JSCommManager.reject_call()}),a("#session-answer").click(function(){JSCommUI.answer_call(!1)}),a("#session-answer-video").click(function(){JSCommUI.answer_call(!0)}),a("#session-hangup").click(function(){a("#dtmf-pad").hide();JSCommManager.hangup_call()}),a("#dtmf-pad input:button").mousedown(function(){var b=a(this).val();JSCommUI.send_dtmf(b)}),a("#video-control-self-view").click(function(){JSCommUI.self_view(!0)}),a("#video-control-self-hide").click(function(){JSCommUI.self_view(!1)}),
a("#video-control-fullscreen").click(function(){JSCommUI.video_fullscreen(!0)}),a("#dtmf-button").click(function(){a("#dtmf-pad").toggle()}),a("#chat-address").focus(function(){a(this).val("");a("#chat-contact-error").hide()}),a("#address").focus(function(){a(this).val("");a("#call-contact-error").hide()}),a("#start-chat").click(function(){var b=a("#chat-address").val();"Enter contact"!=b&&b?(session=JSCommUI.getSession(b,b))||JSCommUI.createChatSession(b,b):a("#chat-contact-error").show()}),(!JSCommSettings.chat||
!JSCommSettings.chat.enable)&&a("#communicator #chat").hide(),JSCommSettings.registration.user_control||a("#reg #control").text(""),this.init_done=!0)},show_login:function(){a("#welcome").hide();a("#welcome_name").hide();a("#communicator").hide();a("#jsc-logout-button").hide();JSCommManager.credentials.uri?(a("#jsc-login-display-name-field").val(JSCommManager.credentials.display_name),4<JSCommManager.credentials.uri.length&&a("#jsc-login-sip-address-field").val(JSCommManager.credentials.uri.substr(4))):
this.get_cookie("displayName")&&(a("#jsc-login-display-name-field").val(this.get_cookie("displayName")),a("#jsc-login-sip-address-field").val(this.get_cookie("sipAddress")));a("#jsc-login-password-field").val("");a("#jsc-login").show();a("#jsc-login-button").click(JSCommUI.do_login)},do_login:function(){a("#jsc-login").hide();a("#communicator").show();JSCommManager.credentials.display_name=a("#jsc-login-display-name-field").val();JSCommManager.credentials.uri="sip:"+a("#jsc-login-sip-address-field").val();
JSCommManager.credentials.sip_auth_password=a("#jsc-login-password-field").val();var b=JSCommManager.credentials.display_name?JSCommManager.credentials.display_name:JSCommUI.get_name(JSCommManager.credentials.uri);a("#welcome").show();a("#welcome_name").show();a("#welcome_name").text(" "+b);JSCommManager.start_ua();a("#jsc-logout-button").show();a("#jsc-logout-button").click(JSCommUI.do_logout);a("#rememberMe").attr("checked")&&(document.cookie="displayName=".concat(a("#jsc-login-display-name-field").val()),
document.cookie="sipAddress=".concat(a("#jsc-login-sip-address-field").val()))},do_logout:function(){a("#reg").hide();a("#error #reg-fail").hide();JSCommUI.show_login()},show_error:function(b){a("#error #js").hide();a("#error #"+b).show()},show_error_tmp:function(b){a("#error #js").hide();a("#error #"+b).show();a("#error #"+b).fadeTo(5E3,1,function(){a(this).hide()})},set_link_state:function(b){a("#encapsulate #ws").show();a("#encapsulate #ws .state").hide();b?(a(".ws-disconnected").hide(),a("#encapsulate #ws #connected").show(),
a("#dest :input").attr("disabled",!1),a("#dialing-actions :input").attr("disabled",!1),a("#new-chat :input").attr("disabled",!1)):(a(".ws-connected").hide(),a("#encapsulate #ws #disconnected").show(),a("#dial-controls").show(),a("#dialing-actions :input").attr("disabled",!0),a("#dest :input").attr("disabled",!0),a("#new-chat :input").attr("disabled",!0))},ready_to_dial:function(){a("#dial-controls").show();a("#dialing-actions input:button").hide();JSCommSettings.dialing.audio_dialing&&a("#dialing-actions #call-audio").show();
JSCommSettings.dialing.video_dialing&&(a("#dialing-actions #call-video").show(),a("#video-session").draggable(),a("#video-session").resizable());a("#dest #address").focus()},make_call:function(b){var c=a("#address").val();1>c.length?(console.log("no destination specified, can't make call"),a("#call-contact-error").show()):(a("#call-contact-error").hide(),JSCommManager.make_call(c,b))},answer_call:function(b){clearInterval(JSCommUI.soundLoop);soundPlayer.pause();a("#call-info #state span").hide();
a("#call-info #state .session-accepted").show();a("#session-actions button").hide();JSCommManager.answer_call(b)},set_destination:function(b,c,d){a("#address").val(b);a("#address").attr("disabled",c);d?a("#dest").show():a("#dest").hide()},incoming_dtmf:function(a){JSCommSettings.session.dialpad_tone&&this.play_dtmf_sound(a)},link_up:function(){JSCommUI.set_link_state(!0);JSCommUI.ready_to_dial()},link_down:function(){JSCommUI.set_link_state(!1)},registration_up:function(){a("#error #reg-fail").hide();
a("#encapsulate #reg .down").hide();a("#encapsulate #reg .up").show();a("#encapsulate #reg").show()},registration_down:function(){a("#encapsulate #reg .up").hide();a("#encapsulate #reg .down").show();a("#encapsulate #reg").show()},registration_failure:function(){a("#reg .up").hide();a("#error #reg-fail").show();a("#encapsulate #reg").show()},play_again:function(){soundPlayer.play()},session_start:function(b,c,d,e,f){a("#dial-controls").hide();a(".session-active").hide();a("#call-info #state span").hide();
a("#session-controls #peer").empty();a("#session-controls #peer").text(c);a("#session-actions button").hide();(session=JSCommUI.getSession(e,d))||JSCommUI.createChatSession(d,e);"incoming"==b?(a("#call-info #state .session-incoming").show(),a("#session-actions .session-incoming").show(),soundPlayer.setAttribute("src",this.get_sound_url("incoming-call2")),soundPlayer.play(),clearInterval(JSCommUI.soundLoop),JSCommUI.soundLoop=setInterval(JSCommUI.play_again,3E3)):"trying"==b?(a("#call-info #state .session-outgoing").show(),
a("#session-actions .session-outgoing").show()):console.log("Unexpected status: "+b);a("#session-controls").show();f&&(a("#video-session").show(),JSCommUI.self_view(!0))},session_failed:function(b){clearInterval(JSCommUI.soundLoop);soundPlayer.pause();b?(a("#error #dynamic").empty(),a("#error #dynamic").append(b),this.show_error_tmp("dynamic")):this.show_error_tmp("call-attempt-failed");soundPlayer.setAttribute("src",this.get_sound_url("outgoing-call-rejected"));soundPlayer.play();this.session_cleanup()},
session_cleanup:function(){clearInterval(JSCommUI.soundLoop);soundPlayer.pause();a("#session-controls").hide();a("#video-session").hide();a("#call-info #state span").hide();JSCommSettings.dialing.clear_dialbox&&a("#address").val("");JSCommUI.ready_to_dial()},session_progress:function(a){"trying"==a&&(console.log("starting ringback..."),soundPlayer.setAttribute("src",this.get_sound_url("outgoing-call2")),soundPlayer.play(),clearInterval(JSCommUI.soundLoop),JSCommUI.soundLoop=setInterval(JSCommUI.play_again,
5E3))},session_connect:function(b,c){clearInterval(JSCommUI.soundLoop);soundPlayer.pause();a("#call-info #state span").hide();a(".session-active").show();JSCommSettings.session.show_dtmf_pad?a("#session-controls #dtmf-pad").show():a("#session-controls #dtmf-pad").hide();a("#session-actions button").hide();a(".session-active").show();var d=b.getLocalStreams().length,e=b.getRemoteStreams().length;console.log("local stream count = "+d+", remote stream count = "+e);0<d&&(a("#selfView").attr("src",window.URL.createObjectURL(b.getLocalStreams()[0])),
a("#selfView").attr("volume",0));0<e&&a("#remoteView").attr("src",window.URL.createObjectURL(b.getRemoteStreams()[0]));0<d&&0<b.getLocalStreams()[0].getVideoTracks().length||0<e&&0<b.getRemoteStreams()[0].getVideoTracks().length?(a("#video-session").show(),JSCommUI.self_view(!0)):a("#video-session").hide()},session_end:function(){this.session_cleanup()},send_dtmf:function(a){console.log("DTMF press: "+a);JSCommManager.send_dtmf(a);JSCommSettings.session.dialpad_tone&&this.play_dtmf_sound(a)},self_view:function(b){a("#video-controls input.self:button").hide();
b?(a("#video-control-self-hide").show(),a("#video-session #selfView").show()):(a("#video-control-self-view").show(),a("#video-session #selfView").hide())},video_fullscreen:function(b){b?(console.log("Going fullscreen..."),a("#video-session").attr("class","full-screen")):(console.log("Leaving fullscreen..."),a("#video-session").attr("class",""))},get_sound_url:function(a){return this.url_prefix+"sounds/"+a+".ogg"},play_dtmf_sound:function(a){var c=a;"*"==a?c="asterisk":"#"==a&&(c="hash");console.log("Playing sound: "+
c);soundPlayer.setAttribute("src",this.get_sound_url("dialpad/"+c));soundPlayer.play()},load_tabs:function(){a("#label-1").addClass("active-tab");a(".tab-page").hide();a("#chat-error #no-contact").hide();a("#tab-1").show();a(".tab-label").click(function(){JSCommUI.change_tab(a(this).attr("id"))})},change_tab:function(b){a(".chatSession").hide();a(".active-tab").removeClass("active-tab");var c=b.substring(5),c="#tab".concat(c);a(c).show();b="#"+b;a(b).addClass("active-tab");a(b).css("font-weight",
"normal")},createChatSession:function(b,c){var d=a(".chatSession").length;if(!(5<d)){b||(b=JSCommUI.get_name(c));a(".chatSession").hide();a(".tab-label").removeClass("active-tab");var e=a('<li class="tab-label active-tab" id="label-'+d+'">'+b+"</li>"),f=a('\t <div class="chatSession" id="tab-'+d+'"> \t\t<div class="close" value="'+d+'">x</div> \t    <div class="peer">       <span class="display-name">'+b+'</span> \t\t\t<span>&lt;</span><span class="uri" style="font-weight:bold;">'+c+'</span><span>&gt;</span> \t\t</div> \t\t<div class="chat"> \t\t\t<div class="chatting"></div> \t\t\t<input class="inactive" type="text" name="chat-input" placeholder="type to chat..."/>\t\t\t<div class="iscomposing"></div> \t\t</div> \t </div> \t ');
a("#tab-labels").append(e);a("#tab-pages").append(f);i18n.loadBundles(a("#lang_selection").val());var g="#label-".concat(d),l="#tab-".concat(d),h=a("#tab-pages .chatSession").filter(":last"),d=a(h).find("> .close"),k=a(h).find(".chat > input[type='text']");a(g).click(function(){JSCommUI.change_tab(a(this).attr("id"))});d.click(function(){a(l).remove();a(g).remove();if(0<a(".chatSession").length){var b=a("#tab-labels .tab-label").filter(":last");JSCommUI.change_tab(a(b).attr("id"))}});k.focus(function(b){a(this).hasClass("inactive")&&
(a(this).val(""),a(this).removeClass("inactive"))});k.blur(function(b){""==a(this).val()&&(a(this).addClass("inactive"),a(this).val("type to chat..."))});k.keydown(function(b){if(9==b.which||27==b.which)return!1;if(13==b.which&&""!=a(this).val())b=k.val(),JSCommUI.addChatMessage(h,"me",b),k.val(""),JSCommUI.jssipMessage(c,b);else if(13==b.which&&""==a(this).val()||18==b.which||91==b.which||46==b.which||16==b.which||0==b.which)return!1});a(h).fadeIn(100);return h}},addChatMessage:function(b,c,d){var e=
a(b).find(".chat > .chatting");a(e).removeClass("inactive");name=JSCommUI.get_name(JSCommManager.credentials.uri);"error"!=c?(b="me"==c?name:a(b).find(".peer > .display-name").text(),c=a('<p class="'+c+'"><b>'+b+"</b>: "+d+"</p>")):c=a('<p class="error"><i>message failed: '+d+"</i>");a(e).append(c);a(e).scrollTop(1E4)},new_message:function(b){var c,d;d=b.data.request;var e=d.from.uri;c=d.from.display_name||d.from.uri.user;d=d.body;"incoming"==b.data.message.direction&&((session=JSCommUI.getSession(e,
c))||(session=JSCommUI.createChatSession(c,e)),JSCommUI.message_alert(session),a(session).find(".peer > .display-name").text(c),a(session).find(".peer > .uri").text(e),JSCommUI.addChatMessage(session,"peer",d),a(session).find(".chat input").focus())},message_alert:function(b){JSCommSettings.session.message_tone&&this.play_message_sound();b=a(b).attr("id").substring(4);b="#label-".concat(b);if(!a(b).hasClass("active-tab")){for(i=0;3>i;i++)a(b).fadeTo("",0.5).fadeTo("",1);a(b).css("font-weight","bold")}},
play_message_sound:function(){console.log("Playing sound: new_message");soundPlayer.setAttribute("src",this.get_sound_url("new_message"));soundPlayer.play()},getSession:function(b,c){c||(c=JSCommUI.get_name(b));var d=null;a("#tab-pages > .chatSession").each(function(e,f){b==a(this).find(".peer > .uri").text()?d=f:c==a(this).find(".peer > .display-name").text()&&(d=f)});return d?d:!1},jssipMessage:function(a,c){JSCommManager.sendMessage(a,c)},get_cookie:function(a){a+="=";for(var c=document.cookie.split(";"),
d=0;d<c.length;d++){var e=c[d].trim();if(0==e.indexOf(a))return e.substring(a.length,e.length)}return""},get_name:function(a){return a.split(/:|@/)[1]}}})(jQuery);
function getJsSIPSettings(a){var b=a.turn_servers,c=[];if("[object Array]"===Object.prototype.toString.call(b))for(var d=0;d<b.length;d++)c[d]={},c[d].urls=b[d].server,c[d].username=b[d].username,c[d].password=b[d].password;else c[0].urls=b.server,c[0].username=b.username,c[0].password=b.password;return{uri:a.user.uri,password:a.user.sip_auth_password,ws_servers:a.websocket.servers,display_name:a.user.display_name,authorization_user:a.user.sip_auth_user,register:a.registration.on_startup,register_expires:a.registration.expiry,
registrar_server:a.registration.server,no_answer_timeout:a.dialing.no_answer_timeout,trace_sip:!0,stun_servers:a.stun_servers,turn_servers:c,use_preloaded_route:!1,connection_recovery_min_interval:a.websocket.connection_recovery_min_interval,connection_recovery_max_interval:a.websocket.connection_recovery_max_interval,hack_via_tcp:!1,hack_ip_in_contact:!1,log:{level:"debug"}}}
function parseUri(a){var b=parseUri.options;a=b.parser[b.strictMode?"strict":"loose"].exec(a);for(var c={},d=14;d--;)c[b.key[d]]=a[d]||"";c[b.q.name]={};c[b.key[12]].replace(b.q.parser,function(a,d,g){d&&(c[b.q.name][d]=g)});return c}
parseUri.options={strictMode:!1,key:"source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};
function WebRTCSupported(){if(navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.getUserMedia)return!0;console.error("WebRTC support not found");return!1};
