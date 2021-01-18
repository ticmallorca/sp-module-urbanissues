/**
 * controller
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function issue_detail_getReportsByIssueId(issueId) {
	var apiURL = `/api/issue/get/${issueId}/detail`;
	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {
		if (response.status === true) {
			issue_detail_print_getReportsByIssueId(response.data[0]);
		} else {
			console.log(response);
		}
	});
}


function issue_detail_getStatus() {
	var apiURL = `/api/issue/status`;
	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {
		if (response.status === true) {
			issue_detail_print_getStatus(response.data);
		} else {
			console.log(response);
		}
	});
}


function issue_detail_getCategories() {
	var apiURL = `/api/issue/category`;
	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {
		if (response.status === true) {
			issue_detail_print_getCategories(response.data);
		} else {
			console.log(response);
		}
	});
}

function issue_detail_setReport(report) {
	var apiURL = `/api/issue/set/${report.issueId}/report`;
	$.ajax({
		type: "POST",
		url: apiURL,
		data: report
	}).done(function (response) {
		if (response.status === true) {
			location.reload();
		} else {
			console.log(response);
		}
	});
}