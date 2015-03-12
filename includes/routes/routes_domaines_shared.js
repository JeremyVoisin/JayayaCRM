/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Domaines
*/

module.exports = function(app, passport, carnet) {

  /* ----- REQUETES GET ----- */

  // ========================================================
  // GET Liste des entreprises
  // Permet de renvoyer toutes les entreprises de
  // la base de donnees
  // ========================================================
  app.get('/domaines', carnet.getDomaines);
  
  // ========================================================
  // GET Liste des entreprises
  // Permet de renvoyer toutes les entreprises de
  // la base de donnees
  // ========================================================
  app.get('/domaines/:iddomaine', carnet.getDomaine);

} //Fin du module

