/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet Contacts de l'onglet principal Clients
 * @version: 1.0
 */


var clients_onglet_contacts = o_contacts.newVerticalLayout();
o_contacts.addCssClass("content_clients_contacts");

	// Corps de l'onglet contacts
	var corps_onglet_contacts = clients_onglet_contacts.newHorizontalLayout();
	
	
		// Definition de la liste des contacts
		// ==========================================================================

		var content_liste_entreprises = corps_onglet_contacts.newVerticalLayout();
		content_liste_entreprises.addCssClass("content_liste_contacts");
		content_liste_entreprises.setWidth(40);
		
			// Titre content liste des contacts
			var titre_liste_entreprises = content_liste_entreprises.newVerticalLayout();
			titre_liste_entreprises.addCssClass("titre_liste_contacts");
			titre_liste_entreprises.setHeight(1);
			titre_liste_entreprises.setContent('<h2 class="titre_liste">'+_("Liste des contacts")+'</h2>');
		
			// Liste des contacts
			var content_liste_entreprises_2 = content_liste_entreprises.newVerticalLayout();
			var liste_cts = new GraphicalList();
			liste_cts.addCssClass("liste_contacts");
			liste_cts.addCssClass("liste");
			
			
			Coupler.link(liste_entreprises,liste_cts);
		
			liste_cts.getCoupler().setExternalSource("/entreprises","/contacts");
			liste_cts.getCoupler().setAsEndPoint();
		
			liste_cts.getCoupler().updateHandler(function(datas){
				for(var i=0; i < datas.length; i++)
					this.addItem('<p class="nom_contact">'+datas[i].prenom+" "+datas[i].nom+'</p><p class="statut_contact">'+datas[i].statut+'</p>',datas[i]._id);
				GraphicalList.select(this.index,0);
			});
			
			content_liste_entreprises_2.setGraphicalElement(liste_cts);
		
		
		// Definition des informations contact
		// ==========================================================================

		var content_infos_contact = corps_onglet_contacts.newVerticalLayout();
		content_infos_contact.addCssClass("content_infos_contact");
		content_infos_contact.setWidth(60);
		
			// Titre content liste informations contact
			var titre_liste_infos_contact = content_infos_contact.newVerticalLayout();
			titre_liste_infos_contact.addCssClass("titre_liste_infos_contact");
			titre_liste_infos_contact.setHeight(1);
			titre_liste_infos_contact.setContent('<h2 class="titre_liste">'+_("Informations")+'</h2>');
		
			// Liste des informations
			var content_liste_infos_contact = content_infos_contact.newVerticalLayout();
			var liste_infos_contacts = new GraphicalList();
			liste_infos_contacts.addCssClass("liste_infos_contacts");
			liste_infos_contacts.addCssClass("liste");
			
			
			Coupler.link(liste_cts,liste_infos_contacts);
		
			liste_infos_contacts.getCoupler().setExternalSource("/personnes");
		
			liste_infos_contacts.getCoupler().updateHandler(function(datas){
				// Creation des items de la liste
			
				liste_infos_contacts.addItem('<p id="nom_contact">'+datas[0].prenom+' '+datas[0].nom+'</p>',datas[0]._id);
				
				if(datas[0].statut !== ''){
					var itemStatut = new GraphicalEditInput();
					itemStatut.setNameField('<span class="gras_champs_contact">'+_("Statut")+'</span>');
					itemStatut.setValueField(datas[0].statut);
					itemStatut.setFunctionOnClick("edit_statut_contact_entreprise(this)");
					this.addItem(itemStatut,"Statut");
				}
				
				if(datas[0].tel !== ''){
					var itemTel = new GraphicalEditInput();
					itemTel.setNameField('<span class="gras_champs_contact">'+_("Tel")+'</span>');
					itemTel.setValueField(datas[0].tel);
					itemTel.setFunctionOnClick("edit_tel_contact_entreprise(this)");
					this.addItem(itemTel,"Tel");
				}
				
				if(datas[0].fax !== ''){
					var itemFax = new GraphicalEditInput();
					itemFax.setNameField('<span class="gras_champs_contact">'+_("Fax")+'</span>');
					itemFax.setValueField(datas[0].fax);
					itemFax.setFunctionOnClick("edit_fax_contact_entreprise(this)");
					this.addItem(itemFax,"Fax");
				}
				
				if(datas[0].mail !== ''){
					var itemMail = new GraphicalEditInput();
					itemMail.setNameField('<span class="gras_champs_contact">'+_("Email")+'</span>');
					itemMail.setValueField(datas[0].mail);
					itemMail.setFunctionOnClick("edit_mail_contact_entreprise(this)");
					this.addItem(itemMail,"Mail");
				}
			
				if(datas[0].note !== ''){
					var itemCom = new GraphicalEditInput();
					itemCom.setTypeField('textarea');
					itemCom.setNameField('<span class="gras_champs_contact">'+_("Commentaire")+'</span>');
					itemCom.setValueField(datas[0].commentaire);
					itemCom.setFunctionOnClick("edit_commentaire_contact_entreprise(this)");
					this.addItem(itemCom,"Com");
				}
				
			});
			
			content_liste_infos_contact.setGraphicalElement(liste_infos_contacts);
		
		
	// Definition des boutons options
	// ==========================================================================

	var options_contacts = clients_onglet_contacts.newVerticalLayout();
	options_contacts.addCssClass("content_options_contacts");
	options_contacts.setHeight(1);
	options_contacts.setContent(
	'<ul>'+
	'<li id="nouveau_contact" class="bouton_option showPopup" popup="popupAjoutContactEntreprise"><a href="#">'+_("Nouveau contact")+'</a></li>'+
	'<li id="supprimer_contact" class="bouton_option showPopup" popup="popupSupContactEntreprise"><a href="#">'+_("Supprimer contact")+'</a></li>'+
	'</ul>'
	);	
									
									
		// Definition du popup nouveau contact d'une entreprise
		// ==========================================================================
		
		var container_popup_nouveau_contact_entreprise = clients_onglet_contacts.newVerticalLayout();
		container_popup_nouveau_contact_entreprise.setHeight(0.1);
		var popup_nouveau_contact_entreprise = new GraphicalPopup();
		popup_nouveau_contact_entreprise.setName('popupAjoutContactEntreprise');
		popup_nouveau_contact_entreprise.setHeight('60%');
		
			var content_ajout_contact_entreprise = popup_nouveau_contact_entreprise.newVerticalLayout();
			
				// Titre du popup
				var titre_popup_ajout_contact_entreprise = content_ajout_contact_entreprise.newVerticalLayout();
				titre_popup_ajout_contact_entreprise.addCssClass("titre_popup_ajout_contact_entreprise");
				titre_popup_ajout_contact_entreprise.setHeight(1);
				titre_popup_ajout_contact_entreprise.setContent('<h2 class="titre_liste">'+_("Nouveau contact")+'</h2>');
				
				// Formulaire contact
				var formulaire_nouveau_contact = content_ajout_contact_entreprise.newVerticalLayout();
				formulaire_nouveau_contact.addCssClass("formulaire_nouveau_contact");
				
				var gc = new GraphicalContainer();
				gc.addCssClass("Vertigo");
				gc.addRawCss("overflow:auto;");
				
				var newContactForm = new GraphicalForm("/personnes/new");
				
				newContactForm.addInput(_("Nom"),"text","nom");
				newContactForm.addInput(_("Prenom"),"text","prenom");
				newContactForm.addInput(_("Statut"),"text","statut");
				newContactForm.addInput(_("Tel."),"text","tel");
				newContactForm.addInput(_("Fax"),"text","fax");
				newContactForm.addInput(_("Email"),"text","mail"); 
				newContactForm.addInput(_("Commentaire"),"textarea","commentaire");
				newContactForm.addInput("idS","externalInformation","idS");
				var buttons = newContactForm.addInput(_("Ajouter"),"buttonBelt","ajouter");
					buttons.addButton(_("Confirmer"),function(id){GraphicalForm.sendDatas(id);});
					buttons.addButton(_("Annuler"),function(id){GraphicalForm.resetDatas(id);});
					
				newContactForm.setPopupToHide(popup_nouveau_contact_entreprise);
			
				newContactForm.setPostSendScript(function(){
					socket.emit("update",{url: "/entreprises/"+newContactForm.getCoupler().getLastInformation()+"/contacts",func: getHandler(function(url){
						liste_cts.clear();
						var datas = DatasBuffer.getRequest(url);
						for(var i=0; i < datas.length; i++)
							liste_cts.addItem('<p class="nom_contact">'+datas[i].prenom+" "+datas[i].nom+'</p><p class="statut_contact">'+datas[i].statut+'</p>',datas[i]._id);
						liste_cts.update();
					})});
				});
				
				Coupler.link(liste_entreprises,newContactForm);
				
				newContactForm.getCoupler().updateHandler(function(){});
				
				newContactForm.getCoupler().setExternalSource(null);
				
				gc.setGraphicalElement(newContactForm);
				formulaire_nouveau_contact.setGraphicalElement(gc);
				
				
				
		container_popup_nouveau_contact_entreprise.setGraphicalElement(popup_nouveau_contact_entreprise);
		
		// Definition du popup supprimer contact d'une entreprise
		// ==========================================================================
		
		var container_popup_sup_contact_entreprise = clients_onglet_contacts.newVerticalLayout();
		container_popup_sup_contact_entreprise.setHeight(0.1);
		var popup_sup_contact_entreprise = new GraphicalPopup();
		popup_sup_contact_entreprise.setName('popupSupContactEntreprise');
		popup_sup_contact_entreprise.setHeight('100px');
		
			var content_sup_contact_entreprise = popup_sup_contact_entreprise.newVerticalLayout();
			var gc = new GraphicalContainer();
			gc.addCssClass("Vertigo");
			gc.addRawCss("overflow:auto;");
			
				// Titre du popup
				var titre_popup_sup_contact_entreprise = content_sup_contact_entreprise.newVerticalLayout();
				titre_popup_sup_contact_entreprise.addCssClass("titre_popup_sup_contact_entreprise");
				titre_popup_sup_contact_entreprise.setHeight(1);
				titre_popup_sup_contact_entreprise.setContent('<h2 class="titre_liste">'+_("Supprimer contact")+'</h2>');
				
				// Message de confirmation
				var msg_conf_sup_contact = content_sup_contact_entreprise.newVerticalLayout();
				msg_conf_sup_contact.addCssClass("msg_conf_sup_contact");
				msg_conf_sup_contact.setContent('<p>'+_("Êtes-vous sûr de vouloir supprimer le contact ?")+'</p>');
				
				// Boutons de validation & annulation
				var btns_popup_sup_contact_entreprise = content_sup_contact_entreprise.newVerticalLayout();
				btns_popup_sup_contact_entreprise.addCssClass("btns_popup_sup_contact_entreprise");
				btns_popup_sup_contact_entreprise.setHeight(1);
				btns_popup_sup_contact_entreprise.setContent(
				'<p>'+
				'<input type="button" value="Oui" onclick="delete_contact_entreprise()" />'+
				'<input type="button" value="Non" onclick="GraphicalPopup.hidePopup('+popup_sup_contact_entreprise.getPopupIndex()+');" />'+
				'</p>'
				);
				
				gc.setGraphicalElement(popup_sup_contact_entreprise);
		container_popup_sup_contact_entreprise.setGraphicalElement(popup_sup_contact_entreprise);