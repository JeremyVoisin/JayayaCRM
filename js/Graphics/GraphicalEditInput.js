var GEIsCount = 0;
function GraphicalEditInput(){

	//Variables d'instance
	this.nameField = "";
	this.valueField = "";
	this.valueTextField = "";
	this.typeField = "text";
	this.buttonSup = "";
	this.functionOnClick = "";
	this.functionOnClickSup = "";
	this.index = GEIsCount;
	GEIsCount++;
	
	//Section liée au coupleur
	
	this.coupler = null;
	this.updateHandler = null;
	this.notificationHandler = null;
	
	this.setNotificationHandler = function(handler){
		this.notificationHandler = handler;
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
	
	this.clearList = function(){
		this.elements = new Array();
		this.notificationList = new Array();
	};
	
	this.clear = function(){
	
	};
	
	//Fin de section liée au coupleur
	
	/**
	*	Modifie le nom du champs
	*
	*/
	this.setNameField = function(nameField){
		this.nameField = nameField;
	}
	
	this.setValueField = function(valueField){
		this.valueField = valueField;
	}
	
	this.setValueTextField = function(valueTextField){
		this.valueTextField = valueTextField;
	}
	
	this.setTypeField = function(typeField){
		this.typeField = typeField;
	}
	
	this.setButtonSup = function(etat){
		if(etat)
			this.buttonSup = '<input onclick="'+this.functionOnClickSup+'" class="sup_btn" type="button" value="Supprimer"/>';
	}
	
	this.setFunctionOnClick = function(fct){
		this.functionOnClick = fct;
	}
	
	this.setFunctionOnClickSup = function(fct){
		this.functionOnClickSup = fct;
	}
	
	
	this.render = function(){
		if(this.valueTextField == "")
			this.valueTextField = this.valueField;
		if(this.typeField == "text")
			return '<p id="GEI'+this.index+'" class="graphicalEI">'+ this.nameField +' <span>:</span> <span class="current_value">'+ this.valueField +' </span><span class="current_value_btn"><input class="edit_btn" type="button" value="Editer"/>'+ this.buttonSup +'</span><span class="edit_value" style="display:none;"><input class="modif_value" type="'+ this.typeField +'" value="'+ this.valueTextField +'"/><input type="button" value="Modifier" onClick="'+ this.functionOnClick +'"/><input class="cancel_btn" type="button" value="Annuler"/></span></p>';
		else if(this.typeField == "textarea")
			return '<p id="GEI'+this.index+'" class="graphicalEI">'+ this.nameField +'<br/><span class="current_value">'+ this.valueField +' </span><span class="current_value_btn"><input class="edit_btn" type="button" value="Editer"/>'+ this.buttonSup +'</span><span class="edit_value" style="display:none;"><textarea class="modif_value">'+ this.valueTextField +'</textarea><br/><input type="button" value="Modifier" onClick="'+ this.functionOnClick +'"/><input class="cancel_btn" type="button" value="Annuler"/></span></p>';
	};
	
	this.update = function(){
		var element = document.getElementById("GEI"+this.index);
		if(!element)return;
		if(this.valueTextField == "")
			this.valueTextField = this.valueField;
		if(this.typeField == "text")
			element.innerHTML = this.nameField +' : <span class="current_value">'+ this.valueField +' </span><span class="current_value_btn"><input class="edit_btn" type="button" value="Editer"/>'+ this.buttonSup +'</span><span class="edit_value" style="display:none;"><input class="modif_value" type="'+ this.typeField +'" value="'+ this.valueTextField +'"/><input type="button" value="Modifier" onClick="'+ this.functionOnClick +'"/><input class="cancel_btn" type="button" value="Annuler"/></span>';
		else if(this.typeField == "textarea")
			element.innerHTML = this.nameField +'<br/><span class="current_value">'+ this.valueField +' </span><span class="current_value_btn"><input class="edit_btn" type="button" value="Editer"/>'+ this.buttonSup +'</span><span class="edit_value" style="display:none;"><textarea class="modif_value">'+ this.valueTextField +'</textarea><br/><input type="button" value="Modifier" onClick="'+ this.functionOnClick +'"/><input class="cancel_btn" type="button" value="Annuler"/></span>';
	};
	
}

GraphicalEditInput.reset = function(){
	GEIsCount = 0;
};