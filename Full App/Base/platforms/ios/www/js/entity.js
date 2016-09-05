/*
	
*/
var entityIDs=[];

function reloadEntities(){
	
	console.log("Metodo reloadEntities");
			$.post('http://'+IP+':8089/appriz/getCustomerEntities',{"idSecretClient": idScretClient},function(data){
				
					console.dir(data.length);
					
					if(data.length==0){noEntity=true;}
				entities='';
				
				var frsTime = 0;	
				data.forEach(function(entity){
					
				/*
					if(!($.jStorage.index().indexOf(entity["entityID"]+".css") > -1  && ($.jStorage.get(entity["entityID"]+".css")==entity["vCSS"]))){
						downloadContent("css_"+entity["entityID"]+".css",S3Bucket+FormatInteger(entity["entityID"],4)+'/CSS/entity.css',entity["vCSS"]);
						frsTime = 1;
					}
					if(!($.jStorage.index().indexOf(entity["entityID"]+".png") > -1  && ($.jStorage.get(entity["entityID"]+".png")==entity["vImg"]))){
					 downloadContent("img_"+entity["entityID"]+".png",S3Bucket+FormatInteger(entity["entityID"],4)+'/Advertising/Logos/big_logo.png',entity["vImg"]);
						frsTime = 1;
					}
				*/
					entityIDs.push(entity["entityID"]);
				
				
					if( currentEntityID < 1 || isNaN(currentEntityID)){
						
						currentEntityID  = entity["entityID"];
						lastCSS = 2;
						frsTime = 1;
						$.jStorage.set('currentEntityID',currentEntityID) ;
					}
				});

				current_inbox();
				counterByMsg();
				loadEntityTemplate(frsTime);
				

				console.log(JSON.stringify(data));
				$.jStorage.set('entities', btoa($('#entities ul').html()));
				
			if($.jStorage.get('currentEntityID')==null){checkWithOutEntity();}
			});
			
		}
		
function loadEntityTemplate(frsTime){
	
	console.log("firstT:"+frsTime);
	oIMG = S3Bucket+FormatInteger(currentEntityID,4)+'/Advertising/Logos/big_logo.png';
	oCSS = S3Bucket+FormatInteger(currentEntityID,4)+'/CSS/entity.css';
	
	if(frsTime == 1) {
		
		/* 
		
		$('.bankLogo img').attr("src",oIMG);
		$('.bankBrand img').attr("src",oIMG);
		$('#entityStyle').attr("href",oCSS);
		
		*/
		
		$('.bankLogo img').attr("src","img/overWhite.png");
		$('.bankBrand img').attr("src","img/overColor.png");
		$('#entityStyle').attr("href","css/entity.css");
		
	}else{
	//	getFileLocalURL(currentEntityID+".png", $('.bankLogo img'), "src",oIMG);
	//	getFileLocalURL(currentEntityID+".png", $('.bankBrand img'), "src",oIMG);
	//	getFileLocalURL(currentEntityID+".css", $('#entityStyle'), "href",oCSS);
	
	}
	
}
		
function makeSwipeEntity(id){
	$( 1 ? "#entities li" : "#"+id+".Message").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$(this).find(".deleteSwipe").velocity({"right" : "0px"});
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			$(this).find(".deleteSwipe").velocity({"right" : -(window.innerWidth*0.8+0.72)+"px"});
		},	
		
		swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
				 if((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL )& distance == 0)  {
						
						currentEntityID = $(this).attr("entityId");
						$.jStorage.set('currentEntityID',currentEntityID) ;
						loadEntityTemplate();
						current_inbox();
						counterByMsg();
						$('#pin').hide();
				 }
		}
	});
}

$( document ).on("tapend", "#entities .deleteSwipe",function(event){
	
	showAlert($.t("Unsuscribe Confirmation"),$.t("Are you sure that you want to unsuscribe to")+" <strong>"+$(this).parent().find('img').attr('alt')+"</strong>",function(){
		$(this).parent().remove();
	},
	function(){
	
	}
	);
});
	
	
	

