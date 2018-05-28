/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"18096B83-C80E-481B-8790-8EBFB32EE692"}
 */
function setFoundset(fs){
	foundset.loadRecords(fs);
}
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1E1D801C-8CC5-476B-A666-E6726D0014F9"}
 */
function onShow(firstShow, event) {
	elements.employee_name.text = foundset.firstname + " " + foundset.lastname;
	elements.employee_title.text = foundset.title;
	elements.about_description.text = foundset.notes;
}
