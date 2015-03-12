/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Personne
*/

module.exports = function(app, passport, carnet) {

  /* ----- REQUETES GET ----- */

  // ========================================================
  // GET Personnes
  // Permet de renvoyer la liste de toutes
  // les personnes
  // ========================================================
  app.get('/personnes', carnet.getPersonnes);


  // ========================================================
  // GET Informations sur une personne
  // Permet de renvoyer les informations
  // de la personne ":idpersonne"
  // ========================================================
  app.get('/personnes/:idpersonne', carnet.getPersonne);
  
  app.get('/personnes/:idpersonne/version', carnet.getPersonneVersion);


  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST Personne
  // Permet de creer une nouvelle personne a partir
  // des parametres POST
  // ========================================================
  app.post('/personnes/new', carnet.postPersonne);
  
  
  /* ----- REQUETES PUT ----- */
   
  // ========================================================
  // PUT Statut d'une personne
  // Permet de mettre a jour le statut d'une personne
  // ========================================================
  app.put('/personnes/:idpersonne/statut', carnet.updateStatutPersonne);
  
  // ========================================================
  // PUT Statut d'une personne
  // Permet de mettre a jour le tel d'une personne
  // ========================================================
  app.put('/personnes/:idpersonne/tel', carnet.updateTelPersonne);
  
  // ========================================================
  // PUT Fax d'une personne
  // Permet de mettre a jour le fax d'une personne
  // ========================================================
  app.put('/personnes/:idpersonne/fax', carnet.updateFaxPersonne);
  
  // ========================================================
  // PUT Email d'une personne
  // Permet de mettre a jour le mail d'une personne
  // ========================================================
  app.put('/personnes/:idpersonne/mail', carnet.updateMailPersonne);
  
  // ========================================================
  // PUT Commentaire d'une personne
  // Permet de mettre a jour le commentaire d'une personne
  // ========================================================
  app.put('/personnes/:idpersonne/commentaire', carnet.updateCommentairePersonne);


  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Personne
  // Permet de supprimer la personne
  // a partir de son id ":idpersonne"
  // ========================================================
  app.delete('/personnes/delete/:idpersonne', carnet.deletePersonne);


} //Fin du module

