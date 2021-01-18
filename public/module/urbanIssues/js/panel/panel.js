/**
 * panel
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
}


$(window).on('load', function () {
	var status = getQueryVariable("status");
	if (status === undefined) {
		status = "";
	}
	issue_panel_getIssues(decodeURI(status));
});

function printModal(domElement) {
	$(`#${domElement}`).printThis({
		importCSS: true,
		canvas:true
	});
}