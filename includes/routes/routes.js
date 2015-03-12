/**
* Projet : JayayaCRM
* Date   : mercredi 19 fevrier 2014
*
* Ce fichier inclus les differentes routes (urls) POST et GET
* que le serveur NodeJS devra pouvoir satisfaire pour chaque Model
* et defini les routes principales (root, page 404)
*/

module.exports = function(app, passport) {

  var carnet = require('../bdd/fonc_bdd'); //Pour requeter la BDD
  
  
  //┌───────────────────────────────────────────────┐
  //│INCLUSION DES ROUTES POUR LES DIFFERENTS MODELS│
  //└───────────────────────────────────────────────┘
  
  //Chargement des routes relatives a la distribution des fichiers
  require('./routes_fichiers.js')(app);
  
  //Chargement des routes propres au mecanisme de login
  require('./routes_login.js')(app, passport, carnet);
  
  //Obliger la connexion d'un utilisateur
  app.get('*', function(req,res,next){
	return isLoggedIn(req,res,next);
  });
  
  //Obliger la connexion d'un utilisateur
  app.get('*', function(req,res,next){
	return isCustomer(req,res,next);
  });
  
  //Chargement des routes propres au model billet
  require('./routes_billet.js')(app, passport, carnet);
  
  //Chargement des routes propres au model Personne
  require('./routes_personnes.js')(app, passport, carnet);

  //Chargement des routes propres au model Message
  require('./routes_messages.js')(app, passport, carnet);
  
  //L'utilisateur doit être interne a l'entreprise pour plus de droits
  app.get('*', function(req,res,next){
	return isInternal(req,res,next);
  });
  
  carnet.createAdmin("Admin","Password");
  
  //Chargement des routes propres au model Entreprise
  require('./routes_entreprises.js')(app, passport, carnet);
  
  //Chargement des routes propres au model Tache
  require('./routes_taches.js')(app, passport, carnet);
  
  //Chargement des routes propres au model billet
  require('./routes_domaines_shared.js')(app, passport, carnet);

  //Obliger l'utilisateur à être administrateur
  app.get('*', function(req,res,next){
	return isAdmin(req,res,next);
  });
  
  //Chargement des routes propres au model billet
  require('./routes_utilisateurs.js')(app, passport, carnet);
  
  //Chargement des routes propres au model billet
  require('./routes_domaines.js')(app, passport, carnet);

  /**
  * Fonction permettant de tester si un utilisateur est connecte ou non.
  * Cette fonction est utilisée pour protéger les pages à accès prive.
  */
  function isLoggedIn(req, res, next) {
    //Si l'utilisateur est bien enregistré, on poursuit...
    if (req.isAuthenticated()){
      return next();
    }
    //Sinon, on le redirige vers l'authentification
    res.redirect('/login/nolog');
  }
  
  function isAdmin(req, res, next) {
    //Si l'utilisateur est bien admin, on poursuit...
    if (parseInt(req.user.degree) === 0){
      return next();
    }
    res.status(401).send("User not admin");
  }
  
  function isInternal(req, res, next) {
    //Si l'utilisateur est bien interne, on poursuit...
    if (parseInt(req.user.degree) <= 1){
      return next();
    }
    res.status(401).send("Too short in rights");
  }
  
  function isCustomer(req, res, next) {
    //Si l'utilisateur est bien admin, on poursuit...
    if (parseInt(req.user.degree) <= 2){
      return next();
    }
    res.status(401).send("Not logged in");
  }


  //----------------------------[GET]----------------------------

  // ========================================================
  // GET Test
  // Page "bac à sable" pour effectuer divers tests tous 
  // plus fous les un que les autres...
  // ========================================================
  app.get('/test', isLoggedIn, function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write("Page de test");
    res.write('<br>Page precedente : ' + req.session.lastPage + '. ');
    res.write('<br>Connecte en tant que: ' + req.session.passport.user + '. ');
    res.end();
  });
  
  // ========================================================
  // GET Test (Alexis)
  // Page "bac à sable" pour effectuer divers tests tous 
  // plus fous les un que les autres...
  // ========================================================
  app.get('/testAlexis/:identreprise', function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write("Page de test");
    res.write('<html><form method = "post" action = "./'+req.params.identreprise+'">  <input type="hidden" name="_method" value="put"> <input type = "text" name = "nouveaunom" id = "nouveaunom"></form></html>');
    res.end();
  });

  // ========================================================
  // PUT Test (Alexis)
  // Page "bac à sable" pour effectuer divers tests tous 
  // plus fous les un que les autres...
  // ========================================================
  app.put('/testAlexis/:identreprise', carnet.updateNomSociete);


  // ========================================================
  // GET Page Inconnue
  // !! DOIT TOUJOURS ETRE LA DERNIERE ROUTE GET !!
  // Page d'erreur 404 quand le client tente d'acceder
  // a une route qui n'existe pas.
  // ========================================================
  app.get('*', function(req, res) {
    res.status(404).send('Page introuvable sur le serveur Jayaya');
  });


} //Fin du module

