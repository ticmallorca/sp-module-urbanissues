/**
 * controller
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function issue_panel_getIssues(filterStatus) {

	var apiURL = "/api/issue/get";
	$.ajax({
		type: "GET",
		url: apiURL

	}).done(function (response) {
		if (response.status === true) {
			issue_panel_print_getIssues(response.data,filterStatus);
		} else {
			console.log(response);
		}
	});
	
}

function issue_panel_modalConfiguration(issueId) {
	var apiURL = "/api/issue/get/"+ issueId;
	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {
		if (response.status === true) {
			issue_panel_print_modalConfiguration(response.data[0]);
		} else {
			console.log(response);
		}
	});
}