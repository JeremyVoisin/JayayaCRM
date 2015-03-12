/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au model Entreprise
*/

module.exports = function(app, passport, carnet) {

  /* ----- REQUETES GET ----- */

  // ========================================================
  // GET Liste des entreprises
  // Permet de renvoyer toutes les entreprises de
  // la base de donnees
  // ========================================================
  app.get('/entreprises', carnet.getSocietes);

  // ========================================================
  // GET Informations sur une entreprise
  // Permet de renvoyer les informations
  // de l'entreprise ":id"
  // ========================================================
  app.get('/entreprises/:identreprise', carnet.getSociete);

  // ========================================================
  // GET Nom d'une entreprise
  // Permet de recuperer le nom d'une entreprise a partir
  // de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/nom', carnet.getNomSociete);
  
  // ========================================================
  // GET Version d'une entreprise
  // Permet de recuperer la version d'une entreprise a partir
  // de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/version', carnet.getSocieteVersion);
  
  // ========================================================
  // GET Contacts d'une entreprise
  // Permet de recuperer les contacts d'une entreprise a partir
  // de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/contacts', carnet.getContactSociete);

  // ========================================================
  // GET SIREN d'une entreprise
  // Permet de recuperer le numero SIREN d'une entreprise a
  // partir de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/siren', carnet.getSirenSociete);
  
  // ========================================================
  // GET Domaines d'une entreprise
  // Permet de recuperer les domaines d'activitees d'une entreprise
  // a partir de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/domaines', carnet.getDomainesSociete);
  
  // ========================================================
  // GET Domaine d'activite d'une entreprise
  // Permet de recuperer l'adresse d'une entreprise
  // a partir de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/adresse', carnet.getAdresseSociete);

  // ========================================================
  // GET Site Web d'une entreprise
  // Permet de recuperer le site web d'une entreprise
  // a partir de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/siteweb', carnet.getSiteWebSociete);

  // ========================================================
  // GET Notes sur une entreprise
  // Permet de recuperer les notes prises sur une entreprise
  // a partir de son id ":identreprise"
  // ========================================================
  app.get('/entreprises/:identreprise/notes', carnet.getNotesSociete);


  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST Entreprise
  // Permet de creer une nouvelle entreprise a partir
  // des parametres POST
  // ========================================================
  app.post('/entreprises/new', carnet.postSociete);
  
  // ========================================================
  // POST Entreprise notes
  // Permet de creer une nouvelle entreprise a partir
  // des parametres POST
  // ========================================================
  app.post('/entreprises/notes/new', carnet.addSocieteComment);
  
  // ========================================================
  // POST Entreprise domaine
  // Permet d'ajouter un domaine à l'entreprise a partir
  // des parametres POST
  // ========================================================
  app.post('/entreprises/:identreprise/domaines/new', carnet.addSocieteDomaine);
  
  
  /* ----- REQUETES PUT ----- */
  
  // ========================================================
  // PUT Siren societe
  // Permet de mettre a jour le numero de siren d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/siren', carnet.updateSirenSociete);
  
  // ========================================================
  // PUT CP societe
  // Permet de mettre a jour le code postal d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/code_postal', carnet.updateCPSociete);
  
  // ========================================================
  // PUT Ville societe
  // Permet de mettre a jour la ville d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/ville', carnet.updateVilleSociete);
  
  // ========================================================
  // PUT NumVoie societe
  // Permet de mettre a jour le numero de voie d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/num_voie', carnet.updateNumVoieSociete);
  
  // ========================================================
  // PUT TypeVoie societe
  // Permet de mettre a jour le type de voie d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/type_voie', carnet.updateTypeVoieSociete);
  
  // ========================================================
  // PUT NomVoie societe
  // Permet de mettre a jour le nom de voie d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/nom_voie', carnet.updateNomVoieSociete);
  
  // ========================================================
  // PUT Pays societe
  // Permet de mettre a jour le pays d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/pays', carnet.updatePaysSociete);
  
  // ========================================================
  // PUT Mail societe
  // Permet de mettre a jour le mail d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/mail', carnet.updateMailSociete);
  
  // ========================================================
  // PUT Tel societe
  // Permet de mettre a jour le telephone d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/tel', carnet.updateTelSociete);
  
  // ========================================================
  // PUT Fax societe
  // Permet de mettre a jour le fax d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/fax', carnet.updateFaxSociete);
  
  // ========================================================
  // PUT Site Web societe
  // Permet de mettre a jour le site web d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/site_web', carnet.updateSiteWebSociete);
  
  // ========================================================
  // PUT Commentaire societe
  // Permet de mettre a jour le commentaire d'une entreprise
  // ========================================================
  app.put('/entreprises/:identreprise/commentaire', carnet.updateCommentaireSociete);


  /* ----- REQUETES DELETE ----- */

  // ========================================================
  // GETDELETE Entreprise
  // Permet de supprimer l'entreprise
  // a partir de son id ":identreprise"
  // ========================================================

  app.delete('/entreprises/:identreprise', carnet.deleteSociete);
  
  app.delete('/entreprises/:identreprise/domaines/:iddomaine', carnet.deleteDomaineSociete);


} //Fin du module

