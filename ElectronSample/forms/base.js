/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3D435E50-EA81-436D-AC7F-292960A98752"}
 */
var searchValue;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5049AD34-2BAD-4E59-8B3E-33F9CC2AFED8"}
 */
var searchProvider;

 /**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"84825249-25D5-47D1-9632-3F4BFABF961A"}
 */
function search() {
 	if(foundset.find()){
 		foundset[getSearchProvider()] = searchValue + "%";
 		foundset.search();
 	}
 	return true
}

 /**
 * @properties={typeid:24,uuid:"7FBF3E80-8DA1-4C4A-A63C-FE80E6941F5C"}
 */
function getSearchProvider() {
 	throw "implemenent search provider to enable search"
 }

 /**
 * TODO generated, please specify type and doc for the params
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"F55BC7CD-09DE-42F3-B377-60BB20A2EC7D"}
 */
function onDataChange(oldValue, newValue, event) {
 	search();
 	return true;
 }