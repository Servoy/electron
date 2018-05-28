
/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"4C5125FA-8D99-4752-A684-C676474F80CD"}
 */
function save(event){
	databaseManager.saveData(foundset);
	forms.Main.elements.sidenav_1.containedForm = forms.ordersForm;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"CA34C916-A671-4703-AF30-4C6B9C701E11"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}
