/**
* Projet : JayayaCRM
* Date   : mercredi 19 fevrier 2014
*
* Ce fichier regroupe les differentes requetes vers la BDD MongoDB.
* Il permet d'executer les differentes operations CRUD necessaires a l'application.
*/


var mongoose = require('mongoose');
var models = require('./models')(mongoose); //Inclusion des models
var config = require('../config/config');


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

exports.login = function(username,password,done){
	models.utilisateurModel.findOne({ login: username, mdp: password }, function(err, user) {
      		if (err) { 
        		return done(err); 
      		}
      		if (!user) {
        		return done(null, false, { message: 'Incorrect username or password.' });
      		}
      		return done(null, user);
    	});
};


/* ============[ FONCTIONS SUR LE MODEL SOCIETE ]============ */


// --- Fonctions de creation : CREATE ---

/*
* Fonction permettant d'ajouter une nouvelle societe dans la base de donnees
* a partir des informations contenues dans le corps de la requete req.
*/
exports.postSociete = function(req, res)
{ 
    //On cree une nouvelle 
    var nouvelleSociete = new models.societeModel();
    var adresse = new models.adresseModel();
    var ville;
    
    models.villeModel.find({nomVille: req.body.ville, code_postal: req.body.cp, pays: req.body.pays}, function (err, villes)
    {
    	var id;
    	if(villes.length === 0){
    		ville = new models.villeModel();
    		ville.nomVille = req.body.ville;
    		ville.code_postal = req.body.cp;
    		ville.pays = req.body.pays;
    		ville.save(function(err,p){
    			if(err){
    				res.status(500).send("Erreur dans postSociete: impossible de créer la ville");
    			}
    			else{
    				ville = p;
    			}
    		});
    	}else{
    		ville = villes[0];
    	}
    	adresse.ville = ville;
    	adresse.num = req.body.numVoie;
    	adresse.voie = req.body.voie;
    	adresse.nomVoie = req.body.nomVoie;
   	 	adresse.save(function(err, adr){
    		if(err){
    			res.status(500).send("Erreur dans postSociete: impossible de créer l'adresse");
    		}
    		else adresse = adr;
   		});
    		
    	//On renseigne ses champs
    	nouvelleSociete.nom = req.body.nom;
    	nouvelleSociete.nSIREN = req.body.siren;
    	nouvelleSociete.site_web = req.body.site;
    	nouvelleSociete.commentaire = req.body.commentaire;
    	nouvelleSociete.tel = req.body.tel;
    	nouvelleSociete.fax = req.body.fax;
    	nouvelleSociete.mail = req.body.mail;
    	nouvelleSociete.adresse = adresse;

    	//On la sauvegarde dans MongoDB
    	nouvelleSociete.save(function (err,ents)
    	{
        	if (err)
        	{
        	    res.status(500).send(" Erreur dans postSociete : impossible d'ajouter la nouvelle societe");
        	}
			else
			{
        	    res.status(200).send("Entreprise ajoutée avec succès !");
			}
    	});
    });
};

exports.addSocieteComment = function(req,res){
	note = new models.noteModel();
	note.idS = req.body.idS;
	note.idP = req.user.idP;
	note.corps = req.body.corps;
	
	note.save(function(err){
		if(err)res.status(500).send("Erreur dans l'update");
		else res.status(200).send("Ajout réalisé avec succès");
	});
};

exports.addSocieteDomaine = function(req,res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, entreprise)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans addSocieteDomaine : impossible de trouver l'entreprise");
		}
        else
		{
			entreprise.domaine.push(req.body.domaine);
			entreprise.save();
  		    res.status(200).send('Domaine ajouté avec succès');
		}
    });
};


// --- Fonctions de lecture : READ ---

/*
* Fonction permettant de renvoyer la liste de toutes les societes
* contenues dans la BDD
*/
exports.getSocietes = function(req, res)
{
    models.societeModel.find({},{nom:1, _id:1}, function (err, entreprises)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getSocietes : impossible de trouver la liste des entreprises");
	}
        else
	{
	    res.status(200).send(entreprises);
	}
    });
};



/*
* Fonction permettant de renvoyer la totalite des informations relatives
* a la societe dont l'id est passe dans les parametres de la requete req.
*/
exports.getSociete = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise}, function (err, entreprises)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getSociete : impossible de trouver l'entreprise");
	}
        else
	{
	    res.status(200).send(entreprises);
	}
    });
};


exports.getSocieteVersion = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise},{__v:1}, function (err, entreprises)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getSociete : impossible de trouver la version de l'entreprise");
	}
        else
	{
	    res.status(200).send(entreprises);
	}
    });
};


/*
* Fonction permettant de renvoyer les domaines relatifs
* a la societe dont l'id est passe dans les parametres de la requete req.
*/
exports.getDomainesSociete = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise}, {domaine : 1, _id : 0}, function (err, domaines)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getDomainesSociete : impossible de trouver les domaines de l'entreprise");
		}
        else
		{
			res.status(200).send(domaines);
		}
    });
};



/*
* Fonction permettant de renvoyer la totalite des informations relatives
* a la societe dont l'id est passe dans les parametres de la requete req.
*/
exports.getAdresseSociete = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.find({'_id' : societe[0].adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.status(500).send(" Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					models.villeModel.find({'_id' : adresse[0].ville}, function (err, ville)
   					{
   						if(err)
        				{
		          			res.status(500).send(" Erreur dans getSociete : impossible de trouver la l'adresse");
						}
						else
						{
   							var adr = {lieu: adresse[0], ville: ville[0]};
	    					res.status(200).send(adr);
	    				}
	    			});
	    		}
	    	});
		}
    });
};

/*
* Fonction permettant de renvoyer le nom de la societe dont l'id est passe dans
* les parametres de la requete req.
*/
exports.getNomSociete = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise}, {nom : 1, _id : 0}, function (err, nom)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getNomSociete : impossible de trouver le nom de l'entreprise");
	}
        else
	{
	    res.status(200).send(nom);
	}
    });
};

/*
* Fonction permettant de renvoyer le numéro SIREN de la societe dont l'id est passe dans
* les parametres de la requete req.
*/
exports.getSirenSociete = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise}, {nSIREN : 1, _id : 0}, function (err, siren)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getSirenSociete : impossible de trouver le numero SIREN de l'entreprise");
	}
        else
	{
	    res.status(200).send(siren);
	}
    });
};

/*
* Fonction permettant de renvoyer le site web de la societe dont l'id est passe dans
* les parametres de la requete req.
*/
exports.getSiteWebSociete = function(req, res)
{
    models.societeModel.find({'_id' : req.params.identreprise}, {site_web : 1, _id : 0}, function (err, siteweb)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getSiteWebSociete : impossible de trouver le site web de l'entreprise");
	}
        else
	{
	    res.status(200).send(siteweb);
	}
    });
};

/*
* Fonction permettant de renvoyer les contacts d'une societe dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getContactSociete = function(req, res)
{
    models.personneModel.find({'idS' : req.params.identreprise}, {idS : 0}, function (err, contacts)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getContactSociete : impossible de trouver les contacts de l'entreprise");
		}
        else
		{
		    res.status(200).send(contacts);
		}
    });
};

/*
* Fonction permettant de renvoyer les notes prises sur la societe dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getNotesSociete = function(req, res)
{
    models.noteModel.find({'idS' : req.params.identreprise}, function (err, notes)
    {
        if(err)
        {
            res.status(500).send(" Erreur dans getNotesSociete : impossible de trouver les notes sur l'entreprise");
		}
        else
		{
		    res.status(200).send( notes);
		}
    });
};

// --- Fonctions de MaJ : PUT ---

// fct pour mettre a jour le nom de la société
exports.updateNomSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, {$set: {nom: req.body.nouveaunom}}, function (err,societe)
	{
		if(err)
		{
		    res.status(500).send(" Erreur dans updateNomSociete : impossible de modifier le nom de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.nom = req.body.nouveaunom;
			societe.save();
  		    res.status(200).send('Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le siren de la société
exports.updateSirenSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, function (err,societe)
	{
		if(err)
		{
		    res.status(500).send(" Erreur dans updateSirenSociete : impossible de modifier le siren de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.nSIREN = req.body.siren;
			societe.save();
  		    res.status(200).send('Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le mail de la société
exports.updateMailSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, function (err,societe)
	{
		if(err)
		{
		    res.status(500).send(" Erreur dans updateMailSociete : impossible de modifier le siren de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.mail = req.body.mail;
			societe.save();
  		    res.status(200).send('Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le telephone de la société
exports.updateTelSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, function (err,societe)
	{
		if(err)
		{
		    res.status(500).send(" Erreur dans updateTelSociete : impossible de modifier le siren de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.tel = req.body.tel;
			societe.save();
  		    res.status(200).send('Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le fax de la société
exports.updateFaxSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, function (err,societe)
	{
		if(err)
		{
		    res.status(500).send(" Erreur dans updateFaxSociete : impossible de modifier le siren de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.fax = req.body.fax;
			societe.save();
  		    res.status(200).send('Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le site web de la société
exports.updateSiteWebSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, function (err,societe)
	{
		if(err)
		{
		    res.status(500).send(" Erreur dans updateSiteWebSociete : impossible de modifier le siren de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.site_web = req.body.site_web;
			societe.save();
  		    res.send(200, 200, 'Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le commentaire de la société
exports.updateCommentaireSociete = function(req, res){
	models.societeModel.findOne({'_id':req.params.identreprise}, function (err,societe)
	{
		if(err)
		{
		    res.send(500, " Erreur dans updateCommentaireSociete : impossible de modifier le siren de la société" + err);
		}
		else
		{
			societe.__v++;
			societe.commentaire = req.body.commentaire;
			societe.save();
  		    res.send(200, 200, 'Société modifiée avec succès');
		}
	});
};

// fct pour mettre a jour le Code Postal de la société
exports.updateCPSociete = function(req, res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.send(500, " Erreur dans updateCPSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.findOne({'_id' : societe.adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					models.villeModel.findOne({'_id' : adresse.ville}, function (err, ville)
   					{
   						if(err)
        				{
		          			res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
						}
						else
						{
   							societe.__v++;
							societe.save();
							ville.code_postal = req.body.code_postal;
							ville.save();
							res.send(200, 200, 'Société modifiée avec succès');
	    				}
	    			});
	    		}
	    	});
		}
    });
};

// fct pour mettre a jour la ville de la société
exports.updateVilleSociete = function(req, res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.send(500, " Erreur dans updateVilleSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.findOne({'_id' : societe.adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					models.villeModel.findOne({'_id' : adresse.ville}, function (err, ville)
   					{
   						if(err)
        				{
		          			res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
						}
						else
						{
   							societe.__v++;
							societe.save();
							ville.nomVille = req.body.nomVille;
							ville.save();
							res.send(200, 200, 'Société modifiée avec succès');
	    				}
	    			});
	    		}
	    	});
		}
    });
};

// fct pour mettre a jour le numero de voie de la société
exports.updateNumVoieSociete = function(req, res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.send(500, " Erreur dans updateNumVoieSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.findOne({'_id' : societe.adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					societe.__v++;
					societe.save();
					adresse.num = req.body.num;
					adresse.save();
					res.send(200, 200, 'Société modifiée avec succès');
	    		}
	    	});
		}
    });
};

// fct pour mettre a jour le type de voie de la société
exports.updateTypeVoieSociete = function(req, res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.send(500, " Erreur dans updateTypeVoieSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.findOne({'_id' : societe.adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					societe.__v++;
					societe.save();
					adresse.voie = req.body.voie;
					adresse.save();
					res.send(200, 200, 'Société modifiée avec succès');
	    		}
	    	});
		}
    });
};

// fct pour mettre a jour le nom de voie de la société
exports.updateNomVoieSociete = function(req, res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.send(500, " Erreur dans updateNomVoieSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.findOne({'_id' : societe.adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					societe.__v++;
					societe.save();
					adresse.nomVoie = req.body.nomVoie;
					adresse.save();
					res.send(200, 200, 'Société modifiée avec succès');
	    		}
	    	});
		}
    });
};

// fct pour mettre a jour la pays de la société
exports.updatePaysSociete = function(req, res){
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, societe)
    {
        if(err)
        {
            res.send(500, " Erreur dans updatePaysSociete : impossible de trouver la l'adresse");
		}
        else
		{
	    	models.adresseModel.findOne({'_id' : societe.adresse}, function (err, adresse)
   			{
   				if(err)
        		{
		            res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
				}
				else
				{
					models.villeModel.findOne({'_id' : adresse.ville}, function (err, ville)
   					{
   						if(err)
        				{
		          			res.send(500, " Erreur dans getSociete : impossible de trouver la l'adresse");
						}
						else
						{
   							societe.__v++;
							societe.save();
							ville.pays = req.body.pays;
							ville.save();
							res.send(200, 200, 'Société modifiée avec succès');
	    				}
	    			});
	    		}
	    	});
		}
    });
};



// --- Fonctions de suppression : DELETE ---

/*
* Fonction permettant de supprimer une societe dont l'id est passe
* dans les parametres de la requete req.
*/
//TODO
exports.deleteSociete = function(req, res)
{
    models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, entreprise)
    {
        if(err)
        {
            res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
		}
        else
		{
			// Suppression des commentaires lies a l'entreprise
			models.noteModel.remove({'idS': entreprise._id},function(err){
				if(err)
					res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
			});
			
			// Suppression de l'adresse de l'entreprise
			models.adresseModel.findOne({'_id': entreprise.adresse},function(err, adresse){
				if(err)
					res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
				else {
					models.villeModel.remove({'_id': adresse.ville},function(err){
						if(err)
							res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
					});
					
					models.adresseModel.remove({'_id': entreprise.adresse},function(err){
						if(err)
							res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
					});
				}
			});
			
			// Suppression de l'entreprise
			models.societeModel.remove({'_id': entreprise._id},function(err){
				if(err)
					res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
			});
			
			// Maj de l'id de l'entreprise des contacts liés
			models.personneModel.update({'idS' : req.params.identreprise},{$set: {'idS': null}}, function (err) {
				if(err)
					res.send(500, " Erreur dans deleteSociete : impossible de supprimer l'entreprise");
			});
			
			res.send(200, "Entreprise supprimée avec succès");
		}
    })

};

/*
* Fonction permettant de supprimer un utilisateur dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deleteUtilisateur = function(req, res)
{
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer l'utilisateur" + err);
		else{
			// Suppression des messages lies a l'utilisateur
			/*models.messageModel.remove({'idP': user.idP},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les messages de l'utilisateur" + err);
			});
			
			// Suppression des notes lies a l'utilisateur
			models.noteModel.remove({'idP': user.idP},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les notes de l'utilisateur" + err);
			});*/
			
			// Suppression des taches lies a l'utilisateur
			models.tacheModel.remove({'idU': req.params.iduser},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les taches de l'utilisateur" + err);
			});
			
			// Suppression des participations de l'utilisateur
			models.participationModel.remove({'_id': user.participation},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les participations" + err);
			});
 			
			// Suppression des infos Personne de l'utilisateur
			models.personneModel.remove({'_id': user.idP},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer l'utilisateur" + err);
			});
			
			// Suppression de l'utilisateur
			models.utilisateurModel.remove({'_id' : req.params.iduser}, function (err)
			{
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer l'utilisateur");
				else
					res.send(200, "Utilisateur supprimé avec succès");
			});
  		}
	});
};


exports.deleteDomaineSociete = function(req, res)
{
	
	models.societeModel.findOne({'_id' : req.params.identreprise}, function (err, entreprise)
    {
        if(err)
        {
            res.send(500, " Erreur dans deleteDomaineSociete : impossible de trouver l'entreprise");
		}
        else
		{
			var index = entreprise.domaine.indexOf(req.params.iddomaine);
			if(index > -1) entreprise.domaine.splice(index,1);
			entreprise.save();
  		    res.send(200, 200, 'Domaine supprimé avec succès');
		}
    });

};



/* ============[ FONCTIONS SUR LE MODEL DOMAINE ]============ */


// --- Fonctions de creation : CREATE ---

/*
* Fonction permettant d'ajouter un nouveau centre d'interet a une societe
* a partir des informations contenues dans le corps de la requete req.
*/
exports.postDomaine = function(req, res)
{
    //On cree une nouveau domaine
    var nouveauDomaine = new models.domaineModel();

    //On renseigne ses champs
    nouveauDomaine.nom = req.body.nom;
    nouveauDomaine.couleur = req.body.couleur;
	
    //On la sauvegarde dans MongoDB
    nouveauDomaine.save(function (err,domaine)
    {
        if (err)
        {
            res.send(500, " Erreur dans postDomaine : impossible d'ajouter le nouveau domaine" + err);
        }
		else
		{
        	res.send(200, "Domaine ajouté avec succès !");
		}
    });
};

// --- Fonctions de lecture : READ ---

/*
* Fonction permettant de renvoyer les domaines d'activitees de la societe dont l'id est passe dans
* les parametres de la requete req.
*/
exports.getDomaines = function(req, res)
{
    models.domaineModel.find({}, function (err, domaines)
    {
        if(err)
        {
            res.send(500, " Erreur dans getDomaine : impossible de trouver le domaine");
	}
        else
	{
	    res.send(200, domaines);
	}
    });
};

/*
* Fonction permettant de renvoyer la totalite des informations relatives
* a un domaine dont l'id est passe dans les parametres de la requete req.
*/
exports.getDomaine = function(req, res)
{
    models.domaineModel.find({'_id' : req.params.iddomaine}, function (err, domaine)
    {
        if(err)
        {
            res.send(500, " Erreur dans getDomaine : impossible de trouver le domaine");
	}
        else
	{
	    res.send(200, domaine);
	}
    });
};

// --- Fonctions de MaJ : PUT ---

// fct pour mettre a jour le nom d'un domaine
exports.updateNomDomaine = function(req, res){
	models.domaineModel.findOne({'_id' : req.params.iddomaine}, function (err,domaine)
	{
		if(err)
		{
		    res.send(500, " Erreur dans updateNomDomaine : impossible de modifier le nom du domaine " + err);
		}
		else
		{
			domaine.__v++;
			domaine.nom = req.body.nom;
			domaine.save();
  		    res.send(200, 200, 'Domaine modifié avec succès');
		}
	});
};

// --- Fonctions de suppression : DELETE ---

/*
* Fonction permettant de supprimer un domaine dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deleteDomaine = function(req, res)
{
    models.domaineModel.remove({'_id' : req.params.iddomaine}, function (err)
    {
        if(err)
        {
            res.send(500, " Erreur dans deleteDomaine : impossible de supprimer le domaine");
		}
        else
		{
			res.send(200, "Domaine supprimé avec succès");
		}
    });
};


/* ============[ FONCTIONS SUR LE MODEL MESSAGE ]============ */


/*
* Fonction permettant de renvoyer la totalite des messages
*/
exports.getMessages = function(req, res)
{
    models.messageModel.find({}, function (err, messages)
    {
        if(err)
        {
            res.send(500, " Erreur dans getMessages : impossible de trouver la liste des messages");
		}
        else
		{
		    res.send(200, messages);
		}
    });
};


// --- Fonctions de creation : CREATE ---

/*
* Fonction permettant d'ajouter un nouveau message dans la base de donnees
* a partir des informations contenues dans le corps de la requete req.
*/
exports.postMessage = function(req, res)
{
    //On cree un nouveau message 
    var nouveauMessage = new models.messageModel();

    //On renseigne ses champs
    nouveauMessage.idB = req.body.idB;
    nouveauMessage.idP = req.user.idP;
    nouveauMessage.corpsMsg = req.body.corpsMsg;
    
    models.utilisateurModel.findOne({'_id': req.user._id},function(err,user){
    	if(err)res.send(500,"Erreur dans la mise a jour du participant");
    	else{
    		models.participationModel.update({'_id': user.participation},{$addToSet: {idB: mongoose.Types.ObjectId(req.body.idB)}},function(err){
    			if(err){
    				res.send(500,err);
    			}
    		});
    	}
    });
    
    models.billetModel.findOne({'_id': req.body.idB},function(err,billet){
    	if(err){
    		res.send(500,"Erreur dans la mise a jour du billet");
    	}
    	else{
			billet.__v++;
			billet.save(function(err){
				if(err) res.send(500,"Erreur dans la mise a jour du billet");
			});
    	}
    });

    //On la sauvegarde dans MongoDB
    nouveauMessage.save(function (err)
    {
        if (err)
        {
            res.send(500, " Erreur dans postMessage : impossible d'ajouter le nouveau message");
        }
		else
		{
        	res.send(200, "Message ajouté avec succès !");
		}
    });
};


// --- Fonctions de lecture : READ ---

/*
* Fonction permettant de renvoyer l'auteur du message dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getAuteurMessage = function(req, res)
{
    models.messageModel.find({'_id' : req.params.idmessage}, {idP : 1, _id : 0}, function (err, auteur)
    {
        if(err)
        {
            res.send(500, " Erreur dans getAuteurMessage : impossible de trouver l'auteur du message");
	}
        else
	{
	    res.send(200, auteur);
	}
    });
};

exports.getMessageVersion = function(req, res)
{
    models.messageModel.find({'_id' : req.params.idmessage}, {__v: 1}, function (err, message)
    {
        if(err)
        {
            res.send(500, " Erreur dans l'obtention de la version d'un message");
		}
        else
		{
		    res.send(200, message);
		}
    });
};

/*
* Fonction permettant de renvoyer la date du message dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getDateMessage = function(req, res)
{
    models.messageModel.find({'_id' : req.params.idmessage}, {date : 1, _id : 0}, function (err, date)
    {
        if(err)
        {
            res.send(500, " Erreur dans getDateMessage : impossible de trouver la date du message");
	}
        else
	{
	    res.send(200, date);
	}
    });
};

/*
* Fonction permettant de renvoyer le corps du message dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getCorpsMessage = function(req, res)
{
    models.messageModel.find({'_id' : req.params.idmessage}, {corpsMsg : 1, _id : 0}, function (err, corpsmsg)
    {
        if(err)
        {
            res.send(500, " Erreur dans getCorpsMessage : impossible de trouver le corps du message");
	}
        else
	{
	    res.send(200, corpsmsg);
	}
    });
};


// --- Fonctions de suppression : DELETE ---

/*
* Fonction permettant de supprimer un message dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deleteMessage = function(req, res)
{
    models.messageModel.remove({'_id' : req.params.idmessage}, function (err)
    {
        if(err)
        {
            res.send(500, " Erreur dans deleteMessage : impossible de supprimer le message");
	}
        else
	{
	    res.send(200, "Message supprimé avec succès");
	}
    });
};


/* ============[ FONCTIONS SUR LE MODEL TACHES ]============ */

// --- Fonctions de creation : CREATE ---

/*
* Fonction permettant d'ajouter une nouvelle tache dans la base de donnees
* a partir des informations contenues dans le corps de la requete req.
*/
exports.postTache = function(req, res)
{	
	var finalDate = new Date();
	
	var tDate = req.body.date.split("/");
	finalDate.setFullYear(parseInt(tDate[2]),parseInt(tDate[1])-1,parseInt(tDate[0]));
	
	var tHeure = req.body.heure.split(":");
	finalDate.setHours(parseInt(tHeure[0]),parseInt(tHeure[1]),0);
	
    //On cree une nouvelle tache
    var nouvelleTache = new models.tacheModel();

    //On renseigne ses champs
    nouvelleTache.idS = "532307d48b1ecbc01324ce5c";
    nouvelleTache.idU = req.user._id;
    nouvelleTache.titre = req.body.titre;
    nouvelleTache.date = finalDate;
    nouvelleTache.lieu = req.body.lieu;
    nouvelleTache.statut = "1";
    nouvelleTache.description = req.body.description;

	//TODO
    if(req.body.idS)nouvelleTache.idS = req.body.idS;
	
    //On la sauvegarde dans MongoDB
    nouvelleTache.save(function (err)
    {
        if (err)
        {
            res.send(500, " Erreur dans postTache : impossible d'ajouter la nouvelle tache" + err);
        }
	
		{
			res.send(200, "Tache ajoutée avec succès !");
		}
    });
};

// --- Fonctions de lecture : READ ---

/*
* Fonction permettant de renvoyer la liste de toutes les taches
*/
exports.getTaches = function(req, res)
{
    models.tacheModel.find({'idU': req.user._id}).sort({date: 'asc'}).exec(function(err,taches){
		if(err)
        {
            res.send(500, " Erreur dans getTaches : impossible de trouver la liste des taches");
		}
        else
		{
	    	res.send(200, taches);
		}
	});
};

/*
* Fonction permettant de renvoyer les informations de la tache dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getTache = function(req, res)
{
    models.tacheModel.find({'_id' : req.params.idtache}, function (err, tache)
    {
        if(err)
        {
            res.send(500, " Erreur dans getBillet : impossible de trouver le billet");
		}
        else
		{
			res.send(200, tache);
		}
    });
};

// --- Fonctions de maj : UPDATE ---

// fct pour mettre a jour le titre de la tache
exports.updateTitreTache = function(req, res){
	models.tacheModel.findOne({'_id':req.params.idtache}, function (err, tache)
	{
		if(err)
		    res.send(500, " Erreur dans updateTitreTache : impossible de modifier le titre de la tache" + err);
		else{
			tache.__v ++;
			tache.titre = req.body.titre;
			tache.save();
  		    res.send(200, 200, 'Tache modifiée avec succès');
  		}
	});
};

exports.getTacheVersion = function(req,res){
	models.tacheModel.find({'_id': req.params.idtache}, {__v:1}, function(err, tache){
		if(err){
			res.send(500,"Erreur dans l'obtention de la version d'une tache");
		}
		else res.send(200, tache);
	});
};

// fct pour mettre a jour le lieu de la tache
exports.updateLieuTache = function(req, res){
	models.tacheModel.findOne({'_id':req.params.idtache}, function (err,tache)
	{
		if(err)
		    res.send(500, " Erreur dans updateLieuTache : impossible de modifier le lieu de la tache" + err);
		else{
			tache.__v ++;
			tache.lieu = req.body.lieu;
			tache.save();
  		    res.send(200, 200, 'Tache modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour la date de la tache
exports.updateDateTache = function(req, res){
	models.tacheModel.findOne({'_id':req.params.idtache}, function (err,tache)
	{
		if(err)
		    res.send(500, " Erreur dans updateDateTache : impossible de modifier la date de la tache" + err);
		else{
			tache.__v ++;
			tache.date = req.body.date;
			tache.save();
  		    res.send(200, 200, 'Tache modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour l'heure de la tache
exports.updateHeureTache = function(req, res){
	models.tacheModel.findOne({'_id':req.params.idtache}, function (err)
	{
		if(err)
		    res.send(500, " Erreur dans updateHeureTache : impossible de modifier l'heure de la tache" + err);
		else{	
			tache.__v ++;
			tache.heure = req.body.heure;
			tache.save();
  		    res.send(200, 200, 'Tache modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour la description de la tache
exports.updateDescriptionTache = function(req, res){
	models.tacheModel.findOne({'_id':req.params.idtache}, function (err,tache)
	{
		if(err)
		    res.send(500, " Erreur dans updateDescriptionTache : impossible de modifier la description de la tache" + err);
		else{
			tache.__v ++;
			tache.description = req.body.description;
			tache.save();
  		    res.send(200, 200, 'Tache modifiée avec succès');
  		 }
	});
};

// --- Fonctions de suppression : DELETE ---

/*
* Fonction permettant de supprimer une tache dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deleteTache = function(req, res)
{
    models.tacheModel.remove({'_id' : req.params.idtache}, function (err)
    {
        if(err)
        {
            res.send(500, " Erreur dans deleteTache : impossible de supprimer la tache");
		}
        else
		{
			res.send(200, "Tache supprimée avec succès");
		}
    })
};



/* ============[ FONCTIONS SUR LE MODEL PERSONNE ]============ */


// --- Fonctions de creation : CREATE ---

/*
* Fonction permettant d'ajouter une nouvelle personne dans la base de donnees
* a partir des informations contenues dans le corps de la requete req.
*/
exports.postPersonne = function(req, res)
{
    //On cree une nouvelle personne
    var nouvellePersonne = new models.personneModel();

    //On renseigne ses champs
    nouvellePersonne.nom = req.body.nom;
    nouvellePersonne.prenom = req.body.prenom;
    nouvellePersonne.statut = req.body.statut;
    nouvellePersonne.login = req.body.mail;
    nouvellePersonne.mdp = req.body.mdp;
    nouvellePersonne.tel = req.body.tel;
    nouvellePersonne.fax = req.body.fax;
    nouvellePersonne.mail = req.body.mail;
    nouvellePersonne.commentaire = req.body.commentaire;
    if(req.body.idS)nouvellePersonne.idS = req.body.idS;
	
    //On la sauvegarde dans MongoDB
    nouvellePersonne.save(function (err)
    {
        if (err)
        {
            res.send(500, " Erreur dans postPersonne : impossible d'ajouter la nouvelle personne" + err);
        }
	
		{
        	res.send(200, "Personne ajoutée avec succès !");
		}
    });
};

exports.getPersonneVersion = function(req,res){
	models.personneModel.find({'_id': req.params.idpersonne},{__v:1},function(err,personne){
		if(err)res.send(500,"Erreur dans l'obtention de la version d'une personne");
		else res.send(200,personne);
	});
};


// --- Fonctions de lecture : READ ---


/*
* Fonction permettant de renvoyer la liste de toutes les personnes
*/
exports.getPersonnes = function(req, res)
{
    models.personneModel.find({}, function (err, personnes)
    {
        if(err)
        {
            res.send(500, " Erreur dans getPersonnes : impossible de trouver la liste des personnes");
	}
        else
	{
	    res.send(200, personnes);
	}
    });
};

/*
* Fonction permettant de renvoyer les informations de la personne dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getPersonne = function(req, res)
{
    models.personneModel.find({'_id' : req.params.idpersonne}, function (err, personne)
    {
        if(err)
        {
            res.send(500, " Erreur dans getPersonne : impossible de trouver la personne");
	}
        else
	{
	    res.send(200, personne);
	}
    });
};

// --- Fonctions de maj : UPDATE ---

// fct pour mettre a jour le statut d'une personne
exports.updateStatutPersonne = function(req, res){
	models.personneModel.findOne({'_id':req.params.idpersonne}, function (err, personne)
	{
		if(err)
		    res.send(500, " Erreur dans updateStatutPersonne : impossible de modifier le statut de la personne" + err);
		else{
			personne.__v ++;
			personne.statut = req.body.statut;
			personne.save();
  		    res.send(200, 200, 'Personne modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour le tel d'une personne
exports.updateTelPersonne = function(req, res){
	models.personneModel.findOne({'_id':req.params.idpersonne}, function (err, personne)
	{
		if(err)
		    res.send(500, " Erreur dans updateTelPersonne : impossible de modifier le tel de la personne" + err);
		else{
			personne.__v ++;
			personne.tel = req.body.tel;
			personne.save();
  		    res.send(200, 200, 'Personne modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour le fax d'une personne
exports.updateFaxPersonne = function(req, res){
	models.personneModel.findOne({'_id':req.params.idpersonne}, function (err, personne)
	{
		if(err)
		    res.send(500, " Erreur dans updateFaxPersonne : impossible de modifier le fax de la personne" + err);
		else{
			personne.__v ++;
			personne.fax = req.body.fax;
			personne.save();
  		    res.send(200, 200, 'Personne modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour le mail d'une personne
exports.updateMailPersonne = function(req, res){
	models.personneModel.findOne({'_id':req.params.idpersonne}, function (err, personne)
	{
		if(err)
		    res.send(500, " Erreur dans updateMailPersonne : impossible de modifier le mail de la personne" + err);
		else{
			personne.__v ++;
			personne.mail = req.body.mail;
			personne.save();
  		    res.send(200, 200, 'Personne modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour le commentaire d'une personne
exports.updateCommentairePersonne = function(req, res){
	models.personneModel.findOne({'_id':req.params.idpersonne}, function (err, personne)
	{
		if(err)
		    res.send(500, " Erreur dans updateCommentairePersonne : impossible de modifier le commentaire de la personne" + err);
		else{
			personne.__v ++;
			personne.commentaire = req.body.commentaire;
			personne.save();
  		    res.send(200, 200, 'Personne modifiée avec succès');
  		}
	});
};

// --- Fonctions de suppression : DELETE ---

/*
* Fonction permettant de supprimer une personne dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deletePersonne = function(req, res)
{
    models.personneModel.remove({'_id' : req.params.idpersonne}, function (err)
    {
        if(err)
        {
            res.send(500, " Erreur dans deletePersonne : impossible de supprimer la personne");
	}
        else
	{
	    res.send(200, "Personne supprimée avec succès");
	}
    });
};

/* ============[ FONCTIONS SUR LE MODEL BILLET ]============ */


// --- Fonctions de creation : CREATE ---

/*
* Fonction permettant d'ajouter un nouveau billet dans la base de donnees
* a partir des informations contenues dans le corps de la requete req.
*/
exports.postBillet = function(req, res)
{
    //On cree un nouveau billet
    var nouveauBillet = new models.billetModel();

    //On renseigne ses champs
    nouveauBillet.titre = req.body.titre;
    nouveauBillet.isOpen = true;
	
    //On le sauvegarde dans MongoDB
    nouveauBillet.save(function (err)
    {
        if (err)
        {
            res.send(500, " Erreur dans postBillet : impossible d'ajouter le nouveau billet" + err);
        }
		else
		{
        	res.send(200, "Billet ajouté avec succès !");
		}
    });
};


// --- Fonctions de lecture : READ ---


/*
* Fonction permettant de renvoyer la liste de tous les billets
*/
exports.getBillets = function(req, res)
{
    models.billetModel.find({}, function (err, billets)
    {
        if(err)
        {
            res.send(500, " Erreur dans getBillets : impossible de trouver la liste des billets");
		}
        else
		{
		    res.send(200, billets);
		}
    });
};

exports.getBilletVersion = function(req,res){
	models.billetModel.find({'_id': req.params.idbillet},{__v:1},function(err,billet){
		if(err){
			res.send(500,"Erreur dans l'obtention de la version d'un billet");
		}
		else res.send(200,billet);
	});
};

/*
* Fonction permettant de renvoyer la liste de tous les billets sur lesquels une personne est intervenue
*/

exports.getBilletsPersonne = function(req, res)
{
    models.participationModel.find({'_id': req.user.participation},function(err,participation){
    	if(err)res.send(500,err);
    	else{
    		res.send(200,participation);
    	}
    });
};

/*
* Fonction permettant de renvoyer la liste de tous les billets sur lesquels une personne est intervenue
*/

exports.getBilletParticipants = function(req, res)
{
    models.messageModel.distinct('idP',{'idB': req.params.idbillet}).exec(function(err,participants){
    	if(err)res.send(500,err);
    	else{
    		res.send(200,participants);
    	}
    });
};


/*
* Fonction permettant de renvoyer les informations du billet dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getBillet = function(req, res)
{
    models.billetModel.find({'_id' : req.params.idbillet}, function (err, billet)
    {
        if(err)
        {
            res.send(500, " Erreur dans getBillet : impossible de trouver le billet");
		}
        else
		{
	    	res.send(200, billet);
		}
    });
};

/*
* Fonction permettant de renvoyer les messages du billet dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getBilletMessages = function(req, res)
{
    models.messageModel.find({'idB' : req.params.idbillet}, function (err, messages)
    {
        if(err)
        {
            res.send(500, " Erreur dans getBilletMessages : impossible de trouver les messages");
		}
        else
		{
	    	res.send(200, messages);
		}
    });
};

/*
* Fonction permettant de renvoyer le nombre de messages du billet dont l'id est passe
* dans les parametres de la requete req.
*/
exports.getBilletMessageCount = function(req, res)
{
    models.messageModel.find({'_id' : req.params.idbillet}, function (err, messages)
    {
        if(err)
        {
            res.send(500, " Erreur dans getBilletMessages : impossible de trouver les messages");
		}
        else
		{
	    	res.send(200, messages.length);
		}
    });
};


// --- Fonctions de suppression : DELETE ---

/*
* Fonction permettant de supprimer un billet dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deleteBillet = function(req, res)
{
	var good1 = true;
	var good2 = true;
	
    models.billetModel.remove({'_id' : req.params.idbillet}, function (err)
    {
        if(err)
        {
            good1 = false;
		}
    });
	
	models.messageModel.remove({'idB' : req.params.idbillet}, function (err)
    {
        if(err)
        {
            good2 = false;
		}
    });
	
	if(good1 && good2)
		res.send(200, "Suppression effectuée avec succès");
	else
		res.send(500, "Erreur dans la suppression du billet");
};

exports.createUtilisateur = function(req,res){
	
	var nouvelUtilisateur = new models.utilisateurModel();
	var nouvellePersonne = new models.personneModel();
	
	nouvellePersonne.mail = req.body.email;
	nouvellePersonne.tel = req.body.tel;
	nouvellePersonne.fax = req.body.fax;
	nouvellePersonne.statut = req.body.statut;
	nouvellePersonne.nom = req.body.nom;
	nouvellePersonne.prenom = req.body.prenom;
	
	var participation = new models.participationModel();
	participation.save(function(err){
		if(err) {
			console.log("Erreur lors de la création de l'entité de participation");
			return;
		}
		else nouvelUtilisateur.participation = participation;
	});
	
	nouvellePersonne.save(function(err, personne){
		if(err){
			res.send(500,"Erreur lors de la création de la personne liée à l'utilisateur");
			models.participationModel.remove({'_id' : participation._id});
			return;
		}
		else nouvellePersonne = personne;
	});
	
	nouvelUtilisateur.login = req.body.utilisateur;
	nouvelUtilisateur.mdp = req.body.password;
	nouvelUtilisateur.idP = nouvellePersonne;
	nouvelUtilisateur.degree = req.body.rank[0];
	
	nouvelUtilisateur.save(function(err){
		if(err){
			res.send(500, "Impossible de créer le nouvel utilisateur");
			models.participationModel.remove({'_id' : participation._id});
			models.personneModel.remove({'_id' : nouvellePersonne._id});
			return;
		}
		else{
			res.send(200, "Ajout réalisé avec succès");
		}
	});
};

// fct pour mettre a jour le login d'un utilisateur
exports.updateLoginUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updateLoginUtilisateur : impossible de modifier le login de l'utilisateur" + err);
		else{
			user.__v ++;
			user.login = req.body.login;
			user.save();
  		    res.send(200, 200, 'Utilisateur modifiée avec succès');
  		}
	});
};

// fct pour mettre a jour le nom d'un utilisateur
exports.updateNomUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updateNomUtilisateur : impossible de modifier le nom de l'utilisateur" + err);
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				user.__v ++;
				user.save();
				personne.nom = req.body.nom;
				personne.save();
				res.send(200, 200, 'Utilisateur modifié avec succès');
			});
  		}
	});
};

// fct pour mettre a jour le prenom d'un utilisateur
exports.updatePrenomUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updatePrenomUtilisateur : impossible de modifier le prenom d'un utilisateur" + err);
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				user.__v ++;
				user.save();
				personne.prenom = req.body.prenom;
				personne.save();
				res.send(200, 200, 'Utilisateur modifié avec succès');
			});
  		}
	});
};

// fct pour mettre a jour le statut d'un utilisateur
exports.updateStatutUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updateStatutUtilisateur : impossible de modifier le statut d'un utilisateur" + err);
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				user.__v ++;
				user.save();
				personne.statut = req.body.statut;
				personne.save();
				res.send(200, 200, 'Utilisateur modifié avec succès');
			});
  		}
	});
};

// fct pour mettre a jour le telephone d'un utilisateur
exports.updateTelUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updateTelUtilisateur : impossible de modifier le telephone d'un utilisateur" + err);
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				user.__v ++;
				user.save();
				personne.tel = req.body.tel;
				personne.save();
				res.send(200, 200, 'Utilisateur modifié avec succès');
			});
  		}
	});
};

// fct pour mettre a jour le fax d'un utilisateur
exports.updateFaxUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updateFaxUtilisateur : impossible de modifier le fax d'un utilisateur" + err);
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				user.__v ++;
				user.save();
				personne.fax = req.body.fax;
				personne.save();
				res.send(200, 200, 'Utilisateur modifié avec succès');
			});
  		}
	});
};

// fct pour mettre a jour le mail d'un utilisateur
exports.updateMailUtilisateur = function(req, res){
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans updateMailUtilisateur : impossible de modifier le mail d'un utilisateur" + err);
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				user.__v ++;
				user.save();
				personne.mail = req.body.mail;
				personne.save();
				res.send(200, 200, 'Utilisateur modifié avec succès');
			});
  		}
	});
};

exports.getUtilisateurs = function(req,res){
	models.utilisateurModel.find({},function(err,users){
		if(err){
			res.send(500,"Erreur dans l'obtention de la liste des utilisateurs");
		}
		else res.send(200,users);
	});
};

exports.getUtilisateur = function(req,res){
	models.utilisateurModel.findOne({'_id': req.params.idutilisateur},{login:1,degree:1,idP:1},function(err,user){
		if(err){
			res.send(500,"Erreur dans l'obtention de l'utilisateurs");
		}
		else{
			models.personneModel.findOne({'_id': user.idP},function(err,personne){
				var _user = {user: user, personne: personne};
				res.send(200,_user);
			});
		}
	});
};

exports.getUtilisateurVersion = function(req,res){
	models.utilisateurModel.find({'_id':req.params.idutilisateur},{__v: 1},function(err,users){
		if(err){
			res.send(500,"Erreur dans l'obtention de la version de l'utilisateur");
		}
		else res.send(200,users);
	});
};

exports.getUtilisateursDegree = function(req,res){
	models.utilisateurModel.find({'degree': "0"},function(err,users){
		if(err){
			res.send(500,"Erreur dans l'obtention des admin '0'");
		}
		else res.send(200,users);
	});
};

/*
* Fonction permettant de supprimer un utilisateur dont l'id est passe
* dans les parametres de la requete req.
*/
exports.deleteUtilisateur = function(req, res)
{
	models.utilisateurModel.findOne({'_id':req.params.iduser}, function (err, user)
	{
		if(err)
		    res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer l'utilisateur" + err);
		else{
			// Suppression des messages lies a l'utilisateur
			/*models.messageModel.remove({'idP': user.idP},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les messages de l'utilisateur" + err);
			});
			
			// Suppression des notes lies a l'utilisateur
			models.noteModel.remove({'idP': user.idP},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les notes de l'utilisateur" + err);
			});*/
			
			// Suppression des taches lies a l'utilisateur
			models.tacheModel.remove({'idU': req.params.iduser},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les taches de l'utilisateur" + err);
			});
			
			// Suppression des participations de l'utilisateur
			models.participationModel.remove({'_id': user.participation},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer les participations" + err);
			});
 			
			// Suppression des infos Personne de l'utilisateur
			models.personneModel.remove({'_id': user.idP},function(err){
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer l'utilisateur" + err);
			});
			
			// Suppression de l'utilisateur
			models.utilisateurModel.remove({'_id' : req.params.iduser}, function (err)
			{
				if(err)
					res.send(500, " Erreur dans deleteUtilisateur : impossible de supprimer l'utilisateur");
				else
					res.send(200, "Utilisateur supprimé avec succès");
			});
  		}
	});
};

exports.createAdmin = function(){
	models.utilisateurModel.find({'login': config.admin, 'mdp': config.password, 'degree': "0"},function(err,admin){
		if(err){
			return;
		}
		else{
			var admin = new models.utilisateurModel();
			admin.login = config.admin;
			admin.mdp = SHA256(config.password,true);
			admin.degree = "0";
			
			var idP = new models.personneModel();
			idP.mail = config.mail;
			idP.tel = config.tel;
			idP.fax = config.fax;
			idP.statut = config.statut;
			idP.nom = config.last_name;
			idP.prenom = config.first_name;
			
			var participation = new models.participationModel();
			participation.save(function(err){
				if(err)console.log("Erreur lors de la création de l'entité de participation");
			});
			
			admin.participation = participation;
			
			idP.save(function(err,personne){
				if(err){
					console.log("Personne liée à l'administrateur trouvee");
					return;
				}
			});
			admin.idP = idP;
			admin.save(function(err){
				if(err){
					console.log("Administrateur trouve");
				}
				else{
					console.log("Creation de l'administrateur realisee avec succes");
				}
			});
		}
	});
};

var SHA256 = function(msg, utf8encode) {
    utf8encode =  (typeof utf8encode == 'undefined') ? true : utf8encode;
    
    // convert string to UTF-8, as SHA only deals with byte-streams
    if (utf8encode) msg = Utf8.encode(msg);
    
    // constants [§4.2.2]
    var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
             0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
             0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
             0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
             0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
             0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
             0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
             0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    // initial hash value [§5.3.1]
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

    // PREPROCESSING 
 
    msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

    // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
    var l = msg.length/4 + 2;  // length (in 32-bit integers) of msg + ‘1’ + appended length
    var N = Math.ceil(l/16);   // number of 16-integer-blocks required to hold 'l' ints
    var M = new Array(N);

    for (var i=0; i<N; i++) {
        M[i] = new Array(16);
        for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
                      (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
        } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
    }
    // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
    // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
    // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
    M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
    M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;


    // HASH COMPUTATION [§6.1.2]

    var W = new Array(64); var a, b, c, d, e, f, g, h;
    for (var i=0; i<N; i++) {

        // 1 - prepare message schedule 'W'
        for (var t=0;  t<16; t++) W[t] = M[i][t];
        for (var t=16; t<64; t++) W[t] = (SHA256.sigma1(W[t-2]) + W[t-7] + SHA256.sigma0(W[t-15]) + W[t-16]) & 0xffffffff;

        // 2 - initialise working variables a, b, c, d, e, f, g, h with previous hash value
        a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];

        // 3 - main loop (note 'addition modulo 2^32')
        for (var t=0; t<64; t++) {
            var T1 = h + SHA256.Sigma1(e) + SHA256.Ch(e, f, g) + K[t] + W[t];
            var T2 = SHA256.Sigma0(a) + SHA256.Maj(a, b, c);
            h = g;
            g = f;
            f = e;
            e = (d + T1) & 0xffffffff;
            d = c;
            c = b;
            b = a;
            a = (T1 + T2) & 0xffffffff;
        }
         // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
        H[0] = (H[0]+a) & 0xffffffff;
        H[1] = (H[1]+b) & 0xffffffff; 
        H[2] = (H[2]+c) & 0xffffffff; 
        H[3] = (H[3]+d) & 0xffffffff; 
        H[4] = (H[4]+e) & 0xffffffff;
        H[5] = (H[5]+f) & 0xffffffff;
        H[6] = (H[6]+g) & 0xffffffff; 
        H[7] = (H[7]+h) & 0xffffffff; 
    }

    return SHA256.toHexStr(H[0]) + SHA256.toHexStr(H[1]) + SHA256.toHexStr(H[2]) + SHA256.toHexStr(H[3]) + 
           SHA256.toHexStr(H[4]) + SHA256.toHexStr(H[5]) + SHA256.toHexStr(H[6]) + SHA256.toHexStr(H[7]);
}

SHA256.ROTR = function(n, x) { return (x >>> n) | (x << (32-n)); }
SHA256.Sigma0 = function(x) { return SHA256.ROTR(2,  x) ^ SHA256.ROTR(13, x) ^ SHA256.ROTR(22, x); }
SHA256.Sigma1 = function(x) { return SHA256.ROTR(6,  x) ^ SHA256.ROTR(11, x) ^ SHA256.ROTR(25, x); }
SHA256.sigma0 = function(x) { return SHA256.ROTR(7,  x) ^ SHA256.ROTR(18, x) ^ (x>>>3);  }
SHA256.sigma1 = function(x) { return SHA256.ROTR(17, x) ^ SHA256.ROTR(19, x) ^ (x>>>10); }
SHA256.Ch = function(x, y, z)  { return (x & y) ^ (~x & z); }
SHA256.Maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }

//
// hexadecimal representation of a number 
//   (note toString(16) is implementation-dependant, and  
//   in IE returns signed numbers when used on full words)
//
SHA256.toHexStr = function(n) {
  var s="", v;
  for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }
  return s;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple          */
/*              single-byte character encoding (c) Chris Veness 2002-2010                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

Utf8 = {};  // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}
