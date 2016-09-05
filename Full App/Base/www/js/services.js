
function addServices(services){

	 console.log(JSON.stringify(services));
	for( service in services){
		$('#services .services ul').append('<li service="'+service+'"><button><srv>'+services[service]+'</srv><span class="icon-arrow"></button></li>');
	}
	$(".refreshing_list").hide();
	myScroll2 = new IScroll('.services.serviceList', { useTransition: false });
}
function getServices(productName){
	$('#services .services ul').html("<div class='refreshing_list'><i class='fa fa-spinner fa-spin'></i> </div>");
	$.post('http://'+IP+':8089/appriz/getServicesByProduct',{"idSecretClient": idScretClient,"productName":productName,},function(data){
			if (data["status"]== 200){
				addServices(data["services"]);
			}
		
	},'json') .fail(function(e) {
	}).done(function(){ $('.refreshing_list').hide(); });
	
}

function requestService(serviceObj){
	showAlert($.t("Confirm Request "),serviceObj["description"],function(){
		$('.moldHide, .dialogAlert').hide();
		$.post('http://'+IP+':8089/appriz/sendServiceRequest',$.extend({"idSecretClient": idScretClient},serviceObj),function(data){
			if (data["status"]== 200){
				showInfoD($.t('Sucessfull!'),$.t('Your request was succesfully send'),function(){$('.moldHide, .dialogAlert').hide();});
			}
		
		},'json') .fail(function(e) {
			showInfoD($.t("Offline Mode"),$.t("This option is disabled in Offline Mode"),function(){back=["inbox","inbox"];$(".icon-back").trigger("tapend")});
		}).done(function(){});
	},function(){$('.moldHide, .dialogAlert').hide();});
}

$( document ).on("tapend","[page-content=services]",function(ev){
 	var endY = ev.pageY || ev.originalEvent.changedTouches[0].pageY;
	if(Math.abs(startTap.Y - endY) < 10){
		$("#services .productNav li").eq(1).find("button").html($(this).find("prd").html());
		getServices($(this).find("prd").html());
	}
});

$(document ).on("tapend","[service]",function(ev){
		var endY = ev.pageY || ev.originalEvent.changedTouches[0].pageY;
		
		
		
	if(Math.abs(startTap.Y - endY) < 10){
		requestService({"productName": currentProduct, "code": $(this).attr('service'), "description": $(this).find("srv").html()});
	}
});