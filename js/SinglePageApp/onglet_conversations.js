/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet principal Conversations
 * @version: 1.0
 */
 
 
var corps_conversations = conversations_p.newHorizontalLayout();
conversations_p.addCssClass("corps_conversations");

include("lib/conversationnalEngine");



	// Definition de la partie Gauche
	// ==========================================================================
	
	var partieG = corps_conversations.newVerticalLayout();
	partieG.addCssClass("partieG_onglet_conversations");
	partieG.setWidth(30);
	
		// Navigateur Conversations
		var content_nav_conv = partieG.newVerticalLayout();
		var nav_conv = new GraphicalNavigator();
		nav_conv.addCssClass("nav_conv");
		nav_conv.addCssClass("navigateur");
		
			// Ajout des onglets
			var o_conv_client = nav_conv.addTab(_("MES CONVERSATIONS"));
			var o_conv_all = nav_conv.addTab(_("TOUTES"));
		
		// Ajout du navigateur Conversations au content nav conversations
		content_nav_conv.setGraphicalElement(nav_conv);
		
		// Onglets
		include("SinglePageApp/onglet_conversations_mesConv");
		include("SinglePageApp/onglet_conversations_autresConv");
		
		Coupler.link(liste_conversations_autres,liste_conversations_mine);
		liste_conversations_mine.getCoupler().setAsEndPoint();
		liste_conversations_mine.getCoupler().setExternalSource(null);
		liste_conversations_mine.getCoupler().updateHandler(function(){
			this.selectedIndex = -1;
			this.update();
		});
		
		Coupler.link(liste_conversations_mine,liste_conversations_autres);
		liste_conversations_autres.getCoupler().setAsEndPoint();
		liste_conversations_autres.getCoupler().setExternalSource(null);
		liste_conversations_autres.getCoupler().updateHandler(function(){
			this.selectedIndex = -1;
			this.update();
		});
		
		// Bloc Options liste des centres d'interets
		var options_liste_conversations = partieG.newVerticalLayout();
		options_liste_conversations.addCssClass("options_liste_conversations");
		options_liste_conversations.setHeight(1);
		options_liste_conversations.setContent('<ul>'+
										'<li id="ajouter_conversation" class="bouton_option showPopup" popup="popup_nouvelle_conv"><a href="#">'+_("Nouvelle conversation")+'</a></li>'+
										'</ul>');
		
										
		// Definition du popup nouvelle conversation
		// ==========================================================================
		
		var container_popup_nouvelle_conv = partieG.newVerticalLayout();
		container_popup_nouvelle_conv.setHeight(0.1);
		var popup_nouvelle_conv = new GraphicalPopup();
		popup_nouvelle_conv.setName('popup_nouvelle_conv');
		popup_nouvelle_conv.setHeight('120px');
		
			var content_nouvelle_conv = popup_nouvelle_conv.newVerticalLayout();
			
				// Titre du popup
				var titre_popup_nouvelle_conv = content_nouvelle_conv.newVerticalLayout();
				titre_popup_nouvelle_conv.addCssClass("titre_popup_nouvelle_conv");
				titre_popup_nouvelle_conv.setHeight(1);
				titre_popup_nouvelle_conv.setContent('<h2 class="titre_liste">'+_("Nouvelle conversation")+'</h2>');
				
				var formulaireNouveauBillet = content_nouvelle_conv.newVerticalLayout();
				formulaireNouveauBillet.addCssClass("formulaire_nouvelle_entreprise");
				
					var newBilletForm = new GraphicalForm("/billets/new");
			
					newBilletForm.addInput(_("Sujet"),"text","titre");
					newBilletForm.addInput(_("Ajouter"),"submit","ajouter");
			
					newBilletForm.setPopupToHide(popup_nouvelle_conv);
				
					newBilletForm.setPostSendScript(function(){
						socket.emit("update",{url: "/billets",func: getHandler(function(url){
								liste_conversations_autres.clear();
								var conversations = DatasBuffer.getRequest("/billets");
								for(var i=0;conversations && i<conversations.length;i++){
									var messages = DatasBuffer.getRequest("/billets/"+conversations[i]._id+"/messages");
									if(messages)liste_conversations_autres.addItem('<p class="nom_conversation">'+conversations[i].titre+'</p><p class="nb_com">'+messages.length+' '+_("commentaires")+'</p>',conversations[i]._id);
									else liste_conversations_autres.addItem('<p class="nom_conversation">'+conversations[i].titre+'</p><p class="nb_com">0 '+_("commentaire")+'</p>',conversations[i]._id);
								}
								liste_conversations_autres.update();
							})
						});
					});
					formulaireNouveauBillet.setGraphicalElement(newBilletForm);
				
		container_popup_nouvelle_conv.setGraphicalElement(popup_nouvelle_conv);
		

		
	// Definition de la partie Droite
	// ==========================================================================
	
	var partieD = corps_conversations.newVerticalLayout();
	partieD.addCssClass("partieD_onglet_conversations");
	partieD.setWidth(70);
	
		// Container conversation & participants
		var container_conv_part = partieD.newHorizontalLayout();
			
			// Bloc liste d'une conversation
			var content_conv = container_conv_part.newVerticalLayout();
			content_conv.setWidth(70);
			
				// Titre de la conversation
				var titre_conv = content_conv.newVerticalLayout();
				titre_conv.addCssClass("titre_conv");
				titre_conv.setHeight(1);
				
				titre_convContainer = new GraphicalContainer();
				
				titre_conv.setGraphicalElement(titre_convContainer);
				
				Coupler.link(liste_conversations_mine,titre_convContainer);
				Coupler.link(liste_conversations_autres,titre_convContainer);
				
				titre_convContainer.getCoupler().setExternalSource("/billets");
				
				titre_convContainer.getCoupler().updateHandler(function(datas){
					this.setHTMLContent('<p id="titre_conv">'+datas[0].titre+'</p>');
				});
			
				// Liste d'une conversation
				var content_liste_conv = content_conv.newVerticalLayout();
				var liste_conv = new GraphicalList();
				liste_conv.addCssClass("liste_conv");
				
				Coupler.link(liste_conversations_autres,liste_conv);
				Coupler.link(liste_conversations_mine,liste_conv);
				
				liste_conv.getCoupler().setExternalSource("/billets","/messages");
				
				liste_conv.getCoupler().updateHandler(function(datas){
					// Creation des items de la liste
					for(var i = 0; i < datas.length; i ++){
						var date = new Date(datas[i].date);
						var user = DatasBuffer.getRequest("/personnes/"+datas[i].idP)[0];
						if(user)
							liste_conv.addItem('<div class="bloc_com"><p class="entete_com"><span class="name_com">'+user.prenom+' '+user.nom+'</span><span class="date_com">Le '+getFormatDate(date)+' à '+getFormatHeure(date)+'</span></p><p class="corps_com">'+datas[i].corpsMsg+'</p></div>');
						else
							liste_conv.addItem('<div class="bloc_com"><p class="entete_com"><span class="name_com">'+_("Utilisateur supprimé")+'</span><span class="date_com">Le '+getFormatDate(date)+' à '+getFormatHeure(date)+'</span></p><p class="corps_com">'+datas[i].corpsMsg+'</p></div>');
					}
				});
				
				content_liste_conv.setGraphicalElement(liste_conv);
				
				// Bloc reponse
				var content_rep = content_conv.newVerticalLayout();
				content_rep.setHeight(1);
				content_rep.addCssClass("content_rep");
				
				var GC = new GraphicalContainer();
				
				GC.addHTMLContent("<div id='convTextArea'>");
				GC.addHTMLContent('<textarea id="corpsMsg" name=""></textarea>');
				GC.addHTMLContent('<p><input onclick="event.preventDefault();sendAnswer();" id="send_com" type="button" value="'+_("Répondre")+'" /></p>');
				//GC.addHTMLContent('<p><span id="file_conv">Fichier : <input type="file" /></span><input onclick="event.preventDefault();sendAnswer();" id="send_com" type="button" value="Repondre" /></p>');
				GC.addHTMLContent("</div>");
				
				content_rep.setGraphicalElement(GC);
			
			// Bloc participants
			var content_participants = container_conv_part.newVerticalLayout();
			content_participants.addCssClass("content_participants");
			content_participants.setWidth(30);
			
				// Bloc titre
				var content_titre_participants = content_participants.newVerticalLayout();
				content_titre_participants.addCssClass("content_titre_participants");
				content_titre_participants.setHeight(1);
				content_titre_participants.setContent("<h2>"+_("Participants")+"</h2>");
			
				// Bloc liste des participants
				var content_liste_participants = content_participants.newVerticalLayout();
				var liste_participants = new GraphicalList();
				liste_participants.addCssClass("liste");
				liste_participants.addCssClass("liste_participants");
				
				Coupler.link(liste_conversations_autres,liste_participants);
				Coupler.link(liste_conversations_mine,liste_participants);
				
				liste_participants.getCoupler().setExternalSource("/billets","/participants");
				
				liste_participants.getCoupler().updateHandler(function(datas){
					// Creation des items de la liste
					for(var i = 0; i < datas.length; i ++){
						var user = DatasBuffer.getRequest("/personnes/"+datas[i])[0];
						// Creation des items de la liste
						if(user)
							liste_participants.addItem('<p class="nom_part">'+user.prenom+' '+user.nom+'</p><p class="statut_part">'+user.statut+'</p>');
					}
				});
				
				content_liste_participants.setGraphicalElement(liste_participants);
		
		
		// Bloc Options conversation
		var options_conversation = partieD.newVerticalLayout();
		options_conversation.addCssClass("options_conversation");
		options_conversation.setHeight(1);
		options_conversation.setContent('<ul>'+
												'<li id="fermer_conv" class="bouton_option showPopup" popup="popup_fermer_conv"><a href="#">'+_("Fermer la conversation")+'</a></li>'+
												'</ul>');
		
			
			// Definition du popup fermer la conversation
			// ==========================================================================
			
			var container_popup_fermer_conv = partieD.newVerticalLayout();
			container_popup_fermer_conv.setHeight(0.1);
			var popup_fermer_conv = new GraphicalPopup();
			popup_fermer_conv.setName('popup_fermer_conv');
			popup_fermer_conv.setHeight('100px');
			
				var content_fermer_conv = popup_fermer_conv.newVerticalLayout();
								
					// Titre du popup
					var titre_popup_fermer_conv = content_fermer_conv.newVerticalLayout();
					titre_popup_fermer_conv.addCssClass("titre_popup_fermer_conv");
					titre_popup_fermer_conv.setHeight(1);
					titre_popup_fermer_conv.setContent('<h2 class="titre_liste">'+_("Fermer la conversation")+'</h2>');
					
					// Message de confirmation
					var msg_conf_fermer_conv = content_fermer_conv.newVerticalLayout();
					msg_conf_fermer_conv.addCssClass("msg_conf_fermer_conv");
					msg_conf_fermer_conv.setContent('<p>'+_("Êtes-vous sûr de vouloir fermer la conversation ?")+'</p>');
					
					// Boutons de validation & annulation
					var btns_popup_fermer_conv = content_fermer_conv.newVerticalLayout();
					btns_popup_fermer_conv.addCssClass("btns_popup_fermer_conv");
					btns_popup_fermer_conv.setHeight(1);
					btns_popup_fermer_conv.setContent(
					'<p>'+
					'<input type="button" value="Oui" class="hidePopup" popup="popup_fermer_conv" />'+
					'<input type="button" value="Non" class="hidePopup" popup="popup_fermer_conv" />'+
					'</p>'
					);
					
			container_popup_fermer_conv.setGraphicalElement(popup_fermer_conv);
	