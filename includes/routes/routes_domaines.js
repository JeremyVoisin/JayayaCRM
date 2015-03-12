/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Domaines
*/

module.exports = function(app, passport, carnet) {
  
  /* ----- REQUETES POST ----- */
  
  // ========================================================
  // POST Domaine
  // Permet de creer un nouveau domaine a partir
  // des parametres POST
  // ========================================================
  app.post('/domaines/new', carnet.postDomaine);
  
  
  /* ----- REQUETES PUT ----- */
   
  // ========================================================
  // PUT Nom d'un domaine
  // Permet de mettre a jour le nom d'un domaine
  // ========================================================
  app.put('/domaines/:iddomaine/nom', carnet.updateNomDomaine);
  
  
  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Domaine
  // Permet de supprimer un domaine
  // a partir de son id ":iddomaine"
  // ========================================================
  app.delete('/domaines/:iddomaine', carnet.deleteDomaine);

} //Fin du module

