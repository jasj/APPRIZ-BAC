$("#demo[header=headerGeneral] button").tapend(function(){
	var product;
	console.log("Sending Demo Request");
	
			$.post('http://'+IP+':8089/appriz/getProductsByClient',{"idSecretClient": idScretClient,"entityName": $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"view":view,},function(data){
			if (data["status"]== 200){
				product=data["products"];
			}
		
	},'json') .fail(function(e) {
		
		showInfoD($.t("Offline Mode"),$.t("This option is disabled in Offline Mode"),function(){back=["inbox","inbox"];$(".icon-back").trigger("tapend")});

	}).done(function(){
		requestService({"productName": Object.keys(product)[0],"code": "DEMO-en", "description": "DEMO","entityName" : $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"demo" : "demo"});
		//console.log(Object.keys(product)[0]);
		
		});
	
	//requestService({"productName": "My Amex-5146","code": "DEMO-en", "description": "DEMO","entityName" : $('#entities li[entityId='+currentEntityID+']').find('img').attr("alt"),"demo" : "demo"});
	
});