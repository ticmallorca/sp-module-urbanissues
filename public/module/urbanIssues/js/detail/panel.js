/**
 * urbanIssues - panel
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function getQueryIssueId() {
	var query = window.location.href;
	var vars = query.split("/");
	if (vars.length >= 1 && !isNaN(vars[vars.length - 1])) {
		return parseInt(vars[vars.length - 1]);
	}
	alert('Query Variable ' + variable + ' not found');
}

$(window).on('load', function () {
	issue_detail_getReportsByIssueId(getQueryIssueId());

});

$("#issue-detail-set-report").click(() => {
	var report = {
		issueId: parseInt(getQueryIssueId()),
		categoryId: parseInt($("#issue-detail-form-category-list").val()),
		statusId: parseInt($("#issue-detail-form-status-list").val()),
		report: ($("#issue-detail-form-report-text").val()).toString(),
		feedback: $("#issue-detail-form-report-feedback").is(":checked")
	};

	issue_detail_setReport(report);
})