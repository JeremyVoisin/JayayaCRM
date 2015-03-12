// Permet d'actualiser la liste des entreprises suivant le mot entré dans le champs recherche
function findEntreprises(){
	
	var mot = document.getElementById("input_search_entreprise").value.toLowerCase();
	
	var ets = DatasBuffer.getRequest("/entreprises");
	
	liste_entreprises.clear();
	
	for(var i=0;i<ets.length;i++)
	{	
		if(ets[i].nom.toLowerCase().indexOf(mot) != -1){
			var cts = DatasBuffer.getRequest("/entreprises/"+ets[i]._id+"/contacts");
			liste_entreprises.addItem('<p class="nom_entreprise">'+ets[i].nom+'</p><p class="nb_entreprise">'+cts.length+' '+(function(){return(cts.length>1?"contacts":"contact");})()+'</p>',ets[i]._id);
		}
	}
	
	liste_entreprises.update();
}

// Permet d'actualiser la liste des contacts suivant le mot entré dans le champs recherche
function findContacts(){
	
	var mot = document.getElementById("input_search_contact").value.toLowerCase();
	
	var prs = DatasBuffer.getRequest("/personnes");
	
	liste_contacts.clear();
	
	for(var i=0;i<prs.length;i++)
	{	
		if(prs[i].nom.toLowerCase().indexOf(mot) != -1){
			liste_contacts.addItem('<p class="nom_contact">'+prs[i].nom+'</p>',prs[i]._id);
		}
	}

	liste_contacts.update();
}