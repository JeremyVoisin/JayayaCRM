// Renvoie une date au format dd/mm/yyyy
function getFormatDate(d) {
	var dd = d.getDate();
	if ( dd < 10 ) dd = '0' + dd;

	var mm = d.getMonth()+1;
	if ( mm < 10 ) mm = '0' + mm;

	var yy = d.getFullYear();

	return dd+'/'+mm+'/'+yy;
}

// Renvoie un heure au format hh:mm
function getFormatHeure(d) {
	var hh = d.getHours();
	if ( hh < 10 ) hh = '0' + hh;
	
	var mm = d.getMinutes();
	if (mm < 10) mm = '0' + mm;
	
	return hh+":"+mm;
}

// Permet de creer la date du jour avec l'heure à 00:00:00
function createDateWithHourToZero() {
	var date_without_hour = new Date();
	date_without_hour.setHours(0,0,0,0);
	return date_without_hour;
}

// Permet de creer une date avec une date passée en parametre et avec l'heure à 00:00:00
function setDateWithHourToZero(date) {
	var date_without_hour = new Date(date);
	date_without_hour.setHours(0,0,0,0);
	return date_without_hour;
}