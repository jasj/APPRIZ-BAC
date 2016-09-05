var PINpos = 0;
var vPIN = "";

$( document ).on( "tapend", ".numKey", function() {
	$('.passkey').eq(PINpos).html('<i class="fa fa-circle"></i>');
	vPIN = vPIN+$(this).html().trim(); 
	PINpos++;
	if(PINpos == 4){
		if(vPIN == pin) {
			$('#pin').hide();
				$('.passkey').html('');
				PINpos = 0; vPIN= "";
				//$("#inbox").show();
				$('#categories').show();
				$('#ads').show();
				$('.categoryNav').show();
				
				//$('.fullWrapper').show();
				$('.icon-menu').show();
			}else{
					showInfoD($.t('Wrong PIN'),$.t('The PIN that you used is invalid'),function(){});
			}
			$('.passkey').html('');
			PINpos = 0; vPIN= "";
	}
 });
 
$( document ).on( "tapend", ".delKey", function() { 
	if(PINpos > 0){
		PINpos--;
		$('.passkey').eq(PINpos).html('');
		vPIN = vPIN.substring(0, vPIN.length-1);
	}
 });