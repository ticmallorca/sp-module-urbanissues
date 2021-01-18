/**
 * view
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
function issue_panel_print_getIssues(data, filterStatus) {
	if (data.length >= 1) {
		var fullArray = [];
		var dataArray = [];
		for (var ele in data) {
			var element = data[ele];
			dataArray.push(`<td class="text-center">
			<div class="list-icons">
				<div class="dropdown">
					<a href="#" class="list-icons-item" data-toggle="dropdown">
						<i class="icon-menu9"></i>
					</a>

					<div class="dropdown-menu dropdown-menu-right">
						<a href="#" class="dropdown-item"  onClick="issue_panel_modalConfiguration(${element.issueId})"><i class="icon-file-eye"></i> View</a>
						<a href="/issue/${element.issueId}" class="dropdown-item"><i class="icon-pencil5"></i> Edit</a>
					</div>
				</div>
			</div>
		</td>`);
			// <button type="button" class="btn bg-danger" data-toggle="modal" data-target="#modal_theme_danger">Launch <i class="icon-play3 ml-2"></i></button>

			dataArray.push(parseInt(element.issueId));
			dataArray.push(element.reportCategoryName);
			dataArray.push(element.reportDescription);
			dataArray.push(`<span class="badge bg-${element.reportStatusColor}">${element.reportStatusName}</span>`);
			dataArray.push(moment(element.issueCreated * 1000).format("DD/MM/YYYY, HH:mm:ss"));
			dataArray.push(moment(element.reportCreated * 1000).format("DD/MM/YYYY, HH:mm:ss"));
			fullArray.push(dataArray);
			dataArray = [];
		}
		moment.locale('es');
		$.fn.dataTable.moment('L', 'es');
		$.fn.dataTable.moment('DD/MM/YYYY HH:mm:ss');
		$(".datatable-basic").dataTable({
			autoWidth: false,
			responsive: true,
			stateSave: true,
			columnDefs: [{
				orderable: true
			}, {
				type: 'date',
				targets: [5, 6],
				orderable: true
			}],
			buttons: {
				dom: {
					button: {
						className: 'btn btn-light'
					}
				},
				buttons: [
					'excelHtml5',
					'pdfHtml5',
					'print'
				]
			},
			dom: '<"datatable-header"flB><"datatable-scroll"t><"datatable-footer"ip>',
			language: {
				search: '<span>Filter:</span> _INPUT_ ',
				lengthMenu: '<span>Show:</span> _MENU_',
				paginate: {
					'first': 'First',
					'last': 'Last',
					'next': '→',
					'previous': '←'
				}
			},
			data: fullArray
		});
		$(".datatable-basic").dataTable().fnFilter(filterStatus);
	}
}


function issue_panel_print_modalConfiguration(data) {
	$("#modalHeader").removeClass();
	$("#modalButtonSave").removeClass();
	$("#modalHeader").addClass(`modal-header ${data.reportStatusColor}`);
	$("#modalButtonSave").addClass(`btn ${data.reportStatusColor}`);
	$('#modal_theme').modal('show');

	$("#modalTitle").html(`#${data.issueId}`);
	$("#modalCategory").html(data.reportCategoryName);
	$("#modalDescription").html(data.reportDescription);
	$("#modalAddress").html(data.issueAddress);
	$("#modalLocation").html(`lat:${data.issueLatitude} - long:${data.issueLongitude}`);
	$("#modalDate").html(new Date(parseInt(data.reportCreated) * 1000).toLocaleString());

	var images = "";
	for (const image in data.images) {
		images += `<a href="/module/urbanIssues/image/${data.images[image].imageName}" target="_blank" data-popup="lightbox">
						<img src="/module/urbanIssues/image/${data.images[image].imageName}" class="rounded-circle" width="36" height="36" alt="">
					</a>`;
	}
	$("#modalImages").html(images);
	setTimeout(() => {
		renderMap("modalMap", data.issueLongitude, data.issueLatitude, 16, {
			icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
			latitude: data.issueLatitude,
			longitude: data.issueLongitude
		});

	}, 500);
	console.log(data);
}