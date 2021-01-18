/**
 * controller
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

console.log("Issue Widget controller library");

function issue_widget_getIssueCount() {
	var apiURL = "/api/issue/get-count";
	$.ajax({
		type: "GET",
		url: apiURL

	}).done(function (response) {
		if (response.status && response.size === 1) {
			issue_widget_print_getIssueCount(response.data[0]);
		} else {
			alert("Se ha producido un error, revise el log");
			console.log(response);
			window.location.href = "/logout";
		}
	});
}