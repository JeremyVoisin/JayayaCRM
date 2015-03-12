function Coupler(owner){
	this.receivers = null;
	this.informators = null;
	
	this.externalSource = null;
	this.externalSourceEnd = null;
	this.owner = owner;
	
	this.endPoint = false;
	this.lastInformation = null;
	
	this.getLastInformation = function(){
		return this.lastInformation;
	};
	
	this.setLastInformation = function(info){
		this.lastInformation = info;
	};
	
	this.setAsEndPoint = function(){
		this.endPoint = true;
	};
	
	this.setExternalSource = function(){
		if(arguments.length > 1 && this.externalSource === null && this.externalSourceEnd === null){
			this.externalSource = arguments[0];
			this.externalSourceEnd = arguments[1];
		}
		else if(arguments.length === 1 && this.externalSource === null)this.externalSource = arguments[0];
	};
	
	this.addReceiver = function(receiver){
		if(this.receivers === null) this.receivers = new Array();
		this.receivers[this.receivers.length] = receiver;
	};
	
	this.addInformator = function(informator){
		if(this.informators === null) this.informators = new Array();
		this.informators[this.informators.length] = informator;
	};
	
	this.send = function(informations){
		if(this.receivers != null){
			for(var i = 0; i < this.receivers.length; i++){
				this.receivers[i].getCoupler().receive(informations);
			}
		}
	};
	
	this.getInformationsFromSource = function(infos){
		var response;
		DatasBuffer.checkVersion(this.externalSource + "/" + infos);
		response = (this.externalSourceEnd !== null)?DatasBuffer.getRequest(this.externalSource + "/" + infos + this.externalSourceEnd):DatasBuffer.getRequest(this.externalSource + "/" + infos);
		return response;
	};
	
	this.receive = function(informations){
		this.lastInformation = informations;
		if(this.externalSource !== null){
			var datas = null;
			if(informations!==null)datas = this.getInformationsFromSource(informations);
			owner.clear();
			if(informations !== null) owner.updateHandler(datas);
			owner.update();
			if(owner.scrollDown)owner.scrollDown();
		}else{
			if(informations !== null) owner.updateHandler(informations);
		}
		if(informations !== null)loadPostRenderScripts();
		if(!this.endPoint)this.send(informations);
	};
	
	this.notifyInformators = function(informations){
		owner.update();
	};
	
	this.updateHandler = function(handler){
		owner.setUpdateHandler(handler);
	};
	
	this.notificationHandler = function(handler){
		owner.setNotificationHandler(handler);
	};
	
}

Coupler.link = function(informator,receiver){
	informator.initCoupler();
	receiver.initCoupler();
	informator.getCoupler().addReceiver(receiver);
	receiver.getCoupler().addInformator(informator);
};