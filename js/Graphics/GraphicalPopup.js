var Popups = new Array();

function GraphicalPopup(){

	this.index = Popups.length;
	Popups[Popups.length] = this;
	
	//Variables d'instance
	this.content = "";
	this.internalLayout = null;
	
	this.width = 500;
	this.height = "auto";
	this.marginLeft = 250;
	
	this.name = "";
	
	this.rawCss = "";
	this.cssClass = "";
	
	this.internalLayout = null;
	
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
	
	this.clear = function(){};
	
	//Fin de section liée au coupleur
	
	/**
	*   CrÈe une nouvelle sous couche de type VerticalLayout
	*
	*   @return une nouvelle sous couche Verticale
	*/
	this.newVerticalLayout = function(){
		if(this.internalLayout === null){
			this.internalLayout = new Array();
		}
		var vertLayout = new VerticalLayout();
		this.internalLayout[this.internalLayout.length] = vertLayout;
		return vertLayout;
	};
	
	
	/**
	*   CrÈe une nouvelle sous couche de type HorizontalLayout
	*
	*   @return une nouvelle sous couche Horizontale
	*/
	this.newHorizontalLayout = function(){
		if(this.internalLayout === null){
			this.internalLayout = new Array();
		}
		var horLayout = new HorizontalLayout();
		this.internalLayout[this.internalLayout.length] = horLayout;
		return horLayout;
	};
	
	/**
	*	Recupère le css brut dans le conteneur
	*
	*	@return le css brut
	*/
	this.getRawCss = function(){
		return "";
	};
	
	/**
	*	Ajoute une classe css au conteneur
	*
	*	@param la classe css
	*/
	this.getCssClass = function(){
		return "";
	};
	
	this.addRawCss = function(css){
		this.rawCss += css;
	};
	
	this.addCssClass = function(classe){
		this.cssClass += classe + " ";
	};
	
	this.addHTMLContent = function(content){
		this.content += content;
	};
	
	this.setWidth = function(width) {
		this.width = width;
		this.marginLeft = Math.round(width/2);
	}
	
	this.setHeight = function(height) {
		this.height = height;
	}
	
	this.setName = function(name) {
		this.name = name;
	};
	
	this.activate = function(){
		document.getElementById("popup"+this.index).style.display = 'block';
	};
	
	this.deactivate = function(){
		document.getElementById("popup"+this.index).style.display = 'none';
	};
	
	GraphicalPopup.showPopup = function(popupIndex){
		Popups[popupIndex].activate();
	};
	
	GraphicalPopup.hidePopup = function(popupIndex){
		Popups[popupIndex].deactivate();
	};
	
	this.getPopupIndex = function(){
		return this.index;
	};
	
	this.render = function(){
		var returnStuff = '<div class="GraphicalPopup '+ this.name +'" id="popup'+this.index+'" style="display: none;">';
		returnStuff += '<div id="fade"></div>';
		returnStuff += '<div class="popup_block" style="height:80%;width: '+ this.width +'px;margin-left: -'+ this.marginLeft +'px;">';
		returnStuff += '<a class="hidePopup" popup="'+ this.name +'" href="javascript:void(0);"><img src="img/close.png" onclick="GraphicalPopup.hidePopup('+this.index+');" class="cntrl" alt="" /></a>';
		returnStuff += '<div style="height:'+ this.height +';" class="popup">';
		
		if(this.internalLayout !== null){
			for(var i = 0; i < this.internalLayout.length; i++)
				returnStuff += this.internalLayout[i].renderLayout();
		} else {
			returnStuff += this.content;
		}
		
		returnStuff += '</div></div></div>';
		
		return returnStuff;
	};
	
}

GraphicalPopup.reset = function(){
	Popups = new Array();
}