/**
* Projet : JayayaCRM
* Date   : mercredi 19 fevrier 2014
*
* Ce fichier decrit les differents schemas de la BDD MongoDB
* et cree pour chaqun d'entre eux un model qui sera exportable.
*/


var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectID;

module.exports = function(mongoose) {

  //┌─────────────────────┐
  //│CREATION DES SCHEMAS │
  //└─────────────────────┘

  var societeSchema = new Schema({
    nom : {type:String, unique:true},
    nSIREN : String,
    site_web : String,
    tel: String,
    fax: String,
    mail: String,
    domaine : { type: [Schema.Types.ObjectId], ref: 'Domaine'},
    adresse : { type: Schema.Types.ObjectId, ref: 'Adresse'},
	commentaire : String,
    note : [String]
  });
  
  var domaineSchema = new Schema({
	nom : String,
	couleur : String
  });

  var villeSchema = new Schema({
    nomVille : String,
    pays: String,
    code_postal : String
  });

  var adresseSchema = new Schema({
    num : String,
    voie : String,
    nomVoie : String,
    ville : { type: Schema.Types.ObjectId, ref: 'Ville' }
  });

  var billetSchema = new Schema({
    titre : String,
	isOpen: Boolean
  });

  var messageSchema = new Schema({
	idB : { type: Schema.Types.ObjectId, ref: 'Billet' },
    idP : { type: Schema.Types.ObjectId, ref: 'Personne' },
    corpsMsg : String,
    msgType: {type: String, default: "default"},
    date : { type : Date, default : Date.now }
  });
  
  var participationSchema = new Schema({
  	idB: { type: [Schema.Types.ObjectId], ref: 'Billet' }
  });

  var tacheSchema = new Schema({
    idU : { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    titre : String,
    date : { type : Date, default : Date.now },
    lieu : String,
    statut : String,
    description : String
  });

  var personneSchema = new Schema({
    idS : { type: Schema.Types.ObjectId, ref: 'Societe' },
    nom : String,
    prenom : String,
    statut : String,
    tel : String,
    fax : String,
    mail : {type:String, unique:true},
	commentaire : String,
    note : [String]
  });
  
  var noteSchema = new Schema({
    idS : { type: Schema.Types.ObjectId, ref :'Societe' },
    idP : { type: Schema.Types.ObjectId, ref: 'Personne' },
    date : { type : Date, default : Date.now },
    corps : String
  });


  var utilisateurSchema = new Schema({
    login: {type : String, unique:true},
	degree: {type: String, default:"2"},
	mdp : String,
	participation: {type: Schema.Types.ObjectId, ref: 'Participation' },
	idP: {type: Schema.Types.ObjectId, ref: 'Personne' }
  });


  //┌────────────────────┐
  //│CREATION DES MODELS │
  //└────────────────────┘

  var models = {
    societeModel : mongoose.model('Societe', societeSchema),
	domaineModel : mongoose.model('Domaine', domaineSchema),
    villeModel : mongoose.model('Ville', villeSchema),
    adresseModel : mongoose.model('Adresse', adresseSchema),
    billetModel : mongoose.model('Billet', billetSchema),
    messageModel : mongoose.model('Message', messageSchema),
    tacheModel : mongoose.model('Tache', tacheSchema),
    personneModel : mongoose.model('Personne', personneSchema),
    utilisateurModel : mongoose.model('Utilisateur', utilisateurSchema),
    participationModel : mongoose.model('Participation', participationSchema),
    noteModel : mongoose.model('Note', noteSchema)
  };

  return models;

}

