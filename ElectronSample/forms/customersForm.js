
/**
 * Called when the mouse is clicked on a row/cell (row and column are given) or.
 * when the ENTER key is used then only the selected row is given
 *
 * @param {Number} row
 * @param {Number} [column]
 *
 * @properties={typeid:24,uuid:"6F898DF2-BFBC-4B25-A6B1-0DDDD005EA1D"}
 */
function onCellClick(row, column) {
	switch (column) {
	case 7:
		plugins.electronFile.sendMessage("hello")
	break;
	case 8:
		forms.Main.elements.sidenav_1.containedForm = forms.editCustomer;
		forms.editCustomer.edit(foundset);
	break;
	case 9:
		foundset.deleteRecord();
	break;
	}
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"8B576CBE-8496-4A79-B343-7D02D6F7FE71"}
 */
function onActionCreate(event) {
	forms.Main.elements.sidenav_1.containedForm = forms.createCustomer;
}

/**
 * @properties={typeid:24,uuid:"34FA0D82-1C8C-433B-8631-E0788E7164A2"}
 */
function getSearchProvider() {
	return "companyname"
}


///**
// * TODO generated, please specify type and doc for the params
// * @param event
// *
// * @properties={typeid:24,uuid:"C392FA8C-2804-4810-85B8-5A8288FB6FCA"}
// */
//function onLoad(event) {
//	searchProvider = "companyname"
//}
//
///**
// * Callback method for when form is shown.
// *
// * @param {Boolean} firstShow form is shown first time after load
// * @param {JSEvent} event the event that triggered the action
// *
// * @properties={typeid:24,uuid:"095C6EC3-1F4D-4250-A6EC-2B2C027C0A8A"}
// */
//function onShow(firstShow, event) {
//	searchProvider = "companyname"
//}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"9E8CFC69-4FF8-430D-A4B3-1A503E18DE42"}
 */
function onActionGenerateExcel(event) {
	var workbook = scopes.svyExcelUtils.createWorkbookFromFoundSet(foundset,
	foundset.alldataproviders,
	foundset.alldataproviders, 
	scopes.svyExcelUtils.FILE_FORMAT.XLSX);
	workbook.sheetName = 'All Customers';
	
	//create styles for header and rows
	var headerStyle = workbook.createHeaderStyle();
	headerStyle
	.setFont('Calibri,0,11')
	.setFillPattern(scopes.svyExcelUtils.FILL_PATTERN.SOLID_FOREGROUND)
	.setFillForegroundColor(scopes.svyExcelUtils.INDEXED_COLOR.LIGHT_ORANGE)
	.setAlignment(scopes.svyExcelUtils.ALIGNMENT.CENTER);
	workbook.headerStyle = headerStyle;
	
	var rowStyle = workbook.createRowStyle();
	rowStyle
	.setFont('Calibri,0,11');
	workbook.rowStyle = rowStyle;
	var bytes = workbook.getBytes();
	application.output(bytes.toString());
	//write to file
	//plugins.electronFile.saveFile("Hello world");
	plugins.electronFile.saveExcelFile(bytes, "downloads");
	//workbook.writeToFile('dataset.xlsx');
}





