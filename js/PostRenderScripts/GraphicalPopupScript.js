function showPopup(event) { 
	var source_elem = event.srcElement;
	if(source_elem == null)
		source_elem = event.target;
	
	var popup_class = "";
	
	do {
		popup_class = source_elem.getAttribute("popup");
		source_elem = source_elem.parentNode;
	} while(popup_class == null);

	document.getElementsByClassName(popup_class)[0].style.display = 'block';

	forceScrollVerticalInCell();
}

var b_showPopup = document.getElementsByClassName('showPopup');
addEventListenerList(b_showPopup, 'click', showPopup);
