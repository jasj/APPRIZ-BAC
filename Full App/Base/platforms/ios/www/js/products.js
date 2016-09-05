
view = "unselect";
function addProducts(products,view){
	$(".productNav li").eq(0).find("button").html(view  == "rules" ? '<span class="icon-myAlerts"><span class="path1"></span><span class="path2"></span></span>'+$.t('My Alerts') : '<span class="icon-services"><span class="path1"></span></span>'+$.t('Services'));
	for( product in products){
		console.log(product);
		$('#products .products ul').append('<li page-content='+view+'><button><prd>'+product+'</prd><span class="icon-arrow"><span class="path1"></span></button></li>');
	}
	$(".refreshing_list").hide();
	

}
function getProducts(view){
	$('#products p.title').html((view == 'rules' ? 'My Alerts' : 'Services')+'<i class="fa fa-angle-double-right"></i>Products </p>')
	$('#products .products ul').html("<div class='refreshing_list'><i class='fa fa-spinner fa-spin'></i> </div>");
	if(pinPolicy==1){$('#pin').show();}
	$()
				$.post('http://'+IP+':8089/appriz/getProductsByClient',{"idSecretClient": idScretClient},function(data){
			console.log(JSON.stringify(data));
			
			if (data["status"]== 200){
				addProducts(data["products"],view);
			}
		
	},'json') .fail(function(e) {
		
showInfoD($.t("Offline Mode"),$.t("This option is disabled in Offline Mode"),function(){back=["inbox","inbox"];$(".imglogo").trigger("tapend")});

	}).done(function(){$('#products p.title').html((view == 'rules' ? 'My Alerts' : 'Services')+'<i class="fa fa-angle-double-right"></i>Products </p>')});

}



$( document ).on("tapend","[products]",function(){
				$('header .icon-back').css("color", "#ED1A2D" );
			$('header .icon-menu').css("color", "#ED1A2D" );
	getProducts($(this).attr("products"));
});

$( document ).on('tapend','#products .products li',function(){
	currentProduct = $(this).find("prd").html();
});

