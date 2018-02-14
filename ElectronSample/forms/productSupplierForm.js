/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"92A08733-6424-47D8-A64D-417D95A55568"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}


/**
 * Called when the mouse is clicked on a row/cell (row and column are given) or.
 * when the ENTER key is used then only the selected row is given
 *
 * @param {Number} row
 * @param {Number} [column]
 *
 * @properties={typeid:24,uuid:"7315FED2-C076-44D0-AA25-989005E1D3F7"}
 */
function onCellClick(row, column) {
	switch (column) {
	case 10:
		forms.Main.elements.sidenav_1.containedForm = forms.editSupplier;
		forms.editSupplier.setFoundSet(foundset);
	break;
	}
}
