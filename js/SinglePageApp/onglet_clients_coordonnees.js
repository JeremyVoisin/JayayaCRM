/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet Coordonnees de l'onglet principal Clients
 * @version: 1.0
 */

   
var clients_onglet_coordonnees = o_coordonnees.newVerticalLayout();
o_coordonnees.addCssClass("content_clients_coordonnees");	
	
	
	// Definition du corps
	// ==========================================================================
	
	var corps_onglet_coordonnees = clients_onglet_coordonnees.newVerticalLayout();
	
	// Liste des coordonnees entreprise
	var content_liste_coord_entrep = corps_onglet_coordonnees.newVerticalLayout();
	content_liste_coord_entrep.addCssClass('content_liste_coord_entrep');
	
	var content_liste_coord_entrep_2 = content_liste_coord_entrep.newVerticalLayout();
	var liste_coord_entrep = new GraphicalList();
	liste_coord_entrep.addCssClass("liste_coord_entrep");
	liste_coord_entrep.addCssClass("liste");
	
	Coupler.link(liste_entreprises,liste_coord_entrep);
	
	liste_coord_entrep.getCoupler().setExternalSource("/entreprises");
		
	liste_coord_entrep.getCoupler().updateHandler(function(datas){
		var adr = DatasBuffer.getRequest("/entreprises/"+datas[0]._id+"/adresse");
		
		if(datas[0].nSIREN !== null){
			var itemSiren = new GraphicalEditInput();
			itemSiren.setNameField('<span class="gras_champs_contact">'+_("Siren")+'</span>');
			itemSiren.setValueField(datas[0].nSIREN);
			itemSiren.setFunctionOnClick("edit_siren_entreprise(this)");
			this.addItem(itemSiren,"siren");
		}
		
		if(adr.ville && adr.ville.code_postal !== null){
			var itemCP = new GraphicalEditInput();
			itemCP.setNameField('<span class="gras_champs_contact">'+_("Code Postal")+'</span>');
			itemCP.setValueField(adr.ville.code_postal);
			itemCP.setFunctionOnClick("edit_cp_entreprise(this)");
			this.addItem(itemCP,"CP");
		}
		
		if(adr.ville && adr.ville.nomVille !== null && adr.ville.nomVille != ''){
			var itemVille = new GraphicalEditInput();
			itemVille.setNameField('<span class="gras_champs_contact">'+_("Ville")+'</span>');
			itemVille.setValueField(adr.ville.nomVille);
			itemVille.setFunctionOnClick("edit_ville_entreprise(this)");
			this.addItem(itemVille,"Ville");
		}
		
		if(adr.lieu && adr.lieu.num !== ''){
			var itemNumVoie = new GraphicalEditInput();
			itemNumVoie.setNameField('<span class="gras_champs_contact">'+_("Numero de voie")+'</span>');
			itemNumVoie.setValueField(adr.lieu.num);
			itemNumVoie.setFunctionOnClick("edit_num_voie_entreprise(this)");
			this.addItem(itemNumVoie,"Numero de voie");
		}
		
		if(adr.lieu && adr.lieu.voie !== ''){
			var itemTypeVoie = new GraphicalEditInput();
			itemTypeVoie.setNameField('<span class="gras_champs_contact">'+_("Type de voie")+'</span>');
			itemTypeVoie.setValueField(adr.lieu.voie);
			itemTypeVoie.setFunctionOnClick("edit_type_voie_entreprise(this)");
			this.addItem(itemTypeVoie,"Type de voie");
		}
		
		if(adr.lieu && adr.lieu.nomVoie !== ''){
			var itemNomVoie = new GraphicalEditInput();
			itemNomVoie.setNameField('<span class="gras_champs_contact">'+_("Nom de la voie")+'</span>');
			itemNomVoie.setValueField(adr.lieu.nomVoie);
			itemNomVoie.setFunctionOnClick("edit_nom_voie_entreprise(this)");
			this.addItem(itemNomVoie,"Nom de la voie");
		}
		
		if(adr.ville && adr.lieu.pays !== ''){
			var itemPays = new GraphicalEditInput();
			itemPays.setNameField('<span class="gras_champs_contact">'+_("Pays")+'</span>');
			itemPays.setValueField(adr.ville.pays);
			itemPays.setFunctionOnClick("edit_pays_entreprise(this)");
			this.addItem(itemPays,"Pays");
		}
		
		if(datas[0].mail !== ''){
			var itemMail = new GraphicalEditInput();
			itemMail.setNameField('<span class="gras_champs_contact">'+_("Email")+'</span>');
			itemMail.setValueField(datas[0].mail);
			itemMail.setFunctionOnClick("edit_mail_entreprise(this)");
			this.addItem(itemMail,"Email");
		}
		
		if(datas[0].tel !== ''){
			var itemTel = new GraphicalEditInput();
			itemTel.setNameField('<span class="gras_champs_contact">'+_("Tel")+'</span>');
			itemTel.setValueField(datas[0].tel);
			itemTel.setFunctionOnClick("edit_tel_entreprise(this)");
			this.addItem(itemTel,"Telephone");
		}
		
		if(datas[0].fax !== ''){
			var itemFax = new GraphicalEditInput();
			itemFax.setNameField('<span class="gras_champs_contact">'+_("Fax")+'</span>');
			itemFax.setValueField(datas[0].fax);
			itemFax.setFunctionOnClick("edit_fax_entreprise(this)");
			this.addItem(itemFax,"Fax");
		}
		
		if(datas[0].site_web !== ''){
			var itemSite = new GraphicalEditInput();
			itemSite.setNameField('<span class="gras_champs_contact">'+_("Site web")+'</span>');
			itemSite.setValueField(datas[0].site_web);
			itemSite.setFunctionOnClick("edit_site_web_entreprise(this)");
			this.addItem(itemSite,"Site");
		}
		
		if(datas[0].commentaire !== ''){
			var itemNote = new GraphicalEditInput();
			itemNote.setTypeField('textarea');
			itemNote.setNameField('<span class="gras_champs_contact">'+_("Commentaire")+'</span>');
			itemNote.setValueField(datas[0].commentaire);
			itemNote.setFunctionOnClick("edit_commentaire_entreprise(this)");
			this.addItem(itemNote,"Commentaire");
		}
	
	});
	
	content_liste_coord_entrep_2.setGraphicalElement(liste_coord_entrep);
	
	
	// Definition des boutons options
	// ==========================================================================

	var options_clients_coord = corps_onglet_coordonnees.newVerticalLayout();
	options_clients_coord.addCssClass("content_options_clients_coord");
	options_clients_coord.setHeight(1);
	options_clients_coord.setContent('<ul>'+
									'<li id="sup_entreprise" class="bouton_option showPopup" popup="popupSupEntreprise"><a href="javascript:void(0);">'+_("Supprimer l'entreprise")+'</a></li>'+
									'</ul>');
									
									
	// Definition du popup supprimer une entreprise
	// ==========================================================================
	
	var container_popup_sup_entreprise = corps_onglet_coordonnees.newVerticalLayout();
	container_popup_sup_entreprise.setHeight(0.1);
	var popup_sup_entreprise = new GraphicalPopup();
	popup_sup_entreprise.setName('popupSupEntreprise');
	popup_sup_entreprise.setHeight('100px');
	
		var content_sup_entreprise = popup_sup_entreprise.newVerticalLayout();
		var gc = new GraphicalContainer();
		gc.addCssClass("Vertigo");
		gc.addRawCss("overflow:auto;");
		
			// Titre du popup
			var titre_popup_sup_entreprise = content_sup_entreprise.newVerticalLayout();
			titre_popup_sup_entreprise.addCssClass("titre_popup_sup_entreprise");
			titre_popup_sup_entreprise.setHeight(1);
			titre_popup_sup_entreprise.setContent('<h2 class="titre_liste">'+_("Supprimer l'entreprise")+'</h2>');
			
			// Message de confirmation
			var msg_conf_sup_entreprise = content_sup_entreprise.newVerticalLayout();
			msg_conf_sup_entreprise.addCssClass("msg_conf_sup_entreprise");
			msg_conf_sup_entreprise.setContent('<p>'+_("Êtes-vous sûr de vouloir supprimer l'entreprise ?")+'</p>');
			
			// Boutons de validation & annulation
			var btns_popup_sup_entreprise = content_sup_entreprise.newVerticalLayout();
			btns_popup_sup_entreprise.addCssClass("btns_popup_sup_entreprise");
			btns_popup_sup_entreprise.setHeight(1);
			btns_popup_sup_entreprise.setContent(
			'<p>'+
			'<input type="button" value="Oui" onclick="delete_entreprise()" />'+
			'<input type="button" value="Non" onclick="GraphicalPopup.hidePopup('+popup_sup_entreprise.getPopupIndex()+');" />'+
			'</p>'
			);
			
			gc.setGraphicalElement(popup_sup_entreprise);
	container_popup_sup_entreprise.setGraphicalElement(popup_sup_entreprise);