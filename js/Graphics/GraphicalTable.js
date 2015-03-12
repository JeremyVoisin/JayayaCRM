var TableCount = 0;
var GraphicalTables = new Array();
function GraphicalTable(){
	
	//Variables d'instance
	this.content = "";
	this.index = TableCount;
	this.elements = null;
	this.selectedCell = -1;

	this.rawCss = "";
	this.cssClass = "";
		
	TableCount++;
	GraphicalTables[GraphicalTables.length] = this;
		
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
		var ceContainer = document.getElementById('table'+this.index);
		if(ceContainer){
			ceContainer.scrollTop = 0;
		}
	};
	
	this.addElement = function(titre){
		if(this.elements == null)this.elements = new Array();
		var gc = new GraphicalContainer();
		this.elements[this.elements.length] = {container:gc,title:titre};
		return gc;
	};
	
	this.initCoupler = function(){
		(this.coupler = ((this.coupler == null)?(new Coupler(this)):(this.coupler)));
	};
	
	this.getCoupler = function(){
		return this.coupler;
	};
	
	this.clear = function(){
		this.elements = new Array();
	};
	
	//Fin de section liée au coupleur
	
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
	
	this.render = function(){
		if(this.elements == null)this.elements = new Array();
		var ret = "<div class='Vertigo' style='height:100%;width:100%;overflow:auto;'><div id='table"+this.index+"' class='"+this.cssClass+"' style='display:table;width:90%;margin-left:5%;margin-right:5%;table-layout:fixed;overflow:auto;"+this.rawCss+"'>";
		for(var i = 0; i < this.elements.length/4; i++){
			ret += "<div style='display:table-row;'>";
			for(var j = 0; j < 4 && (i*4+j) < this.elements.length; j++){
				ret += "<div id='table"+this.index+"cell"+(i*4+j)+"' onclick='GraphicalTable.selectCell("+this.index+","+(i*4+j)+");' style='display:table-cell;vertical-align:middle;text-align:center;padding-bottom:1%;padding-top:1%;width:25%;'>" + this.elements[i*4+j].container.render() + "</div>";
			}
			ret += "</div>";
		} 
		ret += "</div></div>";
		return ret;
	};
	
	this.update = function(){
		var el = document.getElementById("table"+this.index);
		if(!el)return;
		var ret = "";
		for(var i = 0; i < this.elements.length/4; i++){
			ret += "<div style='display:table-row;'>";
			for(var j = 0; j < 4 && (i*4+j) < this.elements.length; j++){
				ret += "<div id='table"+this.index+"cell"+(i*4+j)+"' onclick='GraphicalTable.selectCell("+this.index+","+(i*4+j)+");' style='display:table-cell;vertical-align:middle;text-align:center;padding-bottom:1%;padding-top:1%;width:25%;'>" + this.elements[i*4+j].container.render() + "</div>";
			}
			ret += "</div>";
		} 
		el.innerHTML = ret;
	};
	
	this.selectCell = function(cellNumber){
		if(this.selectedCell > -1){
			var el = document.getElementById("table"+this.index+"cell"+this.selectedCell);
			if(el){
				el.style.borderStyle="none";
			}
		}
		var el2 = document.getElementById("table"+this.index+"cell"+cellNumber);
			if(el2){
				el2.style.borderColor="silver";
				el2.style.borderStyle="solid";
				el2.style.borderWidth="2px";
			}
		this.selectedCell = cellNumber;
		if(this.coupler !== null)this.coupler.send(this.elements[this.selectedCell].title);
	};
	
	GraphicalTable.selectCell = function(tableNumber,cellNumber){
		GraphicalTables[tableNumber].selectCell(cellNumber);
	};
	
}

GraphicalTable.reset = function(){
	TableCount = 0;
	GraphicalTables = new Array();
};