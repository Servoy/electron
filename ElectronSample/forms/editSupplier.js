/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"AE98D84A-E2F2-4F14-985E-4EEB37C58EE6"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"34BC3950-E06C-4FF0-8C60-051FA8F7A518"}
 */
function save(event) {
	databaseManager.saveData();
	forms.Main.elements.sidenav_1.containedForm = forms.productSupplierForm;
}
