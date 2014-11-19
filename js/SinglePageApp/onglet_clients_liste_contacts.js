/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet Liste des contacts de l'onglet clients
 * @version: 1.0
 */


var onglet_liste_contacts = o_liste_contacts.newVerticalLayout();
o_liste_contacts.addCssClass("content_clients_listeContacts");

	// Bloc recherche
	var content_recherche = onglet_liste_contacts.newVerticalLayout();
	content_recherche.addCssClass("bloc_recherche");
	content_recherche.setHeight(1);
	content_recherche.setContent('<input id="input_search_contact" type="search" placeholder="Rechercher" name="the_search" onkeyup="findContacts()">');
	
	// Bloc liste des contacts
	var content_liste_contacts = onglet_liste_contacts.newVerticalLayout();
	var liste_contacts = new GraphicalList();
	liste_contacts.addCssClass("liste_contacts");
	liste_contacts.addCssClass("liste");
	
	var prs = DatasBuffer.getRequest("/personnes");
	
	for(var i=0;i<prs.length;i++)
	{	
		liste_contacts.addItem('<p class="nom_contact">'+prs[i].nom+'</p>',prs[i]._id);
	}
	
	content_liste_contacts.setGraphicalElement(liste_contacts);
	
	
	// Bloc Options liste contacts
	var options_liste_contacts = onglet_liste_contacts.newVerticalLayout();
	options_liste_contacts.addCssClass("content_options_liste_c");
	options_liste_contacts.setHeight(1);
	options_liste_contacts.setContent('<ul>'+
									'<li id="ajouter_contact" class="bouton_option showPopup" popup="popupAjoutContact"><a href="#">Nouveau Contact</a></li>'+
									'</ul>');
	
	// Popup lie au bouton d'ajout d'une nouvelle entreprise
	var container_popup_nouveau_contact = onglet_liste_contacts.newVerticalLayout();
	container_popup_nouveau_contact.setHeight(0.1);
	var popup_nouveau_contact = new GraphicalPopup();
	popup_nouveau_contact.setName('popupAjoutContact');
	popup_nouveau_contact.setHeight('50%');
		
		var content_nouveau_contact = popup_nouveau_contact.newVerticalLayout();
	
			// Titre du popup d'ajout d'un contact
			var titre_popup_nouveau_contact = content_nouveau_contact.newVerticalLayout();
			titre_popup_nouveau_contact.addCssClass("titre_popup_nouveau_contact");
			titre_popup_nouveau_contact.setHeight(1);
			titre_popup_nouveau_contact.setContent('<h2 class="titre_liste">Nouveau Contact</h2>');
			
			// Formulaire contact
			var formulaire_nouveau_contact = content_nouveau_contact.newVerticalLayout();
			formulaire_nouveau_contact.addCssClass("formulaire_nouvelle_entreprise");
			
			var gc = new GraphicalContainer();
			gc.addCssClass("Vertigo");
			gc.addRawCss("overflow:auto;");
			
			var newContactForm = new GraphicalForm("/personnes/new");
			
			newContactForm.addInput("Nom","text","nom");
			newContactForm.addInput("Prenom","text","prenom");
			newContactForm.addInput("Statut","text","statut");
			newContactForm.addInput("Tel.","text","tel");
			newContactForm.addInput("Fax","text","fax");
			newContactForm.addInput("Email","text","mail"); 
			newContactForm.addInput("Commentaire","textarea","commentaire");
			newContactForm.addInput("Ajouter","submit","ajouter");
			
			newContactForm.setPopupToHide(popup_nouveau_contact);
			
			newContactForm.setPostSendScript(function(){
					socket.emit("update",{url: "/personnes",func:"function(url){"
						+"liste_contacts.clear();"
						+"var prs = DatasBuffer.getRequest(url);"
						+"for(var i=0;i<prs.length;i++){"	
						+'liste_contacts.addItem(\'<p class="nom_contact">\'+prs[i].nom+\'</p>\',prs[i]._id);}'
						+"liste_contacts.update();"
					+"}"});
			});
			
			gc.setGraphicalElement(newContactForm);
			formulaire_nouveau_contact.setGraphicalElement(gc);
			
	container_popup_nouveau_contact.setGraphicalElement(popup_nouveau_contact);