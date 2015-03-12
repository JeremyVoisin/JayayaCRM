/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Definition du Layout de l'onglet Toutes les conversations du navigateur Conversations
 * @version: 1.0
 */


var allConv_onglet_contacts = o_conv_all.newVerticalLayout();
o_conv_all.addCssClass("content_clients_allConv");
	
	// Bloc liste de toutes les conversations
	var content_liste_all_conversations = allConv_onglet_contacts.newVerticalLayout();
	var liste_conversations_autres = new GraphicalList();
	liste_conversations_autres.addCssClass("liste");
	liste_conversations_autres.addCssClass("liste_conversations");
	
	var conversations = DatasBuffer.getRequest("/billets");
	
	for(var i = 0;conversations && i < conversations.length; i++){
		
		var messages = DatasBuffer.getRequest("/billets/"+conversations[i]._id+"/messages");
		// Creation des items de la liste
		if(messages)
			liste_conversations_autres.addItem('<p class="nom_conversation">'+conversations[i].titre+'</p><p class="nb_com">'+messages.length+' '+_("commentaires")+'</p>',conversations[i]._id);
		else liste_conversations_autres.addItem('<p class="nom_conversation">'+conversations[i].titre+'</p><p class="nb_com">0 '+_("commentaire")+'</p>',conversations[i]._id);
	}
	
	content_liste_all_conversations.setGraphicalElement(liste_conversations_autres);
		