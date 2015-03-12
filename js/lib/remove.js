/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Fonctions gerants les Suppressions
 * @version: 1.0
 */
 

 
/* Gestion de l'onglet Clients -> General
   ========================================================================== */

// Suppresion d'un domaine lié à une entreprise
function sup_domaine_entreprise(id_domaine) {
	// Recuperation de l'id de l'entreprise
	var id_entreprise = liste_concern.getCoupler().getLastInformation();
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "/entreprises/"+id_entreprise+"/domaines/"+id_domaine, false);
	xhr.send();
	
	// Notification interface
	socket.emit("update",{url: "/entreprises/"+id_entreprise,func:getHandler(function(url){
			liste_concern.clear();
			var entreprise = DatasBuffer.getRequest(url);
			
			if(entreprise) {
				var list_id_domaine = entreprise[0].domaine;
				for(var j = 0;j < list_id_domaine.length; j++){
					var domaine_info = DatasBuffer.getRequest("/domaines/"+list_id_domaine[j]);
					if(domaine_info[0])
						liste_concern.addItem('<canvas class="rect_type" width="10" height="10" style="background-color:'+domaine_info[0].couleur+';"></canvas>'+domaine_info[0].nom+' <input class="btn_sup" type="button" value="Supprimer" onClick="sup_domaine_entreprise(\''+domaine_info[0]._id+'\')" />',domaine_info[0].nom);
				}
			}
			
			liste_concern.update();
	})});
}



/* Gestion de l'onglet Clients -> Contacts
   ========================================================================== */
   
// Delete d'un contact lie a une entreprise
function delete_contact_entreprise(){
	// Recuperation de l'id du contact
	var id_contact = liste_infos_contacts.getCoupler().getLastInformation();
	
	if(id_contact != -1) {
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", "/personnes/delete/"+id_contact, false);
		xhr.send();
		
		socket.emit("update",{url: "/entreprises/"+newContactForm.getCoupler().getLastInformation()+"/contacts",func: getHandler(function(url){
			liste_cts.clear();
			var datas = DatasBuffer.getRequest(url);
			for(var i=0; i < datas.length; i++)
				liste_cts.addItem('<p class="nom_contact">'+datas[i].prenom+" "+datas[i].nom+'</p><p class="statut_contact">'+datas[i].statut+'</p>',datas[i]._id);
			liste_cts.update();
		})});

		liste_infos_contacts.clear();
		liste_infos_contacts.update();
		GraphicalPopup.hidePopup(popup_sup_contact_entreprise.getPopupIndex());
	}
}



/* Gestion de l'onglet Clients -> Coordonnees
   ========================================================================== */
   
// Delete d'une entreprise
function delete_entreprise(){
	// Recuperation de l'id de l'entreprise
	var id_e = liste_coord_entrep.getCoupler().getLastInformation();
	
	if(id_e != -1) {
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", "/entreprises/"+id_e, false);
		xhr.send();
		
		socket.emit("update",{url: "/entreprises",func: getHandler(function(url){
			liste_entreprises.clear();
			var ets = DatasBuffer.getRequest("/entreprises");
			for(var i=0;i<ets.length;i++)
			{	
				var cts = DatasBuffer.getRequest("/entreprises/"+ets[i]._id+"/contacts");
				// Creation des items de la liste
				liste_entreprises.addItem('<p class="nom_entreprise">'+ets[i].nom+'</p><p class="nb_entreprise">'+cts.length+' '+(function(){return(cts.length>1?"contacts":"contact");})()+'</p>',ets[i]._id);
			}
			liste_entreprises.update();
		})});

		liste_coord_entrep.clear();
		liste_coord_entrep.update();
		liste_cts.clear();
		liste_cts.update();
		liste_infos_contacts.clear();
		liste_infos_contacts.update();
		liste_concern.clear();
		liste_concern.update();
		liste_com.clear();
		liste_com.update();
		GraphicalPopup.hidePopup(popup_sup_entreprise.getPopupIndex());
	}
}



/* Gestion de l'onglet Clients -> Personne
   ========================================================================== */
   
// Delete d'une personne
function delete_personne(){
	// Recuperation de l'id de la personne
	var id_contact = liste_pers_contacts.getCoupler().getLastInformation();
	
	if(id_contact != -1) {
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", "/personnes/delete/"+id_contact, false);
		xhr.send();
		
		socket.emit("update",{url: "/personnes",func: getHandler(function(url){
			liste_contacts.clear();
			var prs = DatasBuffer.getRequest("/personnes");
			for(var i=0;i<prs.length;i++)
			{	
				liste_contacts.addItem('<p class="nom_contact">'+prs[i].nom+'</p>',prs[i]._id);
			}
			liste_contacts.update();
		})});

		liste_pers_contacts.clear();
		liste_pers_contacts.update();
		GraphicalPopup.hidePopup(popup_sup_personne.getPopupIndex());
	}
}
   
   
 
/* Gestion de l'onglet Taches
   ========================================================================== */
   
// Suppression d'une tache
function remove_tache(){
	// Recuperation de l'id de la tache
	var id_tache = liste_infos_tache.getCoupler().getLastInformation();
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "/taches/"+id_tache, false);
	xhr.send();
	
	// Notification interface
	maj_listes_taches_after_edit();
	titre_tache_selectContainer.setHTMLContent('<h2 class="hight_titre_liste">SELECTIONNER UNE TACHE</h2>');
	titre_tache_selectContainer.update();
	liste_infos_tache.clear();
	liste_infos_tache.update();
	desc_tache_selectContainer.clear();
	desc_tache_selectContainer.update();
	document.getElementsByClassName('btn_showPopup_clo_tache')[0].disabled = true;
	GraphicalPopup.hidePopup(popup_clo_tache.getPopupIndex());
}



/* Gestion de l'onglet Parametres
   ========================================================================== */

// Suppression d'un domaine
function remove_domaine_param(id_domaine){
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "/domaines/"+id_domaine, false);
	xhr.send();
	
	maj_liste_domaines_param_after_edit();
}

// Suppression d'un utilisateur
function remove_user_param(){
	// Recuperation de l'id de l'utilisateur
	var id_user = liste_infos_user.getCoupler().getLastInformation();
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "/utilisateurs/"+id_user, false);
	xhr.send();
	
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
	
	// Notification interface
	GraphicalPopup.hidePopup(popup_sup_user.getPopupIndex());
}