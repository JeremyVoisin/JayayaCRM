/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet principal Taches
 * @version: 1.0
 */

   
var corps_taches_p = taches_p.newVerticalLayout();
taches_p.addCssClass("corps_taches");
	
	
	// Partie Haute
	// ==========================================================================
	
	var partieH = corps_taches_p.newHorizontalLayout();
	partieH.addCssClass("partieH_onglet_taches");
	
		
		// Liste des taches en retards
		// ==========================================================================
	
		var content_liste_taches_before = partieH.newVerticalLayout();
		content_liste_taches_before.addCssClass("taches_before");
		
			// Titre content liste des taches
			var titre_taches_before = content_liste_taches_before.newVerticalLayout();
			titre_taches_before.addCssClass("titre_taches_before");
			titre_taches_before.setHeight(1);
			titre_taches_before.setContent('<h2 class="hight_titre_liste">'+_("En retard")+'</h2>');
			
			// Liste des taches en retard
			var content_liste_before = content_liste_taches_before.newVerticalLayout();
			var liste_taches_before = new GraphicalList();
			liste_taches_before.addCssClass("liste_taches_before");
			liste_taches_before.addCssClass("liste");
			
		content_liste_before.setGraphicalElement(liste_taches_before);
			
		// Liste des taches du jour
		// ==========================================================================
		
		var content_liste_taches_now = partieH.newVerticalLayout();
		content_liste_taches_now.addCssClass("taches_now");
		
			// Titre content liste des taches
			var titre_taches_now = content_liste_taches_now.newVerticalLayout();
			titre_taches_now.addCssClass("titre_taches_now");
			titre_taches_now.setHeight(1);
			titre_taches_now.setContent('<h2 class="hight_titre_liste">'+_("Aujourd'hui")+'</h2>');
			
			// Liste des taches du jour
			var content_liste_now = content_liste_taches_now.newVerticalLayout();
			var liste_taches_now = new GraphicalList();
			liste_taches_now.addCssClass("liste_taches_now");
			liste_taches_now.addCssClass("liste");

		content_liste_now.setGraphicalElement(liste_taches_now);
		
		
		// Liste des taches a venir
		// ==========================================================================
		
		var content_liste_taches_after = partieH.newVerticalLayout();
		content_liste_taches_after.addCssClass("taches_after");
		
			// Titre content liste des taches
			var titre_taches_after = content_liste_taches_after.newVerticalLayout();
			titre_taches_after.addCssClass("titre_taches_after");
			titre_taches_after.setHeight(1);
			titre_taches_after.setContent('<h2 class="hight_titre_liste">'+_("A venir")+'</h2>');
			
			// Liste des taches a venir
			var content_liste_after = content_liste_taches_after.newVerticalLayout();
			var liste_taches_after = new GraphicalList();
			liste_taches_after.addCssClass("liste_taches_after");
			liste_taches_after.addCssClass("liste");

		content_liste_after.setGraphicalElement(liste_taches_after);
		
			
		// Ajout de items dans chaque liste
		var taches = DatasBuffer.getRequest("/taches");
		var current_date = createDateWithHourToZero();
		
		// Creation des items des listes des taches
		for(var i=0;i<taches.length;i++){
			var date = new Date(taches[i].date);
			var date_without_hour = setDateWithHourToZero(taches[i].date);
			
			if (date_without_hour < current_date)
				liste_taches_before.addItem('<p class="nom_tache">'+taches[i].titre+'</p><p class="heure_tache">à '+getFormatHeure(date)+'</p><p class="date_tache">Le '+getFormatDate(date)+'</p><p class="desc_tache">'+taches[i].description+'</p>',taches[i]._id);
			else if (date_without_hour > current_date)
				liste_taches_after.addItem('<p class="nom_tache">'+taches[i].titre+'</p><p class="heure_tache">à '+getFormatHeure(date)+'</p><p class="date_tache">Le '+getFormatDate(date)+'</p><p class="desc_tache">'+taches[i].description+'</p>',taches[i]._id);
			else
				liste_taches_now.addItem('<p class="nom_tache">'+taches[i].titre+'</p><p class="heure_tache">à '+getFormatHeure(date)+'</p><p class="date_tache">Le '+getFormatDate(date)+'</p><p class="desc_tache">'+taches[i].description+'</p>',taches[i]._id);
		}
	
	
	// Partie Basse
	// ==========================================================================
	
	var partieB = corps_taches_p.newVerticalLayout();
	partieB.addCssClass("partieB_onglet_taches");
	partieB.setHeight(30);
	
		// Titre d'une tache selectionnee
		var titre_tache_select = partieB.newVerticalLayout();
		titre_tache_select.setHeight(1);
		
		titre_tache_selectContainer = new GraphicalContainer();
		titre_tache_selectContainer.addCssClass("titre_tache_select");
		
		titre_tache_selectContainer.setHTMLContent('<h2 class="hight_titre_liste">'+_("SELECTIONNER UNE TACHE")+'</h2>');
		
		titre_tache_select.setGraphicalElement(titre_tache_selectContainer);
		
		Coupler.link(liste_taches_before,titre_tache_selectContainer);
		Coupler.link(liste_taches_now,titre_tache_selectContainer);
		Coupler.link(liste_taches_after,titre_tache_selectContainer);
		
		titre_tache_selectContainer.getCoupler().setExternalSource("/taches");
		
		titre_tache_selectContainer.getCoupler().updateHandler(function(datas){
			this.setHTMLContent('<h2 class="hight_titre_liste">'+datas[0].titre+'</h2>');
		});
			
		// Content tache selectionnee
		var content_tache_select = partieB.newVerticalLayout();
		content_tache_select.addCssClass("content_tache_select");
		
			var border_tache_select = new GraphicalContainer();
			border_tache_select.addCssClass("border_tache_select");
			border_tache_select.addRawCss("height:100%;margin:0px 10px 10px 10px;border:1px solid #E0E0E0;border-top:none;");
			
			content_tache_select.setGraphicalElement(border_tache_select);
			
			var layout_tache_select = border_tache_select.newHorizontalLayout();
			layout_tache_select.addCssClass("layout_tache_select");
			
				// Infos tache selectionnee
				var infos_tache_select = layout_tache_select.newVerticalLayout();
				infos_tache_select.setWidth(30);
				
					var content_liste_infos_tache = infos_tache_select.newVerticalLayout();
					var liste_infos_tache = new GraphicalList();
					liste_infos_tache.addCssClass("liste_infos_tache");
					liste_infos_tache.addCssClass("liste");
					
					Coupler.link(liste_taches_before,liste_infos_tache);
					Coupler.link(liste_taches_now,liste_infos_tache);
					Coupler.link(liste_taches_after,liste_infos_tache);
					
					liste_infos_tache.getCoupler().setExternalSource("/taches");
					
					liste_infos_tache.getCoupler().updateHandler(function(datas){
					
						document.getElementsByClassName('btn_showPopup_clo_tache')[0].disabled = false;
						
						var date = new Date(datas[0].date);
						
						var itemTitre = new GraphicalEditInput();
						itemTitre.setNameField('<span class="gras_champs_contact">'+_("Titre")+'</span>');
						itemTitre.setValueField(datas[0].titre);
						itemTitre.setFunctionOnClick("edit_titre_tache(this)");
						this.addItem(itemTitre);
						
						var itemLieu = new GraphicalEditInput();
						itemLieu.setNameField('<span class="gras_champs_contact">'+_("Lieu")+'</span>');
						itemLieu.setValueField(datas[0].lieu);
						itemLieu.setFunctionOnClick("edit_lieu_tache(this)");
						this.addItem(itemLieu);
						
						var itemDate = new GraphicalEditInput();
						itemDate.setNameField('<span class="gras_champs_contact">'+_("Date")+'</span>');
						itemDate.setValueField(getFormatDate(date));
						itemDate.setFunctionOnClick("edit_date_tache(this)");
						this.addItem(itemDate);
						
						var itemHeure = new GraphicalEditInput();
						itemHeure.setNameField('<span class="gras_champs_contact">'+_("Heure")+'</span>');
						itemHeure.setValueField(getFormatHeure(date));
						itemHeure.setFunctionOnClick("edit_heure_tache(this)");
						this.addItem(itemHeure);
					
					});
				
					content_liste_infos_tache.setGraphicalElement(liste_infos_tache);
				
					// Bouton
					var btn_tache_select = infos_tache_select.newVerticalLayout();
					btn_tache_select.setHeight(1);
					var gc_btn_tache = new GraphicalContainer();
					gc_btn_tache.setHTMLContent('<input class="showPopup btn_showPopup_clo_tache" popup="popup_clo_tache" type="button" value="'+_("Cloturer")+'" style="width:100%;height:100%;" disabled/>');
					
					btn_tache_select.setGraphicalElement(gc_btn_tache);
					
					// Definition du popup cloturer une tache
					// ==========================================================================
					
					var container_popup_clo_tache = infos_tache_select.newVerticalLayout();
					container_popup_clo_tache.setHeight(0.1);
					var popup_clo_tache = new GraphicalPopup();
					popup_clo_tache.setName('popup_clo_tache');
					popup_clo_tache.setHeight('100px');
					
						var content_clo_tache = popup_clo_tache.newVerticalLayout();
						
							// Titre du popup
							var titre_popup_clo_tache = content_clo_tache.newVerticalLayout();
							titre_popup_clo_tache.addCssClass("titre_popup_clo_tache");
							titre_popup_clo_tache.setHeight(1);
							titre_popup_clo_tache.setContent('<h2 class="titre_liste">'+_("Cloturer une tache")+'</h2>');
							
							// Message de confirmation
							var msg_conf_clo_tache = content_clo_tache.newVerticalLayout();
							msg_conf_clo_tache.addCssClass("msg_conf_clo_tache");
							msg_conf_clo_tache.setContent('<p>'+_("Êtes-vous sûr de vouloir cloturer la tâche ?")+'</p>');
							
							// Boutons de validation & annulation
							var btns_popup_clo_tache = content_clo_tache.newVerticalLayout();
							btns_popup_clo_tache.addCssClass("btns_popup_clo_tache");
							btns_popup_clo_tache.setHeight(1);
							btns_popup_clo_tache.setContent(
							'<p>'+
							'<input type="button" value="'+_("Oui")+'" onclick="remove_tache()" />'+
							'<input type="button" value="'+_("Non")+'" onclick="GraphicalPopup.hidePopup('+popup_clo_tache.getPopupIndex()+');" />'+
							'</p>'
							);
							
					container_popup_clo_tache.setGraphicalElement(popup_clo_tache);
			
				// Description tache selectionnee
				var desc_tache_select = layout_tache_select.newHorizontalLayout();
				
				desc_tache_selectContainer = new GraphicalContainer();
				desc_tache_selectContainer.addCssClass("desc_tache_select");
				
				desc_tache_select.setGraphicalElement(desc_tache_selectContainer);
				
				Coupler.link(liste_taches_before,desc_tache_selectContainer);
				Coupler.link(liste_taches_now,desc_tache_selectContainer);
				Coupler.link(liste_taches_after,desc_tache_selectContainer);
				
				desc_tache_selectContainer.getCoupler().setExternalSource("/taches");
		
				desc_tache_selectContainer.getCoupler().updateHandler(function(datas){
					var itemDescription = new GraphicalEditInput();
					itemDescription.setTypeField('textarea');
					itemDescription.setNameField('<span class="gras_champs_contact">'+_("Description")+'</span> :');
					itemDescription.setValueField(datas[0].description);
					itemDescription.setFunctionOnClick("edit_description_tache(this)");
					desc_tache_selectContainer.setHTMLContent(itemDescription);
				});
	
	// Partie boutons options
	// ==========================================================================
		
	var options_taches = corps_taches_p.newVerticalLayout();
	options_taches.addCssClass("content_options_taches");
	options_taches.setHeight(1);
	options_taches.setContent('<ul>'+
									'<li id="ajouter_tache" class="bouton_option showPopup" popup="popupAjoutTache"><a href="#">'+_("Nouvelle tâche")+'</a></li>'+
									'</ul>');
		
	
	// Popup lie au bouton d'ajout d'une nouvelle tache
	var container_popup_nouvelle_tache = corps_taches_p.newVerticalLayout();
	container_popup_nouvelle_tache.setHeight(0.1);
	var popup_nouvelle_tache = new GraphicalPopup();
	popup_nouvelle_tache.setName('popupAjoutTache');
	popup_nouvelle_tache.setHeight('40%');
		
		var content_nouvelle_tache = popup_nouvelle_tache.newVerticalLayout();
		content_nouvelle_tache.addCssClass("content_nouvelle_tache");
	
			// Titre du popup d'ajout d'un contact
			var titre_popup_nouvelle_tache = content_nouvelle_tache.newVerticalLayout();
			titre_popup_nouvelle_tache.addCssClass("titre_popup_nouvelle_tache");
			titre_popup_nouvelle_tache.setHeight(1);
			titre_popup_nouvelle_tache.setContent('<h2 class="titre_liste">'+_("Nouvelle tache")+'</h2>');
			
			// Formulaire d'ajout d'une tache
			var formulaire_nouvelle_tache = content_nouvelle_tache.newVerticalLayout();
			formulaire_nouvelle_tache.addCssClass("formulaire_nouvelle_tache");
			
			var gc = new GraphicalContainer();
			gc.addCssClass("Vertigo");
			gc.addRawCss("overflow:auto;");
			
			var newTacheForm = new GraphicalForm("/taches/new");
			
			newTacheForm.addInput(_("Titre"),"text","titre");
			newTacheForm.addInput(_("Date"),"text","date","jj/mm/aaaa");
			newTacheForm.addInput(_("Heure"),"text","heure","hh:mm");
			newTacheForm.addInput(_("Lieu"),"text","lieu");
			newTacheForm.addInput(_("Description"),"textarea","description");
			newTacheForm.addInput(_("Ajouter"),"submit","ajouter");
			
			newTacheForm.setPopupToHide(popup_nouvelle_tache);
			
			newTacheForm.setPostSendScript(function(){
				socket.emit("update",{url: "/taches", func: getHandler( function(url){
					
					liste_taches_before.clear();
					liste_taches_now.clear();
					liste_taches_after.clear();
					
					var taches = DatasBuffer.getRequest(url);
					
					// Recuperation des items des listes des taches
					for(var i=0;i<taches.length;i++){
						var date = new Date(taches[i].date);
						var date_without_hour = setDateWithHourToZero(taches[i].date);
						
						if (date_without_hour < current_date)
							liste_taches_before.addItem('<p class="nom_tache">'+taches[i].titre+'</p><p class="heure_tache">à '+getFormatHeure(date)+'</p><p class="date_tache">Le '+getFormatDate(date)+'</p><p class="desc_tache">'+taches[i].description+'</p>',taches[i]._id);
						else if (date_without_hour > current_date)
							liste_taches_after.addItem('<p class="nom_tache">'+taches[i].titre+'</p><p class="heure_tache">à '+getFormatHeure(date)+'</p><p class="date_tache">Le '+getFormatDate(date)+'</p><p class="desc_tache">'+taches[i].description+'</p>',taches[i]._id);
						else
							liste_taches_now.addItem('<p class="nom_tache">'+taches[i].titre+'</p><p class="heure_tache">à '+getFormatHeure(date)+'</p><p class="date_tache">Le '+getFormatDate(date)+'</p><p class="desc_tache">'+taches[i].description+'</p>',taches[i]._id);
					}
					
					liste_taches_before.update();
					liste_taches_now.update();
					liste_taches_after.update();
					
				})});
			});
			
			gc.setGraphicalElement(newTacheForm);
			formulaire_nouvelle_tache.setGraphicalElement(gc);
			
	container_popup_nouvelle_tache.setGraphicalElement(popup_nouvelle_tache);
	
	
	Coupler.link(liste_taches_before,liste_taches_now);
	Coupler.link(liste_taches_before,liste_taches_after);
	liste_taches_now.getCoupler().setAsEndPoint();
	liste_taches_now.getCoupler().setExternalSource(null);
	liste_taches_now.getCoupler().updateHandler(function(){
		this.selectedIndex = -1;
		this.update();
	});
	
	Coupler.link(liste_taches_now,liste_taches_before);
	Coupler.link(liste_taches_now,liste_taches_after);
	liste_taches_before.getCoupler().setAsEndPoint();
	liste_taches_before.getCoupler().setExternalSource(null);
	liste_taches_before.getCoupler().updateHandler(function(){
		this.selectedIndex = -1;
		this.update();
	});
	
	Coupler.link(liste_taches_after,liste_taches_before);
	Coupler.link(liste_taches_after,liste_taches_now);
	
	liste_taches_after.getCoupler().setAsEndPoint();
	liste_taches_after.getCoupler().setExternalSource(null);
	liste_taches_after.getCoupler().updateHandler(function(){
		this.selectedIndex = -1;
		this.update();
	});