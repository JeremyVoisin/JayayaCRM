/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet personnees de l'onglet principal Clients
 * @version: 1.0
 */

   
var clients_onglet_personne = o_personnes.newVerticalLayout();
o_personnes.addCssClass("content_clients_personnees");	
	
	
	// Definition du corps
	// ==========================================================================
	
	var corps_onglet_personnes = clients_onglet_personne.newVerticalLayout();
	
	// Liste des personnees entreprise
	var content_liste_pers_contacts = corps_onglet_personnes.newVerticalLayout();
	content_liste_pers_contacts.addCssClass('content_liste_pers_contacts');
	
	var content_liste_pers_contacts_2 = content_liste_pers_contacts.newVerticalLayout();
	var liste_pers_contacts = new GraphicalList();
	liste_pers_contacts.addCssClass("liste_pers_contacts");
	liste_pers_contacts.addCssClass("liste");
	
	Coupler.link(liste_contacts,liste_pers_contacts);
	
	liste_pers_contacts.getCoupler().setExternalSource("/personnes");
		
	liste_pers_contacts.getCoupler().updateHandler(function(datas){
		datas = datas[0];
		
		if(datas.nom !== ''){
			this.addItem('<span class="gras_champs_contact">Nom</span><span style="margin: 0px 5px 0px 5px">:</span><span class="current_value">'+datas.nom+'</span>',"Nom");
		}
		
		if(datas.prenom !== ''){
			this.addItem('<span class="gras_champs_contact">Prenom</span><span style="margin: 0px 5px 0px 5px">:</span><span class="current_value">'+datas.prenom+'</span>',"Prenom");
		}
		
		if(datas.statut !== ''){
			var itemStatut = new GraphicalEditInput();
			itemStatut.setNameField('<span class="gras_champs_contact">Statut</span>');
			itemStatut.setValueField(datas.statut);
			itemStatut.setFunctionOnClick("edit_statut_personne(this)");
			this.addItem(itemStatut,"Statut");
		}	
		
		if(datas.tel !== ''){
			var itemTel = new GraphicalEditInput();
			itemTel.setNameField('<span class="gras_champs_contact">Tel</span>');
			itemTel.setValueField(datas.tel);
			itemTel.setFunctionOnClick("edit_tel_personne(this)");
			this.addItem(itemTel,"Tel");
		}
		
		if(datas.fax !== ''){
			var itemFax = new GraphicalEditInput();
			itemFax.setNameField('<span class="gras_champs_contact">Fax</span>');
			itemFax.setValueField(datas.fax);
			itemFax.setFunctionOnClick("edit_fax_personne(this)");
			this.addItem(itemFax,"Fax");
		}
		
		if(datas.mail !== ''){
			var itemMail = new GraphicalEditInput();
			itemMail.setNameField('<span class="gras_champs_contact">Mail</span>');
			itemMail.setValueField(datas.mail);
			itemMail.setFunctionOnClick("edit_mail_personne(this)");
			this.addItem(itemMail,"Mail");
		}
		
		if(datas.commentaire !== ''){
			var itemNotes = new GraphicalEditInput();
			itemNotes.setTypeField('textarea');
			itemNotes.setNameField('<span class="gras_champs_contact">Commentaire</span>');
			itemNotes.setValueField(datas.commentaire);
			itemNotes.setFunctionOnClick("edit_commentaire_personne(this)");
			this.addItem(itemNotes,"Commentaire");
		}
	
	});
	
	content_liste_pers_contacts_2.setGraphicalElement(liste_pers_contacts);
	
	
	// Definition des boutons options
	// ==========================================================================

	var options_clients_personne = corps_onglet_personnes.newVerticalLayout();
	options_clients_personne.addCssClass("content_options_clients_personne");
	options_clients_personne.setHeight(1);
	options_clients_personne.setContent('<ul>'+
									'<li id="sup_personne" class="bouton_option showPopup" popup="popupSupPersonne"><a href="javascript:void(0);">Supprimer la personne</a></li>'+
									'</ul>');
									
	
	// Definition du popup supprimer une personne
	// ==========================================================================
	
	var container_popup_sup_personne = corps_onglet_personnes.newVerticalLayout();
	container_popup_sup_personne.setHeight(0.1);
	var popup_sup_personne = new GraphicalPopup();
	popup_sup_personne.setName('popupSupPersonne');
	popup_sup_personne.setHeight('100px');
	
		var content_sup_personne = popup_sup_personne.newVerticalLayout();
		var gc = new GraphicalContainer();
		gc.addCssClass("Vertigo");
		gc.addRawCss("overflow:auto;");
		
			// Titre du popup
			var titre_popup_sup_personne = content_sup_personne.newVerticalLayout();
			titre_popup_sup_personne.addCssClass("titre_popup_sup_personne");
			titre_popup_sup_personne.setHeight(1);
			titre_popup_sup_personne.setContent('<h2 class="titre_liste">Supprimer la personne</h2>');
			
			// Message de confirmation
			var msg_conf_sup_personne = content_sup_personne.newVerticalLayout();
			msg_conf_sup_personne.addCssClass("msg_conf_sup_personne");
			msg_conf_sup_personne.setContent('<p>Êtes-vous sûr de vouloir supprimer la personne ?</p>');
			
			// Boutons de validation & annulation
			var btns_popup_sup_personne = content_sup_personne.newVerticalLayout();
			btns_popup_sup_personne.addCssClass("btns_popup_sup_personne");
			btns_popup_sup_personne.setHeight(1);
			btns_popup_sup_personne.setContent(
			'<p>'+
			'<input type="button" value="Oui" onclick="delete_personne()" />'+
			'<input type="button" value="Non" onclick="GraphicalPopup.hidePopup('+popup_sup_personne.getPopupIndex()+');" />'+
			'</p>'
			);
			
			gc.setGraphicalElement(popup_sup_personne);
	container_popup_sup_personne.setGraphicalElement(popup_sup_personne);
