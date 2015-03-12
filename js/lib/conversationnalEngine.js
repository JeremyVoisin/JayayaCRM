function sendAnswer(){
	if(liste_conv.getCoupler().getLastInformation() === null)return;
	var el = document.getElementById("convTextArea");
	if(el){
		var corpsMessage = el.querySelector("textarea[id='corpsMsg']");
		var xhr = new XMLHttpRequest();
		var params = new FormData();
		params.append("corpsMsg",corpsMessage.value);
		params.append("idB",liste_conv.getCoupler().getLastInformation());
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
				corpsMessage.value="";
				socket.emit("update",{url: "/billets/"+liste_conv.getCoupler().getLastInformation()+"/messages", func: getHandler( function(url){
					var datas = DatasBuffer.getRequest(url);
					if(datas.length > 0 &&liste_conv.getCoupler().getLastInformation() === datas[0].idB){
						liste_conv.clear();
						for(var i = 0; i < datas.length; i ++){
							var date = new Date(datas[i].date);
							var user = DatasBuffer.getRequest("/personnes/"+datas[i].idP)[0];
							if(user)
								liste_conv.addItem('<div class="bloc_com"><p class="entete_com"><span class="name_com">'+user.prenom+' '+user.nom+'</span><span class="date_com">Le '+getFormatDate(date)+' à '+getFormatHeure(date)+'</span></p><p class="corps_com">'+datas[i].corpsMsg+'</p></div>');
							else
								liste_conv.addItem('<div class="bloc_com"><p class="entete_com"><span class="name_com">Utilisateur supprimé</span><span class="date_com">Le '+getFormatDate(date)+' à '+getFormatHeure(date)+'</span></p><p class="corps_com">'+datas[i].corpsMsg+'</p></div>');
						}
						liste_conv.update();
						liste_conv.scrollDown();
						updateMesConvs(datas[0].idB);
						DatasBuffer.update("/login/personne");
						var personne = DatasBuffer.getRequest("/login/personne").idP;
						updateParticipants(personne, datas[0].idB);
					}
				})});
			}
		};
		xhr.open("POST", "/messages/new", false);
		xhr.send(params);
	};
};

function updateMesConvs(idB){
	var conversations = DatasBuffer.getRequest("/billets/personne")[0];
	if(conversations.idB.indexOf(idB) === -1 && conversations && conversations !== null){
		var messages = DatasBuffer.getRequest("/billets/"+idB+"/messages");
		var billet = DatasBuffer.getRequest("/billets/"+idB)[0];
		// Creation des items de la liste
		if(messages)
			liste_conversations_mine.addItem('<p class="nom_conversation">'+billet.titre+'</p><p class="nb_com">'+messages.length+' commentaires</p>',billet._id);
		liste_conversations_mine.update();
	}
};

function updateParticipants(idP, idB){
	var participants = DatasBuffer.getRequest("/billets/"+idB+"/participants");
	if(participants.indexOf(idP) === -1){
		// Creation des items de la liste
		var user = DatasBuffer.getRequest("/personnes/"+idP)[0];
		// Creation des items de la liste
		liste_participants.addItem('<p class="nom_part">'+user.prenom+' '+user.nom+'</p><p class="statut_part">'+user.statut+'</p>');
		liste_participants.update();
	}
};