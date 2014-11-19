/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet principal Parametres
 * @version: 1.0
 */
 
 
var corps_parametres = parametres_p.newHorizontalLayout();
parametres_p.addCssClass("corps_parametres");



	// Definition de la partie Gauche
	// ==========================================================================
	   
	var partieG = corps_parametres.newVerticalLayout();
	partieG.addCssClass("partieG_onglet_parametres");
	partieG.setWidth(30);
	
		// Bloc titre
		var content_titre_CI = partieG.newVerticalLayout();
		content_titre_CI.addCssClass("content_titre_CI");
		content_titre_CI.setHeight(1);
		content_titre_CI.setContent("<h2>Centres d'interet</h2>");
		
		// Bloc liste des centres d'interet
		var content_liste_CI = partieG.newVerticalLayout();
		var liste_CI = new GraphicalList();
		liste_CI.addCssClass("liste_CI");

			// Creation des items de la liste
			var getDomaines = DatasBuffer.getRequest("/domaines");
			
			for(var i=0;i<getDomaines.length;i++){
				var item = new GraphicalEditInput();
				item.setNameField('<canvas class="rect_type" width="10" height="10" style="background-color:#'+getDomaines[i].couleur+';"></canvas>');
				item.setValueField(getDomaines[i].nom);
				item.setFunctionOnClick("edit_domaine_param(this, '"+getDomaines[i]._id+"')");
				item.setFunctionOnClickSup("remove_domaine_param('"+getDomaines[i]._id+"')");
				item.setButtonSup(true);
				liste_CI.addItem(item);
			}
		
		content_liste_CI.setGraphicalElement(liste_CI);
		
		// Bloc Options liste des centres d'interets
		var options_liste_CI = partieG.newVerticalLayout();
		options_liste_CI.addCssClass("options_liste_CI");
		options_liste_CI.setHeight(1);
		options_liste_CI.setContent('<ul>'+
										'<li id="ajouter_CI" class="bouton_option showPopup" popup="popup_nouveau_CI"><a href="#">Nouveau centre d\'intérêt</a></li>'+
										'</ul>');
		
			// Definition du popup nouveau centre d'interet
			// ==========================================================================
			
			var container_popup_nouveau_CI = partieG.newVerticalLayout();
			container_popup_nouveau_CI.setHeight(0.1);
			var popup_nouveau_CI = new GraphicalPopup();
			popup_nouveau_CI.setName('popup_nouveau_CI');
			popup_nouveau_CI.setHeight('200px');
			
				var content_nouveau_CI = popup_nouveau_CI.newVerticalLayout();
				
					// Titre du popup
					var titre_popup_nouveau_CI = content_nouveau_CI.newVerticalLayout();
					titre_popup_nouveau_CI.addCssClass("titre_popup_nouveau_CI");
					titre_popup_nouveau_CI.setHeight(1);
					titre_popup_nouveau_CI.setContent('<h2 class="titre_liste">Nouveau centre d\'interet</h2>');
					
					// Formulaire contact
					var formulaire_nouveau_CI = content_nouveau_CI.newVerticalLayout();
					formulaire_nouveau_CI.addCssClass("formulaire_nouveau_CI");
					
					var gc = new GraphicalContainer();
					gc.addCssClass("Vertigo");
					gc.addRawCss("overflow:auto;");
					
					var newDomaineForm = new GraphicalForm("/domaines/new");
					
					newDomaineForm.addInput("Nom","text","nom");
					newDomaineForm.addInput("Couleur","color","couleur");
					newDomaineForm.addInput("Ajouter","submit","ajouter");
					
					newDomaineForm.setPopupToHide(popup_nouveau_CI);
					
					newDomaineForm.setPostSendScript(function(){
						socket.emit("update",{url: "/domaines", func: getHandler( function(url){
							
							liste_CI.clear();
							
							var getDomaines = DatasBuffer.getRequest(url);
							
							// Recuperation des items des listes des domaines
							for(var i=0;i<getDomaines.length;i++){
								var item = new GraphicalEditInput();
								item.setNameField('<canvas class="rect_type" width="10" height="10" style="background-color:#'+getDomaines[i].couleur+';"></canvas>');
								item.setValueField(getDomaines[i].nom);
								item.setFunctionOnClick("edit_domaine_param(this, '"+getDomaines[i]._id+"')");
								item.setFunctionOnClickSup("remove_domaine_param('"+getDomaines[i]._id+"')");
								item.setButtonSup(true);
								liste_CI.addItem(item);
							}
							
							liste_CI.update();
							
							// Mise a jour du popup d'ajout de centre d'interet
							var gc_content_maj = '<select id="select_add_domaine" name="select">';
							for(var i=0;i<getDomaines.length;i++){
								gc_content_maj += '<option style="background-color:'+getDomaines[i].couleur+';" value="'+getDomaines[i]._id+'" '+ (function(){return (i == 0)?('selected'):('');})() +'>'+getDomaines[i].nom+'</option>';
							}
							gc_content_maj += '</select> <br/> <input type="button" value="Ajouter" onClick="add_domaine_entreprise()" />';
							
							gc_liste_domaines.setHTMLContent(gc_content_maj);
							
							refreshPostRenderScript();
						})});
					});
					
					gc.setGraphicalElement(newDomaineForm);
					formulaire_nouveau_CI.setGraphicalElement(gc);
					
			container_popup_nouveau_CI.setGraphicalElement(popup_nouveau_CI);
	
	
	// Definition de la partie Droite
	// ==========================================================================
	
	var partieD = corps_parametres.newVerticalLayout();
	partieD.addCssClass("partieD_onglet_parametres");
	partieD.setWidth(70);
	
		// Bloc titre
		var content_titre_users = partieD.newVerticalLayout();
		content_titre_users.addCssClass("content_titre_users");
		content_titre_users.setHeight(1);
		content_titre_users.setContent("<h2>Utilisateurs</h2>");
		
		// Bloc titre liste
		var content_titre_liste_users = partieD.newVerticalLayout();
		content_titre_liste_users.addCssClass("content_titre_liste_users");
		content_titre_liste_users.setHeight(1);
		content_titre_liste_users.setContent('<div class="col_nom">Nom</div><div class="col_mail">Email</div><div class="col_tel">Telephone</div><div class="col_mod"></div>');
		
		// Bloc liste des utilisateurs
		var content_liste_users = partieD.newVerticalLayout();
		var liste_users = new GraphicalList();
		liste_users.addCssClass("liste_users");
		
		var users = DatasBuffer.getRequest("/utilisateurs");
		
		for(var i = 0; i < users.length; i++) {
			var user = DatasBuffer.getRequest("/utilisateurs/"+users[i]._id);
			var actualUser = DatasBuffer.getRequest("/login/who");
			
			if(user.personne)
				liste_users.addItem('<div class="col_nom_'+user.user.degree+'">'+user.personne.prenom+' '+user.personne.nom+'</div><div class="col_mail">'+user.personne.mail+'</div><div class="col_tel">'+user.personne.tel+'</div><div class="col_mod"><input type="button" value="Modifier" onclick="GraphicalList.select('+liste_users.getIndex()+','+i+');popup_modif_user.activate();forceScrollVerticalInCell();" />'+ (function(){return (user.user.login == actualUser.login)?(''):('<input type="button" value="Supprimer" class="showPopup" popup="popup_sup_user"/>');})() +'</div>',users[i]._id);
			else liste_users.addItem('<div class="col_nom_'+user.user.degree+'">'+user.user.login+'</div><div class="col_mail">'+user.personne.mail+'</div><div class="col_tel">'+user.personne.tel+'</div><div class="col_mod"><input type="button" value="Modifier" onclick="GraphicalList.select('+liste_users.getIndex()+','+i+');popup_modif_user.activate();forceScrollVerticalInCell();"/>' + (function(){return (user.user.login == actualUser.login)?(''):('<input type="button" value="Supprimer" class="showPopup" popup="popup_sup_user"/>');})() +'</div>',users[i]._id);
		}
		
		content_liste_users.setGraphicalElement(liste_users);
		
			// Definition du popup modifier un utilisateur
			// ==========================================================================
			
			var container_popup_modif_user = partieD.newVerticalLayout();
			container_popup_modif_user.setHeight(0.1);
			var popup_modif_user = new GraphicalPopup();
			popup_modif_user.setName('popup_modif_user');
			popup_modif_user.setHeight('50%');
			
				var content_modif_user = popup_modif_user.newVerticalLayout();
				
					// Titre du popup
					var titre_popup_modif_user = content_modif_user.newVerticalLayout();
					titre_popup_modif_user.addCssClass("titre_popup_modif_user");
					titre_popup_modif_user.setHeight(1);
					titre_popup_modif_user.setContent('<h2 class="titre_liste">Modifier Utilisateur</h2>');
					
					// Bloc infos utilisateur
					var content_liste_infos_user = content_modif_user.newVerticalLayout();
					
					var liste_infos_user = new GraphicalList();
					liste_infos_user.addCssClass("liste_infos_user");
					liste_infos_user.addCssClass("liste");

					Coupler.link(liste_users,liste_infos_user);
					
					liste_infos_user.getCoupler().setExternalSource("/utilisateurs");
					
					liste_infos_user.getCoupler().updateHandler(function(datas){

						// Creation des items de la liste
						var item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Nom</span>');
						item.setValueField(datas.personne.nom);
						item.setFunctionOnClick("edit_nom_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
						
						item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Prenom</span>');
						item.setValueField(datas.personne.prenom);
						item.setFunctionOnClick("edit_prenom_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
						
						item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Statut</span>');
						item.setValueField(datas.personne.statut);
						item.setFunctionOnClick("edit_statut_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
						
						item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Telephone</span>');
						item.setValueField(datas.personne.tel);
						item.setFunctionOnClick("edit_tel_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
						
						item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Fax</span>');
						item.setValueField(datas.personne.fax);
						item.setFunctionOnClick("edit_fax_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
						
						item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Email</span>');
						item.setValueField(datas.personne.mail);
						item.setFunctionOnClick("edit_mail_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
						
						item = new GraphicalEditInput();
						item.setNameField('<span class="gras_champs_contact">Login</span>');
						item.setValueField(datas.user.login);
						item.setFunctionOnClick("edit_login_utilisateur_param(this, '"+datas.user._id+"')");
						this.addItem(item);
					
					});
					
					content_liste_infos_user.setGraphicalElement(liste_infos_user);
					
			container_popup_modif_user.setGraphicalElement(popup_modif_user);
		
			// Definition du popup supprimer un utilisateur
			// ==========================================================================
			
			var container_popup_sup_user = partieD.newVerticalLayout();
			container_popup_sup_user.setHeight(0.1);
			var popup_sup_user = new GraphicalPopup();
			popup_sup_user.setName('popup_sup_user');
			popup_sup_user.setHeight('100px');
			
				var content_sup_user = popup_sup_user.newVerticalLayout();
				
					// Titre du popup
					var titre_popup_sup_user = content_sup_user.newVerticalLayout();
					titre_popup_sup_user.addCssClass("titre_popup_sup_user");
					titre_popup_sup_user.setHeight(1);
					titre_popup_sup_user.setContent('<h2 class="titre_liste">Supprimer Utilisateur</h2>');
					
					// Message de confirmation
					var msg_conf_sup_user = content_sup_user.newVerticalLayout();
					msg_conf_sup_user.addCssClass("msg_conf_sup_user");
					msg_conf_sup_user.setContent('<p>Êtes-vous sûr de vouloir supprimer l\'utilisateur ?</p>');
					
					// Boutons de validation & annulation
					var btns_popup_sup_user = content_sup_user.newVerticalLayout();
					btns_popup_sup_user.addCssClass("btns_popup_sup_user");
					btns_popup_sup_user.setHeight(1);
					btns_popup_sup_user.setContent(
					'<p>'+
					'<input type="button" value="Oui" class="hidePopup" popup="popup_sup_user" onclick="remove_user_param()" />'+
					'<input type="button" value="Non" class="hidePopup" popup="popup_sup_user" onclick="GraphicalPopup.hidePopup('+popup_sup_user.getPopupIndex()+');" />'+
					'</p>'
					);
				
			container_popup_sup_user.setGraphicalElement(popup_sup_user);
		
		// Bloc Options liste des utilisateurs
		var options_liste_users = partieD.newVerticalLayout();
		options_liste_users.addCssClass("options_liste_users");
		options_liste_users.setHeight(1);
		options_liste_users.setContent('<ul>'+
										'<li id="ajouter_user" class="bouton_option showPopup" popup="popup_new_user"><a href="#">Nouvel utilisateur</a></li>'+
										'</ul>');
										
		// Definition du popup nouvel utilisateur
		// ==========================================================================
		
		var container_popup_new_user = partieD.newVerticalLayout();
		container_popup_new_user.setHeight(0.1);
		var popup_new_user = new GraphicalPopup();
		popup_new_user.setName('popup_new_user');
		popup_new_user.setHeight('420px');
		
			var content_new_user = popup_new_user.newVerticalLayout();
			
				// Titre du popup
				var titre_popup_new_user = content_new_user.newVerticalLayout();
				titre_popup_new_user.addCssClass("titre_popup_new_user");
				titre_popup_new_user.setHeight(1);
				titre_popup_new_user.setContent('<h2 class="titre_liste">Nouvel utilisateur</h2>');
				
				// Formulaire utilisateur
				var formulaire_new_user = content_new_user.newVerticalLayout();
				formulaire_new_user.addCssClass("formulaire_new_user");
				
				var newUserForm = new GraphicalForm("/utilisateurs/new");
				
				newUserForm.addInput("Nom","text","nom");
				newUserForm.addInput("Prenom","text","prenom");
				newUserForm.addInput("Statut","text","statut");
				newUserForm.addInput("Telephone","text","tel");
				newUserForm.addInput("Fax","text","fax");
				newUserForm.addInput("Login","text","utilisateur");
				newUserForm.addInput("Mot de passe", "password", "password");
				newUserForm.addInput("Email","text","email");
				newUserForm.addInputWithValue("Admin","radio","rank","0");
				newUserForm.addInputWithValue("Utilisateur","radio","rank","1");
				newUserForm.addInputWithValue("Client","radio","rank","2");
				newUserForm.addInput("Ajouter","submit","submit");
				
				formulaire_new_user.setGraphicalElement(newUserForm);
				
				newUserForm.setPopupToHide(popup_new_user);
				
					newUserForm.setPostSendScript(function(){
						socket.emit("update",{url: "/utilisateurs",func:getHandler(function(url){
								liste_users.clear();
								var users = DatasBuffer.getRequest("/utilisateurs");
								for(var i = 0; i < users.length; i++) {
									var user = DatasBuffer.getRequest("/utilisateurs/"+users[i]._id);
									var actualUser = DatasBuffer.getRequest("/login/who");
									
									if(user.personne)
										liste_users.addItem('<div class="col_nom_'+user.user.degree+'">'+user.personne.prenom+' '+user.personne.nom+'</div><div class="col_mail">'+user.personne.mail+'</div><div class="col_tel">'+user.personne.tel+'</div><div class="col_mod"><input type="button" value="Modifier" onclick="GraphicalList.select('+liste_users.getIndex()+','+i+');popup_modif_user.activate();forceScrollVerticalInCell();" />'+ (function(){return (user.user.login == actualUser.login)?(''):('<input type="button" value="Supprimer" class="showPopup" popup="popup_sup_user"/>');})() +'</div>',users[i]._id);
									else liste_users.addItem('<div class="col_nom_'+user.user.degree+'">'+user.user.login+'</div><div class="col_mail">'+user.personne.mail+'</div><div class="col_tel">'+user.personne.tel+'</div><div class="col_mod"><input type="button" value="Modifier" onclick="GraphicalList.select('+liste_users.getIndex()+','+i+');popup_modif_user.activate();forceScrollVerticalInCell();"/>' + (function(){return (user.user.login == actualUser.login)?(''):('<input type="button" value="Supprimer" class="showPopup" popup="popup_sup_user"/>');})() +'</div>',users[i]._id);
								}
								liste_users.update();
								refreshPostRenderScript();
							})
						});
					});
				
				
		container_popup_new_user.setGraphicalElement(popup_new_user);
	