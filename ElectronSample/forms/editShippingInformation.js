
/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"3D981BA5-AC1F-43C0-9FF6-E55895AAC83D"}
 */
function save(event) {
	databaseManager.saveData(foundset);
	forms.Main.elements.sidenav_1.containedForm = forms.shippingInformation;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"A1300B68-8ABB-4EC1-B7AF-7C8A46AADEAC"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}