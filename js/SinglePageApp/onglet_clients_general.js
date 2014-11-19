/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet General de l'onglet principal Clients
 * @version: 1.0
 */

   
var clients_onglet_general = o_general.newVerticalLayout();
o_general.addCssClass("content_clients_general");

	// Corps de l'onglet general
	var corps_onglet_general = clients_onglet_general.newHorizontalLayout();
	

		// Definition de la liste Concernes par
		// ==========================================================================
	
		var content_concern = corps_onglet_general.newVerticalLayout();
		content_concern.addCssClass("content_concern");
		content_concern.setWidth(40);
		
			// Titre content concernes par
			var titre_concern = content_concern.newVerticalLayout();
			titre_concern.setHeight(1);
			titre_concern.setContent('<h2 class="titre_liste">Concernes par</h2>');
			
			// Liste des activites concernees
			var content_liste_concern = content_concern.newVerticalLayout();
			var liste_concern = new GraphicalList();
			
			Coupler.link(liste_entreprises,liste_concern);
			var id_entreprise = liste_concern.getCoupler().getLastInformation();
			liste_concern.getCoupler().setExternalSource("/entreprises");
			liste_concern.getCoupler().updateHandler(function(datas){
				if(datas===null)return;
				for(var i = 0;i < datas.length; i++){
					var list_id_domaine = datas[i].domaine;
					for(var j = 0;j < list_id_domaine.length; j++){
						var domaine_info = DatasBuffer.getRequest("/domaines/"+list_id_domaine[j]);
						if(domaine_info[0])
							liste_concern.addItem('<canvas class="rect_type" width="10" height="10" style="background-color:'+domaine_info[0].couleur+';"></canvas>'+domaine_info[0].nom+' <input class="btn_sup" type="button" value="Supprimer" onClick="sup_domaine_entreprise(\''+domaine_info[0]._id+'\')" />',domaine_info[0].nom);
					}
				}
			});

			content_liste_concern.setGraphicalElement(liste_concern);
		
		
		// Definition de la liste des Commentaires
		// ==========================================================================

		var content_com = corps_onglet_general.newVerticalLayout();
		content_com.addCssClass("content_com");
		content_com.setWidth(60);
		
			// Titre content concernes par
			var titre_com = content_com.newVerticalLayout();
			titre_com.addCssClass("titre_com");
			titre_com.setHeight(1);
			titre_com.setContent('<h2 class="titre_liste">Commentaires</h2>');
			
			// Liste des commentaires
			var content_liste_com = content_com.newVerticalLayout();
			var liste_com = new GraphicalList();
			liste_com.addCssClass("liste_com");
			liste_com.addCssClass("liste");
			
			Coupler.link(liste_entreprises,liste_com);
			liste_com.getCoupler().setExternalSource("/entreprises","/notes");
			liste_com.getCoupler().updateHandler(function(datas){
				if(datas===null)return;
				for(var i = 0;i < datas.length; i++){
					var d = new Date(datas[i].date);
					if(datas[i].idP){
						var personne = DatasBuffer.getRequest("/personnes/"+datas[i].idP);
						if(personne[0])
							liste_com.addItem('<p class="pseudo_com">'+personne[0].nom+' '+personne[0].prenom+'</p><p class="heure_com">à '+getFormatHeure(d)+'</p><p class="date_com">Le '+getFormatDate(d)+'</p><p class="msg_com">'+datas[i].corps+'</p>');
						else
							liste_com.addItem('<p class="pseudo_com">Utilisateur supprimé</p><p class="heure_com">à '+getFormatHeure(d)+'</p><p class="date_com">Le '+getFormatDate(d)+'</p><p class="msg_com">'+datas[i].corps+'</p>');
					}
				}
			});
			
			content_liste_com.setGraphicalElement(liste_com);

	
	// Definition des boutons options
	// ==========================================================================

	var options_general = clients_onglet_general.newVerticalLayout();
	options_general.addCssClass("content_options_general");
	options_general.setHeight(1);
	options_general.setContent('<ul>'+
									'<li id="nouveau_ci" class="bouton_option showPopup" popup="popupAjoutCentreInteret"><a href="javascript:void(0);">Ajouter un centre d\'intérêt</a></li>'+
									'<li id="nouveau_com" class="bouton_option showPopup" popup="popupAjoutComGeneral"><a href="javascript:void(0);">Nouveau commentaire</a></li>'+
									'</ul>');
									

									
		// Definition du popup ajouter un centre d'interet
		// ==========================================================================
		
		var container_popup_nouveau_domaine = clients_onglet_general.newVerticalLayout();
		container_popup_nouveau_domaine.setHeight(0.1);
		var popup_nouveau_domaine = new GraphicalPopup();
		popup_nouveau_domaine.setName('popupAjoutCentreInteret');
		popup_nouveau_domaine.setHeight('120px');
		
			var content_ajout_domaine = popup_nouveau_domaine.newVerticalLayout();
			content_ajout_domaine.addCssClass("content_ajout_domaine");
			
				// Titre du popup
				var titre_popup_nouveau_domaine = content_ajout_domaine.newVerticalLayout();
				titre_popup_nouveau_domaine.addCssClass("titre_popup_nouveau_domaine");
				titre_popup_nouveau_domaine.setHeight(1);
				titre_popup_nouveau_domaine.setContent('<h2 class="titre_liste">Ajouter un centre d\'interet</h2>');
				
				var content_liste_domaines = content_ajout_domaine.newVerticalLayout();
				content_liste_domaines.addCssClass("content_liste_domaines");
				
				var gc_liste_domaines = new GraphicalContainer();
				gc_liste_domaines.addCssClass("gc_liste_domaines");
				
				// Creation de la liste
				var getCentreI = DatasBuffer.getRequest("/domaines");
				
				gc_content = '<select id="select_add_domaine" name="select">';
				for(var i=0;i<getCentreI.length;i++){
					gc_content += '<option style="background-color:'+getCentreI[i].couleur+';" value="'+getCentreI[i]._id+'" '+ (function(){return (i == 0)?('selected'):('');})() +'>'+getCentreI[i].nom+'</option>';
				}
				gc_content += '</select> <br/> <input type="button" value="Ajouter" onClick="add_domaine_entreprise()" />';
				
				gc_liste_domaines.setHTMLContent(gc_content);
				
				content_liste_domaines.setGraphicalElement(gc_liste_domaines);
				
		container_popup_nouveau_domaine.setGraphicalElement(popup_nouveau_domaine);
									
									
									
		// Definition du popup nouveau commentaire
		// ==========================================================================
		
		var container_popup_nouveau_com = clients_onglet_general.newVerticalLayout();
		container_popup_nouveau_com.setHeight(0.1);
		var popup_nouveau_com = new GraphicalPopup();
		popup_nouveau_com.setName('popupAjoutComGeneral');
		popup_nouveau_com.setHeight('200px');
		
			var content_ajout_com_general = popup_nouveau_com.newVerticalLayout();
			content_ajout_com_general.addCssClass("popup_nouveau_contact");
			
				// Titre du popup
				var titre_popup_nouveau_com = content_ajout_com_general.newVerticalLayout();
				titre_popup_nouveau_com.addCssClass("titre_popup_nouveau_com");
				titre_popup_nouveau_com.setHeight(1);
				titre_popup_nouveau_com.setContent('<h2 class="titre_liste">Nouveau commentaire</h2>');
				
				var content_commentaire = content_ajout_com_general.newVerticalLayout();
				content_commentaire.addCssClass("content_commentaire");
				
				var gc = new GraphicalContainer();
				gc.addCssClass("Vertigo");
				gc.addRawCss("overflow:auto;");
				
				// Champs commentaire
				var commForm = new GraphicalForm("/entreprises/notes/new");
				
				commForm.addInput("Commentaire","textarea","corps");
				commForm.addInput("idS","externalInformation","idS");
				commForm.addInput("Ajouter","submit","ajouter");
								
				commForm.setPopupToHide(popup_nouveau_com);
			
				commForm.setPostSendScript(function(){
					socket.emit("update",{url: "/entreprises/"+commForm.getCoupler().getLastInformation()+"/notes",func: getHandler(function(url){
						liste_com.clear();
						var datas = DatasBuffer.getRequest(url);
						for(var i = 0;i < datas.length; i++){
							var d = new Date(datas[i].date);
							if(datas[i].idP){
								var personne = DatasBuffer.getRequest("/personnes/"+datas[i].idP);
								if(personne[0])
									liste_com.addItem('<p class="pseudo_com">'+personne[0].nom+' '+personne[0].prenom+'</p><p class="heure_com">à '+getFormatHeure(d)+'</p><p class="date_com">Le '+getFormatDate(d)+'</p><p class="msg_com">'+datas[i].corps+'</p>');
							}
						}
						liste_com.update();
					})});
				});
				
				Coupler.link(liste_entreprises,commForm);
				
				commForm.getCoupler().updateHandler(function(){});
				
				commForm.getCoupler().setExternalSource(null);
				
				gc.setGraphicalElement(commForm);
				content_commentaire.setGraphicalElement(gc);
				
		container_popup_nouveau_com.setGraphicalElement(popup_nouveau_com);