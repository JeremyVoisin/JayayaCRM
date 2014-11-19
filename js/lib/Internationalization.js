LanguageList = DatasBuffer.getRequest('js/Internationalization/languageList.json');

var internationalizationDictionary = null;
var selectedLanguage = getURLParameter("lang");

var lang = (selectedLanguage && LanguageList.lang[selectedLanguage])?LanguageList.lang[selectedLanguage]:LanguageList.lang['fr_FR'];

function _(word){
	if(internationalizationDictionary==null)loadLanguage();
	return internationalizationDictionary[word];
}

function loadLanguage(){
	if(internationalizationDictionary==null){
		internationalizationDictionary = DatasBuffer.getRequest('js/Internationalization/'+lang.fileName);
	}
}

function setLanguage(lang){
	
}