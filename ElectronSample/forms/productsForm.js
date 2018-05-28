
/**
 * Called when the mouse is clicked on a row/cell (row and column are given) or.
 * when the ENTER key is used then only the selected row is given
 *
 * @param {Number} row
 * @param {Number} [column]
 *
 * @properties={typeid:24,uuid:"D708298C-03F5-49C4-9DE2-A476B040821D"}
 */
function onCellClick(row, column) {// TODO Auto-generated method stub
	switch (column) {
	case 8:
		forms.productSupplierForm.setFoundSet(foundset.product_to_supplier);
		forms.Main.elements.sidenav_1.containedForm = forms.productSupplierForm;
	break;
	case 9:
		forms.Main.elements.sidenav_1.containedForm = forms.editProduct;
		forms.editProduct.setFoundSet(foundset);
	break;
	case 6:
		foundset.deleteRecord();
	break;
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"44177843-33A4-4B0D-8FC8-6EC983222629"}
 */
function onLoad(event) {
//	var count = 0;
//	var query = datasources.db.example_data.products.createSelect();
//    query.where.add(query.columns.discontinued.eq(-1));
//    foundset.loadRecords(query);
//    foundset.forEach(function(record, recordIndex, fs) {
//    	record.discontinued = 1;
//    	count++;
//    });
//    databaseManager.saveData();
//    application.output(count);
}
