var BigBuffer = function(){
	this.localBuffer = null;
	
	this.buffering = function(request,result){
		if(this.localBuffer === null) this.localBuffer = new Array();
		this.localBuffer[request] = result;
	};
	
	this.lookInBuffer = function(request){
		if(this.localBuffer === null || !this.localBuffer[request]) return null;
		return this.localBuffer[request];
	};
	
	this.getIdPersonne = function(){
		this.update("/login/who");
		return this.getRequest("/login/who");
	};
	
	this.update = function(request){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", request, false);
		xhr.send(null);
		this.buffering(request,JSON.parse(xhr.responseText));
	};
	
	this.checkVersion = function(url){
		var localVersion;
		if(this.localBuffer[url]){
			localVersion = this.localBuffer[url].__v;
		}
		var xhr = new XMLHttpRequest();
		var instance = this;
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
				var remoteVersion = JSON.parse(xhr.responseText)[0].__v;
				if(remoteVersion !== localVersion){
					instance.update(url);
				}
			}else;
		};
		
		xhr.open("GET", url+"/version", false);
		xhr.send(null);
	};
	
	this.getRequest = function(url){
		var test = this.lookInBuffer(url);
		if(test !== null) return test;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send(null);
		this.buffering(url,JSON.parse(xhr.responseText));
		return JSON.parse(xhr.responseText);
	};
	
	this.postSending = function(url,params,postUpdate,postSendScript){
		var parametres = new FormData();
		for(var i = 0; i < params.length; i++){
			parametres.append(params[i].paramName,params[i].paramValue);
		}
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
				alert(xhr.responseText);
				if(postUpdate)DatasBuffer.update(postUpdate);
				if(postSendScript)postSendScript();
			}else if (xhr.readyState === 4 && (xhr.status === 500 || xhr.status === 0)) {
				alert(xhr.responseText);
			}
		};
		
		xhr.open("POST",url,true);
		xhr.send(parametres);
	};
	
};

var DatasBuffer = new BigBuffer();