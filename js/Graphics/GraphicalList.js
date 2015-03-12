var GraphicalListNBs = 0;
var GLs = new Array();

function GraphicalList(){
	
	this.elements = new Array();
	this.selectedIndex = -1;
	this.index = GraphicalListNBs;
	this.notificationList = new Array();
	this.rawStyle = "margin:0;padding:0;overflow:auto;";
	this.classes = "Vertigo ";
	
	GraphicalListNBs++;
	GLs[this.index] = this;
	
	//Section liée au coupleur
	
	this.coupler = null;
	this.updateHandler = null;
	this.notificationHandler = null;
	
	this.setNotificationHandler = function(handler){
		this.notificationHandler = handler;
	};
	
	this.setUpdateHandler = function(handler){
		this.updateHandler = handler;
	};
	
	this.initCoupler = function(){
		(this.coupler = ((this.coupler == null)?(new Coupler(this)):(this.coupler)));
	};
	
	this.getCoupler = function(){
		return this.coupler;
	};
	
	this.clear = function(){
		this.elements = new Array();
		this.notificationList = new Array();
	};
	
	//Fin de section liée au coupleur
	
	this.addItem = function(ct,titre){
		if(this.elements === null) this.elements = new Array();
		this.notificationList[this.elements.length]=false;
		this.elements[this.elements.length] = {content:ct, title:titre};
	};
	
	this.setNotificationState = function(itemNumber,state){
		if(this.notificationList[itemNumber] !== state){
			this.notificationList[itemNumber] = state;
			this.update();
		}
	};
	
	this.addCssClass = function(className){
		this.classes += className + " ";
	};
	
	this.addRawCss = function(rawStyle){
		this.rawStyle += rawStyle;
	};
	
	this.setSelectedIndex = function(index){
		this.selectedIndex = index;
	};
	
	this.getElements = function(){
		return this.elements;
	};
	
	this.getNotificationList = function(){
		return this.notificationList;
	};
	
	this.getIndex = function(){
		return this.index;
	};
	
	GraphicalList.select = function(listNb,itemNb){
		if(listNb < GraphicalListNBs && itemNb !== GLs[listNb].getSelectedIndex()){
			var el = document.getElementById('list'+listNb+'li'+itemNb);
			if(el)el.classList.add("active_item");
			el = document.getElementById('list'+listNb+'li'+GLs[listNb].getSelectedIndex());
			if(el)el.classList.remove("active_item");
			GLs[listNb].setSelectedIndex(itemNb);
			if(GLs[listNb].getCoupler() !== null && itemNb < GLs[listNb].getElements().length) GLs[listNb].getCoupler().send(GLs[listNb].getElements()[itemNb].title);
			else if(GLs[listNb].getCoupler() !== null && GLs[listNb].getElements().length === 0)GLs[listNb].getCoupler().send(null);
			if(itemNb < GLs[listNb].getElements().length)GLs[listNb].setNotificationState(itemNb,false);
		}
	};
	
	this.scrollDown = function(){
		var cetteListe = document.getElementById('list'+this.index);
		if(cetteListe !== null)
			cetteListe.scrollTop = cetteListe.scrollHeight;
	};
	
	this.getSelectedIndex = function(){
		return this.selectedIndex;
	};
	
	this.render = function(){
		var height = "auto";
		var th = this;
		if(arguments.length > 0){
			height = arguments[0] + "%";
		}
		var returnStuff = "<ul id='list"+this.index+"' "+ (function(){return (th.classes!=="")?("class='"+th.classes+"' "):("");})()+" style='"+this.rawStyle+"height:"+height+";'>";
		var instance = this;
		if(this.elements !== null){
			for(var i = 0; i < this.elements.length; i++){
				this.notificationList[i] = false;
				var returnRender;
				if(this.elements[i].content.render){
					returnRender = this.elements[i].content.render();
				}
				else if(this.elements[i].content.renderLayout){
					returnRender = this.elements[i].content.renderLayout(); 
				}else{
					returnRender = this.elements[i].content;
				}
				returnStuff += "<li id='list"+this.index+"li"+i+"' onclick='GraphicalList.select("+this.index+","+i+");' class='GraphicalListItem "+ (function(){return (instance.getSelectedIndex()===i)?("active_item"):("");})()+"'>"+returnRender + "</li>";
			}
		}
		return returnStuff + "</ul>";
	};

	this.update = function(){
		if(this.elements === null) return;
		var returnStuff = "";
		var instance = this;
		for(var i = 0; i < this.elements.length; i++){
			var returnRender;
			if(this.elements[i].content.render){
				returnRender = this.elements[i].content.render(); 
			}
			else if(this.elements[i].content.renderLayout){
				returnRender = this.elements[i].content.renderLayout(); 
			}else{
				returnRender = this.elements[i].content;
			}
			returnStuff += "<li id='list"+this.index+"li"+i+"' onclick='GraphicalList.select("+this.index+","+i+");' class='GraphicalListItem "+(function(){return (instance.notificationList[i]==true)?("new_item"):("");})()+"'>"+returnRender + "</li>";
		}
		var el = document.getElementById('list'+this.index);
		if(el)el.innerHTML = returnStuff;
		
		forceScrollVerticalInCell();
	};
}

GraphicalList.reset = function(){
	GraphicalListNBs = 0;
	GLs = new Array();
}