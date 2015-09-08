function getAds(){
	var imgDemoSource = [
		{img : "banner-burger-kingdom.jpg", url: "http://apprizmobile.com/html/matias"},
		{img : "banner-carro.jpg" , url: "http://apprizmobile.com/html/maximo-smartbank/"}	,
		{img : "banner-escuela.jpg" , url: "http://apprizmobile.com/html/maximo-tarjeta/"},
		{img : "banner-tarjeta.jpg" , url: "http://www.smartsoftint.com"}
	];
	var imgSelected = Math.floor(Math.random() * (imgDemoSource.length));
	$("#ads").html('<img src="Ads/'+imgDemoSource[imgSelected].img +'" alt=""/>');
	$("#ads img").attr("urlLink", imgDemoSource[imgSelected].url);
	swipeDelete();
	/*
	$.post('http://'+IP+':8089/appriz/getAdsByClient',{"idSecretClient" : idScretClient,"entityId" : parseInt(currentEntityID)},function(data){
	
		$("#ads").html('<img src="'+data["Content"]+'" alt=""/>');
		console.dir(data);
		swipeDelete();
	}
	);
	*/
}


function swipeDelete(){
	$( "#ads img").swipe( 
		{
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					if(distance < 15){
						
					}
					else if(direction=='left'){
						$(this).animate({opacity: 0,"margin-left": "-300px"},1000, function(){$(this).remove();});
					}else if ( direction=='right' ){
						$(this).animate({opacity: 0,"margin-left": "300px"},1000, function(){$(this).remove();});
					}
					
				},
				swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
					 if((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL )& distance < 15)  {
						window.open($("#ads img").attr("urlLink"),"_blank");
					 }
				}
		});
	
}


