function addEventListenerList(list, event, fn) {
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener(event, fn, false);
	}
}

function hide_current_value(event) {
	var source_elem = event.srcElement;
	if(source_elem == null)
		source_elem = event.target;
		
	var current_value_btn = source_elem.parentNode;
	var current_value = current_value_btn.parentNode.getElementsByClassName('current_value')[0];
	var edit_value = current_value_btn.parentNode.getElementsByClassName('edit_value')[0];
	
	current_value_btn.style.display = "none";
	current_value.style.display = "none";
	edit_value.style.display = "inline";
}

function show_current_value(event) {
	var source_elem = event.srcElement;
	if(source_elem == null)
		source_elem = event.target;

	var edit_value = source_elem.parentNode;
	var current_value = edit_value.parentNode.getElementsByClassName('current_value')[0];
	var current_value_btn = edit_value.parentNode.getElementsByClassName('current_value_btn')[0];
	
	edit_value.style.display = "none";
	current_value.style.display = "inline";
	current_value_btn.style.display = "inline";
}

var edit_btns = document.getElementsByClassName('edit_btn');
addEventListenerList(edit_btns, 'click', hide_current_value);

var cancel_btns = document.getElementsByClassName('cancel_btn');
addEventListenerList(cancel_btns, 'click', show_current_value);