/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"BDCA670F-D0D3-42D0-9E0F-4FFED6325282"}
 * @AllowToRunInFind
 */
function setFoundSet(fs){
	elements.table_1.foundset.foundset.loadRecords(fs);
}

/**
 * Called when the mouse is clicked on a row/cell (row and column are given) or.
 * when the ENTER key is used then only the selected row is given
 *
 * @param {Number} row
 * @param {Number} [column]
 *
 * @properties={typeid:24,uuid:"60FC6697-1A05-4A38-8605-36711120E6F0"}
 */
function onCellClick(row, column) {
	switch (column) {
	case 9:
		forms.editShippingInformation.setFoundSet(foundset);
		forms.Main.elements.sidenav_1.containedForm = forms.editShippingInformation;
	break;
	}
}
