var GraphicalNavNB = 0;
var GNs = new Array();

function GraphicalNavigator(){
	
	this.title = "";
	this.selectedTab = 0;
	this.wasSelected = 0;
	this.index = GNs.length;
	this.Tabs = null;
	
	this.rawCss = "";
	this.cssClass = "";
	
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
		this.coupler = ((this.coupler === null)?(new Coupler(this)):(this.coupler));
	};
	
	this.getCoupler = function(){
		return this.coupler;
	};
	
	this.clear = function(){
		document.getElementsByClassName('gnav' + this.index)[0].innerHTML = "";
	};
	
	//Fin de section liée au coupleur
	
	GNs[GNs.length] = this;
	
	GraphicalNavigator.getNavigatorID = function(NavigatorName){
		for(var i = 0; i < GNs.length; i++){
			if(GNs[i].getNavigatorTitle() === NavigatorName){
				return i;
			}
		}
		return -1;
	};
	
	GraphicalNavigator.getNavigatorAndItemID = function(NavigatorName,ItemName){
		for(var i = 0; i < GNs.length; i++){
			if(GNs[i].getNavigatorTitle() === NavigatorName){
				var tbs = GNs[i].getTabs();
				for(var j = 0; j < tbs.length; j++){
					if(tbs[j].getTitle() === ItemName){
							return {NavId: i, ItemID: j};
					}
				}
				return {NavId: -1,ItemID: -1};
			}
		}
		return {NavId: -1,ItemID: -1};
	};
	
	GraphicalNavigator.setSelectedTab = function(GNnb, nbTab){
		GNs[GNnb].setSelectedTab(nbTab);
	};
	
	GraphicalNavigator.getSelectedTab = function(GNnb){
		GNs[GNnb].getSelectedTab();
	};
	
	GraphicalNavigator.newNotification = function(GNnb, nbTab){
		GNs[GNnb].newNotification(nbTab);
	};
	
	GraphicalNavigator.resetNotification = function(GNnb, nbTab){
		GNs[GNnb].resetNotification(nbTab);
	};
	
	this.getTabs = function(){
		return this.Tabs;
	};
	
	this.setNavigatorTitle = function(title){
		this.title = title;
	};
	
	this.getNavigatorTitle = function(){
		return this.title;
	};
		
	/**
	*	Récupère le css brut dans le conteneur
	*
	*	@return le css brut
	*/
	this.getRawCss = function(){
		return this.rawCss;
	};
	
	/**
	*	Ajoute une classe css au conteneur
	*
	*	@param la classe css
	*/
	this.getCssClass = function(){
		return this.cssClass;
	};
	
	this.addRawCss = function(css){
		this.rawCss += css;
	};
	
	this.addCssClass = function(classe){
		this.cssClass += classe + " ";
	};
	
	this.addTab = function(title){
		if(this.Tabs === null) this.Tabs = new Array();
		var newTab = new Tab(title,this.Tabs.length);
		this.Tabs[this.Tabs.length] = newTab;
		return newTab;
	};
	
	this.getInterface = function(){
		var ly = new LayoutManager().verticalLayout();
		
		//Construction des onglets du navigateur
		var vl = ly.newVerticalLayout();
		vl.setHeight(1);
		var instance = this;
		
		var vlStuff = "<ul style='"+this.rawCss+"' class='"+this.cssClass+"'>";
		for(var i = 0;this.Tabs !== null && i < this.Tabs.length; i++){
			vlStuff += "<li id='nav"+this.index+"id"+i+"' onclick='GraphicalNavigator.setSelectedTab("+this.index+","+i+");' style='display:"+(function(){return (instance.getTabs()[i].isHidden())?"none":"inline-block"})()+""+this.Tabs[i].getTabRawCss()+"' class='"+(function(){return(i==0)?('actual_page'):('')})()+" NavigatorItem "+this.Tabs[i].getTabCssClass()+"'>"+ this.Tabs[i].getTitle() +"<span class='notif-badge' id='nav"+this.index+"badge"+i+"'>"+this.Tabs[i].getNotificationNumber()+"</span></li>";
		}
		vlStuff += "</ul>";
		
		vl.setContent(vlStuff);
		
		//Construction de la partie inférieur du navigateur
		var vl2 = ly.newVerticalLayout();
		vl2.addCssClass("gnav" + this.index);
		vl2.addCssClass(this.Tabs[0].getCssClass());
		vl2.addRawCss(this.Tabs[0].getRawCss());
		vl2.setHeight(100);
		vl2.setGraphicalElement(this.Tabs[0]);
		
		//Remise a zero de l'onglet sélectionnés
		this.wasSelected = 0;
		this.selectedTab = 0;
		
		return ly.renderLayout();
	};
	
	this.render = function(){
		return this.getInterface();
	};
	
	this.setSelectedTab = function(tabNb){
		if(!this.Tabs[tabNb].isEmpty() && tabNb !== this.selectedTab && tabNb >= 0 && tabNb < this.Tabs.length){
			this.selectedTab = tabNb;
			this.update();
			if(this.coupler !== null)this.coupler.send(this.Tabs[tabNb].getTitle());
			forceScrollVerticalInCell();
		}
	};
	
	this.getSelectedTab = function(){
		return this.selectedTab;
	};
	
	this.newNotification = function(tabId){
		this.Tabs[tabId].newNotification();
	};
	
	this.resetNotification = function(tabId){
		this.Tabs[tabId].resetNotification();
	};
	
	GraphicalNavigator.hide = function(nbNav, nbTab){
		var el = document.getElementById('nav' + nbNav + 'id' + nbTab);
		if(el){
			GNs[nbNav].getTabs()[nbTab].hide();
			el.style.display = "none";
		}
	}
	
	GraphicalNavigator.show = function(nbNav, nbTab){
		var el = document.getElementById('nav' + nbNav + 'id' + nbTab);
		if(el){
			GNs[nbNav].getTabs()[nbTab].show();
			el.style.display = "inline-block";
		}
	}
	
	this.update = function(){
		if(this.selectedTab !== this.wasSelected){
			var t = document.getElementsByClassName('gnav' + this.index)[0];
			if(!t)return;
			t.innerHTML = this.Tabs[this.selectedTab].render();
			t.className = ('gnav' + this.index) + " " + this.Tabs[this.selectedTab].getCssClass();
			document.getElementById('nav' + this.index + 'id' + this.selectedTab).classList.add("actual_page");
			document.getElementById('nav' + this.index + 'id' + this.wasSelected).classList.remove("actual_page");
			this.wasSelected = this.selectedTab;
			if(PostScriptsLoaded)refreshPostRenderScript();
		}
	};
	
}

GraphicalNavigator.reset = function(){
	GraphicalNavNB = 0;
	GNs = new Array();
}

function Tab(title,id){

	this.index = id;
	this.title=title;
	this.code="";
	this.scripts = "";
	this.layoutManager = null;
	this.rawCss = "display:table;margin-top:-10px;";
	this.cssClass = "";
	this.tabRawCss = "";
	this.tabCssClass = "";
	this.empty = true;
	this.notificationNumber = 0;
	this.hidden = false;
	
	this.isHidden = function(){
		return this.hidden;
	};
	
	this.hide = function(){
		this.hidden = true;
	};
	
	this.show = function(){
		this.hidden = false;
	};
	
	this.isEmpty = function(){
		return this.empty;
	};
	
	this.getNotificationNumber = function(){
		if(this.notificationNumber === 0)
			return "";	
		return this.notificationNumber;
		
	};
	
	this.resetNotification = function(){
		this.notificationNumber = 0;
	};
	
	this.newNotification = function(){
		this.notificationNumber ++;
	};
	
	this.addCssClass = function(clss){
		this.cssClass += clss + " ";
	};
	
	this.addTabCssClass = function(clss){
		this.tabCssClass += clss + " ";
	};
	
	this.addTabRawCss = function(clss){
		this.tabRawCss += clss + " ";
	};
	
	this.getTabRawCss = function(){
		return this.tabRawCss;
	};
	
	this.addRawCss = function(css){
		this.rawCss += css;
	};
	
	this.getCssClass = function(){
		return this.cssClass;
	};
	
	this.getTabCssClass = function(){
		return this.tabCssClass;
	};
	
	this.getRawCss = function(){
		return this.rawCss;
	};
	
	this.getTitle = function(){
		return this.title;
	};
	
	this.setTitle = function(title){
		this.title = title;
	};
	
	this.addHTMLFile = function(file){
		var xhr = new XMLHttpRequest();
		var instance = this;
		xhr.onreadystatechange = function() {
        	if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        		instance.code += (xhr.responseText);
			}
    	};
        
    	xhr.open("GET", file, true);
		xhr.send(null);
		this.empty = false;
	};
	
	this.newVerticalLayout = function(){
		this.empty = false;
		this.layoutManager = new LayoutManager().verticalLayout();
		return this.layoutManager;
	};
	
	this.newHorizontalLayout = function(){
		this.empty = false;
		this.layoutManager = new LayoutManager().horizontalLayout();
		return this.layoutManager;
	};
	
	this.addJSFile = function(file){
		this.empty = false;
		var xhr = new XMLHttpRequest();
		var instance = this;
		xhr.onreadystatechange = function() {
        	if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        		instance.scripts += (xhr.responseText);
			}
    	};
        
    	xhr.open("GET", file, true);
		xhr.send(null);
	};
	
	this.enableJS = function(){
	
		var create;
		var oScript;
		
		create = (document.getElementById("staticScript"+this.index) === null) ? (true) : (false);
		
		if(create === false){
		
			oScript = document.getElementById('staticScript'+this.index);
			document.getElementsByTagName('body')[0].removeChild(oScript);
			
		}
		
		oScript = document.createElement('script');
		oScript.id = 'staticScript'+this.index;
		oScript.type = 'text/javascript';
		oScript.text = this.scripts;
				
		document.getElementsByTagName('body')[0].appendChild(oScript);
		
	};
	
	this.getJS = function(){
		return this.scripts;
	};
	
	this.setJS = function(sc){
		this.scripts = sc;
	};
	
	this.addJS = function(sc){
		this.empty = false;
		this.scripts += sc;
	};
	
	this.getHTML = function(){
		return this.code;
	};
	
	this.setHTML = function(code){
		this.empty = false;
		this.code = code;
	};
	
	this.addHTML = function(code){
		this.code += code;
	};
	
	this.render = function(){
		this.enableJS();
		if(this.layoutManager !== null){
			return this.layoutManager.renderLayout();
		}
		return this.code;
	}
}
