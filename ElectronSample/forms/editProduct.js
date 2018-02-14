/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"34D31C53-0303-4791-9D47-8E3885D4B24C"}
 */
function onActionMinus(event) {
	var quantity = foundset.orders_to_order_details.quantity;
	if(quantity>0){
		foundset.orders_to_order_details.quantity = quantity - 1;
    }
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"E492AEEF-FC84-432D-B345-AD9924B1FAAD"}
 */
function onActionPlus(event) {
	var quantity = foundset.orders_to_order_details.quantity;
	foundset.orders_to_order_details.quantity = quantity + 1;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param fs
 *
 * @properties={typeid:24,uuid:"2D8B006D-75DC-4874-8F93-FE29A4D854F4"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"15295E05-3713-44DE-97ED-FCF953A894AB"}
 */
function save(event) {
	databaseManager.saveData(foundset);
	forms.Main.elements.sidenav_1.containedForm = forms.productsForm;
}
