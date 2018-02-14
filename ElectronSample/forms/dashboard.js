
/**
 * @type {Array}
 *
 *
 * @properties={typeid:35,uuid:"A1ED8FC5-5299-4AC6-A30E-51FBBE543E6D",variableType:-4}
 */
var country_list;

/**
 * @properties={typeid:35,uuid:"07AFF0C6-1DED-4C91-9B33-AE37C5FCF05C",variableType:-4}
 */
var customer_table = datasources.db.example_data.customers.getFoundSet();

/**
 * @properties={typeid:35,uuid:"E5FEE872-0DCF-4D2E-BBC5-6077E45A99D6",variableType:-4}
 */
var order_table = datasources.db.example_data.orders.getFoundSet();

/**
 * @properties={typeid:35,uuid:"ED003C92-2523-4F8C-A189-99AB04F1A9B7",variableType:-4}
 */
var product_table = datasources.db.example_data.products.getFoundSet();

/**
 * @properties={typeid:35,uuid:"882238D2-7430-44B6-8C80-D0A93705AE46",variableType:-4}
 */
var employee_table = datasources.db.example_data.employees.getFoundSet();

/**
 * @properties={typeid:35,uuid:"9982E8CF-9F3D-47A6-BF77-4A3DE3CE33FF",variableType:-4}
 */
var options = {
	title: {
		display: true,
		text: 'Amount of customers in every country'
	}, scales: {
	      yAxes: [{
	          ticks: {
	            beginAtZero: true
	          }
	        }]
	      }
};

/**
 * @properties={typeid:24,uuid:"E13E401C-7B8E-474D-BE2A-DC0CBE718215"}
 */
function getCountryData(){
	var countries = new Array();
	for(var i = 0; i < customer_table.getSize(); i++){
		customer_table.setSelectedIndex(i);
		countries[i] = customer_table.country;
	}
	return countOccurence(countries);
}


/**
 * TODO generated, please specify type and doc for the params
 * @param array
 *
 * @properties={typeid:24,uuid:"4550333B-DE80-4012-8E5A-EED42AC4789C"}
 */
function countOccurence(array){
	var counts = {};
	array.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
	return counts;
}


/**
 * @properties={typeid:24,uuid:"0531ABE2-EA4C-4779-B986-9392E4E86D67"}
 */
function setCustomerAmount(){
	customer_table.loadAllRecords();
	elements.customer_amount.text = customer_table.getSize();
}

/**
 * @properties={typeid:24,uuid:"3ABEDC73-6469-4020-892A-5F938FF08395"}
 */
function setOrderAmount(){
	order_table.loadAllRecords();
	elements.order_amount.text = order_table.getSize();
}

/**
 * @properties={typeid:24,uuid:"0C6E9227-B117-4291-939A-4CE7ECCE8E23"}
 */
function setProductAmount(){
	product_table.loadAllRecords();
	elements.product_amount.text = product_table.getSize();
}

/**
 * @properties={typeid:24,uuid:"AD2FE703-E50F-477B-A342-C6FB34A9E6A6"}
 */
function setEmployeeAmount(){
	employee_table.loadAllRecords();
	elements.employee_amount.text = employee_table.getSize();
}


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CF094067-DB58-4320-8EF4-ABEAA3637FDA"}
 */
function onActionCustomers(event) {
	forms.Main.elements.sidenav_1.containedForm = forms.customersForm;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"BA3A3706-8244-4D02-B434-1ECA60E62E21"}
 */
function onActionOrders(event) {
	forms.Main.elements.sidenav_1.containedForm = forms.ordersForm;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"100FBC5D-96E3-470C-AD5B-71E2B8B08BCD"}
 */
function onActionProducts(event) {
	forms.Main.elements.sidenav_1.containedForm = forms.productsForm;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"0E0E6F04-3BAD-4656-BCC0-1153B6B571EE"}
 */
function onActionEmployees(event) {
	forms.Main.elements.sidenav_1.containedForm = forms.employeesForm;
}

/**
 * @properties={typeid:24,uuid:"953C08F6-A25E-4AAB-8161-56ADB79C6575"}
 */
function randomColorGenerator(){
	return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
}


/**
 * @properties={typeid:24,uuid:"5A180C7D-A4CA-4C01-8D7B-9B3F6035AEBB"}
 */
function getColors(){
	var colors = [];
	for(var i = 0; i < data_variables.length; i++) {
		colors[i] = randomColorGenerator()
	}
	return colors;
}

/**
 * @properties={typeid:35,uuid:"9AE45BC2-F1B2-460C-831F-612C654E35C5",variableType:-4}
 */
var data_variables;


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"411EAB51-F2B8-4E7F-9940-155316BD3D68"}
 */
function onShowDashboard(firstShow, event) {
	setCustomerAmount();
	setOrderAmount();
	setProductAmount();
	setEmployeeAmount();
	country_list = getCountryData();
	data_variables = [country_list["USA"], country_list["Italy"], country_list["Germany"], country_list["Belgium"], 
	country_list["Spain"], country_list["France"], country_list["Sweden"], country_list["Canada"], country_list["Brazil"]];
	var colors = getColors();
	var data = {
		type: 'bar',
		data: {
			labels: ["USA", "Italy", "Germany", "Belgium", "Spain", "France", "Sweden", "Canada", "Brazil"],
			datasets: [{
				label: "Customers",
				// The properties below allow an array to be specified to change the value of the item at the given index
				// String  or array - the bar color
				backgroundColor: colors,
				// String or array - bar stroke color
				borderColor: "rgba(220,220,220,1)",
				// Number or array - bar border width
				borderWidth: 1,
				// String or array - fill color when hovered
				hoverBackgroundColor: colors,
				// String or array - border color when hovered
				hoverBorderColor: "rgba(220,220,220,1)",
				// The actual data
				data: data_variables
			}]
		}
	};
	elements.country_bar_chart.setData(data);
	elements.country_bar_chart.setOptions(options);

}

/**
 * @param {Number} dataset_index
 * @param {Number} index
 * @param {string} label
 * @param {Number} value
 *
 * @properties={typeid:24,uuid:"6825F1F4-CA0D-40C9-9CA0-07A648D3D2CA"}
 */
function onClick(dataset_index, index, label, value) {
	forms.Main.elements.sidenav_1.containedForm = forms.customerCountryTable;
	forms.customerCountryTable.setCountry(label);
}
