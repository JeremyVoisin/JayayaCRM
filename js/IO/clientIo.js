var socket = io.connect();
    socket.on('start', function(message) {
    	var oScript = document.createElement('script');
    	oScript.type = 'text/javascript';
    	oScript.text = message;
		document.getElementsByTagName('body')[0].appendChild(oScript);
	});