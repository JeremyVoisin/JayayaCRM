/**
* Projet : JayayaCRM
* Date   : mercredi 19 fevrier 2014
*
* Ce script permet de creer les collections necessaires a l'application dans
* la BDD MongoDB dans le respect des models decrits dans le fichier models.js
*/


var mongoose = require('mongoose');
var models = require('./models')(mongoose); //Inclusion des models


//┌──────────────────┐
//│CONNEXION A LA BDD│
//└──────────────────┘
// (le deamon mongod doit etre lance)

mongoose.connect('mongodb://localhost/CRM', function(err)
{
    if (err)
    {
        throw new Error('\n /!\\ ERREUR : impossible de se connecter a la base de donnees !! /!\\ \n\n');
    }
});


//┌──────────────────────────────────┐
//│CREATION DES INSTANCES DES MODELS │
//└──────────────────────────────────┘

//On cree les instances
var soc = new models.societeModel();
var bil = new models.billetModel();
var tac = new models.tacheModel();
var msg = new models.messageModel();
var per = new models.personneModel();
var con = new models.utilisateurModel();
var vil = new models.villeModel();
var adr = new models.adresseModel();
var not = new models.noteModel();
var dom = new models.domaineModel();
var par = new models.participationModel();

var nbreCollection=11; //Variable pour tester si la connection a mongoDB doit etre interrompue


//On les sauvegardes puis on les supprime
//Cela permet de creer les "tables" de la BDD
soc.save(function (err) {
  if (err) { throw err; }
  soc.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

par.save(function (err) {
  if (err) { throw err; }
  par.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

dom.save(function (err) {
  if (err) { throw err; }
  dom.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

bil.save(function (err) {
  if (err) { throw err; }
  bil.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

tac.save(function (err) {
  if (err) { throw err; }
  tac.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

msg.save(function (err) {
  if (err) { throw err; }
  msg.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

per.save(function (err) {
  if (err) { throw err; }
  per.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

con.save(function (err) {
  if (err) { throw err; }
  con.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

vil.save(function (err) {
  if (err) { throw err; }
  vil.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

adr.save(function (err) {
  if (err) { throw err; }
  adr.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

not.save(function (err) {
  if (err) { throw err; }
  not.remove();
  nbreCollection=nbreCollection-1;
  if(nbreCollection==0) { mongoose.connection.close(); }
});

