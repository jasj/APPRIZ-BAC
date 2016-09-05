
var stringSett;
function guardarCambios(){
		var ret =  parseInt($('input:radio[name=checkboxG1]:checked').val());
		if(ret == 1 || ret == 2 || ret == 3 || ret == 4){
			$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
				idSecretClient			:  idScretClient,
				retention   			:  parseInt(ret),
				pinPolicy   			:  $("#pinPolicy").prop('checked') ? 0 : 1,
				onlyWIFI				:  $("#atWifi").prop('checked') ? 1 : 0
			}, function(data){
				showInfoD($.t('Change Settings'),$.t('The settings was changed!'),function(){$('.moldHide, .dialogAlert').hide(); 
				pinPolicy  =  $("#pinPolicy").prop('checked') ? 0 : 1});
				atWifi =  $("#atWifi").prop('checked') ? 1 : 0;
				retention =  parseInt(ret);
			});
		}else{
			showInfoD($.t('Error'),$.t('You need to select a retention policy'),function(){$('.moldHide, .dialogAlert').hide();});
		}
	
}

function valorSet(){
	
	//var pinPol=$('#pinPolicy').eq(0).val();
	var pinPol=$('#pinPolicy').prop("checked").toString();
	var atWif = $('#atWifi').prop("checked").toString();
	var checkBo=($('input:radio[name=checkboxG1]:checked').val());
	 stringSett = pinPol+atWif+checkBo;
	
}

function compararSett(p,w,c){
	var setActual = p+w+c;
	if(setActual!=stringSett){
		showAlert($.t("Save changes"),$.t("Do you want to save the changes?"),function(){
		guardarCambios();
	},function(){$('.moldHide, .dialogAlert').hide();});
	}
	
}


$(document).on('tapend' ,'.icon-back.backSet', function(){
compararSett($('#pinPolicy').prop("checked").toString(),$('#atWifi').prop("checked").toString(),$('input:radio[name=checkboxG1]:checked').val());
});

$(document).on('tapend' ,'#settingsPage .btnFull', function(){
 guardarCambios();
 valorSet();
});

$('#passwordChg .btnFull').tapend(function(){
	if($('#passwordChg input[type="password"]').eq(0).val().length > 8){
		if($('#passwordChg input[type="password"]').eq(0).val() != $('#passwordChg input[type="password"]').eq(1).val()){
	showInfoD($.t('Wrong data'),$.t('Passwords do not match'),function(){$('.moldHide, .dialogAlert').hide();});} else{
		var encryPass= HexWhirlpool($('#passwordChg input[type="password"]').eq(0).val());
		$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient		:  idScretClient,
		password   			: encryPass
	}, function(data){
		showInfoD($.t('Change password'),$.t('The password was changed!'),function(){$('.moldHide, .dialogAlert').hide(); });
			$('[page-content=settingsPage]').trigger('tapend');
	});
	
	}
	}else{
		showInfoD($.t('Wrong password'),$.t('The password must be at least 9 chars length'),function(){$('.moldHide, .dialogAlert').hide();});
		$('#passwordChg input[type="password"]').eq(0).val("");
		$('#passwordChg input[type="password"]').eq(1).val("");
	}


});												

$('#pinChg .btnFull').tapend(function(){
	var patt = /^\d{4}$/;
	if( patt.test($('#pinChg input[type="tel"]').eq(0).val())){
			$.post('http://'+IP+':8089/appriz/setAprzCustomerSettings',{
		idSecretClient			:  idScretClient,
		pin   			: $('#pinChg input[type="tel"]').eq(0).val()
	}, function(data){
		showInfoD($.t('Change pin'),$.t('The pin was changed!'),function(){$('.moldHide, .dialogAlert').hide(); pin = $('#pinChg input[type="tel"]').eq(0).val()});
		$('[page-content=settingsPage]').trigger('tapend');
	});
	}else{
		showInfoD($.t('Wrong PIN'),$.t('PIN must be of fourth digits'),function(){$('.moldHide, .dialogAlert').hide();});
		$('#pinChg input[type="tel"]').eq(0).val("");
	}
});

$( document ).on('tapend','[page-content=settingsPage]',function(){
	$('#pinPolicy').prop('checked', pinPolicy == 1 ? false : true);
	$('#atWifi').prop('checked', atWifi == 1 ? true : false);
	$("#settingsPage .weeksOption input").prop('checked', false);
	$("#settingsPage [week="+(retention =="undefined" ? 4 : retention)+"]").prev().prop('checked', true);
	$("#settingsPage [week="+(retention =="undefined" ? 4 : retention)+"]").parent().addClass('isThis');
	valorSet();
	settingsScroller =  new IScroll('.settings', { preventDefault: false, probeType: 3, mouseWheel: true }); 
});