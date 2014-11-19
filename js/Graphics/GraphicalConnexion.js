function GraphicalConnexion(){
	var instance = this;
	//Variables d'instance
	this.content = "";
	this.internalLayout = null;
	
	this.width = 500;
	this.height = "auto";
	this.marginLeft = 250;
	this.hidden = false;
	
	this.name = "";
	
	this.rawCss = "";
	this.cssClass = "";
	
	this.internalLayout = null;
	
	//Section liee au coupleur
	
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
	
	//Fin de section liee au coupleur
	
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
	
	this.hide = function(){
		var el = document.getElementById("content_connexon");
		if(el){
			el.style.display = "none";
		}else this.hidden = true;
	}
	
	this.transitionalHide = function(){
		document.getElementById("content_connexon").style.display = "none";
	};
	
	GraphicalConnexion.connect = function(){
		var el = document.getElementById("content_connexon");
		if(el){
			var uname = el.querySelector("[name=identifiant]").value;
			var pwd = el.querySelector("[name=mdp]").value;

			var xhr = new XMLHttpRequest();
			var params = instance.getParams(uname,pwd);	
			xhr.onreadystatechange = function() {
				
				document.getElementById("btn_co").style.display = "none";
				document.getElementById("img_co_load").style.display = "inline";
				
				if(xhr.readyState === 4 && (xhr.status === 401 || xhr.status === 500)){
					document.getElementById("msg_erreur_co").innerHTML = "Erreur de connexion";
					document.getElementById("btn_co").style.display = "inline";
					document.getElementById("img_co_load").style.display = "none";
				}
				else if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
					pwd.value = "";
					uname.value = "";
					include('SinglePageApp/page');
					instance.transitionalHide();
					document.getElementById("btn_co").style.display = "inline";
					document.getElementById("img_co_load").style.display = "none";
					document.getElementById("msg_erreur_co").innerHTML = "";
				}
			}
			xhr.open("POST", "/login", true);
			xhr.send(params);
		}
	};
	
	GraphicalConnexion.logout = function(){
		var xhr = new XMLHttpRequest();				
			xhr.onreadystatechange = function() {
				
				if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)){
					DatasBuffer = new BigBuffer();
					ConnexionLayout.generateHTML();
					//Remise à zéro des données
					GraphicalContainer.reset();
					GraphicalEditInput.reset();
					GraphicalForm.reset();
					GraphicalList.reset();
					GraphicalNavigator.reset();
					GraphicalPopup.reset();
				}
			}
			
			xhr.open("GET", "/logout", true);
			xhr.send(null);
	}
	
	GraphicalConnexion.checkConnect = function(){
	
			document.getElementById('logInput').disabled = true;
			document.getElementById('passInput').disabled = true;
			
			var xhr = new XMLHttpRequest();
				
			xhr.onreadystatechange = function() {
				document.getElementById("btn_co").style.display = "none";
				document.getElementById("img_co_load").style.display = "inline";
				if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
					include('SinglePageApp/page');
					instance.hide();
					document.getElementById("btn_co").style.display = "inline";
					document.getElementById("img_co_load").style.display = "none";
					document.getElementById("msg_erreur_co").innerHTML = "";
					document.getElementById('logInput').disabled = false;
					document.getElementById('passInput').disabled = false;
				}else{
					document.getElementById("btn_co").style.display = "inline";
					document.getElementById("img_co_load").style.display = "none";
					document.getElementById("msg_erreur_co").innerHTML = "";
					document.getElementById('logInput').disabled = false;
					document.getElementById('passInput').disabled = false;
				}
			}
		
			xhr.open("GET", "/login/is", false);
			xhr.send();
	};
	
	this.getParams = function(uname,pwd){
		var params = new FormData();
		params.append("username",uname);
		params.append("password",SHA256(pwd,true));
		return params;
	};
	
	this.render = function(){
		var returnStuff = '';
		if(!this.hidden)
			returnStuff = '<div id="content_connexon" style="display: block;">';
		else
			returnStuff = '<div id="content_connexon" style="display: none;">';
			
			returnStuff += '<div id="fade_connexion"></div>';
			returnStuff += '<div id="popup_block_connexion">';
			returnStuff += '<img src="img/hight_logo.png" alt="logo"/>';
			returnStuff += '<div id="bloc_connexion" onkeypress="if(event.keyCode===13)GraphicalConnexion.connect();">';
			returnStuff += '<h2 class="champs_co">CONNEXION</h2>';
			returnStuff += '<p class="champs_co"><input type="text" id="logInput" placeholder="Identifiant" name="identifiant"/></p>';
			returnStuff += '<p class="champs_co"><input type="password" id="passInput" placeholder="Mot de passe" name="mdp"/></p>';
			returnStuff += '<p class="champs_co"><input type="button" id="btn_co" value="Connexion" onClick="GraphicalConnexion.connect();"/><img id="img_co_load" style="display:none;" src="img/load.gif" alt="loading" /></p>';
			returnStuff += '</div>';
			returnStuff += '<p id="msg_erreur_co"></p>';
			returnStuff += '</div></div>';
			return returnStuff;
	};
	
}
