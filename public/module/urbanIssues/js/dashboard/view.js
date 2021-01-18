/**
 * view
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

console.log("Issue view library");

function issue_widget_print_getIssueCount(data) {
	$("#issue_widget_something").html(JSON.stringify(data));

	var issueType = ["Type"];
	var issueValue = ["Issues"];
	var issueConfigs = [];
	var issueStatus = [];

	for (const key in data) {
		issueType.push(data[key].name);
		issueValue.push(data[key].value);
		issueStatus.push(`/issue?status=${data[key].name}`)

		var color = $(".bg-" + data[key].color).css("background-color");
		issueConfigs.push({
			type: 'bar',
			color: color
		});


	}


	if (typeof echarts == 'undefined') {
		console.warn('Warning - echarts.min.js is not loaded.');
		return;
	}
	// Define elements
	var bars_basic_element = document.getElementById('issue_chart_bar');
	//
	// Charts configuration
	//

	// Basic bar chart
	if (bars_basic_element) {

		// Initialize chart
		var bars_basic = echarts.init(bars_basic_element);
		//
		// Chart config
		//
		var option = {
			legend: {},
			tooltip: {},
			dataset: {
				source: [
					issueType,
					issueValue,
				]
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {},
			series: issueConfigs
		};

		// Options
		bars_basic.setOption(option);
		bars_basic.on('click', function (param) {
			window.location.href = issueStatus[param.seriesIndex];
		});
	}

	// Resize function
	var triggerChartResize = function () {
		bars_basic_element && bars_basic.resize();
	};

	// On sidebar width change
	$(document).on('click', '.sidebar-control', function () {
		setTimeout(function () {
			triggerChartResize();
		}, 0);
	});

	// On window resize
	var resizeCharts;
	window.onresize = function () {
		clearTimeout(resizeCharts);
		resizeCharts = setTimeout(function () {
			triggerChartResize();
		}, 200);
	};

}