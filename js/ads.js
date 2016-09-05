function getAds(){
	
	$.post('http://'+IP+':8089/appriz/getAdsByClient',{"idSecretClient" : idScretClient,"entityId" : parseInt(currentEntityID)},function(data){
	
		$("#ads").html('<img src="'+data["Content"]+'" alt=""/>');
		console.dir(data);
		swipeDelete(); 
	}
	);
}


function swipeDelete(){
	$( "#ads img").swipe( 
		{
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if(direction=='left' || direction=='right' ){
						$(this).animate({opacity: 0,left: "300px"},2000, function(){$(this).remove();});
					}
				}
		});
	
}


