/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout principal de l'application
 * @version: 1.0
 */
// Layout principal
var Layout = (new LayoutManager()).verticalLayout();
Layout.addCssClass("bloc_page");
Layout.setHeight(100);
	DatasBuffer.update("/login/rank");
	var rank = parseInt(DatasBuffer.getRequest("/login/rank"));

	// Ecran de connexion
	var container_popup_connexion = Layout.newVerticalLayout();
	container_popup_connexion.addCssClass("container_popup_connexion");
	container_popup_connexion.setHeight(0.1);
	
	var graphical_connexion = new GraphicalConnexion();

	container_popup_connexion.setGraphicalElement(graphical_connexion);

	// Navigateur principal
	var nav_principal = Layout.newVerticalLayout();
	
	var nav_p = new GraphicalNavigator();
	nav_p.addCssClass("nav_p");
	nav_p.addCssClass("navigateur");

		// Logo de l'application
		var logo = nav_p.addTab('<img id="logo_app" src="img/logo.png" alt="logo"/>');
		logo.addTabRawCss("cursor:default");
		logo.addTabCssClass("logo_app");

		// Ajout des onglets
		if(rank<=1){var clients_p = nav_p.addTab(_("CLIENTS"));clients_p.addTabCssClass('nom-item');}
		if(rank<=1){var taches_p = nav_p.addTab(_("TACHES"));taches_p.addTabCssClass('nom-item');}
		if(rank<=2){var conversations_p = nav_p.addTab(_("CONVERSATIONS"));conversations_p.addTabCssClass('nom-item');}
		if(rank===0){var parametres_p = nav_p.addTab(_("PARAMETRES"));parametres_p.addTabCssClass('nom-item');}
		
		// Utilisateur
		DatasBuffer.update("/login/who");
		var utilisateur = DatasBuffer.getRequest("/login/who");
		var user = nav_p.addTab('<p>'+utilisateur.login+'</p><a href="#"><img src="img/logout.png" onclick="GraphicalConnexion.logout();" alt="logout"/></a>');
		user.addTabRawCss("cursor:default");
		user.addTabCssClass("avatar_user");
		
	
	// Ajout du navigateur principal au Layout
	nav_principal.setGraphicalElement(nav_p);

	// Onglet Clients
	if(rank<=1)include("SinglePageApp/onglet_clients");
	// Onglet Taches
	if(rank<=1)include("SinglePageApp/onglet_taches");
	// Onglet Conversations
	if(rank<=2)include("SinglePageApp/onglet_conversations");
	// Onglet Parametres
	if(rank===0)include("SinglePageApp/onglet_parametres");
	
//clients_p.newNotification();
//conversations_p.newNotification();
// Mise en place du Layout
Layout.generateHTML();
GraphicalList.select(1,0);
var p = GraphicalNavigator.getNavigatorAndItemID("nav_clients",_("PERSONNE"));
GraphicalNavigator.hide(p.NavId,p.ItemID);