/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Message
*/

module.exports = function(app, passport, carnet) {

  /* ----- REQUETES GET ----- */
  
  // ========================================================
  // GET billets
  // Permet de recuperer les billets
  // ========================================================
  app.get('/billets', carnet.getBillets);
  
  // ========================================================
  // GET message de personne
  // Permet de recuperer les billets qui concernent une personne
  // ========================================================
  app.get('/billets/personne', carnet.getBilletsPersonne);
  
  // ========================================================
  // GET billet
  // Permet de recuperer un billet
  // ========================================================
  app.get('/billets/:idbillet', carnet.getBillet);
  
  // ========================================================
  // GET participants billet
  // Permet de recuperer la liste des participants d'un billet
  // ========================================================
  app.get('/billets/:idbillet/participants', carnet.getBilletParticipants);
  
  // ========================================================
  // GET version billet
  // Permet de recuperer la version d'un billet
  // ========================================================
  app.get('/billets/:idbillet/version', carnet.getBilletVersion);
  
  // ========================================================
  // GET messages
  // Permet de recuperer les messages d'un billet
  // ========================================================
  app.get('/billets/:idbillet/messages', carnet.getBilletMessages);
  
  
  // ========================================================
  // GET nombre de messages
  // Permet de recuperer le nombre de messages d'un billet
  // ========================================================
  app.get('/billets/:idbillet/messages/count',carnet.getBilletMessageCount);

  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST billet
  // Permet de creer un nouveau billet a partir
  // des parametres POST
  // ========================================================
  app.post('/billets/new', carnet.postBillet);


  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Message
  // Permet de supprimer le message
  // a partir de son id ":identreprise"
  // ========================================================
  app.delete('/billets/delete/:idbillet', carnet.deleteBillet);



} //Fin du module