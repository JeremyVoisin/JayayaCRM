/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Message
*/

module.exports = function(app, passport, carnet) {

  /* ----- REQUETES GET ----- */
  
  // ========================================================
  // GET messages
  // Permet de recuperer les messages
  // ========================================================
  app.get('/messages', carnet.getMessages);

  // ========================================================
  // GET Date d'un message
  // Permet de recuperer la date du message
  // a partir de l'id du message ":idmessage"
  // ========================================================
  app.get('/messages/:idmessage/date', carnet.getDateMessage);
  
   app.get('/messages/:idmessage/version', carnet.getMessageVersion);

  // ========================================================
  // GET Corps d'un message
  // Permet de recuperer le corps du message
  // a partir de l'id du message ":idmessage"
  // ========================================================
  app.get('/messages/:idmessage/corps', carnet.getCorpsMessage);



  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST Message
  // Permet de creer un nouveau message a partir
  // des parametres POST
  // ========================================================
  app.post('/messages/new', carnet.postMessage);


  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Message
  // Permet de supprimer le message
  // a partir de son id ":identreprise"
  // ========================================================
  app.get('/messages/delete/:idmessage', carnet.deleteMessage);



} //Fin du module

