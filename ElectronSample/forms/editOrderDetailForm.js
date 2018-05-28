


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"098AC1D7-FA83-4439-A6B1-2AF657BA43BC"}
 */
function save(event){
	databaseManager.saveData(foundset);
	databaseManager.saveData(foundset.orders_to_order_details);
	forms.Main.elements.sidenav_1.containedForm = forms.orderDetailForm;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {JSFoundSet} fs
 *
 * @properties={typeid:24,uuid:"D3C9F174-E0E1-4A9B-BF73-D2FAC81EF740"}
 */
function setFoundSet(fs){
	foundset.loadRecords(fs);
}


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6698E370-20D9-4BF4-8DDE-9E86F418D6D8"}
 */
function onActionMinus(event) {
	var quantity = foundset.orders_to_order_details.quantity;
	if(quantity>0){
		foundset.orders_to_order_details.quantity = quantity - 1;
    }
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"6151B77F-C0B3-4773-AA35-3692863646C3"}
 */
function onActionPlus(event) {
	var quantity = foundset.orders_to_order_details.quantity;
	foundset.orders_to_order_details.quantity = quantity + 1;
}
