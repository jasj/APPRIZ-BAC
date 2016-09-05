/*
		Login Scripts
		
		Author: Juan Andres Segreda Johanning
		
*/





function login(){
	  //event.preventDefault();
	  var patFemail = /(\S+)@/;
	   var whirPass= HexWhirlpool($('.loginBox input').eq(1).val());
	   
	  //var whirPass= $('.loginBox input').eq(1).val();
	  console.log(whirPass);
	  
	  try{
	  var logAs = $('.loginBox input').eq(0).val().match(patFemail)[1];
	
		$.post('http://'+IP+':8089/appriz/login_',{
			"email" : $('.loginBox input').eq(0).val(),
			"password": whirPass,
			"phone": typeof device !== 'undefined' ? device.model : "Browser",
			"os": typeof device !== 'undefined' ? device.platform : "Browser",
			"uuid":  typeof device !== 'undefined' ? device.uuid : "Browser",
			"pushKey":  typeof device !== 'undefined' ? PN : "Browser"
		},function(data){
			if(data["status"] == 200){
				console.log("sambuka    " + JSON.stringify(data));
				$("div#login").hide();
				$("div#appHolder").show();
				$('.wConteiner div').hide();
				idScretClient = data["idSecretClient"];
				logId = data["idSession"]; // cambio de segreda
				console.log("LogID: " +logId);
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				$.jStorage.set('pin', data['pin']);
				$.jStorage.set('logAs', logAs);
				$('.user div').html($.jStorage.get('logAs'));
				reloadEntities();
				
				//$("div#login").fadeOut(1000,function(){checkWithOutEntity()});
				callNewMSG();
				pin = data['pin'];
				atWifi = data["onlyWIFI"];
				retention =  data["retention"];
				//getValidTimePeriods();
				//reloadEntities();
			
			}else{
				showInfoD($.t('Wrong credentials'),$.t('The credentials that you use are invalid'),function(){$('.moldHide, .dialogAlert').hide();});
				$('.loginBox input').eq(1).val("")
				
			}	
	}).fail(function(e) {
		idScretClient = $.jStorage.get('idSecretClient');
		showInfoD($.t("Conexion Error"),$.t("There is a connection error Appriz services"),function(){},function(){})
		
});
	  }catch(e){
		  showInfoD($.t('Wrong credentials'),$.t('The credentials that you use are invalid'),function(){$('.moldHide, .dialogAlert').hide();});
				$('.loginBox input').eq(1).val("")
	  }
}




function offLineMode(){
	
	console.log("off mode");
			if($.jStorage.index().indexOf('idSecretClient') > -1){
			idScretClient = $.jStorage.get('idSecretClient');
			$("#login").hide();
			$("#appHolder").show();
			if($.jStorage.index().indexOf('msg') > -1){$('#categories').html(atob($.jStorage.get('msg')));}
			if($.jStorage.index().indexOf('onlyWIFI') > -1){atWifi = $.jStorage.get('onlyWIFI');} else{ atWifi =1}
			if($.jStorage.index().indexOf('retention') > -1){retention = $.jStorage.get('retention');}else{ retention =4}
			$('.user div').html($.jStorage.get('logAs'));
			currentEntityID = $.jStorage.get('currentEntityID');
			current_inbox_off();
			counterByMsg();
			makeSwipe();
     		$("div#appHolder").show();
			$('.wConteiner div').hide();
			$("div#login").fadeOut(1000,function(){console.log("offMode");});
	//	$('#mainOptions :button').prop('disabled', true);
//$("#mainOptionsUL li").hide();


			
			showInfoD($.t("Offline Mode"),$.t("some features are not enabled in this mode"),function(){});
		}
}




function checkPreviusLogin(){
	
	console.log($.jStorage.index().indexOf('currentEntityID'));
	
	
	if($.jStorage.index().indexOf('msg') > -1){$('#categories').html(atob($.jStorage.get('msg')));}
	setTimeout(function(){$('#Waiting p').show();},3000);
	//currentEntityID  = ($.jStorage.index().indexOf('currentEntityID') > -1  ) ? $.jStorage.get('currentEntityID') : 0;
	$.post('http://'+IP+':8089/appriz/getCurrentSession',{uuid:  typeof device !== 'undefined' ? device.uuid : "Browser" },function(data) {
	if("idSecretClient" in data ){
			//	navigator.splashscreen.hide();
				if($.jStorage.index().indexOf('msg') > -1){$('#categories').html(atob($.jStorage.get('msg')));}
				if(data["pinPolicy"]==0){$('#divPIN').show();}
				idScretClient = data["idSecretClient"];
				console.log(idScretClient);
				logId = data["logId"];
				pinPolicy = data["pinPolicy"];
				pin = data["pin"];
				atWifi = data["onlyWIFI"];
				retention =  data["retention"];
				$.jStorage.set('idSecretClient', data['idSecretClient']);
				$.jStorage.set('pin', data['pin']);
				$.jStorage.set('retention', data['retention']);
				$.jStorage.set('onlyWIFI', data['onlyWIFI']);
				$('.user div').html($.jStorage.get('logAs'));
				//currentEntityID = $.jStorage.get('currentEntityID');
				//loadEntityTemplate();
				$('.splash').fadeOut(1000,function(){});
				reloadEntities();
				
				loadEntityTemplate(); 
				callMSGback();
				
				if(pinPolicy==0){
					$('#pin').show();
				
					$('#categories').hide();
					$('#ads').hide();
					$('.categoryNav').hide();
					
				//	$('.fullWrapper').hide();
					$('.icon-menu').hide();
					
				}
				$("div#appHolder").show();
				$('.wConteiner div').hide();
				
				$("div#login").fadeOut(1000,function(){	});
			
			
				
				
				//$('link[typeCss="bank"]').attr('href','https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(currentEntityID,4)+'/CSS/theme.css');
				//$('.header_demo img').attr('src','https://s3.amazonaws.com/tst_appriz_clients/'+FormatInteger(currentEntityID,4)+'/Advertising/Logos/big_logo.png');
				//counterByMsg();
				//current_inbox();
		}else{
			//navigator.splashscreen.hide();
				$("#Waiting").fadeOut(1000,function(){});
		};

		
	}).fail(function(e) {
			offLineMode();
	});
	
	
}

$( document ).on("tapend","button.log",function(){
	console.log("Encontrando a button.log event click");
	
	$.post('http://'+IP+':8089/appriz/logout', {"logId" : logId}, function(data){
		//console.log(data);
		
		$.jStorage.flush();
		
		try{navigator.splashscreen.show();}catch(e){}
		window.location.reload(true);
	})
	});
	



function genPass(){
	
var iteration = 0;
var password = "";
var randomNumber;
var special = false;

while(iteration < 9){
randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
if(!special){
if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
}
iteration++;
password += String.fromCharCode(randomNumber);
}
return password;
	
}


function resetPass(){
	var tempPass = genPass();
	var inputText = $('#inputResetPass').eq(0).val();
	var tempPassEncrypt= HexWhirlpool(tempPass);
	
	$.post('http://'+IP+':8089/appriz/setPassword_',{
		email			:   inputText,
		password   		:   tempPassEncrypt,
		passMail		:	tempPass
	}, function(data){
		
		if(data["status"] == 200){
		showInfoD($.t('Contraseña reiniciada'),$.t('Se ha enviado una clave genérica a su correo electrónico.'),function(){$('.moldHide, .dialogAlert').hide();});
		}
		else{
			showInfoD($.t('Correo incorrecto'),$.t('El correo electronico no existe'),function(){$('.moldHide, .dialogAlert').hide();});
		}
		
	});
	
}


$( document ).on('tapend','#reset-pass .btnFull',function(){ resetPass();});
/*--------------------------------------------------
	Events 
---------------------------------------------------*/
$( document ).on('tapend','.btnFull.submitLogin',function(){ 

login();

});
$( document ).on('tapend','#Waiting p',function(){offLineMode();});

$(".loginBox input").eq(1).keyup(function (e) {
    if (e.keyCode == 13) {
       login();
    }
});

