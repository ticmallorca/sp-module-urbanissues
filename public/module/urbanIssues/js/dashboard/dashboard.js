/**
 * sideBar
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
$(window).on('load', function () {
	issue_widget_getIssueCount();
	setInterval(() => {
		issue_widget_getIssueCount();
	}, 10000);
});