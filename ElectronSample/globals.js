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

