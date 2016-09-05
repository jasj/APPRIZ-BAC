function matchColumnsHeight(){
	var maxWi = 0;
	for(var i=0; i<$('.detailsList h4').length;i++){
		var maxHe = Math.max($('.detailsList h4').eq(i).height(),$('.detailsList p').eq(i).height());
		maxWi = Math.max(Math.max($('.detailsList h4').eq(i).textWidth(),maxWi));
		$('.detailsList h4').eq(i).height(maxHe);
		$('.detailsList p').eq(i).height(maxHe+6);
		 //$(this).height(200);
	};
	$('.detailsList .row').css({ width: (window.innerWidth - window.innerWidth*0.14 -maxWi)});
	$('.detailsList h4').css({ width: maxWi});
	$('.detailsList .row:first-child').css({ width: maxWi});
	
}

function showMessage(id){
	
	scrollPosition = myScroll3.y;
//console.log("scroll y "+myScroll3.y);
//myScroll3.scrollTo(0, )


	//console.log("scro "+ scrollPosition)
	//For old Androids
	//$(".details_").css({"width" : (window.innerWidth - window.innerWidth*2*0.04)});
	//$(".detail_fixed").css({"margin-left" : "0px"});
	
	//Message Handle
	var msg = $("#"+id+".Message");
	//If the content if HTML show htmlMSG
	var longMSG = atob(msg.attr('longMSG'));
	if(/^<html>/.test(longMSG)){
		$('.plainMSG').hide();
		$('.htmlMSG').show();
		$('.htmlMSG').html("");
		$('.htmlMSG').append(longMSG);
	}else{
		$('.htmlMSG').hide();
		$('.plainMSG').show();
	}
	//Normalize inbox
	$("#deleteAllBtn").hide();
	$(".deleteOptionActivate").removeClass("deleteOptionActivate");
	$(".moveContainer").css({"margin-left" : "0px"});
	//Indicate tback page
	back.push( "inbox" );
	
	//make it unreaded msg make those readed 
	msg.removeClass('unread'); 
	//if has un read child 
	if( msg.hasAttr('nread') ){
		if( msg.hasAttr('read') ){
			msg.attr('read',msg.attr('read') + ',' + msg.attr('nread'));
		}else{
			msg.attr('read', msg.attr('nread'));
		}
		
		msg.removeAttr('nread');
	}
	//Update the unread  Messages conter
	counterByMsg();
	//report message state
	reportMsgState();
	//select the dotState
	var dotState =  msg.attr("bulb") == 1   ? 'dotDone' : msg.attr("bulb") == 2   ? 'dotProgress' : msg.attr("bulb") == 3   ? 'dotError' :  'dotNone';
	//Change the detail div with the info of the msg					
	$('.detail_fixed h6').html('<span class="icon-primitive-dot dotInactive '+dotState+'"></span>'+msg.find("date").html());
	$(".details_ h3").html(msg.find(".details h3").html());
	//make the previus page inactive
	$(".page-content.active").removeClass("active");
	//Show details page
	$("#MessageDetail.page-content").addClass("active").show();
	//Hide history  page
	$(".historye").hide();
	$(".historye").empty();
	//Show Appends page
	$(".appends").show();
	//Put default history button label
	$("#showHistory").html($.t("History")) ;
	//Begin a safe path if services doesnt exist 
	try{
		//convert service attribute to original request format
		var array_serv = JSON.parse(atob(msg.attr('services')));
		//Create a variable to handle li
		var management = "";
		//go thru all services and append to the li handle string
		for(serv in  array_serv){
			management = management +"<li msg='"+msg.attr('id')+"' services='"+serv+"'> <button class='oneOption'>"+array_serv[serv]+"</button></li>";
		}
		//Add the li handle string to the DropDown Option Unorder List
		$('.dropdownOption ul').html(management);
		//Show the option button
		$('#showOptions').show();	
		
	}catch(e){
			 //If fails means that there are not any options, so hide the option btn.
			 $('#showOptions').hide();
	}
	//Begin a safe path if appends doesnt exist 
	try{
		//convert appends attribute to original request format
		var array_appends = JSON.parse(atob(msg.attr('appends')));
		//Create a variable to handle li
		var strAppends = "";
		//go thru all appends and append to the li handle string
		$.each(array_appends,function(key,value){
			//Create the append's block
			var tags 	= "<h4>ID</h4>";
			var values 	= "<p>"+value["id"]+"</p>";
			
			$.each(value["fields"],function(key2,value2){
				
				switch(value2["type"]){
					case "float":
						values += "<p>"+value2["value"]+"</p>";
					break;
					
					case "date":
						values += "<p>"+value2["value"]+"</p>";
					break;
					
					default:
						values += "<p>"+value2["value"]+"</p>";
					break;
				}
				
				tags 	+= "<h4>"+value2["tag"]+"</h4>";
			});
			
			strAppends = strAppends + '<div class="detailsList"><div class="row">'+tags+'</div><div class="row">'+values+'</div></div>';
			
		});
		}
		catch(e){$('div[view=trx_view]').hide();}
		$('.appends').html('<div class="scroller">'+strAppends+"</div>");
		
	
	//Calculate and fix the height of the option menu based on the number of options
	$('.dropdownOption').css({'bottom': (-$('.dropdownOption').height()-50)+"px"});
	//Bring appends to the front
	$(".appends").css({"z-index": 40});
	
	//Choose the entity header 
	$("header.active").removeClass("active");
	$("#headerEntity").addClass("active");
	

	try{
		strHistory = "";
		tmp_hist = atob(msg.attr('history')).split(';');
		console.log(tmp_hist);
		for(var i = 0; i < tmp_hist.length ; i++){
			tmp_history = tmp_hist[i].split('^');
			strHistory = strHistory + "<div class='detailsList'><h43 class='histo'>"+tmp_history[0]+"</h43><p>"+tmp_history[1]+"</p><p>"+tmp_history[2]+"</p></div>"
			//strHistory = strHistory + "<div class='detailsList'><h4>"+tmp_histo'history[0]+"</h4><p>"+tmp_history[1]+"</p><p>"+tmp_history[2]+"</p></div>"
			
		};
		$('.historye').html(strHistory);
		$('.histo').css({width : '50%'});
		$('#showHistory').show();
	}
	catch(e){
		$('#showHistory').hide();
	}
	
	//Sync heights of appends
		matchColumnsHeight();
		appendsScroller =  new IScroll('.appends', { probeType: 3, mouseWheel: true }); 
}

$( document ).on('tapend','#showOptions',function(e){
	e.stopPropagation();
	if($('.dropdownOption').css("bottom") == "50px"){
	//	alert($('.dropdownOption').height() );
		$('.dropdownOption').velocity({'bottom': (-$('.dropdownOption').height()-50)+"px"});
		$(".appends").css({"z-index": 40});
		$(".htmlMSG").css({"z-index": 40});
	}
	else{
		$(".appends").css({"z-index": 0});
		$(".htmlMSG").css({"z-index": 0});
		$('.dropdownOption').velocity({'bottom' : '50px'});
	}
});

$( document ).on('tapend','#showHistory',function(){
	if($(this).html() == $.t("History")){
		$(".historye").show();
		$(this).html($.t("back"));
		$(".appends").hide();
	}else{
		$(".historye").hide();
		$(this).html($.t("History"));
		$(".appends").show();
	}
});

$( document ).on('tapend','.wraperWindows',function(){
	$('.dropdownOption').velocity({'bottom': (-$('.dropdownOption').height()-50)+"px"});
	$(".appends").css({"z-index": 40});
});

$( document ).on('tapend','.dropdownOption ul li',function(){
	requestService({"idMessage": $(this).attr('msg'), "code": $(this).attr('services'), "description": $(this).find('.oneOption').html()});
		console.log(JSON.stringify({"idMessage": $(this).attr('msg'), "code": $(this).attr('services'), "description": $(this).html()}));
});