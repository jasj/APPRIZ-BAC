
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

// 
// POR HERNAN CASTRO
// 

var services = 
{ 
	"fw": {
		"description": "Fraud Warnings",
		"channelsTypes": { 
			"1": {
				"description": "PUSH",
				"status": 0,
				"userSelect": 0
			},
			"2": {
				"description": "EMAIL",
				"status": 0,
				"userSelect": 0
			},
			"3": {
				"description": "SMS",
				"status": 0,
				"userSelect": 0
			}
		},
		"status": 0
	},
	"not": {
		"description": "Notifications",
		"channelsTypes": { 
			"1": {
				"description": "PUSH",
				"status": 0,
				"userSelect": 0
			},
			"2": {
				"description": "EMAIL",
				"status": 0,
				"userSelect": 0
			},
			"3": {
				"description": "SMS",
				"status": 0,
				"userSelect": 0
			}
		},
		"status": 0
	},
	"pub": {
		"description": "Promotions",
		"channelsTypes": { 
			"1": {
				"description": "PUSH",
				"status": 0,
				"userSelect": 0
			},
			"2": {
				"description": "EMAIL",
				"status": 0,
				"userSelect": 0
			},
			"3": {
				"description": "SMS",
				"status": 0,
				"userSelect": 0
			}
		},
		"status": 0
	},
	"ma": {
		"description": "My Alerts",
		"channelsTypes": { 
			"1": {
				"description": "PUSH",
				"status": 0,
				"userSelect": 0
			},
			"2": {
				"description": "EMAIL",
				"status": 0,
				"userSelect": 0
			},
			"3": {
				"description": "SMS",
				"status": 0,
				"userSelect": 0
			}
		},
		"status": 0
	}
};

function openClose(obj) {
	mainBox = $(obj).closest('div.service');
    button = $(obj).find('i');
    content = mainBox.find('.box');
    content.slideToggle(200);
    button.toggleClass('fa-caret-right').toggleClass('fa-caret-down');
    content.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
        mainBox.resize();
        mainBox.find('[id^=map-]').resize();
    }, 50);
}

$('.btnCollapse').click(function () { 
    openClose(this);
});

function resetServicesStatus() { 
	var servRest = 
		{ 
			"fw": {
				"description": "Fraud Warnings",
				"channelsTypes": { 
					"1": {
						"description": "PUSH",
						"status": 0,
						"userSelect": 0
					},
					"2": {
						"description": "EMAIL",
						"status": 0,
						"userSelect": 0
					},
					"3": {
						"description": "SMS",
						"status": 0,
						"userSelect": 0
					}
				},
				"status": 0
			},
			"not": {
				"description": "Notifications",
				"channelsTypes": { 
					"1": {
						"description": "PUSH",
						"status": 0,
						"userSelect": 0
					},
					"2": {
						"description": "EMAIL",
						"status": 0,
						"userSelect": 0
					},
					"3": {
						"description": "SMS",
						"status": 0,
						"userSelect": 0
					}
				},
				"status": 0
			},
			"pub": {
				"description": "Promotions",
				"channelsTypes": { 
					"1": {
						"description": "PUSH",
						"status": 0,
						"userSelect": 0
					},
					"2": {
						"description": "EMAIL",
						"status": 0,
						"userSelect": 0
					},
					"3": {
						"description": "SMS",
						"status": 0,
						"userSelect": 0
					}
				},
				"status": 0
			},
			"ma": {
				"description": "My Alerts",
				"channelsTypes": { 
					"1": {
						"description": "PUSH",
						"status": 0,
						"userSelect": 0
					},
					"2": {
						"description": "EMAIL",
						"status": 0,
						"userSelect": 0
					},
					"3": {
						"description": "SMS",
						"status": 0,
						"userSelect": 0
					}
				},
				"status": 0
			}
		};
	services = JSON.parse(JSON.stringify(servRest));
}

function getChannels() { 
	var IP = '10.60.0.142';
	resetServicesStatus();
	$.post(
		'http://'+IP+':8089/appriz/getEntityMessageChannels', 
		{ },
		function(datas) { 
			if( datas.status == "200" ) { 
				for( var i in datas.channels ) { 
					if( datas.channels[ i ].length > 0) { 
						services[ i ].status = 1;
						for( var j in datas.channels[ i ] ) { 
							services[ i ].channelsTypes[ datas.channels[i][j] ].status = 1;
						}
					}
				}
			} else 
				console.log("getEntityMessageChannels error status: " + datas.status);
			$.post( 
				'http://'+IP+':8089/appriz/getCustomerMessageChannels', 
				{
					// idSecretClient: $.jStorage.get('idSecretClient')
					idSecretClient: "xbx6Gx/h84+6nWlLaBjngteXEMj1iXYKqZGUGk/mVwnij1XfyRFqirxNBNYrTXwufb5vy2LwwhLOifgB0sExks8JOfy7tDWj2xoilRoI8Jm2ezBR1gUQ49kQ8BY/trxzzNNvB0idIp1lcRitIfbPp7iBkuKiWZMt2EbuU/vXNkWNME8sE5eT40kRzW/pIInLhht/+i/scsCJdGnjyV6jzXDEtO85CxlW/ted7xrhujXWjE+PwQteeIzAaSWOCpebxx7nUmikZ1fLcOsS0w4PJw=="
				},
				function(datas) { 
					if( datas.status == "200" ) { 
						for( var i in datas.channels ) { 
							for( var j in datas.channels[ i ] ) { 
								services[ i ].channelsTypes[ datas.channels[i][j] ].userSelect = 1;
							}
						}
					} else 
						console.log("getCustomerMessageChannels error status: " + datas.status);
					displayServices();
			});
	});
}

function displayServices() { 
	htmlOut = "";
	$.each(services, function(k, v){ 
		if( services[k].status == 1 ) { 
			htmlOut += 
				"<div class='service' data-idCat='" + k + "'>" + 
					"<button class='btnAction btnCollapse'>" + 
		            	"<text i18Trans='" + services[k].description + "'/></text>" + 
		            	"<span class='icon-arrow'>" + 
		            		"<span class='path1'></span>" + 
		            		"<i class='fa fa-caret-right'></i>" + 
		            	"</span>" + 
		        	"</button>" + 
		        	"<div class='box' style='display: none;'>";
		        	$.each(v.channelsTypes, function(kk, vv) { 
		        		var label = "", selected = "";
		        		if( vv.status == 1 ) { 
							switch( vv.description ) { 
								case "PUSH":
									label = "Push notifications";
									break;
								case "EMAIL":
									label = "Email";
									break;
								case "SMS":
									label = "SMS";
									break;
							};
							if( vv.userSelect == 1 )
								checkeds = "checked ";
							else 
								checkeds = "";
					    	htmlOut += 
					        	"<div class='optionSelectCheck'>" + 
					                "<h3 i18Trans='" + label + "'></h3>" + 
					                "<div class='onoffswitch'>" + 
					                    "<input type='checkbox' " + checkeds + "data-btnOpt='" + k + "_" + kk + "' name='" + k + "_" + vv.description + "' id='" + k + "_" + vv.description + "' class='toggleSetting'>" + 
					                    "<label for='" + k + "_" + vv.description + "'></label>" + 
					                "</div>" + 
					            "</div>";
						}
					});
			htmlOut += 
			        "</div>" + 
			    "</div>";
			$('.servicesSection').html(htmlOut);
			$.i18n.init( 
			{ 
				lng: navigator.language, 
				resGetPath: 'language/__lng__/__ns__.json', 
				fallbackLng: 'en'
			}, function() { 
				$("[i18Trans]").each(function() { 
					if( $(this).hasAttr("i18Target")) { 
						$(this).attr($(this).attr("i18Target"),$.t($(this).attr("i18Trans")));
					} else { 
						$(this).html($.t($(this).attr("i18Trans")));
					}
				});
			});

		}
	});
	setTimeout( function() { 
		$('.btnCollapse').click(function () { 
		    openClose(this);
		});
	}, 500);
}

function saveSelections() { 
	var data = { 
		// idSecretClient: $.jStorage.get('idSecretClient')
		idSecretClient: "xbx6Gx/h84+6nWlLaBjngteXEMj1iXYKqZGUGk/mVwnij1XfyRFqirxNBNYrTXwufb5vy2LwwhLOifgB0sExks8JOfy7tDWj2xoilRoI8Jm2ezBR1gUQ49kQ8BY/trxzzNNvB0idIp1lcRitIfbPp7iBkuKiWZMt2EbuU/vXNkWNME8sE5eT40kRzW/pIInLhht/+i/scsCJdGnjyV6jzXDEtO85CxlW/ted7xrhujXWjE+PwQteeIzAaSWOCpebxx7nUmikZ1fLcOsS0w4PJw=="
	};
	var IP = '10.60.0.142';
	$.each( $('.service'), function (k, v) { 
		$.each( $(v).find('input[type=checkbox]:checked'), function(kk, vv) { 
			var serviceCode = "";
			switch( $(v).data('idcat') ) { 
				case "ma": 
					serviceCode = "myAlerts";
					break;
				case "fw": 
					serviceCode = "fraudWarnings";
					break;
				case "not": 
					serviceCode = "notify";
					break;
				case "pub": 
					serviceCode = "ads";
					break;
			}
			if( typeof data[ serviceCode ] == 'undefined' )
				data[ serviceCode ] = [];
			data[ serviceCode ].push( parseInt( $(vv).data('btnopt').split('_')[1] ) );
		});
	});
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://10.60.0.142:8089/appriz/updateCustomerMessageChannels",
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json"
	  },
	  "processData": true,
	  "data": JSON.stringify( data )
	}
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}

$(document).on('tapend' ,'#enableChannels .btnFull', function() { 
 	saveSelections();
});