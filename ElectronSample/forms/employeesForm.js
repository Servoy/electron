
/**
 * Called when the mouse is clicked on a row/cell (row and column are given) or.
 * when the ENTER key is used then only the selected row is given
 *
 * @param {Number} row
 * @param {Number} [column]
 *
 * @properties={typeid:24,uuid:"E0AC2E5B-F0B1-4ED6-87B5-6D1820F2B1F8"}
 */
function onCellClick(row, column) {
	switch (column) {
	case 8:
		forms.Main.elements.sidenav_1.containedForm = forms.employeeProfile;
		forms.employeeProfile.setFoundset(foundset);
	break;
	case 9:
		foundset.deleteRecord();
	break;
	}
}
