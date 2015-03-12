/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Fonctions gerants les EditInput
 * @version: 1.0
 */

 
 
/* Fonctions utiles aux EditInput
   ========================================================================== */
   
// Fonction permettant cacher la partie modification de l'EI
function hide_modif_value(source_elem){
	var edit_value = source_elem.parentNode;
	var current_value = edit_value.parentNode.getElementsByClassName('current_value')[0];
	var current_value_btn = edit_value.parentNode.getElementsByClassName('current_value_btn')[0];
	
	edit_value.style.display = "none";
	current_value.style.display = "inline";
	current_value_btn.style.display = "inline";
}

// Fonction retournant le champs current_value de l'IE
function get_current_value(source_elem){
	var ct_edit_input = source_elem.parentNode.parentNode;
	return ct_edit_input.getElementsByClassName('current_value')[0];
}

// Fonction retournant la valeur du champs modif_value de l'IE
function get_value_modif_value(source_elem){
	var ct_edit_value = source_elem.parentNode;
	return ct_edit_value.getElementsByClassName('modif_value')[0].value;
}



/* Gestion de l'onglet Clients -> Contacts
   ========================================================================== */
   
// Permet de notifier le serveur du changement
function maj_infos_personne(id_personne){
	socket.emit("update",{url: "/personnes/"+id_personne,func: getHandler(function(url){
		
	})});
}
   
// Edition du statut d'un contact lié à une entreprise
function edit_statut_contact_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("statut", modif_value);
	
	var id_personne = liste_infos_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/statut", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
	
	// Maj de la liste des contacts
	var id_entreprise = liste_cts.getCoupler().getLastInformation();
	socket.emit("update",{url: "/entreprises/"+id_entreprise+"/contacts",func: getHandler(function(url){
		var currentIndex = liste_cts.getSelectedIndex();
		liste_cts.clear();

		var personnes = DatasBuffer.getRequest(url);
		liste_cts.setSelectedIndex(-1);

		for(var i=0;i<personnes.length;i++){
			liste_cts.addItem('<p class="nom_contact">'+personnes[i].prenom+" "+personnes[i].nom+'</p><p class="statut_contact">'+personnes[i].statut+'</p>',personnes[i]._id);
		}
		
		liste_cts.update();
		GraphicalList.select(liste_cts.index,currentIndex);
	})});
}

// Edition du tel d'un contact lié à une entreprise
function edit_tel_contact_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("tel", modif_value);
	
	var id_personne = liste_infos_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/tel", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du fax d'un contact lié à une entreprise
function edit_fax_contact_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("fax", modif_value);
	
	var id_personne = liste_infos_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/fax", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du mail d'un contact lié à une entreprise
function edit_mail_contact_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("mail", modif_value);
	
	var id_personne = liste_infos_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/mail", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du commentaire d'un contact lié à une entreprise
function edit_commentaire_contact_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("commentaire", modif_value);
	
	var id_personne = liste_infos_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/commentaire", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}



/* Gestion de l'onglet Clients -> Coordonnees
   ========================================================================== */
   
function maj_infos_entreprise(id_entreprise){
	socket.emit("update",{url: "/entreprises/"+id_entreprise,func: getHandler(function(url){
		
	})});
}

// Edition du numero de SIREN de l'entreprise
function edit_siren_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("siren", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/siren", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du code postal de l'entreprise
function edit_cp_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("code_postal", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/code_postal", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition de la ville de l'entreprise
function edit_ville_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("nomVille", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/ville", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du numero de voie de l'entreprise
function edit_num_voie_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("num", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/num_voie", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du type de voie de l'entreprise
function edit_type_voie_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("voie", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/type_voie", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du nom de voie de l'entreprise
function edit_nom_voie_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("nomVoie", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/nom_voie", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du pays de l'entreprise
function edit_pays_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("pays", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/pays", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du mail de l'entreprise
function edit_mail_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("mail", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/mail", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du telephone de l'entreprise
function edit_tel_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("tel", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/tel", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du fax de l'entreprise
function edit_fax_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("fax", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/fax", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du site web de l'entreprise
function edit_site_web_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("site_web", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/site_web", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}

// Edition du commentaire de l'entreprise
function edit_commentaire_entreprise(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("commentaire", modif_value);
	
	var id_entreprise = liste_coord_entrep.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/entreprises/"+id_entreprise+"/commentaire", false);
	xhr.send(params);
	
	maj_infos_entreprise(id_entreprise);
}
   
   
   


/* Gestion de l'onglet Clients -> Personne
   ========================================================================== */
   
// Edition du statut d'une personne
function edit_statut_personne(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("statut", modif_value);
	
	var id_personne = liste_pers_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/statut", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du tel d'une personne
function edit_tel_personne(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("tel", modif_value);
	
	var id_personne = liste_pers_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/tel", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du fax d'une personne
function edit_fax_personne(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("fax", modif_value);
	
	var id_personne = liste_pers_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/fax", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du mail d'une personne
function edit_mail_personne(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("mail", modif_value);
	
	var id_personne = liste_pers_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/mail", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}

// Edition du commentaire d'une personne
function edit_commentaire_personne(source_elem) {
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("commentaire", modif_value);
	
	var id_personne = liste_pers_contacts.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/personnes/"+id_personne+"/commentaire", false);
	xhr.send(params);
	
	maj_infos_personne(id_personne);
}
   


/* Gestion de l'onglet Taches
   ========================================================================== */
   
// Permet d'actualiser les listes des taches et notifier le serveur du changement
function maj_listes_taches_after_edit(id_tache){
	socket.emit("update",{url: "/taches",func: getHandler(function(url){
		DatasBuffer.update(url);
		liste_taches_before.clear();
		liste_taches_now.clear();
		liste_taches_after.clear();
		var taches = DatasBuffer.getRequest(url);
		liste_taches_before.setSelectedIndex(-1);
		liste_taches_now.setSelectedIndex(-1);
		liste_taches_after.setSelectedIndex(-1);
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
}

// Edition du titre d'une tache
function edit_titre_tache(source_elem){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("titre", modif_value);
	
	var id_tache = liste_infos_tache.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/taches/"+id_tache+"/titre", false);
	xhr.send(params);
	
	maj_listes_taches_after_edit(id_tache);
	titre_tache_selectContainer.setHTMLContent('<h2 class="hight_titre_liste">'+modif_value+'</h2>');
	titre_tache_selectContainer.update();
}

// Edition du lieu d'une tache
function edit_lieu_tache(source_elem){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var params = new FormData();
	params.append("lieu", modif_value);
	
	var id_tache = liste_infos_tache.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/taches/"+id_tache+"/lieu", false);
	xhr.send(params);
	
	maj_listes_taches_after_edit(id_tache);
}

// Edition de la date d'une tache
function edit_date_tache(source_elem){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var id_tache = liste_infos_tache.getCoupler().getLastInformation();
	
	// Recuperation de l'ancienne date et maj
	var tache = DatasBuffer.getRequest("/taches/"+id_tache);
	var date_tache = new Date(tache[0].date);
	var tDate = modif_value.split("/");
	date_tache.setFullYear(parseInt(tDate[2]),parseInt(tDate[1])-1,parseInt(tDate[0]));

	var params = new FormData();
	params.append("date", date_tache);
	
	xhr.open("PUT", "/taches/"+id_tache+"/date", false);
	xhr.send(params);
	
	maj_listes_taches_after_edit(id_tache);
}

// Edition de l'heure d'une tache
function edit_heure_tache(source_elem){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	
	var id_tache = liste_infos_tache.getCoupler().getLastInformation();
	
	// Recuperation de l'ancienne date et maj
	var tache = DatasBuffer.getRequest("/taches/"+id_tache);
	var date_tache = new Date(tache[0].date);
	var tHeure = modif_value.split(":");
	date_tache.setHours(parseInt(tHeure[0]),parseInt(tHeure[1]),0);

	var params = new FormData();
	params.append("date", date_tache);
	
	xhr.open("PUT", "/taches/"+id_tache+"/date", false);
	xhr.send(params);
	
	maj_listes_taches_after_edit(id_tache);
}

// Edition de la description d'une tache
function edit_description_tache(source_elem){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("description", modif_value);
	
	var id_tache = liste_infos_tache.getCoupler().getLastInformation();
	
	xhr.open("PUT", "/taches/"+id_tache+"/description", false);
	xhr.send(params);
	
	maj_listes_taches_after_edit(id_tache);
}



/* Gestion de l'onglet Parametres
   ========================================================================== */

// Permet d'actualiser la liste des centres d'interet, le popup d'ajout de centre d'interet et notifier le serveur du changement
function maj_liste_domaines_param_after_edit(){
	socket.emit("update",{url: "/domaines",func: getHandler(function(url){
		// Mise a jour de la liste des centres d'interet
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
}

// Edition du nom d'un domaine
function edit_domaine_param(source_elem, id_domaine){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("nom", modif_value);
	
	xhr.open("PUT", "/domaines/"+id_domaine+"/nom", false);
	xhr.send(params);
	
	maj_liste_domaines_param_after_edit();
}

// Permet d'actualiser la liste des centres d'interet et notifier le serveur du changement
function maj_liste_users_param_after_edit(id_user){
	socket.emit("update",{url: "/utilisateurs/"+id_user,func:getHandler(function(url){
			DatasBuffer.update("/utilisateurs");
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
	})});
}

// Edition du nom d'un utilisateur
function edit_nom_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("nom", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/nom", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}

// Edition du prenom d'un utilisateur
function edit_prenom_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("prenom", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/prenom", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}

// Edition du statut d'un utilisateur
function edit_statut_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("statut", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/statut", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}

// Edition du telephone d'un utilisateur
function edit_tel_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("tel", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/tel", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}

// Edition du fax d'un utilisateur
function edit_fax_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("fax", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/fax", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}

// Edition du mail d'un utilisateur
function edit_mail_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("mail", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/mail", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}

// Edition du login d'un utilisateur
function edit_login_utilisateur_param(source_elem, id_user){
	// Recuperation de la valeur
	var current_value = get_current_value(source_elem);
	var modif_value = get_value_modif_value(source_elem);
	
	// Modification du champs current_value
	current_value.innerHTML = modif_value;
	
	hide_modif_value(source_elem);
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("login", modif_value);
	
	xhr.open("PUT", "/utilisateurs/"+id_user+"/login", false);
	xhr.send(params);
	
	maj_liste_users_param_after_edit(id_user);
}
