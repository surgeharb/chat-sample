var app=angular.module("chat",["ngRoute","ngSanitize"]);app.config(["$routeProvider","$locationProvider",function(e,n){n.html5Mode(!0),e.when("/:username",{templateUrl:"views/chat/chat.html",controller:"ChatController",title:"Chat"}).otherwise({redirectTo:"/404/"})}]),app.run(["$location","$rootScope",function(e,n){n.$on("$routeChangeSuccess",function(e,t,o){t.hasOwnProperty("$$route")&&(n.title=t.$$route.title)})}]),app.controller("MainCtrl",["$scope",function(e){}]),app.controller("ChatController",["$scope","$location","$routeParams",function(e,n,t){function o(e){return e<10?"0"+e:e}function r(){$("#conversation .body").stop().animate({scrollTop:$("#conversation .body").prop("scrollHeight")},500)}e.user={name:"Serge Harb",username:t.username,profilePicture:"http://files.sergeharb.com/img/Me.jpg"};var a=io();a.emit("join",e.user.username),a.on("update",function(e){console.log(e)}),e.chatConversations=[{_id:"123456789abc",name:"Cedric Harb",username:"cedric",profilePicture:"https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/10981992_854381584636591_4594131235025284689_n.jpg?oh=0177b6d4c5e300a93cfa20de639bd235&oe=592BF9D9",lastmessage:{content:"Hello Man",status:"none",date:"22/02/2012 11:12:11"}}],e.conversations={},e.conversations.cedric=[{date:"22/02/2012 11:12:11",content:"Hello Man",sender:"cedric",receiver:"surgeharb"}],e.conv={},e.conv.user={},e.sendMessage=function(){if(e.message){var n=new Date,t={date:o(n.getDate())+"/"+o(n.getMonth()+1)+"/"+o(n.getFullYear())+" "+o(n.getHours())+":"+o(n.getMinutes())+":"+o(n.getSeconds()),content:e.message,sender:e.user.username,receiver:e.conv.user.username};e.conversations[e.conv.user.username].push(t),a.emit("send",t),e.message="",t={},r()}},e.checkEnter=function(n){13===n.keyCode&&e.sendMessage()},e.getTime=function(e){var n=e.split(" ")[1],t=n.split(":");return o(parseInt(t[0]))+":"+o(parseInt(t[1]))},e.fetchConversation=function(n){e.conv.user._id=n._id,e.conv.user.name=n.name,e.conv.user.username=n.username,e.conv.user.profilePicture=n.profilePicture}}]);