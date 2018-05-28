/**
 * TODO generated, please specify type and doc for the params
 * @param row
 * @param column
 *
 * @properties={typeid:24,uuid:"550EEF3A-C1EC-459F-A4C0-8EBC4D0CA6AC"}
 */
function onCellClick(row, column) {
	switch (column) {
	case 4:
		forms.Main.elements.sidenav_1.containedForm = forms.orderDetailForm;
		forms.orderDetailForm.setFoundSet(foundset);
	break;
	case 5:
		forms.Main.elements.sidenav_1.containedForm = forms.shippingInformation;
		forms.shippingInformation.setFoundSet(foundset.orderid);
	break;
	case 6:
		forms.Main.elements.sidenav_1.containedForm = forms.editOrderForm;
		forms.editOrderForm.setFoundSet(foundset);
	break;
	case 7:
		foundset.deleteRecord();
	break;
	}
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F34F7B09-813D-4985-B842-F4FCB3EA41DC"}
 */
function onActionCreateOrder(event) {
	forms.Main.elements.sidenav_1.containedForm = forms.createOrder;
}
