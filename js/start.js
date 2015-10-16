
function onDeviceReady(){
	
	try{			
		onDeviceReady_ic();
		onDeviceReady_fm();
		onDeviceReady_pn();
	
		document.addEventListener("backbutton", backKeyDown, true);
	    document.addEventListener("menubutton", menuKeyDown, true);
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		

	}catch(e){
		console.log(e);
	}
	setTimeout(function(){ $(".wConteiner div p").show();},3000);
	
	
	checkPreviusLogin();
	console.log("onDeviceReady");
	
	


}



if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}



