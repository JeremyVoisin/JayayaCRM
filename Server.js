/********************************************************************
* @author : Team Jayaya
* @project : JayayaCRM
* @date   : mercredi 19 fevrier 2014
*
* Serveur NodeJS de l'application
*/

// Chargement des modules ================================================================
var express = require("express");
var app = express(), server = require('http').createServer(app);
//Gestion de l'authentification
var passport = require('passport');
var dicer = require('dicer');
var multer  = require('multer');
var sock = require('./includes/socket/SocketManager.js')(server);
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');

// Configuration =========================================================================

    app.use(express.static(__dirname));
    app.use(cookieParser('big secret'));
    
    app.use(cookieSession({
      keys: ['jayaya', 'CRMFront']
    }))
  //  app.use(multer());
    //Authentification par Passport
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(multer({dest:'./uploads'}));
    //Support du passage de parametres par URL et par JSON
    
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json({ type: 'application/*+json' })); //Utilise pour les tests unitaires

    //Autorisation de charger la methode POST avec PUT ou DELETE
    app.use(methodOverride());

   app.use(expressSession({ secret: 'keyboard cat', resave:true,saveUninitialized:true }));
  app.use(passport.initialize());
  app.use(passport.session());
//  app.use(app.router);

// Chargement des routes  ================================================================
require('./includes/routes/routes.js')(app, passport);



//========================================================================================
// Creation des signaux socket.io ========================================================
//========================================================================================

sock.addClientSignal("refresh", function(datas){
	DatasBuffer.update(datas.url);
	var oScript = document.createElement('script');
    	oScript.type = 'text/javascript';
    	oScript.id = "func"+datas.url;
    	oScript.text = "("+datas.func+")('"+datas.url+"')";
	document.getElementsByTagName('body')[0].appendChild(oScript);
	document.getElementsByTagName('body')[0].removeChild(document.getElementById("func"+datas.url));
});

sock.addServerSignal('connection', function (socket) {

    sock.sendSignalsToClient(socket);
    
	socket.on('update',function (datas) {
		socket.emit('refresh',{url: datas.url, func: datas.func});
		socket.broadcast.emit('refresh',{url: datas.url, func: datas.func});
		
	});
});

server.listen(8080);
console.log('Serveur en attente sur le port 8080...');
