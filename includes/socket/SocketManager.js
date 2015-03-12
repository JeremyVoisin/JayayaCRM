function SocketManager(server){

	this.io = require('socket.io').listen(server,{log: false});
	this.io.set('log level', 1);

	this.clientSignals = new Array();
	
	this.getIO = function(){
		return this.io;
	};
	
	this.emit = function(){
		if(this.checkExistence(arguments[1]) === true){
			arguments[0].emit(arguments[1],extractArgs(arguments));
		}
		else console.log("Invalid signal to emit: " + arguments[1]);
	}
	
	var extractArgs = function(array){
		var arr = [];
		if(array.length > 2){	
			for(i = 2; i < array.length; i++){
				arr[i - 2] = array[i];
			}
		}
		return arr;
	};
	
	this.checkExistence = function(signalName){
		for(i = 0; i < this.clientSignals.length; i++){
			if(signalName === this.clientSignals[i].n)
				return true;
		}
		return false;
	};

	this.addServerSignal = function(name,handler){
		this.io.sockets.on(name,handler);
	};
	
	this.addClientSignal = function(name,handler){
		this.clientSignals[this.clientSignals.length] = {n: name, h: handler};
	};
	
	this.sendSignalsToClient = function(socket){
		for(i = 0; i < this.clientSignals.length; i++){
			socket.emit("start", getHandlers(this.clientSignals[i].n,this.clientSignals[i].h));
		}
	};
	
	function getHandlers(signalName, handler){
		return '(function(){socket.on("' + signalName + '",' + handler.toString() + ')})()';
	};
}

module.exports = function(server){return new SocketManager(server);}