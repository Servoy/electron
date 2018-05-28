
/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"76A74E61-5552-41AA-A977-0256953CFD24"}
 */
function edit(fs){
	foundset.loadRecords(fs);
}

/**
 * @properties={typeid:24,uuid:"20C59405-DAA8-4C74-A2EA-9C0E35DE6E5A"}
 */
function save(){
	var fs = foundset.getSelectedRecord();
	databaseManager.saveData(fs);
	forms.Main.elements.sidenav_1.containedForm = forms.customersForm;
}