

/**
 * @properties={typeid:24,uuid:"BBFB9168-A415-48BF-B4CC-A79A2E2729F4"}
 */
function save(){
	databaseManager.saveData();
	forms.Main.elements.sidenav_1.containedForm = forms.customersForm;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"EEA29DD9-D377-44CA-899F-BBA00ACE8D7D"}
 */
function onHide(event) {
	databaseManager.revertEditedRecords(foundset);
	return true;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"489D2F3D-F2CF-4061-A491-9CE1A64B2E4E"}
 */
function onShow(firstShow, event) {
	foundset.newRecord();
}
