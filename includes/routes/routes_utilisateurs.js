/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Tache
*/

module.exports = function(app, passport, carnet) {

  // Recuperation des utilisateurs Admin
  app.get('/utilisateurs/alladmin', carnet.getUtilisateursDegree);
  
  // ========================================================
  // GET Liste des taches
  // Permet de renvoyer toutes les taches de
  // la base de donnees
  // ========================================================
  app.get('/utilisateurs', carnet.getUtilisateurs);

  // ========================================================
  // GET Informations sur une tache
  // Permet de renvoyer les informations
  // de la tache ":id"
  // ========================================================
  app.get('/utilisateurs/:idutilisateur', carnet.getUtilisateur);
  
  
  //Récupération de la version d'une tache
  app.get('/utilisateurs/:idutilisateur/version', carnet.getUtilisateurVersion);
  

  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST Entreprise
  // Permet de creer une nouvelle entreprise a partir
  // des parametres POST
  // ========================================================
  app.post('/utilisateurs/new', carnet.createUtilisateur);
  
  
  /* ----- REQUETES PUT ----- */
   
  // ========================================================
  // PUT Login d'un utilisateur
  // Permet de mettre a jour le login d'un utilisateur
  // ========================================================
  app.put('/utilisateurs/:iduser/login', carnet.updateLoginUtilisateur);
  
  // ========================================================
  // PUT Nom d'un utilisateur
  // Permet de mettre a jour le nom d'un utilisateur
  // ========================================================
  app.put('/utilisateurs/:iduser/nom', carnet.updateNomUtilisateur);
  
  // ========================================================
  // PUT Prenom d'une personne
  // Permet de mettre a jour le prenom d'une personne
  // ========================================================
  app.put('/utilisateurs/:iduser/prenom', carnet.updatePrenomUtilisateur);
  
  // ========================================================
  // PUT Statut d'une personne
  // Permet de mettre a jour le statut d'une personne
  // ========================================================
  app.put('/utilisateurs/:iduser/statut', carnet.updateStatutUtilisateur);
  
  // ========================================================
  // PUT Telephone d'une personne
  // Permet de mettre a jour le telephone d'une personne
  // ========================================================
  app.put('/utilisateurs/:iduser/tel', carnet.updateTelUtilisateur);
  
  // ========================================================
  // PUT Fax d'une personne
  // Permet de mettre a jour le fax d'une personne
  // ========================================================
  app.put('/utilisateurs/:iduser/fax', carnet.updateFaxUtilisateur);
  
  // ========================================================
  // PUT Mail d'une personne
  // Permet de mettre a jour le mail d'une personne
  // ========================================================
  app.put('/utilisateurs/:iduser/mail', carnet.updateMailUtilisateur);

  
  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Utilisateur
  // Permet de supprimer l'utilisateur
  // a partir de son id ":idutilisateur"
  // ========================================================
  app.delete('/utilisateurs/:iduser', carnet.deleteUtilisateur);


} //Fin du module

