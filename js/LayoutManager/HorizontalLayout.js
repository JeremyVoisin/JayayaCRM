/*************************************************************************************
 * @author Team Jayaya
 *	
 * La classe HorizontalLayout s'occupe de positionner les éléments les uns à côté
 * des autres selon l'espace qui lui est alloué ou selon des contraintes posées par
 * le développeur
 *************************************************************************************/

function HorizontalLayout(){

	//Variables d'instances
	this.content = "";
	this.internalLayout = null;
	this.graphicalElement = null;
	this.width = 0;
	this.height = 0;
	this.rawCss = "";
	this.cssClass = "";
	
	/**
	*	Ajoute du css brut dans le conteneur
	*
	*	@param le css brut
	*/
	this.addRawCss = function(css){
		this.rawCss += css;
	};
	
	/**
	*	Ajoute une classe css au conteneur
	*
	*	@param la classe css
	*/
	this.addCssClass = function(classe){
		this.cssClass += classe + " ";
	};
	
	/**
	*	Récupère le css brut dans le conteneur
	*
	*	@return le css brut
	*/
	this.getRawCss = function(){
		if(this.content !== ""){
			return "";
		}
		return this.rawCss;
	};
	
	/**
	*	Ajoute une classe css au conteneur
	*
	*	@param la classe css
	*/
	this.getCssClass = function(){
		if(this.content !== ""){
			return "";
		}
		return this.cssClass;
	};
	
	/**
	*	Initialise l'élément graphique qui composera la page
	*	/!\ Le contenu HTML brut a priorité sur l'élément graphique /!\
	*
	*	@param Un élément graphique
	*/
	this.setGraphicalElement = function(element){
		if(element.render){
			this.graphicalElement = element;
		}
	};
	
	/** 
	*   Imposer des contraintes de largeur à l'HorizontalLayout
	*  
	*   @param width, la largeur qui sera donnée à l'HorizontalLayout (en pourcentage)
	*/
	this.setWidth = function(width){
		this.width = width;
	};
	
	/**
	*   Récupérer la largeur imposée
	*
	*   @return width, la dite largeur
	*/
	this.getWidth = function(){
		return this.width;
	};
	
	/** 
	*   Imposer des contraintes de hauteur à l'HorizontalLayout
	*  
	*   @param height, la hauteur qui sera donnée à l'HorizontalLayout (en pourcentage)
	*/
	this.setHeight = function(height){
		this.height = height;
	};
	
	/**
	*   Récupérer la hauteur imposée
	*
	*   @return height, la dite hauteur
	*/
	this.getHeight = function(){
		return this.height;
	};
	
	/**
	*   Crée une nouvelle sous couche de type VerticalLayout
	*
	*   @return une nouvelle sous couche Verticale
	*/
	this.newVerticalLayout = function(){
		if(this.content === "" && this.graphicalElement === null){
			if(this.internalLayout === null){
				this.internalLayout = new Array();
			}
			var vertLayout = new VerticalLayout();
			this.internalLayout[this.internalLayout.length] = vertLayout;
			return vertLayout;
		}
		console.log("Erreur, ajout d'une VerticalLayout dans une HorizontalLayout non vide");
		return null;
	};
	
	/**
	*   Crée une nouvelle sous couche de type HorizontalLayout
	*
	*   @return une nouvelle sous couche Horizontale
	*/
	this.newHorizontalLayout = function(){
		if(this.content === "" && this.graphicalElement === null){
			if(this.internalLayout === null){
				this.internalLayout = new Array();
			}
			var horLayout = new HorizontalLayout();
			this.internalLayout[this.internalLayout.length] = horLayout;
			return horLayout;
		}
		console.log("Erreur, ajout d'une HorizontalLayout dans une HorizontalLayout non vide");
		return null;
	};
	
	/**
	*   Ecrire du code HTML brut dans l'HorizontalLayout
	*
	*   @param content, le code HTML brut
	*/
	this.setContent = function(content){
		this.content = content;
	};
	
	/**
	*	Récupère le contenu d'un fichier pour le mettre dans la layout
	*
	*	@param chemin du fichier
	*/
	this.addHTMLFile = function(file){
		var xhr = new XMLHttpRequest();
		var instance = this;
		xhr.onreadystatechange = function() {
        	if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
        		instance.content += (xhr.responseText);
			}
    	};
    	xhr.open("GET", file, true);
		xhr.send(null);
		this.empty = false;
	};
	
	/**
	*	Calcul l'espace restant après positionnement des éléments contenus et contraints
	*
	*	@return l'espace restant
	*/
	this.stillSpace = function(){
	
		var width = 100;
		var imposedWidth = 0;
		
		for(var i = 0; i < this.internalLayout.length; i++){
			if(this.internalLayout[i].getWidth() > 0 && this.internalLayout[i].getWidth() <= 100){
				imposedWidth ++;
			}
			width -=  this.internalLayout[i].getWidth();
		}
		return {w: width, iw: imposedWidth};
	};
	
	/**
	*	Génère et insère le code HTML dans la page à l'intérieur de la div bloc_page
	*	et sélectionne l'onglet 1 du navigateur principal par défaut
	*/
	
	this.generateHTML = function(){
		document.getElementsByClassName('bloc_page')[0].innerHTML = this.renderLayout();
		if(GraphicalNavigator.setSelectedTab)GraphicalNavigator.setSelectedTab(0,1);
		
		loadPostRenderScripts();
	};
	
	/**
	*   Génère automatiquement le code HTML lié aux données contenues par la Layout
	*   il s'agit de la méthode commune aux deux gestionnaires de couches
	*   
	*   @return le code HTML généré
	*/
	this.renderLayout = function(){
	
		if(this.content && this.content !== ""){
		
			return "<div style='"+this.rawCss+"' class='Column "+this.cssClass+"'>" + this.content + "</div>";
			
		}
		else if(this.graphicalElement !== null){
			
			if(this.height > 0 && this.height <= 100){
				return this.graphicalElement.render(this.height);
			}
			return this.graphicalElement.render();
			
		}
		else if(this.internalLayout && this.internalLayout.length !== 0){
			var returnStuff = "";
			var instance = this;
			
			returnStuff+="<div class='Grid'>";
			for(var i = 0; i < instance.internalLayout.length; i++){
						
				var layout = instance.internalLayout[i];
				var space = this.stillSpace();
				
				if(layout.getHeight() > 0 && layout.getHeight() <= 100 || layout.getWidth() > 0 && layout.getWidth() <= 100){
					returnStuff += "<div class='Column "+layout.getCssClass()+"' style='";
					
					if(layout.getHeight() > 0 && layout.getHeight() <= 100){
						returnStuff += "height:" + layout.getHeight() + "%;";
					}else{
						returnStuff += "height:auto;";
					}
					if(layout.getWidth() > 0 && layout.getWidth() <= 100){
						returnStuff += "width:" + layout.getWidth() + "%;";
					}else{
						returnStuff += "width:"+space.w/(instance.internalLayout.length - space.iw)+"%;";
					}
					
					returnStuff += layout.getRawCss()+"'>" + layout.renderLayout() + "</div>"
				
				}else{
					returnStuff += "<div class='Column "+layout.getCssClass()+"' style='height:auto;width:"+space.w/(instance.internalLayout.length - space.iw)+"%;"+layout.getRawCss()+"'>" + layout.renderLayout() + "</div>";
				}
			}
			returnStuff+="</div>";
			return returnStuff;
		}
		return null;
	};
}