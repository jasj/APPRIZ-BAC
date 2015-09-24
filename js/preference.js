
$( document ).on("tapend",".categoriaPref",function(){
	$(this).toggleClass("active");
	$(this).find('.fa').toggleClass("fa-check-circle").toggleClass("fa-circle");
});

$( document ).on("tapend",".categoriaPref h6",function(e){
	e.stopPropagation();
	$(".selectSubCat.displayed").removeClass("displayed");
	if($(this).text() == $.t('More') ){
		$(this).text($.t('Less')) ;
		
		$(this).parents(".categoriaPref").next(".selectSubCat").addClass('displayed');
	}else{
		$(this).text($.t('More')) ;
	}
	
})