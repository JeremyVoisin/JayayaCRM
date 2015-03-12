var include = function(file){

	var xhr = new XMLHttpRequest();
	
	var oScript = document.createElement('script');
	oScript.type = 'text/javascript';

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
			oScript.text += (xhr.responseText);
			document.getElementsByTagName('body')[0].appendChild(oScript);
		}
	};
	
	xhr.open("GET", '/js/' + file, false);
	xhr.send(null);
	
};

var PostScriptsLoaded = false;

var loadPostRenderScripts = function(){

	if(!PostScriptsLoaded){
		var xhr = new XMLHttpRequest();
	
		var oScript = document.createElement('script');
		oScript.type = 'text/javascript';
	
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
				oScript.text += "function refreshPostRenderScript(){" + (xhr.responseText) +"};refreshPostRenderScript();";
				document.getElementsByTagName('body')[0].appendChild(oScript);
				PostScriptsLoaded = true;
			}
		};
	
		xhr.open("GET", '/PostRenderScripts', false);
		xhr.send(null);
	}else
		refreshPostRenderScript();
	
};

var getHandler = function(handler){
	return handler.toString();
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}


include("IO/clientIo");
include("lib/crypt");
include("lib/jscolor");
include("lib/formatDate");
include("lib/find");
include("lib/add");
include("lib/edit");
include("lib/remove");
include("Couplers/BigBuffer");
include("lib/Internationalization");
include("LayoutManager/LayoutManager");
include("SinglePageApp/Connexion");
