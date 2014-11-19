/********************************************************
*	@author Team Jayaya
*
*	Script de résolution de bugs concernant les listes
*	déroulantes pour Firefox et IE.
*
*********************************************************/

/**
*	Fonction permettant de forcer le scrolling vertical dans une cellule avec une hauteur de 100%
*/
function forceScrollVerticalInCell(){
	var elements = document.getElementsByClassName("Vertigo");
	
	// On passe les elements a 0px de hauteur
	for (var i=0; i<elements.length; i++) {
		elements[i].style.height = "0px";
	}
	
	for (var i=0; i<elements.length; i++) {
		var parent = elements[i].parentNode;

		// On recupere la hauteur du Row pere de l'element
		while(parent != null && parent.className.indexOf("Row") == -1 && parent.className.indexOf("Column") == -1)
		{
			parent = parent.parentNode;
		}
		
		// Affectation de la hauteur de la cellule pere a l'element
		if(parent != null){
			elements[i].style.height = parent.offsetHeight /1.01 + "px";
		}
	}
}

//Appelé quand la page est redimensionnée
window.onresize = function(event) {
	forceScrollVerticalInCell();
};