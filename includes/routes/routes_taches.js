/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Tache
*/

module.exports = function(app, passport, carnet) {

  /* ----- REQUETES GET ----- */

  // ========================================================
  // GET Liste des taches
  // Permet de renvoyer toutes les taches de
  // la base de donnees
  // ========================================================
  app.get('/taches', carnet.getTaches);

  // ========================================================
  // GET Informations sur une tache
  // Permet de renvoyer les informations
  // de la tache ":id"
  // ========================================================
  app.get('/taches/:idtache', carnet.getTache);
  
  
  //Récupération de la version d'une tache
  app.get('/taches/:idtache/version', carnet.getTacheVersion);

  

  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST Entreprise
  // Permet de creer une nouvelle entreprise a partir
  // des parametres POST
  // ========================================================
  app.post('/taches/new', carnet.postTache);
  
  
  
   /* ----- REQUETES PUT ----- */
   
  // ========================================================
  // PUT Titre d'une tache
  // Permet de mettre a jour le titre d'une tache
  // ========================================================
  app.put('/taches/:idtache/titre', carnet.updateTitreTache);
 
  // ========================================================
  // PUT Lieu d'une tache
  // Permet de mettre a jour le lieu d'une tache
  // ========================================================
  app.put('/taches/:idtache/lieu', carnet.updateLieuTache);
  
  // ========================================================
  // PUT Date d'une tache
  // Permet de mettre a jour la date d'une tache
  // ========================================================
  app.put('/taches/:idtache/date', carnet.updateDateTache);
  
  // ========================================================
  // PUT Description d'une tache
  // Permet de mettre a jour la description d'une tache
  // ========================================================
  app.put('/taches/:idtache/description', carnet.updateDescriptionTache);


  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Tache
  // Permet de supprimer une tache
  // a partir de son id ":idtache"
  // ========================================================
  app.delete('/taches/:idtache', carnet.deleteTache);


} //Fin du module

