/**
* Projet : JayayaCRM
* Date   : jeudi 20 fevrier 2014
*
* Ce fichier permet de definir les differentes routes propres au mecanisme d'authentification
*/

module.exports = function(app, passport, carnet) {

  var LocalStrategy = require('passport-local').Strategy;

  //┌───────────────────────────┐
  //│DEFINITION DE LA STRATEGIE │
  //│D'AUTHENTIFICATION         │
  //│     __                    │
  //│    /o \_____              │
  //│    \__/-="="`             │
  //│                           │
  //└───────────────────────────┘
  passport.use(new LocalStrategy(function(username,password,done){
  	return carnet.login(username,password,done);  
  }));


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  /* ----- REQUETES GET ----- */

  // ========================================================
  // GET Deconnexion
  // Permet de deconnecter l'utilisateur
  // ========================================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.status(200).send('User logged out');
  });
  
  app.get('/login/nolog',function(req,res){
	res.status(401).send("User not logged in");
  });
  
  app.get('/login/success',function(req,res){
	res.status(200).send("User connected");
  });
  
  app.get('/login/who',function(req,res){
  	res.status(200).send({login: req.user.login});
  });
  
  app.get('/login/rank',function(req,res){
  	res.status(200).send(req.user.degree);
  });
  
  app.get('/login/personne',function(req,res){
  	res.status(200).send({idP: req.user.idP});
  });
  
  app.get('/login/is',function(req,res){
  		if(!req.isAuthenticated())
			res.redirect('/login/nolog');
      	else
	      	res.redirect('/login/success');
  });


  /* ----- REQUETES POST ----- */

  // ========================================================
  // POST Login
  // Permet de récupérer les informations de login saisies
  // dans le formulaire de connexion
  // ========================================================
  app.post('/login', passport.authenticate('local',{failureRedirect:'/login/nolog',successRedirect:'/login/success'}));


} //Fin du module

