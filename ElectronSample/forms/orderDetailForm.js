
/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"F0B75FEF-93E0-4A7E-91AB-41439B3A24A6"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}

/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given) or.
 * when the ENTER key is used then only the selected foundset index is given
 * Use the record to exactly match where the user clicked on
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord} [record]
 * @param {JSEvent} [event]
 *
 * @properties={typeid:24,uuid:"E7B5B552-88CB-4FF5-9EDB-6025382AB7F2"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {
	switch (columnindex) {
	case 5:
		forms.Main.elements.sidenav_1.containedForm = forms.editOrderDetailForm;
		forms.editOrderDetailForm.setFoundSet(foundset);
	break;
	}
}
