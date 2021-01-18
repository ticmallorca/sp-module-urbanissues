/**
 * view
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

console.log("Issue view library");

function issue_sideBar_print_getIssueCount(data) {
	var first = true;
	for (var key in data) {
		var classAlign = "align-self-center";
		if (first) {
			classAlign = "align-self-center ml-auto";
			first = false;
		}
		var span = `<span class="badge bg-${data[key].color} ${classAlign}" title="Status ${data[key].name}">${data[key].value}</span>`;
		$("#issueSideBar").append(span);

	}
}