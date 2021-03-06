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
	
	fs.readdir("js/SinglePageApp",function(err,files){
	        var result = [];
			var fis = files.filter(function(file) {
				return file.substr(-3)==='.js';
			});
			for(var i = 0; i < fis.length; i++){
			    var contents = fs.readFileSync("js/SinglePageApp/"+fis[i],{encoding:"UTF-8"});
				var reg = /[\+;\(\)=?:{}\[\]\\,.-/\*%\n\t\s]{1}_[(]{1}"(.*?)"[)]{1}/g;
				var temp = contents.match(reg);
				if(temp){
					for(var j = 0; j < temp.length; j++){
						result[result.length] = (/.*?_\("(.*?)"\).*?/g.exec(temp[j])[1]);
					}
				}
			}
			noDouble(result);
	});
	
	function noDouble(array1){
	    var resultArray = [], array2 = [];
	    for(var i = 0; i < array1.length; i++){
	    	array2[array1[i]] = "";
	    }
	    for(var x in array2){
	    	resultArray[resultArray.length] = x;
	    }
	}

	/*
	*	Route principale
	*/
	app.get("/",function(req, res) {
    		res.sendFile("index.html");
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
	*	Récupération des fichiers de langue
	*/
	.get("/js/Lang/:fileName",function(req, res) {
		fs.readFile("js/Lang/" + req.params.fileName + ".json",function(err,datas){
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