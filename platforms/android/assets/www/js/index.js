
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

        // console.log(sqlitePlugin)

        function setProgress(percent, cur){
        	/*
        	This function set the progress bar of WaterTracker
        	*/
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
        }

        var db = sqlitePlugin.openDatabase('WaterTacker.db','1.0','',1);
        // console.log(db);

        db.transaction(function(tx){
        	console.log(tx);
        	tx.executeSql("SELECT * FROM water",[],function(tx, res){
        		//
        		console.log("Values Found");
        		// console.log(res);
        		obj = res.rows.item(0);
        		console.log(obj);
        		m = obj.max_cap;
        		cur = obj.usage;
        		var percent = 0.0;
	            percent = (cur/m)*100;
	            setProgress(percent, cur);

        		
        	}, function(tx, error){
        		//
        		console.error("No Values");
        		console.error(error.message);
	        	tx.executeSql("CREATE TABLE IF NOT EXISTS water(ID INTEGER PRIMARY KEY ASC, max_cap REAL, usage REAL)",[],function(tx, res){
	        		//
	        	}, function(tx, error){
	        		navigator.app.exitApp();
	        	});
	        	navigator.notification.prompt("Enter maximum allowed value in Gallons", function(res){
        			// console.log(input.input1);
        			// console.log(tx);
        			x = res.input1;
        			if (Number(x) !== parseFloat(x)){
	                    console.error(String(x)+' is not an floating point value');
	                    navigator.app.exitApp();
	                }
	                else{
	                	db.transaction(function(tx){
		                	tx.executeSql("INSERT INTO water(max_cap, usage) VALUES(?,?)",[Number(x), 0.0], function(tx, res){
			                	console.log('Values inserted!');
			                	setProgress(0, 0);
			                }, function(tx, err){
			                	console.error(err.message);
			                	navigator.notification.alert(err.message, function(){
			                        navigator.app.exitApp();
			                    }, 'Error', 'Ok');
			                });
		                }, function(error){
		                	console.error('Unable to Insert into water');
		                	console.error(error.message);
		                }, function(){
		                	console.log('Inserted Values');
		                });
	                }
        		}, ['Enter a value'], ['OK', 'Cancel'], '40');
        	});
        }, function(error){
        	console.error('Transaction Failed');

        }, function(success){
        	console.log('Transaction Successful');
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
                    console.error(String(x)+' is not an floating point value');
                    navigator.app.exitApp();
                }
                else{
                	db.transaction(function(tx){
	                	tx.executeSql("UPDATE water SET max_cap=?, usage=? WHERE ID=1",[Number(x),0],function(tx, res){
	                		console.log('Reset value success');
	                		setProgress(0,0);
	                	}, function(tx, err){
	                		console.error('Unable to reset values');
	                		console.error(err.message);
	                		navigator.notification.alert(error.message, function(){
	                			navigator.app.exitApp();
	                		}, 'Error', 'Ok');
	                	});
	                }, function(err){
	                	console.error(err);
	                }, function(){
	                	console.log('Reset Successful');
	                });	
                }
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
                        console.log(obj)
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
                        console.log(obj)
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
                        console.log(obj)
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