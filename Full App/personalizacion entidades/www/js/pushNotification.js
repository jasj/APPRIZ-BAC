function testtingOk(data){
    if( typeof(data) != 'undefined' )
        alert(data.additionalData.msg);
}
function testtingCancel(data){
    if( typeof(data) != 'undefined' )
        alert(data.additionalData.msg);
}
var pushNotification;
var www;
var push = {

    googleSenderID: '676428910880',

    init: function() {
        console.log('push.init');
        push.register();
        console.log(device.platform);
    },
    register: function() {
        console.log('   push.register');
        if( typeof(device) != 'undefined' ) { 
            if ( device.platform == 'android' || device.platform == 'Android' || 
                 device.platform == "iOS" || device.platform == "ios" || 
                 device.platform == "IOS") { 
                PushNotification.hasPermission(function(data){ 
                    if (data.isEnabled) {
                        console.log('isEnabled');
                    } else { 
                        console.log('isNotEnabled');
                    }

                });
                pushNotification = PushNotification.init({ 
                    "android": { 
                        "senderID": push.googleSenderID, 
                        "vibrate": "true"
                        // "forceShow": "true" 
                    }, 
                    "ios": { 
                        "alert": "true", 
                        "badge": "true", 
                        "sound": "true" 
                    }, 
                    "windows": {} 
                });

                pushNotification.on('registration', push.onRegistration );

                pushNotification.on('notification', push.onNotification );

                pushNotification.on('error', push.onError);
            }
        }
    },

    onRegistration: function(data) {
        PN = data.registrationId;
        console.log('Token: ' + PN);
    },

    onNotification: function(data) {
        console.log("push.on('notification'");
        // callMSGback();
        // console.debug(data);
        if ( device.platform == 'android' || device.platform == 'Android' ) { 
            console.log('and');
            push.onNotificationAndroid(data);
        } else if ( device.platform == "iOS" || device.platform == "ios" || device.platform == "IOS") { 
            console.log('ios');
            push.onNotificationIOs(data);
        } 

        
    },
        
    onError: function(e) {
        console.log("push.on('error'");
        console.debug(e);
        alert("push.on('error'");
        // e.message
    },

    onNotificationIOs: function(data) { 
        console.log('push.onNotificationIOs');
        callMSGback();
        window.plugins.toast.showLongBottom(
            data.alert, 
            function(a) { 
                console.log('toast success: ' + a );
            }, 
            function(b) { 
                console.log('toast error: ' + b );
            }
        );
        if ( data.alert )
        {
            navigator.notification.console.log(data.alert);
            
        }

        if ( data.sound )
        {
            var snd = new Media(data.sound);
            snd.play();
        }

        if ( data.badge )
        {
           // pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, 300);
        }
    },

    onNotificationAndroid: function(data) { 
        console.log('push.onNotificationAndroid');
        // callMSGback();
        www = data;
        window.plugins.toast.showLongBottom(
            data.message, 
            function(a) { 
                console.log('toast success: ' + a);
            }, 
            function(b){ 
                console.log('toast error: ' + b);
            }
        );
    },

    onNotificationWM: function() { 
        console.log('push.onNotificationWM');
        callMSGback();
        if (data.type == "toast" && data.jsonContent) {
            pushNotification.showToastNotification(
                function (result){ 
                    console.log('result = ' + result);
                },
                function (error){ 
                    console.log('error = ' + error);
                }, 
                errorHandler,
                {
                    "Title": data.jsonContent["wp:Text1"], 
                    "Subtitle": data.jsonContent["wp:Text2"], 
                    "NavigationUri": data.jsonContent["wp:Param"]
                }
            );
            }

        if (data.type == "raw" && data.jsonContent) {
            console.log(data.jsonContent.Body);
        }
    }
};
