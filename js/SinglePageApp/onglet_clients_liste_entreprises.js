/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet Liste des entreprises de l'onglet clients
 * @version: 1.0
 */


var onglet_liste_entreprises = o_liste_entreprises.newVerticalLayout();
o_liste_entreprises.addCssClass("content_clients_listeEntreprises");

	// Bloc recherche
	var content_recherche = onglet_liste_entreprises.newVerticalLayout();
	content_recherche.addCssClass("bloc_recherche");
	content_recherche.setHeight(1);
	content_recherche.setContent('<input id="input_search_entreprise" type="search" placeholder="Rechercher" name="the_search" onkeyup="findEntreprises()">');
	
	// Bloc liste des entreprises
	var content_liste_entreprises = onglet_liste_entreprises.newVerticalLayout();
	var liste_entreprises = new GraphicalList();
	liste_entreprises.addCssClass("liste_entreprises");
	liste_entreprises.addCssClass("liste");
	
	var ets = DatasBuffer.getRequest("/entreprises");
	
	for(var i=0;i<ets.length;i++)
	{	
		var cts = DatasBuffer.getRequest("/entreprises/"+ets[i]._id+"/contacts");
		// Creation des items de la liste
		liste_entreprises.addItem('<p class="nom_entreprise">'+ets[i].nom+'</p><p class="nb_entreprise">'+cts.length+' '+(function(){return(cts.length>1?"contacts":"contact");})()+'</p>',ets[i]._id);
	}
	
	content_liste_entreprises.setGraphicalElement(liste_entreprises);
	
	
	// Bloc Options liste entreprises
	var options_liste_entreprises = onglet_liste_entreprises.newVerticalLayout();
	options_liste_entreprises.addCssClass("content_options_liste_c");
	options_liste_entreprises.setHeight(1);
	options_liste_entreprises.setContent('<ul>'+
									'<li id="ajouter_entreprise" class="bouton_option showPopup" popup="popupAjoutEntreprise"><a href="#">Nouvelle Entreprise</a></li>'+
									'</ul>');
	
	// Popup lie au bouton d'ajout d'une nouvelle entreprise
	var container_popup_nouveau_entreprise = onglet_liste_entreprises.newVerticalLayout();
	container_popup_nouveau_entreprise.setHeight(0.1);
	var popup_nouveau_entreprise = new GraphicalPopup();
	popup_nouveau_entreprise.setName('popupAjoutEntreprise');
	popup_nouveau_entreprise.setHeight('80%');
		
		var content_nouveau_entreprise = popup_nouveau_entreprise.newVerticalLayout();
		content_nouveau_entreprise.addCssClass("popup_nouveau_entreprise");
	
			// Titre du popup d'ajout d'un entreprise
			var titre_popup_nouveau_entreprise = content_nouveau_entreprise.newVerticalLayout();
			titre_popup_nouveau_entreprise.addCssClass("titre_popup_nouveau_entreprise");
			titre_popup_nouveau_entreprise.setHeight(1);
			titre_popup_nouveau_entreprise.setContent('<h2 class="titre_liste">Nouvelle entreprise</h2>');
			
			// Formulaire entreprise
			var formulaire_nouvelle_entreprise = content_nouveau_entreprise.newVerticalLayout();
			formulaire_nouvelle_entreprise.addCssClass("formulaire_nouvelle_entreprise");
			
			var gc = new GraphicalContainer();
			gc.addCssClass("Vertigo");
			gc.addRawCss("overflow:auto;");
			
			var newEntrepriseForm = new GraphicalForm("/entreprises/new");
			
			newEntrepriseForm.addInput("Nom","text","nom");
			newEntrepriseForm.addInput("Siren","text","siren");
			newEntrepriseForm.addInput("Code Postal","text","cp");
			newEntrepriseForm.addInput("Ville","text","ville");
			newEntrepriseForm.addInput("Numero de voie","text","numVoie");
			newEntrepriseForm.addInput("Type de voie","text","voie");
			newEntrepriseForm.addInput("Nom de la voie","text","nomVoie");
			newEntrepriseForm.addInput("Pays","text","pays");
			newEntrepriseForm.addInput("Email","text","mail");
			newEntrepriseForm.addInput("Telephone","text","tel");
			newEntrepriseForm.addInput("Fax","text","fax");
			newEntrepriseForm.addInput("Site web","text","site");
			newEntrepriseForm.addInput("Commentaire","textarea","commentaire");
			newEntrepriseForm.addInput("Ajouter","submit","ajouter");
			
			newEntrepriseForm.setPopupToHide(popup_nouveau_entreprise);
			
			newEntrepriseForm.setPostSendScript(function(){
					socket.emit("update",{url: "/entreprises",func:getHandler(function(url){
						liste_entreprises.clear();
						var ets = DatasBuffer.getRequest(url);
						for(var i=0;i<ets.length;i++){
						var cts = DatasBuffer.getRequest("/entreprises/"+ets[i]._id+"/contacts");
							liste_entreprises.addItem('<p class="nom_entreprise">'+ets[i].nom+'</p><p class="nb_entreprise">'+cts.length+' '+(function(){return(cts.length>1?"contacts":"contact");})()+'</p>',ets[i]._id);
						}
						liste_entreprises.setSelectedIndex(-1);
						liste_entreprises.update();
					})});
			});
			
			gc.setGraphicalElement(newEntrepriseForm);
			formulaire_nouvelle_entreprise.setGraphicalElement(gc);
			
	container_popup_nouveau_entreprise.setGraphicalElement(popup_nouveau_entreprise);