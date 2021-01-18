/**
 * view
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */



function issue_detail_print_getReportsByIssueId(data) {

	if (data !== undefined) {
		renderMap("issue-detail-map", data.longitude, data.latitude, 16, {
			icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
			latitude: data.latitude,
			longitude: data.longitude
		});
		$("#issue-detail-title-issue-id").html(`Issue #${data.id}`);
		$("#issue-detail-title-issue-category-name").html(`${data.report[data.report.length - 1].categoryName}`);

		var report = "";
		var firstReport = true;
		for (var i in data.report) {
			$("#issue-detail-form-status-list").val(data.report[i].statusId).change();
			$("#issue-detail-form-category-list").val(data.report[i].categoryId).change();

			// Report icon
			var reportIcon = `<i class="icon-user"></i>`;
			// Report Content
			var reportContent = data.report[i].report;


			if (firstReport) {

				reportIcon = `<i class="icon-mobile"></i>`;
				reportContent = "";
				if (data.address !== "N/A") {
					reportContent = `<div class="font-weight-semibold">Direcció: <div class="ml-sm-auto mt-2 mt-sm-0 font-weight-normal">${data.address}</div></div>`;
				}
				reportContent += `<div class="font-weight-semibold">Informació: <div class="ml-sm-auto mt-2 mt-sm-0 font-weight-normal">${data.report[i].report}</div></div>`;
			}

			var backgroudColor = "#FFF";
			if (data.report[i].feedback) {
				reportIcon = `<i class="icon-megaphone"></i>`;
				switch (data.report[i].statusId) {
					case 1:
						backgroudColor = "#cdd3d6";

						break;
					case 2:
						backgroudColor = "#e6c8c8";
						break;
					case 3:
						backgroudColor = "#ffd3c5";
						break;
					case 4:
						backgroudColor = "#c7e2c8";
						break;
					default:
						break;
				}
			}
			var images = "";
			for (var img in data.report[i].image) {
				images = images + `<a href="/module/urbanIssues/image/${data.report[i].image[img].imageName}" target="_blank">
										<img src="/module/urbanIssues/image/${data.report[i].image[img].imageName}"
											class="rounded-circle" width="36" height="36" alt="">
									</a>`;
			}
			report = report + `<div class="timeline-row">
							<div class="timeline-icon">
								<div class="bg-${data.report[i].statusColor}">
									`+ reportIcon + `
								</div>
							</div>

							<div class="row">
								<div class="col-lg-12">
									<div class="card border-left-3 border-left-${data.report[i].statusColor} rounded-left-0" style="background-color:${backgroudColor}">
										<div class="card-body">
											<div class="d-sm-flex align-item-sm-center flex-sm-nowrap">
												<div>
													<h6><a href="/user/${data.report[i].userId}">${data.report[i].userName} ${data.report[i].userSurname}</a></h6>
													<p class="mb-3">${reportContent}</p>
													${images}
												</div>

												<ul class="list list-unstyled mb-0 mt-3 mt-sm-0 ml-auto">
													<li><span class="text-muted">${new Date(data.report[i].created * 1000).toLocaleString()}</span></li>
													<li>Report Id: ${data.report[i].id} </li>
													<li>Status: <span
															class="badge bg-${data.report[i].statusColor} align-self-center">${data.report[i].statusName}</span>
													</li>
													<li>Category: ${data.report[i].categoryName} </li>
												</ul>
											</div>
										</div>
									</div>
								</div>

							</div>

						</div>`;
			firstReport = false;
		}
		$("#issue-detail-reports").prepend(report);
	}
}