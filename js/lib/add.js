/**
 * @Project: JAYAYA CRM
 * @Author: Equipe JAYAYA
 * @Description: Fonctions gerants les Ajouts
 * @version: 1.0
 */
 
 
 
/* Gestion de l'onglet Clients -> General
   ========================================================================== */
   
// Ajout d'un centre d'interet
function add_domaine_entreprise(){
	var select_domaine = document.getElementById('select_add_domaine');
	var id_domaine = select_domaine.options[select_domaine.selectedIndex].value;
	var id_entreprise = liste_concern.getCoupler().getLastInformation();
	
	// Mise a jour BDD
	var xhr = new XMLHttpRequest();
	var params = new FormData();
	params.append("domaine", id_domaine);
	xhr.open("POST", "/entreprises/"+id_entreprise+"/domaines/new", false);
	xhr.send(params);
	
	// Actualise la liste des domaines
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
			//refreshPostRenderScript();
	})});
	
	// Fermeture du popup
	GraphicalPopup.hidePopup(popup_nouveau_domaine.getPopupIndex());
}