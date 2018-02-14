/**
 * TODO generated, please specify type and doc for the params
 * @param customer_country
 *
 * @properties={typeid:24,uuid:"501532D8-DEA3-4EB5-B090-5BC7C94F5F15"}
 */
function setCountry(customer_country){
	var query = datasources.db.example_data.customers.createSelect();
	query.where.add(query.columns.country.eq(customer_country));
	foundset.loadRecords(query);
	elements.header_label.text = "Customers from " + customer_country;
}


/**
 * Called when the mouse is clicked on a row/cell (row and column are given) or.
 * when the ENTER key is used then only the selected row is given
 *
 * @param {Number} row
 * @param {Number} [column]
 *
 * @properties={typeid:24,uuid:"9947D803-2B5B-418E-B6EB-755E6E38135B"}
 */
function onCellClick(row, column) {
	switch (column) {
	case 8:
		forms.Main.elements.sidenav_1.containedForm = forms.editCustomer;
		forms.editCustomer.edit(foundset);
	break;
	case 9:
		foundset.deleteRecord();
	break;
	}
}
