/* 
by Juan Andres Segreda Johanning
CSS fixing (due old android browsers)

*/


function fix_messages(){
	//alert(window.innerWidth);

	$("#categories .moveContainer").css({"left" : (0-window.innerWidth -21)+"px"});
	$("#categories .centralLI").css({"width" : (window.innerWidth*2 +150)+"px"});
	$("#categories .centralLI").css({"left" : (window.innerWidth +20)+"px"});
	$("#categories .rightLI").css({"width" : (window.innerWidth +150)+"px"});
	$("#categories .details").css({"width" : (window.innerWidth -20)+"px"});
    if (window.innerWidth > 325) {
        $("#categories li .infoBank").css({"width": (window.innerWidth - 160) + "px"});
        $(".dateBank").css({"width": (window.innerWidth - 160) + "px"});
    }else{
        $("#categories li .infoBank").css({"width": "180px"});
    //    $(".dateBank").css({"width":  "190px"});


    }
		
}

$("body").css({"height" : window.innerHeight});
$(".details_").css({"width" : (window.innerWidth - window.innerWidth*2*0.04)});
$(".detail_fixed").css({"margin-left" : "0px"});
$(".userInfo div").css({"width": window.innerWidth*0.8*0.49,  "text-overflow": "ellipsis", " overflow":"hidden"});
$("#login").css({"height" : window.innerHeight});