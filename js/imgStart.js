function onDeviceReady_ic(){
	ImgCache.options.debug = true;
	ImgCache.options.chromeQuota = 150*1024*1024;
	
	ImgCache.init(function () {
    alert('ImgCache init: success!');

    // from within this function you're now able to call other ImgCache methods
    // or you can wait for the ImgCacheReady event

	}, function () {
		alert('ImgCache init: error! Check the log for errors');
	});
}
