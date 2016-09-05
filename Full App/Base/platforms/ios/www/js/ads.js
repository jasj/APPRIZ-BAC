function getAds(){
	//$.post('http://'+IP+':8089/appriz/getAdsByClient',{"idSecretClient" : idScretClient,"entityId" : parseInt(currentEntityID)},function(data){
	//	$("#ads").html('<img src="'+data["Content"]+'" alt=""/>');
	$("#ads").html('<img src="http://www.urbaniza.com/promociones/fotos/grandes/15/131/131_136_1.jpg" alt=""/>').fadeIn(4000);

		swipeDelete();
	}
	//);


function swipeDelete(){
	$( "#ads img").swipe( 
		{
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if(direction=='left' || direction=='right' ){
						$(this).fadeOut(2000, function(){$(this).remove();});
					}
				}
		});
	
}


