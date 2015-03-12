LanguageList = DatasBuffer.getRequest('/js/Lang/languageList');

var internationalizationDictionary = null;
var selectedLanguage = getURLParameter("lang");

var lang = (selectedLanguage && LanguageList.lang[selectedLanguage])?LanguageList.lang[selectedLanguage]:LanguageList.lang['fr_FR'];

function _(word){
	if(internationalizationDictionary==null)loadLanguage();
	return (internationalizationDictionary[word]!==undefined)?internationalizationDictionary[word]:word;
}

function loadLanguage(){
	if(internationalizationDictionary==null){
		internationalizationDictionary = DatasBuffer.getRequest('/js/Lang/'+lang.fileName);
	}
}
