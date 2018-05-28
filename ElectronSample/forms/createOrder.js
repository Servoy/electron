

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"D75A3113-7B7A-4908-BA0F-6CD589068639"}
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
 * @properties={typeid:24,uuid:"A68750FF-F1B2-45D5-BBFB-E6A0B8923E8B"}
 */
function onActionPlus(event) {
	var quantity = foundset.orders_to_order_details.quantity;
	foundset.orders_to_order_details.quantity = quantity + 1;
}


/**
 * @properties={typeid:24,uuid:"FA733E79-4DF5-4DA7-ADE3-2ABB0521D086"}
 */
function save(){
	foundset.orderdate = new Date();
	databaseManager.saveData();
	forms.Main.elements.sidenav_1.containedForm = forms.ordersForm;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0C4B508B-3AC3-4524-A540-4E2305CC33ED"}
 */
function onShow(firstShow, event) {
	foundset.newRecord();
	foundset.orders_to_order_details.newRecord();
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"805A3299-AF52-4849-97A6-B19E4F5F9047"}
 */
function onHide(event) {
	databaseManager.revertEditedRecords(foundset);
	return true;
}
