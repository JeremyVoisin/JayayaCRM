var ContainerCount = 0;
function GraphicalContainer(){
	
	//Variables d'instance
	this.content = "";
	this.internalLayout = null;
	this.index = ContainerCount;
	
	this.height = 0;
	this.width = 0;
	
	this.rawCss = "";
	this.cssClass = "";
	
	this.internalLayout = null;
	
	ContainerCount++;
		
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
	
	this.scrollUp = function(){
		var ceContainer = document.getElementById('container'+this.index);
		if(ceContainer){
			ceContainer.scrollTop = 0;
		}
	};
	
	this.initCoupler = function(){
		(this.coupler = ((this.coupler == null)?(new Coupler(this)):(this.coupler)));
	};
	
	this.getCoupler = function(){
		return this.coupler;
	};
	
	this.clear = function(){
		this.content = "";
	};
	
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
	*	Récupère le css brut dans le conteneur
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
	
	this.setHTMLContent = function(content){
		this.content = content;
	};
	
	this.setGraphicalElement = function(elem){
		this.content = elem;
	};
	
	this.render = function(){
		if(this.internalLayout !== null){
			var  returnStuff = "<div id='container"+this.index+"' class='"+this.cssClass+"' style='"+this.rawCss+"'>";
			for(var i = 0; i < this.internalLayout.length; i++)
				returnStuff += this.internalLayout[i].renderLayout();
			return returnStuff + "</div>";
		}
		else if(this.content.render)
			return "<div id='container"+this.index+"' class='"+this.cssClass+"' style='height:auto;width:auto;"+this.rawCss+"'>"+this.content.render()+"</div>";
		return "<div id='container"+this.index+"' class='"+this.cssClass+"' style='height:auto;width:auto;"+this.rawCss+"'>"+this.content+"</div>";
	};
	
	this.update = function(){
		var el = document.getElementById("container"+this.index);
		if(!el)return;
		if(this.internalLayout !== null){
			var  returnStuff = "";
			for(var i = 0; i < this.internalLayout.length; i++)
				returnStuff += this.internalLayout[i].renderLayout();
			el.innerHTML = returnStuff;
			
		}else if(this.content.render)
			el.innerHTML = this.content.render();			
		else 
			el.innerHTML = this.content;
	};
	
}

GraphicalContainer.reset = function(){
	containerCount = 0;
};