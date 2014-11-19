module.exports = function(app){

	var fs = require('fs');
	
	var mime = {
		"svg" : "image/svg+xml",
		"ttf" : "application/x-font-truetype",
		"otf" : "application/x-font-opentype",
		"woff" : "application/font-woff",
		"eot" : "application/vnd.ms-fontobject"
	}

	/*
	*	Bufferisation des scripts post-rendu
	*/
	var prs = "";
	var css = "";
	var libs = "";
	
	fs.readdir("js/PostRenderScripts",function(err,files){
			files.filter(function(file) {
				return file.substr(-3)==='.js';
			})
			.forEach(function(file){
				fs.readFile("js/PostRenderScripts/"+file, function(err, contents) {
					prs += contents;
				}); 
			});
	});
	
	fs.readdir("css",function(err,files){
			files.filter(function(file) {
				return file.substr(-4)==='.css';
			})
			.forEach(function(file){
				fs.readFile("css/"+file, function(err, contents) {
					css += contents;
				}); 
			});
	});

	/*
	*	Route principale
	*/
	app.get("/",function(req, res) {
    		res.sendfile("index.html");
	})
	/*
	*	Récupération du script d'inclusion
	*/
	.get("/js/includes",function(req, res) {
		fs.readFile("js/includes.js",function(err,datas){
	        res.setHeader('Content-Type', 'text/javascript');
	    	res.end(datas);
		});
	})
	/*
	*	Récupération des scripts clients
	*/
	.get("/js/:directory/:fileName",function(req, res) {
		fs.readFile("js/" + req.params.directory + "/" + req.params.fileName + ".js",function(err,datas){
	        res.setHeader('Content-Type', 'text/javascript');
	    	res.end(datas);
		});
	})
	/*
	*	Récupération des scripts post rendu
	*	(raison expliquée sur le wiki)
	*/
	.get("/PostRenderScripts",function(req, res) {
		res.setHeader('Content-Type', 'text/javascript');
	    res.end(prs);
	})
	/*
	*	Récupération des css
	*/
	.get("/style.css",function(req,res){
	    res.setHeader('Content-Type', 'text/css');
	    res.end(css);
	})

	/*
	*	Récupération des images
	*/
	.get("/img/:imgFile",function(req,res){
		fs.readFile("img/" + req.params.imgFile,function(err,datas){
	        res.setHeader('Content-Type', 'image/jpg');
	        res.end(datas);
	        });
	})
	/*
	*	Récupération des polices
	*/
	.get("/polices/:directory/:fileName",function(req,res){
		var extension = req.params.fileName.substr(req.params.fileName.lastIndexOf('.'));
		fs.readFile("polices/" + req.params.directory + "/" + req.params.fileName,function(err,datas){
        	res.setHeader('Content-Type', mime[extension]);
        	res.end(datas);
        });
	});
}