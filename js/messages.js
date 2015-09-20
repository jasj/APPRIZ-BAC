/*
	messages.js
*/


/*
		Paginacion de mensajes
*/

function loadOldMessages(old){
	 $('#menuDelBack').trigger('tapend');
				$.post('http://'+IP+':8089/appriz/getIndexedMsg_',{"idSecretClient": idScretClient, "refresh":0, "LAST":old},function(data){
		
				$.each(data,function(index, message){
					
					if($('#'+message['idMessage']).length > 0){ 
						makeSwipe(message['idMessage']);
						if(message['state'] == 3){
							$('#'+message['idMessage']).removeClass('unread')
						}
							var bulb =  message['bulb'] == 1   ? 'img/ledlightgreen.png' : message['bulb'] == 2   ? 'img/ledlighyellow.png' : message['bulb'] == 3   ? 'img/ledlightred.png' :  'img/ledlighgray.png';
						    $('#'+message['idMessage']).find('.bulb').attr('src',bulb);
					}else{
						
					if( ( 'idParent' in message) && ($('#categories #'+message['idParent']).length>0)){
						var postDate = new Date(message['postdate']);
						var dateText = postDate.toLocaleString();
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						$('#categories #'+message['idParent']).attr('bulb',message['bulb']);
						$('#categories #'+message['idParent']+" .icon-primitive-dot").removeClass("dotDone").removeClass("dotProgress").removeClass("dotError").removeClass("dotNone").addClass(dotState);
						
						if(message['state'] == 3){
							$('#categories #'+message['idParent']).attr('read',$('#categories #'+message['idParent']).hasAttr('read') ? $('#categories #'+message['idParent']).attr('read')+','+message['idMessage'] : message['idMessage']);
						}else{
							$('#categories #'+message['idParent']).attr('nread',$('#categories #'+message['idParent']).hasAttr('nread') ? $('#categories #'+message['idParent']).attr('nread')+','+message['idMessage'] : message['idMessage']);
							$('#categories #'+message['idParent']).addClass('unread');
						}
						if($('#categories #'+message['idParent']).hasAttr('history')){
							$('#categories #'+message['idParent']).attr('history',btoa(atob($('#categories #'+message['idParent']).attr('history'))+";"+message['shortMessage']+"^"+message['longMessage']+"^"+dateText));
							
						}else{
							$('#categories #'+message['idParent']).attr('history',btoa(message['shortMessage']+"^"+message['longMessage']+"^"+dateText));
						}
					
					}else{ 
				
						var Icon = message['type'] == 1 ? '<span class="icon-myAlerts"><span class="path1"></span><span class="path2"></span></span>'  : message['type'] == 2 ? '<span class="icon-alerts path1"></span>' : message['type'] == 3 ? '<span class="icon-notifications"></span>' :  message['type'] == 4 ?  '<span class="icon-promotions"></span>' : '<span class="icon-services"></span>';
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						
						var postDate = new Date(message['postdate']);
						var postDateS = postDate.toLocaleDateString() + " " + postDate.getHours() +    ":" +  FormatInteger(postDate.getMinutes(),2) +    ":" + FormatInteger(postDate.getSeconds(),2) ;
						
					//	var postDateS = postDate.getFullYear() + "-"+FormatInteger(postDate.getMonth() + 1,2)+ "-"+FormatInteger(postDate.getDate(),2) +" "+postDate.getHours()+":"+postDate.getMinutes()+":"+postDate.getSeconds();
						var LONG_MSG = message['longMessage'];
						if(/^<html>/.test(LONG_MSG)){
							LONG_MSG = $.t("This message contains rich content");
						}
						console.log("ss"+message['idMessage']); // QUITAR
						$('#categories .MsG').append( "<li class='Message "+( message['state'] < 3 ? "unread" : "" )+" typemsg"+message['type']+" entity"+message['idEntity']+"' id='"+message['idMessage']+"' bulb='"+message['bulb']+"' longMSG='"+btoa(message['longMessage'])+"' services='"+btoa(JSON.stringify(message['services']))+"' appends='"+btoa(JSON.stringify(message['appends']))+"' idEntity='"+message['idEntity']+"'><div class='moveContainer'><div class='details'><h3>"+LONG_MSG+"</h3></div><div class='centralLI'><div class='iconCat'>"+Icon+"</div><div class='infoBank'><h2>"+message['shortMessage']+"</h2><h6 class='dateBank'><span class='icon-primitive-dot "+dotState+"'></span><date>"+postDateS+"<date></h6></div><div class='magicalArrow'><i class='fa fa-angle-right'></i></div></div><div class='rightLI'><button class='deleteSwipe'>Delete</button></div ></div></li>");
						$.jStorage.set('msg_div', btoa($('#categories').html()));

					}
					}
					
					$.jStorage.set('msg_div', btoa($('#categories').html()));
				});
				syncronizeOffLineMsg();
			},'json') .fail(function(e) {
					$('.refreshing_list').css({"background-color" : "#888"}).html('Conexion error!').fadeOut(3000,function(){$('.refreshing_list').css({"background-color" : "#F5F5Ff"}).html('Refreshing list');});
			}).done(function(){ 
			
				makeSwipe();
				fix_messages();
				$.jStorage.set('msg', btoa($('#categories').html()));
			
				endLoad();		
			 myScroll3.refresh();
			});
	
	
}


function endLoad(){
	  loadingPage = false;
	  $('#spinBotton').remove();
	  console.log("total mensajes:"+$('.MsG').length);
	
}


/*
		Fin Paginacion de mensaje
*/
function current_inbox(){
	$('.Message').hide();
	$('.gotcolors').animate({opacity: 1}, 200);
	$('.entity'+currentEntityID).show();
	$('nav.categoryNav li').find("span").css("color") == tabSelectedColor;	

	$(".page-content.active").removeClass("active");
	$("header.active").removeClass("active");
	$("#inbox").addClass("active").show();
	$("#headerMain").addClass("active").show();
	Back = ["inbox"];
	
	$('#menuAppriz').fadeOut(300);
	$('.allMenu').css({"right" : "-80%"});
	$('.navAppriz li').eq(0).trigger("tapend");
	
	checkWithOutEntity();
	if(currentEntityID>0)
	{
	//getAds();
	} //----> ERROR
	
			if($('.Message:visible').length===0){$('#noMessage').show();} else{$('#noMessage').hide();}
	
}

function current_inbox_off(){
	$('.Message').hide();
	$('.gotcolors').animate({opacity: 1}, 200);
	$('.entity'+currentEntityID).show();
	$('nav.categoryNav li').find("span").css("color") == tabSelectedColor;	

	$(".page-content.active").removeClass("active");
	$("header.active").removeClass("active");
	$("#inbox").addClass("active").show();
	$("#headerMain").addClass("active").show();
	Back = ["inbox"];
	
	$('#menuAppriz').fadeOut(300);
	$('.allMenu').css({"right" : "-80%"});
	$('.navAppriz li').eq(0).trigger("tapend");	

		if($('.entity'+currentEntityID).length ==0){$('#noMessages').show();}
		else{$('#noMessages').hide();}
		
}

function makeItScroll(){
	  myScroll3 = new IScroll('#wrapper_message', {
		   probeType: 1, 
		   mouseWheel: false,
		   deceleration:0.0002,
		   posReset: {x: 0, y: 40},
		   pushDownToRefresh : function(){
			   
				if(true){
			if(spinnerOff){
					document.getElementById("pullDownLabel").innerHTML = '';
					$('.pullDownLabel').html("<i class='roll fa fa-spinner fa-spin fa-3x'></i>");
					spinnerOff=false;	
					
					
					callNewMSG();
				}}
			   
		   }
		  
		   });
		   
	   myScroll3.on('scroll', function(){
		var onDemo = false;
		if(onDemo && $('#demo11').css("visibility") == "visible"){$('#demo11 .NextBtn').trigger("tapend");}
		
		if (this.y >  50 &&  !scrollInProgress ) {
			document.getElementById("pullDownLabel").innerHTML = $.t('Release to refresh...');
			scrollInProgress = false;
			
			}else if(this.y <= 50){
				document.getElementById("pullDownLabel").innerHTML = $.t('Pull Down to refresh');
				
				scrollInProgress = true;
			}else{
					document.getElementById("pullDownLabel").innerHTML = $.t('Release to refresh...');
			}
			
			if(this.y>0){
				$('.pullDownLabel').show();
			}
			
		   if (this.y < (this.maxScrollY + 40) && !loadingPage){
			   console.log("sdsdsd"+loadingPage);
			    loadingPage = true;
				var idLastMessage = $(".MsG li:last-child").attr('id');
				$('#categories').append('<div id="spinBotton"> '+$.t("Bringing old messages")+' <i id="spinBotton" class="fa fa-spinner fa-spin"></i></div>');
				loadOldMessages(idLastMessage);
				console.log("ultimo mensaje "+idLastMessage);
				
				}
}); 
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

function counterByMsg(){

	//pullDownEl = $('#pullDown');
	
	
	
				
		$('.bubble').eq(0).html( $('.typemsg1.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg1.unread.entity'+currentEntityID).length).css($('.typemsg1.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(1).html( $('.typemsg2.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg2.unread.entity'+currentEntityID).length).css($('.typemsg2.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(2).html( $('.typemsg3.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg3.unread.entity'+currentEntityID).length).css($('.typemsg3.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(3).html( $('.typemsg4.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg4.unread.entity'+currentEntityID).length).css($('.typemsg4.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"});
		$('.bubble').eq(4).html( $('.typemsg5.unread.entity'+currentEntityID).length == 0 ? "" : $('.typemsg5.unread.entity'+currentEntityID).length).css($('.typemsg5.unread.entity'+currentEntityID).length == 0 ? {"display" : "none" } : {"display" : "block"}); 
		

		
		$("#entities li").each(function(index, entityI ){
			var bn = $(this).find('.bubble2')
			bn.html($('.unread.entity'+$(this).attr('entityId')).length == 0 ? "" : $('.unread.entity'+$(this).attr('entityId')).length);
			bn.css($('.unread.entity'+$(this).attr('entityId')).length > 0 ? {"border" : "1px solid #dadada"} : {"border" : "0px solid #dadada"});
		});
		try{
			pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, $('.unread').length);
		}catch(e){
		}
	}
	
	
	function reportMsgState(){	
		 	report ={};
			$('.Message').each(function( index ) {
				var readed = $(this).hasClass("deleted") ? "readedDeleted" : "readed";
				var unread = $(this).hasClass("deleted") ? "unreadDeleted" : "unread"; 
				var readToUnread = $(this).hasClass("readToUnread") ? "readToUnread" : "unread";
				
				report["m"+$(this).attr("id")] = $(this).hasClass("unread") ? unread :
												 $(this).hasClass("readToUnread")	? readToUnread : readed; 
				
			
				
				
				if($(this).hasAttr('read')){
			
					var msgS = $(this).attr('read').split(',');
					for(var i = 0 ; i < msgS.length ; i++){
						report["m"+msgS[i]] =  readed;
					}
				}
				
				if($(this).hasAttr('nread')){
					
					var msgS = $(this).attr('nread').split(',');
					for(var i = 0 ; i < msgS.length ; i++){
						report["m"+msgS[i]] =  unread;
					}
				}
			
			});
		
			console.log(report);
			$.post('http://'+IP+':8089/appriz/setMessageStatus', {"idSecretClient": idScretClient, msgStatus:report }, function(data){

			}); 
			

}		
	
function syncronizeOffLineMsg(){
	console.log("sincroOff");
	if(stateChangeLst.length > 0){
		while( stateChangeLst.length > 0){
			var msg = stateChangeLst.pop();
			if(msg["state"] == "DELETED"){
				$('#'+msg["state"]).remove();
			}else{
				$('#'+msg["state"]).removeClass('unread');
			}
		}
		reportMsgState();
	}

}
		
function makeSwipe(id){
	var objTarget = id == undefined ? ".Message" : "#"+id+".message";
		$(objTarget).swipe("destroy");
			$( objTarget).swipe( {
				
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					
					var mContainer = $(this).find(".moveContainer");
					var actualMargin = parseInt(mContainer.css("margin-left").replace(/[^-\d\.]/g, '') );
					
					if(direction=='left' & distance > (150) & actualMargin < 0){
							mContainer.css({"margin-left" : "-150px"}); //show delete button
							mContainer.addClass("deleteOptionActivate");
							
							
							
							$("#deleteAllBtn").show();
					}else if(direction=='left' & distance < (150) & actualMargin < 0){
							mContainer.animate({"margin-left" : "0px"}).removeClass("deleteOptionActivate").removeClass("detailOptionActivate");; //no show the delete button		
					}else if(direction=='left' & distance < (window.innerWidth*0.3) & actualMargin > window.innerWidth){
							mContainer.animate({"margin-left" : window.innerWidth+"px"});
					}else if(direction=='right' & distance > (window.innerWidth*0.3) & actualMargin > window.innerWidth*0.3){
							mContainer.animate({"margin-left" : window.innerWidth+"px"});
							mContainer.addClass("detailOptionActivate");
							
					
						
					}else if(direction=='right'  & actualMargin >-150){
							mContainer.animate({"margin-left" : "0px"}).removeClass("deleteOptionActivate").removeClass("detailOptionActivate"); ;
						
						
					}
					
					else {
						mContainer.animate({"margin-left" : "0px"});
						
				
					}
				},
				
				swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
				 	
			
				 
				 if((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL )& distance < 15 && duration < 1000)  {
					 
					 if($('.multiselectNav').is(":visible")){
						 var msg =  $(this);
						 msg.toggleClass("selectedMSG");
						 var msgSel = $(".selectedMSG").length;
						 if(msgSel > 0){
							  $("#selNum cnt").html(msgSel);
							  $('.filtersNav').hide();
							  $('.multiselectNav').show();
						 }else{
							 $('.multiselectNav').hide();
							 $('.filtersNav').show();
						 }
					 }else{
						showMessage($(this).attr("id"));
						if(!modeDeleteMenu){
							$.jStorage.set('msg', btoa($('#categories').html()));
							stateChangeLst.push({msg : $(this).parent().parent().parent().attr("id") , state : "READED"});
						}
					 }
						
					
				 }else if(  duration >  1000& distance < 15 ){
					 
					 var msg =  $(this);
					 msg.toggleClass("selectedMSG");
					 var msgSel = $(".selectedMSG").length;
					 if(msgSel > 0){
						  $("#selNum cnt").html(msgSel);
						  $('.filtersNav').hide();
						  $('.multiselectNav').show();
					 }else{
						 $('.multiselectNav').hide();
						 $('.filtersNav').show();
					 }
					
					 
					 
				 }else if(distance < 15 && duration < 1000){
					 console.log(duration);
				 }
				 
				 else{
					var msg = $(this).find(".moveContainer");
					var actualMargin = parseInt(msg.css("margin-left").replace(/[^-\d\.]/g, '') );
					
					if(direction=='right'){

						if(actualMargin < 0){
							$("#deleteAllBtn").hide();
							//msg.animate({"margin-left" : "0px"});
						}else{
							if(distance < window.innerWidth){
									$("#deleteAllBtn").hide();
								$('.detailOptionActivate,.deleteOptionActivate').not(msg).animate({"margin-left" : "0px"});
								$('.detailOptionActivate,.deleteOptionActivate').not(msg).removeClass("deleteOptionActivate").removeClass("detailOptionActivate");
								msg.css({"margin-left": distance});
							}else{
								msg.css({"margin-left": window.innerWidth});
							}
							
							
						}
					}else if(direction=='left'){
						
						if (distance< (150) & actualMargin < 1) {
							
							msg.css({"margin-left": -distance});
							$(".deleteOptionActivate, .detailOptionActivate ").not(msg).animate({"margin-left" : "0px"});
							$(".deleteOptionActivate, .detailOptionActivate").not(msg).removeClass("deleteOptionActivate").removeClass("detailOptionActivate");
							
							
						}else{
							if(actualMargin < 1){
								msg.css({"margin-left": -150});
							}
							
						}
					}
					
				}
					
				 },
				 allowPageScroll:"vertical",
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				 threshold:10 
			});
		}
		
				var unableToConnect=0;
				
//bring message for this client
		function callNewMSG(){
		 $('#menuDelBack').trigger('tapend'); //si esta en el menu delete sale de el.
		
			
			$('.icon-menu').show();
			$('.icon-back').show();
			$("#deleteAllBtn").hide();
			date = new Date();
			if(oneTimeSendAjax){
			oneTimeSendAjax = false;
			console.time("MSGProcFull");
			
			
			
				console.time("PostReq");
		
			$.post('http://'+IP+':8089/appriz/getIndexedMsg_',{"idSecretClient": idScretClient},function(data){
			
			console.timeEnd("PostReq");
			console.time("MSGProc");
			$('#categories').html("<div class='MsG'></div>");
			
				
				$.each(data,function(index, message){
					if($('#'+message['idMessage']).length > 0){ 
						makeSwipe(message['idMessage']);
						if(message['state'] == 3){
							$('#'+message['idMessage']).removeClass('unread')
						}
							var bulb =  message['bulb'] == 1   ? 'img/ledlightgreen.png' : message['bulb'] == 2   ? 'img/ledlighyellow.png' : message['bulb'] == 3   ? 'img/ledlightred.png' :  'img/ledlighgray.png';
						    $('#'+message['idMessage']).find('.bulb').attr('src',bulb);
					}else{
					//child msg
			
					if( ( 'idParent' in message) && ($('#categories #'+message['idParent']).length>0)){
						var postDate = new Date(message['postdate']);
						var dateText = postDate.toLocaleString();
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						$('#categories #'+message['idParent']).attr('bulb',message['bulb']);
						$('#categories #'+message['idParent']+" .icon-primitive-dot").removeClass("dotDone").removeClass("dotProgress").removeClass("dotError").removeClass("dotNone").addClass(dotState);
						
						if(message['state'] == 3){
							$('#categories #'+message['idParent']).attr('read',$('#categories #'+message['idParent']).hasAttr('read') ? $('#categories #'+message['idParent']).attr('read')+','+message['idMessage'] : message['idMessage']);
						}else{
							$('#categories #'+message['idParent']).attr('nread',$('#categories #'+message['idParent']).hasAttr('nread') ? $('#categories #'+message['idParent']).attr('nread')+','+message['idMessage'] : message['idMessage']);
							$('#categories #'+message['idParent']).addClass('unread');
						}
						if($('#categories #'+message['idParent']).hasAttr('history')){
							$('#categories #'+message['idParent']).attr('history',btoa(atob($('#categories #'+message['idParent']).attr('history'))+";"+message['shortMessage']+"^"+message['longMessage']+"^"+dateText));
							
						}else{
							$('#categories #'+message['idParent']).attr('history',btoa(message['shortMessage']+"^"+message['longMessage']+"^"+dateText));
						}
						//console.log(atob($('#categories #'+message['idParent']).attr('history')));

						 
					
					}else{ 
					 try{
						var Icon = message['type'] == 1 ? '<span class="icon-myAlerts"><span class="path1"></span><span class="path2"></span></span>'  : message['type'] == 2 ? '<span class="icon-alerts path1"></span>' : message['type'] == 3 ? '<span class="icon-notifications"></span>' :  message['type'] == 4 ?  '<span class="icon-promotions"></span>' : '<span class="icon-services"></span>';
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						
						var postDate = new Date(message['postdate']);
						var postDateS = postDate.toLocaleDateString() + " " + postDate.getHours() +    ":" +  FormatInteger(postDate.getMinutes(),2) +    ":" + FormatInteger(postDate.getSeconds(),2) ;
						
					//	var postDateS = postDate.getFullYear() + "-"+FormatInteger(postDate.getMonth() + 1,2)+ "-"+FormatInteger(postDate.getDate(),2) +" "+postDate.getHours()+":"+postDate.getMinutes()+":"+postDate.getSeconds();
						var LONG_MSG = message['longMessage'];
						if(/^<html>/.test(LONG_MSG)){
							LONG_MSG = $.t("This message contains rich content");
						}
						$('#categories .MsG').prepend( "<li class='Message "+( message['state'] < 3 ? "unread" : "" )+" typemsg"+message['type']+" entity"+message['idEntity']+"' id='"+message['idMessage']+"' bulb='"+message['bulb']+"' longMSG='"+btoa(message['longMessage'])+"' services='"+btoa(JSON.stringify(message['services']))+"' appends='"+btoa(JSON.stringify(message['appends']))+"' idEntity='"+message['idEntity']+"'><div class='moveContainer'><div class='details'><h3>"+LONG_MSG+"</h3></div><div class='centralLI'><div class='iconCat'>"+Icon+"</div><div class='infoBank'><h2>"+message['shortMessage']+"</h2><h6 class='dateBank'><span class='icon-primitive-dot "+dotState+"'></span><date>"+postDateS+"<date></h6></div><div class='magicalArrow'><i class='fa fa-angle-right'></i></div></div><div class='rightLI'><button class='deleteSwipe'>Delete</button></div ></div></li>");
						console.timeEnd("MSGProc");
						$.jStorage.set('msg_div', btoa($('#categories').html()));
						
						//console.log(JSON.stringify(data));
					}catch(e){
						console.log(e);
						
					}
					}
					
					
					}
					
					$.jStorage.set('msg_div', btoa($('#categories').html()));
				});
				
				syncronizeOffLineMsg();
				
			},'json') .fail(function(e) {
				
					$('.pullDownLabel').toggleClass('fa fa-spinner fa-spin fa-3x',false);
					document.getElementById("pullDownLabel").innerHTML = 'Unable to connect';
					
					setTimeout(function(){
					 spinnerOff=true;
					 scrollInProgress=false;
				
					 myScroll3.scrollTo(0,-1);
						}, 5000);
				
				
				
			
			}).done(function(){ 
		//$('.pullDown').toggleClass('fa fa-spinner fa-spin fa-3x',false);
		
		if(entityIDs.length==0 ){
		entityIDs.push(currentEntityID);}
		
			setTimeout(function(){
					$('.pullDownLabel Roll').fadeOut(function(){
						
						$(this).remove();
						 myScroll3.scrollTo(0,-1);
					},1000);
					 spinnerOff=true;
					 scrollInProgress=false;
					
					
						}, 1);
					 $('.pullDownLabel').fadeIn(1,function(){
									document.getElementById("pullDownLabel").innerHTML = 'Pull Down to refresh';
								});
		
		
				current_inbox();
				makeItScroll();
				counterByMsg();
				
				makeSwipe();
				fix_messages();
			
				
				$.jStorage.set('msg', btoa($('#categories').html()));
				console.timeEnd("MSGProcFull");
			
				$("nav.categoryNav li span").addClass("active");
				setTimeout(function(){oneTimeSendAjax = true;},500);
				
			
				
							
	
			});
				
		}
		else{	
		
		
		$('.pullDownLabel').toggleClass('fa fa-spinner fa-spin fa-3x',false);
			
					
					setTimeout(function(){
					 spinnerOff=true;
					 scrollInProgress=false;
				
					 myScroll3.scrollTo(0,-1);
					 oneTimeSendAjax=true;
						}, 1000);
		
		
		}
		
	
			}	
				
				
				
				
				
				
		//bring message for this client
		function callMSGback(){
	
			$('.icon-menu').show();
					$('.icon-back').show();
			$("#deleteAllBtn").hide();
			date = new Date();
		if(oneTimeSendAjax){
			oneTimeSendAjax = false;
			$.post('http://'+IP+':8089/appriz/getIndexedMsg_',{"idSecretClient": idScretClient, "refresh":"1"},function(data){
			
			$('#categories').html("<div class='MsG'></div>");
			
				//console.log(JSON.stringify(data));
				
				$.each(data,function(index, message){
					if($('#'+message['idMessage']).length > 0){ 
						makeSwipe(message['idMessage']);
						if(message['state'] == 3){
							$('#'+message['idMessage']).removeClass('unread')
						}
							var bulb =  message['bulb'] == 1   ? 'img/ledlightgreen.png' : message['bulb'] == 2   ? 'img/ledlighyellow.png' : message['bulb'] == 3   ? 'img/ledlightred.png' :  'img/ledlighgray.png';
						    $('#'+message['idMessage']).find('.bulb').attr('src',bulb);
					}else{
					//child msg
			
					if( ( 'idParent' in message) && ($('#categories #'+message['idParent']).length>0)){
						var postDate = new Date(message['postdate']);
						var dateText = postDate.toLocaleString();
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						$('#categories #'+message['idParent']).attr('bulb',message['bulb']);
						$('#categories #'+message['idParent']+" .icon-primitive-dot").removeClass("dotDone").removeClass("dotProgress").removeClass("dotError").removeClass("dotNone").addClass(dotState);
						
						if(message['state'] == 3){
							$('#categories #'+message['idParent']).attr('read',$('#categories #'+message['idParent']).hasAttr('read') ? $('#categories #'+message['idParent']).attr('read')+','+message['idMessage'] : message['idMessage']);
						}else{
							$('#categories #'+message['idParent']).attr('nread',$('#categories #'+message['idParent']).hasAttr('nread') ? $('#categories #'+message['idParent']).attr('nread')+','+message['idMessage'] : message['idMessage']);
							$('#categories #'+message['idParent']).addClass('unread');
						}
						if($('#categories #'+message['idParent']).hasAttr('history')){
							$('#categories #'+message['idParent']).attr('history',btoa(atob($('#categories #'+message['idParent']).attr('history'))+";"+message['shortMessage']+"^"+message['longMessage']+"^"+dateText));
							
						}else{
							$('#categories #'+message['idParent']).attr('history',btoa(message['shortMessage']+"^"+message['longMessage']+"^"+dateText));
						}
						//console.log(atob($('#categories #'+message['idParent']).attr('history')));

						 
					
					}else{ 
				
						var Icon = message['type'] == 1 ? '<span class="icon-myAlerts"><span class="path1"></span><span class="path2"></span></span>'  : message['type'] == 2 ? '<span class="icon-alerts path1"></span>' : message['type'] == 3 ? '<span class="icon-notifications"></span>' :  message['type'] == 4 ?  '<span class="icon-promotions"></span>' : '<span class="icon-services"></span>';
						var dotState =  message['bulb'] == 1   ? 'dotDone' : message['bulb'] == 2   ? 'dotProgress' : message['bulb'] == 3   ? 'dotError' :  'dotNone';
						
						var postDate = new Date(message['postdate']);
						var postDateS = postDate.toLocaleDateString() + " " + postDate.getHours() +    ":" +  FormatInteger(postDate.getMinutes(),2) +    ":" + FormatInteger(postDate.getSeconds(),2) ;
						
					//	var postDateS = postDate.getFullYear() + "-"+FormatInteger(postDate.getMonth() + 1,2)+ "-"+FormatInteger(postDate.getDate(),2) +" "+postDate.getHours()+":"+postDate.getMinutes()+":"+postDate.getSeconds();
						var LONG_MSG = message['longMessage'];
						if(/^<html>/.test(LONG_MSG)){
							LONG_MSG = $.t("This message contains rich content");
						}
						$('#categories .MsG').prepend( "<li class='Message "+( message['state'] < 3 ? "unread" : "" )+" typemsg"+message['type']+" entity"+message['idEntity']+"' id='"+message['idMessage']+"' bulb='"+message['bulb']+"' longMSG='"+btoa(message['longMessage'])+"' services='"+btoa(JSON.stringify(message['services']))+"' appends='"+btoa(JSON.stringify(message['appends']))+"' idEntity='"+message['idEntity']+"'><div class='moveContainer'><div class='details'><h3>"+LONG_MSG+"</h3></div><div class='centralLI'><div class='iconCat'>"+Icon+"</div><div class='infoBank'><h2>"+message['shortMessage']+"</h2><h6 class='dateBank'><span class='icon-primitive-dot "+dotState+"'></span><date>"+postDateS+"<date></h6></div><div class='magicalArrow'><i class='fa fa-angle-right'></i></div></div><div class='rightLI'><button class='deleteSwipe'>Delete</button></div ></div></li>");
						
						$.jStorage.set('msg_div', btoa($('#categories').html()));
					
						//console.log(JSON.stringify(data));
					}
					}
					
					$.jStorage.set('msg_div', btoa($('#categories').html()));
				});
				syncronizeOffLineMsg();
			},'json') .fail(function(e) {
					$('.refreshing_list').css({"background-color" : "#888"}).html('Conexion error!').fadeOut(3000,function(){$('.refreshing_list').css({"background-color" : "#F5F5Ff"}).html('Refreshing list');});
			
				//alert( JSON.stringify(e));getRules(kilomanyaroB)
			}).done(function(){ 
				current_inbox();
				makeItScroll();
				counterByMsg();
				makeSwipe();
				fix_messages();
				$.jStorage.set('msg', btoa($('#categories').html()));
				$('.refreshing_list').fadeOut(1000); 
				
				
				$("nav.categoryNav li span").addClass("active");
				setTimeout(function(){oneTimeSendAjax = true;},500);
				checkWithOutEntity();
		//	counterByMsg();$('.refreshing_list').hide(); 
			});
		}
			//$('#wrapper_message').height(window.innerHeight - 150);
		
		}
						
				
				
				
		//Delete Btn
		$( document ).on("tapend","#categories .deleteSwipe",function(){
			
			stateChangeLst.push({msg : $(this).parent().parent().parent().attr("id") , state : "DELETED"});
			$(this).parent().parent().parent().addClass('deleted');
			reportMsgState();
			$(this).parent().parent().parent().remove();
			$.jStorage.set('msg', btoa($('#categories').html()));
			makeItScroll();
			counterByMsg();
				$("#deleteAllBtn").hide();
		});
			
				
		//Filter handle
		$( document ).on("tapend",'nav.categoryNav li',function(){
		
			if( $(this).find("span").hasClass("active")){
				$(this).find("span").removeClass("active");
				$('.typemsg'+$(this).attr("typemsg")).hide();
			}else{
				$(this).find("span").addClass("active");
				$('.typemsg'+$(this).attr("typemsg")+'[identity='+currentEntityID+']').show();
			}
			if($('.Message:visible').length===0){$('#noMessage').show();}
			else{$('#noMessage').hide();}
		
			$("*").scrollTop(0);
			 myScroll3 = new IScroll('#wrapper_message', { useTransition: true });
		});
		
		$( document ).on("taphold",'nav.categoryNav li',function(){
	
			$('#categories li').not($('.typemsg'+$(this).attr("typemsg")+'[identity='+currentEntityID+']')).hide();
			$('nav.categoryNav span').removeClass("active");
			//$(this).css({content: "\e60b",color: tabSelectedColor});
		});
		
	function getCoord(e, c) {
    return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page' + c] : e['page' + c];
}


StartYCategories = 0;
StartXCategories = 0;

		

	

	$( document ).on("touchstart",".Message",function(){
		if(!modeDeleteMenu){
			$(this).find('.centralLI').css({"background":"#BFCFFF"});
			
			}
	});	
	
	$( document ).on("touchend",".Message",function(){
		
		if(!modeDeleteMenu){
			$(this).find('.centralLI').css({"background":""});
			}
	});	
	
	$(".multiselectNav .fa-eye").tapend(function(){
		$(".selectedMSG").removeClass("unread").removeClass("selectedMSG");
		$('.multiselectNav').hide();
		counterByMsg();
		$('.filtersNav').show();
		
		reportMsgState();
	});
	
	$(".multiselectNav .fa-eye-slash").tapend(function(){
		$(".selectedMSG").addClass("unread").removeClass("selectedMSG");
		$('.multiselectNav').hide();
		$('.filtersNav').show();
		counterByMsg();
		reportMsgState();
	});
	
		
	$(".multiselectNav .fa-trash-o").tapend(function(){
		showAlert($.t("Deleted selected messages"),$.t("Do you want to delete those ") +$(".selectedMSG").length+$.t(" messages?"),function(){
			$(".selectedMSG").addClass("deleted");
			reportMsgState();
			$(".selectedMSG").remove();
			$.jStorage.set('msg', btoa($('#categories').html()));
			makeItScroll();
			counterByMsg();
			$('.multiselectNav').hide();
			$('.filtersNav').show();
		})
	});
	
	$('#selNum').tapend(function(){
		$(".selectedMSG").removeClass("selectedMSG");
		$('.multiselectNav').hide();
		$('.filtersNav').show();
	})
	
			





