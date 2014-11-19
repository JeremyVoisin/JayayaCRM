var Graphorms = new Array();

function GraphicalForm(url){
	
	this.index = Graphorms.length;
	Graphorms[Graphorms.length] = this;
	this.url = url;
	
	//Variables d'instance
	this.content = new Array();
	this.temporary = new Array();
	
	this.height = 0;
	this.width = 0;
	
	this.rawCss = "margin-right:2%;margin-left:2%;";
	this.cssClass = "";	
		
	//Section liée au coupleur
	
	this.coupler = null;
	this.updateHandler = null;
	this.notificationHandler = null;
	
	this.setNotificationHandler = function(handler){
		this.notificationHandler = handler;
	};
	
	this.popupToHide = null;
	
	this.setPopupToHide = function(popup){
		this.popupToHide = popup;
	};
	
	this.setUpdateHandler = function(handler){
		this.updateHandler = handler;
	};
	
	this.initCoupler = function(){
		(this.coupler = ((this.coupler == null)?(new Coupler(this)):(this.coupler)));
	};
	
	this.getCoupler = function(){
		return this.coupler;
	};
	
	this.clear = function(){
		this.content = null;
	};
	
	//Fin de section liée au coupleur
	/**
	*	Récupère le css brut dans le conteneur
	*
	*	@return le css brut
	*/
	this.getRawCss = function(){
		return "";
	};
	
	/**
	*	Ajoute une classe css au conteneur
	*
	*	@param la classe css
	*/
	this.getCssClass = function(){
		return "";
	};
	
	this.addRawCss = function(css){
		this.rawCss += css;
	};
	
	this.addCssClass = function(classe){
		this.cssClass += classe + " ";
	};

	this.addInput = function(titl, typ, nm){
		if(this.content === null) this.content = new Array();
		if(typ === "buttonBelt"){ 
			var bb = new ButtonBelt(); 
			this.content[this.content.length] = {title: titl, type: typ, name: nm, buttons: bb};
			return bb;
		}
		else this.content[this.content.length] = {title: titl, type: typ, name: nm, buttons: null};
	};
	
	this.addTemporaryInput = function(nm, val){
		if(this.temporary === null) this.temporary = new Array();
		this.temporary[this.temporary.length] = {name: nm, value: val};
	};
	
	/**
	*   CrÈe une nouvelle sous couche de type VerticalLayout
	*
	*   @return une nouvelle sous couche Verticale
	*/
	this.newVerticalLayout = function(){
		if(this.content === null){
			this.isComposed = true;
			this.internalLayout = new Array();
		}
		var vertLayout = new VerticalLayout();
		this.content[this.content.length] = vertLayout;
		return vertLayout;
	};
	
	
	/**
	*   CrÈe une nouvelle sous couche de type HorizontalLayout
	*
	*   @return une nouvelle sous couche Horizontale
	*/
	this.newHorizontalLayout = function(){
		if(this.content === null){
			this.isComposed = true;
			this.content = new Array();
		}
		var horLayout = new HorizontalLayout();
		this.content[this.content.length] = horLayout;
		return horLayout;
	};
	
	this.addRangeInput = function(titl, nm, min, max){
		if(this.content === null) this.content = new Array();
		this.content[this.content.length] = {title: titl, type: "range", name: nm, buttons: null, placeholder: null, max: max, min: min};
	};
	
	this.addInputWithValue = function(titl, typ, nm, value){
		if(this.content === null) this.content = new Array();
		if(typ === "buttonBelt"){ 
			var bb = new ButtonBelt(); 
			this.content[this.content.length] = {title: titl, type: typ, name: nm, buttons: bb, placeholder: null,value: null};
			return bb;
		}
		else this.content[this.content.length] = {title: titl, type: typ, name: nm, buttons: null, placeholder: null, value: value};
	};
	
	this.addInput = function(titl, typ, nm, ph){
		if(this.content === null) this.content = new Array();
		if(typ === "buttonBelt"){ 
			var bb = new ButtonBelt(); 
			this.content[this.content.length] = {title: titl, type: typ, name: nm, buttons: bb, placeholder: null};
			return bb;
		}
		else this.content[this.content.length] = {title: titl, type: typ, name: nm, buttons: null, placeholder: ph};
	};
	
	this.render = function(){
		var th = this;
		if(this.content !== null){
			var  returnStuff = "<form method='post' enctype='multipart/form-data' onsubmit='event.preventDefault();GraphicalForm.sendDatas("+this.index+");'><table id='form"+this.index+"' class='"+this.cssClass+"' style='"+this.rawCss+"'>";
			if(this.isComposed){
				for(var i = 0; i < this.content.length; i++)
					returnStuff += this.content.renderLayout();
			}else{
				for(var i = 0; i < this.content.length; i++){
					if(this.content[i].type === "externalInformation" || this.content[i].type === "user" || this.content[i].type === "hidden"){}
					else if(this.content[i].type === "textarea")
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><textarea rows="6" class="formTextArea" '+(function(){return((th.content[i].value)?'value="'+(th.content[i].value)+'"':'');})()+' '+(function(){return((th.content[i].placeholder)?'placeholder="'+(th.content[i].placeholder)+'"':'');})()+' name="'+this.content[i].name+'" ></textarea></td></tr>';
					else if(this.content[i].type === "submit")
						returnStuff += '<tr><th></th><td class="middle_form"></td><td class="val_form"><input type="submit" value="'+this.content[i].title+'" name="'+this.content[i].name+'" /></td></tr>';
					else if(this.content[i].type === "buttonBelt"){
						returnStuff += '<tr><td class="val_form" colspan="3" style="width:100%;text-align:center;margin:0;padding:0;">';
						for(var x = 0; x < this.content[i].buttons.getButtons().length; x++){
							returnStuff += '<input style="display:inline-block;width:'+(90/this.content[i].buttons.getButtons().length)+'%;margin:1%;margin-bottom:2.5%;margin-top:2.5%;" type="button" value="'+this.content[i].buttons.getButtons()[x].title+'" onclick="('+this.content[i].buttons.getButtons()[x].handler+')('+this.index+');" />';
						}					
						returnStuff += '</td></tr>';
					}
					else if(this.content[i].type === "color")
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><input class="color" '+(function(){return((th.content[i].value)?'value="'+(th.content[i].value)+'"':'');})()+' '+(function(){return((th.content[i].placeholder)?'placeholder="'+(th.content[i].placeholder)+'"':'');})()+' name="'+this.content[i].name+'" type="text" /></td></tr>';
					else if(this.content[i].type === "range")
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><div style="display:inline;" id="form'+this.index+this.content[i].name+'">'+this.content[i].max/2+'%</div><input style="display:inline;" name="'+this.content[i].name+'" type="'+this.content[i].type+'" max="'+this.content[i].max+'" min="'+this.content[i].min+'" value="'+this.content[i].max/2+'" step="1" onchange="GraphicalForm.updateSlider(value,\''+this.content[i].name+'\','+this.index+');"/></td></tr>';
					else 
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><input '+(function(){return((th.content[i].value)?'value="'+(th.content[i].value)+'"':'');})()+' '+(function(){return((th.content[i].placeholder)?'placeholder="'+(th.content[i].placeholder)+'"':'');})()+' name="'+this.content[i].name+'" type="'+this.content[i].type+'" /></td></tr>';
				}
			}
			return returnStuff + "</table></form>";
		}
		return "";
	};
	
	this.update = function(){
		var th = this;
		var el = document.getElementById("form"+this.index);
		if(!el)return;
		if(this.content !== null){
			var  returnStuff = "";
			if(this.isComposed){
				for(var i = 0; i < this.content.length; i++)
					returnStuff += this.content.renderLayout();
			}else{
				for(var i = 0; i < this.content.length; i++){
					if(this.content[i].type === "externalInformation" || this.content[i].type === "user" || this.content[i].type === "hidden"){}
					else if(this.content[i].type === "textarea")
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><textarea rows="6" class="formTextArea" '+(function(){return((th.content[i].value)?'value="'+(th.content[i].value)+'"':'');})()+' '+(function(){return((th.content[i].placeholder)?'placeholder="'+(th.content[i].placeholder)+'"':'');})()+' name="'+this.content[i].name+'" ></textarea></td></tr>';
					else if(this.content[i].type === "submit")
						returnStuff += '<tr><td class="val_form"><input type="submit" value="'+this.content[i].title+'" name="'+this.content[i].name+'" /></td></tr>';
					else if(this.content[i].type === "buttonBelt"){
						returnStuff += '<tr><td class="val_form" colspan="3" style="width:100%;text-align:center;margin:0;padding:0;">';
						for(var x = 0; x < this.content[i].buttons.getButtons().length; x++){
							returnStuff += '<input style="display:inline-block;width:'+(90/this.content[i].buttons.getButtons().length)+'%;margin:1%;margin-bottom:2.5%;margin-top:2.5%;" type="button" value="'+this.content[i].buttons.getButtons()[x].title+'" onclick="('+this.content[i].buttons.getButtons()[x].handler+')('+this.index+')" />';
						}					
						returnStuff += '</td></tr>';
					}
					else if(this.content[i].type === "color")
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><input class="color" '+(function(){return((th.content[i].value)?'value="'+(th.content[i].value)+'"':'');})()+' '+(function(){return((th.content[i].placeholder)?'placeholder="'+(th.content[i].placeholder)+'"':'');})()+' name="'+this.content[i].name+'" type="text" /></td></tr>';
					else if(this.content[i].type === "range")
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><div style="display:inline;" id="form'+this.index+this.content[i].name+'">'+this.content[i].max/2+'%</div><input style="display:inline;" name="'+this.content[i].name+'" type="'+this.content[i].type+'" max="'+this.content[i].max+'" min="'+this.content[i].min+'" value="'+this.content[i].max/2+'" step="1" onchange="GraphicalForm.updateSlider(value,\''+this.content[i].name+'\','+this.index+');"/></td></tr>';
					else 
						returnStuff += '<tr><th style="width:20%;">'+this.content[i].title+'</th><td class="middle_form">:</td><td class="val_form"><input '+(function(){return((th.content[i].value)?'value="'+(th.content[i].value)+'"':'');})()+' '+(function(){return((th.content[i].placeholder)?'placeholder="'+(th.content[i].placeholder)+'"':'');})()+' name="'+this.content[i].name+'" type="'+this.content[i].type+'" /></td></tr>';
				}
			}
			el.innerHTML = returnStuff;
		}
	};
	
	GraphicalForm.updateSlider = function(value, name, id){
		document.getElementById('form'+id+name).textContent = value + "%";
	};
	
	this.getUrl = function(){
		return this.url;
	};
	
	this.getParams = function(){
		var params = new FormData();
		
		for(var i = 0; this.content !== null && i < this.content.length; i++){
			if(this.content[i].type === "externalInformation" && this.coupler!==null){
				if(typeof(this.coupler.getLastInformation()) === "object")
					params.append(this.content[i].name,JSON.stringify(this.coupler.getLastInformation()));
				else
					params.append(this.content[i].name,this.coupler.getLastInformation());
			}
			else if(this.content[i].type === "user")params.append(this.content[i].name,DatasBuffer.getIdPersonne());
			else if(this.content[i].type === "password")params.append(this.content[i].name,SHA256(document.getElementById('form'+this.index).querySelector('[name="'+this.content[i].name+'"]').value));
			else if(this.content[i].type === "hidden")params.append(this.content[i].name,this.content[i].value);
			else if(this.content[i].type === "radio")params.append(this.content[i].name,document.getElementById('form'+this.index).querySelector('input[name="'+this.content[i].name+'"]:checked').value);
			else if(this.content[i].type === "file")params.append(this.content[i].name,document.getElementById('form'+this.index).querySelector('[name="'+this.content[i].name+'"]').files[0]);
			else if(this.content[i].type !== "externalInformation" && this.content[i].type !== "submit" && this.content[i].type !== "buttonBelt" && this.content[i].type !== "user"){
				params.append(this.content[i].name,document.getElementById('form'+this.index).querySelector('[name="'+this.content[i].name+'"]').value);
			}
			else if(this.content[i].type === "submit")params.append(this.content[i].name,"true");
		}
		for(var i = 0; this.temporary !== null && i < this.temporary.length; i++){
			if(typeof(this.temporary[i].value) === "object"){
				params.append(this.temporary[i].name,JSON.stringify(this.temporary[i].value));
			}else{
				params.append(this.temporary[i].name,JSON.stringify(this.temporary[i].value));
			}
		}
		return params;
	};
	
	this.resetParams = function(){
		for(var i = 0; this.content !== null && i < this.content.length; i++){
			if(this.content[i].type !== "radio" && this.content[i].type !== "externalInformation" && this.content[i].type !== "submit" && this.content[i].type !== "buttonBelt" && this.content[i].type !== "user" && this.content[i].type !== "hidden"){
				document.getElementById('form'+this.index).querySelector('[name="'+this.content[i].name+'"]').value = '';
			}else if(this.content[i].type === "range"){
				document.getElementById('form'+this.index+this.content[i].name).textContent = this.content[i].max/2+"%";
			}else if(this.content[i].type === "radio"){
				document.getElementById('form'+this.index).querySelector('[name="'+this.content[i].name+'"]').checked = false;
			}
		}
		this.temporary = [];
	};
	
	this.postSendScript = null;
	
	this.setPostSendScript = function(script){
		this.postSendScript = script;
	};
	
	GraphicalForm.resetDatas = function(id){
		Graphorms[id].resetParams();
	};
	
	GraphicalForm.sendDatas = function(id){
		var el = document.getElementById('form'+id);
		var xhr = new XMLHttpRequest();
		var params = Graphorms[id].getParams();
				
		var oScript = document.createElement('script');
		oScript.type = 'text/javascript';
		
		var instance = Graphorms[id];
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
				if(instance.popupToHide !== null) instance.popupToHide.deactivate();
				if(instance.postSendScript !== null){
					instance.postSendScript(xhr.responseText);
					var progress = document.getElementById('progressContainer');
					instance.resetParams();
					progress.parentNode.removeChild(progress);
				}
			}else if (xhr.readyState === 4 && (xhr.status === 500 || xhr.status === 0)) {
				alert(xhr.responseText);
				var progress = document.getElementById('progressContainer');
				progress.parentNode.removeChild(progress);
			}
		};
		
		xhr.upload.addEventListener("progress", function(e) {
			var pc = parseInt(100 - (e.loaded / e.total * 100),10);
			progressBar.style.width = (100 - pc) + "%";
		}, false);
		
		if(el){
			var progressContainer = el.appendChild(document.createElement("div"));
			var progressBar = progressContainer.appendChild(document.createElement("div"));
			progressBar.className = "progress";
			progressContainer.className = "progressContainer";
			progressContainer.setAttribute('id','progressContainer');
			progressBar.style.width="0%";
			progressContainer.style.width="100%";
		}
		
		xhr.open("POST", Graphorms[id].getUrl(), true);
		xhr.send(params);
	};
}

GraphicalForm.reset = function(){
	Graphorms = new Array();
};

function ButtonBelt(){
	this.buttons = new Array();
	
	this.addButton = function(titre, hand){
		this.buttons[this.buttons.length] = {title: titre, handler: hand};
	};
	
	this.getButtons = function(){
		return this.buttons;
	};
}