// Layout principal
var ConnexionLayout = (new LayoutManager()).verticalLayout();
ConnexionLayout.addCssClass("bloc_page");
ConnexionLayout.setHeight(100);


	// Ecran de connexion
	var container_popup_connexion = ConnexionLayout.newVerticalLayout();
	container_popup_connexion.addCssClass("container_popup_connexion");
	container_popup_connexion.setHeight(0.1);
	
	var graphical_connexion = new GraphicalConnexion();

	container_popup_connexion.setGraphicalElement(graphical_connexion);
	
ConnexionLayout.generateHTML();
GraphicalConnexion.checkConnect();
