/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet Toutes les conversations du navigateur Conversations
 * @version: 1.0
 */


var mesConv_onglet_contacts = o_conv_client.newVerticalLayout();
o_conv_client.addCssClass("content_clients_allConv");
	
	// Bloc liste de toutes les conversations
	var content_liste_my_conversations = mesConv_onglet_contacts.newVerticalLayout();
	var liste_conversations_mine = new GraphicalList();
	liste_conversations_mine.addCssClass("liste");
	liste_conversations_mine.addCssClass("liste_conversations");
	
	var conversations = DatasBuffer.getRequest("/billets/personne")[0];
	if(conversations && conversations !== null){
		for(var i = 0;i < conversations.idB.length; i++){
			var messages = DatasBuffer.getRequest("/billets/"+conversations.idB[i]+"/messages");
			var billet = DatasBuffer.getRequest("/billets/"+conversations.idB[i])[0];
			// Creation des items de la liste
			if(messages)
				liste_conversations_mine.addItem('<p class="nom_conversation">'+billet.titre+'</p><p class="nb_com">'+messages.length+' '+_("commentaires")+'</p>',billet._id);
			else liste_conversations_mine.addItem('<p class="nom_conversation">'+billet.titre+'</p><p class="nb_com">0 '+_("commentaire")+'</p>',billet._id);
		}
	}
	
	content_liste_my_conversations.setGraphicalElement(liste_conversations_mine);
		