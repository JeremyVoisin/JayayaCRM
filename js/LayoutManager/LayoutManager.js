/*************************************************************************************
 * @author Team Jayaya
 *	
 * La classe LayoutManager gère le placement des éléments dans la page, il peut
 * s'effectuer selon le principe de positionnement horizontal, soit tout les éléments
 * sont côte à côte, soit selon le principe de positionnement vertical, qui implique
 * un "empilement" des éléments contenus par la page.
 *************************************************************************************/

include('LayoutManager/VerticalLayout');
include('LayoutManager/HorizontalLayout');
include("LayoutManager/FFIEFix");
include('Graphics/GraphicalList');
include("Graphics/GraphicalNavigator");
include("Graphics/GraphicalContainer");
include("Graphics/GraphicalEditInput");
include("Graphics/GraphicalPopup");
include("Graphics/GraphicalConnexion");
include("Graphics/GraphicalForm");
include("Couplers/Coupler");
	
function LayoutManager(){	
		
	//Variable d'instance
	this.internalLayout = null;
	
	/**
	*	Initialise le positionnement de type vertical pour la page
	*
	*	@return la VerticalLayout correspondante
	*/
	this.verticalLayout = function(){
		var vertLayout = new VerticalLayout();
		this.internalLayout = vertLayout;
		return vertLayout;
	};
	
	/**
	*	Initialise le positionnement de type horizontal pour la page
	*
	*	@return l'HorizontalLayout correspondante
	*/	
	this.horizontalLayout = function(){
		var horLayout = new HorizontalLayout();
		this.internalLayout = horLayout;
		return horLayout;
	};
	
	/**
	*	Méthode qui appellera la méthode renderLayout de la VerticalLayout ou de 
	*	l'HorizontalLayout déclarée ici en tant que couche interne.
	*
	*	@return le code HTML pour la page
	*/
	this.renderLayout = function(){
		if(this.internalLayout !== null){
			return this.internalLayout.renderLayout();
		}
		return null;
	};
}