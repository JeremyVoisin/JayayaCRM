/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet principal Clients
 * @version: 1.0
 */

   
var corps = clients_p.newHorizontalLayout();
clients_p.addCssClass("corps_clients");
	
	
	// Definition de la partie Gauche
	// ==========================================================================
	   
	var partieG = corps.newVerticalLayout();
	partieG.addCssClass("partieG_onglet_client");
	partieG.setWidth(30);
	
	
		// Navigateur liste contacts
		var content_nav_all_contacts = partieG.newVerticalLayout();
		var nav_all_contacts = new GraphicalNavigator();
		nav_all_contacts.addCssClass("nav_all_contacts");
		nav_all_contacts.addCssClass("navigateur");
		
			// Ajout des onglets
			var o_liste_entreprises = nav_all_contacts.addTab('ENTREPRISES');
			o_liste_entreprises.addTabCssClass("nom-item");
			var o_liste_contacts = nav_all_contacts.addTab('CONTACTS');
			o_liste_contacts.addTabCssClass("nom-item");
		
	
		// Ajout du navigateur listes des contacts au content nav_all_contacts
		content_nav_all_contacts.setGraphicalElement(nav_all_contacts);
		
		Coupler.link(nav_p,nav_all_contacts);
		nav_all_contacts.getCoupler().setAsEndPoint();
		nav_all_contacts.getCoupler().setExternalSource(null);
		nav_all_contacts.getCoupler().updateHandler(function(informations){
			if(informations==="CLIENTS"){
				this.coupler.send("ENTREPRISES");
			}
		});
		
		// Onglets
		include("SinglePageApp/onglet_clients_liste_contacts");
		include("SinglePageApp/onglet_clients_liste_entreprises");
		
		

	// Definition de la partie Droite
	// ==========================================================================
	
	var partieD = corps.newVerticalLayout();
	partieD.addCssClass("partieD_onglet_client");
	partieD.setWidth(70);

	
		// Bloc titre
		var nom_contact = partieD.newVerticalLayout();
		nom_contact.addCssClass("nom_contact");
		nom_contact.setHeight(1);
		
		nom_contactContainer = new GraphicalContainer();
		
		nom_contact.setGraphicalElement(nom_contactContainer);
		
		Coupler.link(liste_entreprises,nom_contactContainer);
				
		nom_contactContainer.getCoupler().setExternalSource("/entreprises");
		
		nom_contactContainer.getCoupler().updateHandler(function(datas){
			this.setHTMLContent("<p>"+datas[0].nom+"</p>");
		});
		
		// Navigateur Clients
		var content_nav_clients = partieD.newVerticalLayout();
		var nav_clients = new GraphicalNavigator();
		nav_clients.addCssClass("nav_clients");
		nav_clients.addCssClass("navigateur");
		
			// Ajout des onglets
			var o_general = nav_clients.addTab("GENERAL");
			o_general.addTabCssClass("nom-item");
			var o_contacts = nav_clients.addTab("CONTACTS");
			o_contacts.addTabCssClass("nom-item");
			var o_coordonnees = nav_clients.addTab("COORDONNEES");
			o_coordonnees.addTabCssClass("nom-item");
			var o_personnes = nav_clients.addTab("PERSONNE");
			o_personnes.addTabCssClass("nom-item");
		
		// Ajout du navigateur Clients au content nav clients
		content_nav_clients.setGraphicalElement(nav_clients);
		
		Coupler.link(nav_all_contacts,nav_clients);
		
		nav_clients.setNavigatorTitle("nav_clients");
		nav_clients.getCoupler().setExternalSource(null);
		nav_clients.getCoupler().setAsEndPoint();
		nav_clients.getCoupler().updateHandler(function(informations){
		
			var general = GraphicalNavigator.getNavigatorAndItemID("nav_clients","GENERAL");
			var contacts = GraphicalNavigator.getNavigatorAndItemID("nav_clients","CONTACTS");
			var coordonnees = GraphicalNavigator.getNavigatorAndItemID("nav_clients","COORDONNEES");
			var personne = GraphicalNavigator.getNavigatorAndItemID("nav_clients","PERSONNE");
			
			if(informations === "CONTACTS"){
				GraphicalNavigator.hide(general.NavId,general.ItemID);
				GraphicalNavigator.hide(contacts.NavId,contacts.ItemID);
				GraphicalNavigator.hide(coordonnees.NavId,coordonnees.ItemID);
				GraphicalNavigator.show(personne.NavId,personne.ItemID);
				GraphicalNavigator.setSelectedTab(personne.NavId,personne.ItemID);
			}
			else if(informations === "ENTREPRISES"){
				GraphicalNavigator.show(general.NavId,general.ItemID);
				GraphicalNavigator.show(contacts.NavId,contacts.ItemID);
				GraphicalNavigator.show(coordonnees.NavId,coordonnees.ItemID);
				GraphicalNavigator.hide(personne.NavId,personne.ItemID);
				GraphicalNavigator.setSelectedTab(general.NavId,general.ItemID);
			}
		});
		
		
		// Onglets
		include("SinglePageApp/onglet_clients_general");
		include("SinglePageApp/onglet_clients_contacts");
		include("SinglePageApp/onglet_clients_coordonnees"); 
		include("SinglePageApp/onglet_clients_personne");