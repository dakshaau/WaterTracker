
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        NativeStorage.getItem("filter_usage",function(obj){
            //navigator.notification.alert(String(obj.max)+' '+String(obj.current),function(){},'Value Found','Ok');
            var m = obj.max;
            var cur = obj.current;
            var percent = 0.0;
            percent = (cur/m)*100;
            // navigator.notification.alert(percent,function(){}, 'Value Found','ok')
            $('#progr').css("width",String(percent)+"%");
            $('#progr').html(String(cur.toFixed(2))+' Gal');
            // navigator.notification.alert(percent,function(){},'in If','ok');
            if (percent <= 60)
            {
                 console.log('In second IF');
                 $('#progr').removeClass('progress-bar-warning');
                 $('#progr').removeClass('progress-bar-danger');
                 $('#progr').removeClass('progress-bar-success');
                 $('#progr').addClass('progress-bar-success');
            } 
            else if (percent > 60 && percent <= 80) 
            {
                 $('#progr').removeClass('progress-bar-success');
                 $('#progr').removeClass('progress-bar-danger');
                 $('#progr').removeClass('progress-bar-warning');
                 $('#progr').addClass("progress-bar-warning");
            } 
            else 
            {
                 console.log('In third IF');
                 $('#progr').removeClass('progress-bar-success');
                 $('#progr').removeClass('progress-bar-warning');
                 $('#progr').removeClass('progress-bar-danger');
                 $('#progr').addClass('progress-bar-danger');
            }
        }, function(error){
            // navigator.notification.alert(error.exception,function(){
            //     navigator.app.exitApp();
            // },'Error','Ok')
            console.error(error);
            navigator.notification.prompt('Enter maximum allowed value in Gallons', function(res){
                var x = res.input1;
                if (Number(x) !== parseFloat(x)){
                    console.error('X is not an floating point value');
                    navigator.app.exitApp();
                }
                var object = {max: Number(x), current: 0}
                NativeStorage.setItem("filter_usage", object, function(obj){
                    $('#progr').css("width","0%");
                    $('#progr').html('0 Gal');
                    $('#progr').removeClass('progress-bar-warning');
                    $('#progr').removeClass('progress-bar-danger');
                    $('#progr').removeClass('progress-bar-success');
                    $('#progr').addClass('progress-bar-success');
                }, function(error){
                    console.error(error);
                    navigator.notification.alert(error.code, function(){
                        navigator.app.exitApp();
                    }, 'Error', 'Ok');
                });
            }, 'Enter Value', ['Ok']);
        });

        $(document).on('backbutton',function(){
            navigator.app.exitApp();
        });


        $('#reset').click(function(){
            navigator.notification.prompt('Enter maximum allowed value in Gallons', function(res){
                if (res.buttonIndex == 2){
                    return;
                }
                var x = res.input1;
                if (Number(x) !== parseFloat(x)){
                    console.error('X is not an floating point value');
                    navigator.app.exitApp();
                }
                var object = {max: Number(x), current: 0}
                NativeStorage.setItem("filter_usage", object, function(obj){
                    $('#progr').css("width","0%");
                    $('#progr').html('0 Gal');
                    $('#progr').removeClass('progress-bar-warning');
                    $('#progr').removeClass('progress-bar-danger');
                    $('#progr').removeClass('progress-bar-success');
                    $('#progr').addClass('progress-bar-success');
                }, function(error){
                    console.error(error);
                    navigator.notification.alert(error.code, function(){
                        navigator.app.exitApp();
                    }, 'Error', 'Ok');
                });
            }, 'Enter Value', ['Ok','Cancel'],'40');
        });

        $('form').submit(function(){
            unit = $('#unit').val();
            if (unit == 'mL'){
                update = Number($('#cont').val()) * Number($('#vol').val()) * 0.000264172;
                function success(obj){
                    cur = obj.current;
                    m = obj.max;
                    cur += update;
                    newobj = {max: m, current: cur};
                    NativeStorage.setItem("filter_usage",newobj,function(obj){
                        var mx = obj.max;
                        var cr = obj.current;
                        var percent = 0.0;
                        percent = (cr/mx)*100;
                        // navigator.notification.alert(percent,function(){}, 'Value Found','ok')
                        $('#progr').css("width",String(percent)+"%");
                        $('#progr').html(String(cr.toFixed(2))+' Gal');
                        // navigator.notification.alert(percent,function(){},'in If','ok');
                        if (percent <= 60)
                        {
                            console.log('In second IF');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').addClass('progress-bar-success');
                        } 
                        else if (percent > 60 && percent <= 80) 
                        {
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').addClass("progress-bar-warning");
                        } 
                        else 
                        {
                            console.log('In third IF');
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').addClass('progress-bar-danger');
                        }
                    }, function(error){
                        console.error(error);
                        navigator.notification.alert(error.code, function(){
                            navigator.app.exitApp();
                        }, 'Error', 'Ok');
                    });
                }
                NativeStorage.getItem("filter_usage",success,function(error){
                    console.error(error);
                    navigator.notification.alert(error.code, function(){
                        navigator.app.exitApp();
                    }, 'Error', 'Ok');
                });
            }
            else if(unit == 'L'){
                update = Number($('#cont').val()) * Number($('#vol').val()) * 0.264172;
                function success(obj){
                    cur = obj.current;
                    m = obj.max;
                    cur += update;
                    newobj = {max: m, current: cur};
                    NativeStorage.setItem("filter_usage",newobj,function(obj){
                        var mx = obj.max;
                        var cr = obj.current;
                        var percent = 0.0;
                        percent = (cr/mx)*100;
                        // navigator.notification.alert(percent,function(){}, 'Value Found','ok')
                        $('#progr').css("width",String(percent)+"%");
                        $('#progr').html(String(cr.toFixed(2))+' Gal');
                        // navigator.notification.alert(percent,function(){},'in If','ok');
                        if (percent <= 60)
                        {
                            console.log('In second IF');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').addClass('progress-bar-success');
                        } 
                        else if (percent > 60 && percent <= 80) 
                        {
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').addClass("progress-bar-warning");
                        } 
                        else 
                        {
                            console.log('In third IF');
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').addClass('progress-bar-danger');
                        }
                    }, function(error){
                        console.error(error);
                        navigator.notification.alert(error.code, function(){
                            navigator.app.exitApp();
                        }, 'Error', 'Ok');
                    });
                }
                NativeStorage.getItem("filter_usage",success,function(error){
                    console.error(error);
                    navigator.notification.alert(error.code, function(){
                        navigator.app.exitApp();
                    }, 'Error', 'Ok');
                });
            }
            else if(unit == 'Gallon'){
                update = Number($('#cont').val()) * Number($('#vol').val());
                function success(obj){
                    cur = obj.current;
                    m = obj.max;
                    cur += update;
                    newobj = {max: m, current: cur};
                    NativeStorage.setItem("filter_usage",newobj,function(obj){
                        var mx = obj.max;
                        var cr = obj.current;
                        var percent = 0.0;
                        percent = (cr/mx)*100;
                        // navigator.notification.alert(percent,function(){}, 'Value Found','ok')
                        $('#progr').css("width",String(percent)+"%");
                        $('#progr').html(String(cr.toFixed(2))+' Gal');
                        // navigator.notification.alert(percent,function(){},'in If','ok');
                        if (percent <= 60)
                        {
                            console.log('In second IF');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').addClass('progress-bar-success');
                        } 
                        else if (percent > 60 && percent <= 80) 
                        {
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').addClass("progress-bar-warning");
                        } 
                        else 
                        {
                            console.log('In third IF');
                            $('#progr').removeClass('progress-bar-success');
                            $('#progr').removeClass('progress-bar-warning');
                            $('#progr').removeClass('progress-bar-danger');
                            $('#progr').addClass('progress-bar-danger');
                        }
                    }, function(error){
                        console.error(error);
                        navigator.notification.alert(error.code, function(){
                            navigator.app.exitApp();
                        }, 'Error', 'Ok');
                    });
                }
                NativeStorage.getItem("filter_usage",success,function(error){
                    console.error(error);
                    navigator.notification.alert(error.code, function(){
                        navigator.app.exitApp();
                    }, 'Error', 'Ok');
                });
            }
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();