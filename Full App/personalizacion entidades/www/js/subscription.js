$('#suscribe .btnFull').tapend(function(){
	$.post('http://'+IP+':8089/appriz/subscribeCustomer', {
		identification 	        :  $('#suscribe input').eq(0).val(),
		subscriptionNumber      :  $('#suscribe input').eq(1).val(),
		idSecretClient			:  idScretClient,
		regId : "1" //from device
	},function(data){
	
		if (data["status"] == 200){
			$('#menuBtn').show();
			reloadEntities();
				$('.out').css({"visibility" : "hidden"});
			showInfoD($.t('Subscription Sucessfull'), $.t("You was succesfully subscribe to")+": <b>"+data["entityName"]+"</b>. ",
				
				function(){
					
					$('.moldHide, .dialogAlert').hide();
					$('#suscribe input').eq(0).val("");
					$('#suscribe input').eq(1).val("");
					$('#Suscri').hide();
					$('.icon-menu').show();
					$('.icon-back').show();
					$('.out').hide();
				}
			);
		$('header .icon-back').css("color", "#ED1A2D" );
		$('header .icon-menu').css("color", "#ED1A2D" );
			
		}else{
			showInfoD($.t('Wrong subscription data'),$.t('No valid subscription data'),function(){$('.moldHide, .dialogAlert').hide();});
		}
	});
	
});
