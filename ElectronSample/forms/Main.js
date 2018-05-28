/**
 * @type Array<servoyextra-sidenav.MenuItem>
 * @properties={typeid:35,uuid:"B585E7B2-8766-4394-AD97-32974F2A9B73",variableType:-4}
 */
var menu = [
	{
	  id: "header",
	  text: "Servoy",
	  styleClass: "servoy-logo"
	}, 
	{
	  id: "dashboard",
	  text: "Dashboard"
	},{
  	    isDivider: true
    }, 
	{
  	  id: "customers",
  	  text: "Customers"
  	},{
  	    isDivider: true
    }, 
  	{
  	  id: "orders",
  	  text: "Orders"
  	},{
  	    isDivider: true
    },  
    {
  	  id: "products",
  	  text: "Products"
    },{
	  isDivider: true
	 },  
	 {
	  id: "employees",
	  text: "Employees"
	 }];


/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6C5F7651-450A-4F40-870A-FC50AF0843C4"}
 */
function onLoad(event) {
	elements.sidenav_1.setRootMenuItems(menu);
}

/**
 * @param {object} menuItemId
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @properties={typeid:24,uuid:"3D2D4DC2-7E35-4F59-96D9-23669B62B07B"}
 */
function onMenuItemSelected(menuItemId, event) {
	var item = elements.sidenav_1.getMenuItem(menuItemId);
	switch (item.id) {
	case "dashboard":
	    elements.sidenav_1.containedForm = forms.dashboard;
	break;
	case "customers":
		elements.sidenav_1.containedForm = forms.customersForm;
	break;
	case "orders":
		elements.sidenav_1.containedForm = forms.ordersForm;
		
	break;
	case "products":
		elements.sidenav_1.containedForm = forms.productsForm;
	break;
	case "employees":
		elements.sidenav_1.containedForm = forms.employeesForm;
	break;
	default:
		break;
	}
	return false;
}

