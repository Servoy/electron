/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"19C1D6D2-ADAF-4968-B858-D3D0BF1C1435"}
 */
var shippingValue = "Shipping Information";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6362D29F-6124-4E2B-8321-BB5E0B150BB4"}
 */
var moreInfoValue = "More Information";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"351BB00F-C8BD-4606-B0A0-9776943AE22A"}
 */
var showSupplierValue = "Show Supplier";


/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>>} queryParams all query parameters of the deeplink url with which the Client was started
 *
 * @properties={typeid:24,uuid:"05289DEB-140B-49C4-AC71-F087BD68CA83"}
 */
function onSolutionOpen(arg, queryParams) {
	databaseManager.setAutoSave(false);
}

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C6463C7A-78F4-4DE1-AAA3-5BC2BB1B0754"}
 */
var editValue = "Edit";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D51FFF89-0426-4B20-92D9-754157125FB7"}
 */
var deleteValue = "Delete";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BDBA52B8-F14A-4465-8E28-029338FF4F0D"}
 */
var showOrderDetailsValue = "Show Order Details";


/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AC400C5D-63F6-44BB-BD54-CEBA2E60C7BD"}
 */
var printer_list;



/**
 * Called when the valuelist needs data, it has 3 modes.
 * real and display params both null: return the whole list
 * only display is specified, called by a typeahead, return a filtered list
 * only real value is specified, called when the list doesnt contain the real value for the give record value, this will insert this value into the existing list
 *
 * @param {String} displayValue The value of a lookupfield that a user types
 * @param realValue The real value for a lookupfield where a display value should be get for
 * @param {JSRecord} record The current record for the valuelist.
 * @param {String} valueListName The valuelist name that triggers the method. (This is the FindRecord in find mode, which is like JSRecord has all the columns/dataproviders, but doesn't have its methods)
 * @param {Boolean} findMode True if foundset of this record is in find mode
 * @param {Boolean} rawDisplayValue The raw displayValue without being converted to lower case
 *
 * @return {JSDataSet} A dataset with 1 or 2 columns display[,real]
 *
 * @properties={typeid:24,uuid:"D1A7B148-59C1-41A4-B766-570FAAB1D404"}
 */
function getPrinters(displayValue, realValue, record, valueListName, findMode, rawDisplayValue) {
	var args = null;
	var query = datasources.db.example_data.employees.createSelect();
	/** @type  {JSDataSet} */
	var result = null;
	if (displayValue == null && realValue == null) {
		// TODO think about caching this result. can be called often!
		// return the complete list
		query.result.add(query.columns.firstname.concat(' ').concat(query.columns.lastname)).add(query.columns.employeeid);
		result = databaseManager.getDataSetByQuery(query, 100);
	} else if (displayValue != null) {
		// TYPE_AHEAD filter call, return a filtered list
		args = [displayValue + "%", displayValue + "%"];
		query.result.add(query.columns.firstname.concat(' ').concat(query.columns.lastname)).add(query.columns.employeeid).root.where.add(query.or.add(query.columns.firstname.lower.like(args[0] + '%')).add(query.columns.lastname.lower.like(args[1] + '%')));
		result = databaseManager.getDataSetByQuery(query, 100);
	} else if (realValue != null) {
		// TODO think about caching this result. can be called often!
		// real object not found in the current list, return 1 row with display,realvalue that will be added to the current list
		// dont return a complete list in this mode because that will be added to the list that is already there
		args = [realValue];
		query.result.add(query.columns.firstname.concat(' ').concat(query.columns.lastname)).add(query.columns.employeeid).root.where.add(query.columns.employeeid.eq(args[0]));
		result = databaseManager.getDataSetByQuery(query, 1);
	}
	return result;

}
