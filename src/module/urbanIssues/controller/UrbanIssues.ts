
/**
 * Issue
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { coreInstance } from "../../../core/Core";

class Issue {
	constructor () {

	}

	/**
	 * getIssues
	 * @description
	 * @param entityId
	 * @param limit
	 * @returns
	 */
	async getIssues(entityId: number, limit: number) {
		return await coreInstance.module.urbanIssues.getIssues(entityId, limit);
	}

	/**
	 * getIssueById
	 * @description
	 * @param entityId
	 * @param issueId
	 * @returns
	 */
	async getIssueById(entityId: number, issueId: number) {
		const issue = await coreInstance.module.urbanIssues.getIssueById(entityId, issueId);
		if (issue.status && issue.size === 1) {
			const images = await coreInstance.module.urbanIssues.getIssueImages(issueId);
			issue.data[0].images = images.data;
		}
		return issue;
	}


	/**
	 * getIssuesCount
	 * @description
	 * @param entityId
	 * @returns
	 */
	async getIssuesCount(entityId: number) {
		const ddbbIssues = await coreInstance.module.urbanIssues.getIssues(entityId, -1);
		// const statusTypes = await coreInstance.module.urbanIssues.getStatus();
		const issues = ddbbIssues.data;
		const count: any = {};
		for (const i in issues) {
			const id = issues[i].reportStatusId;
			if (count[id] === undefined) {
				count[id] = {
					id: issues[i].reportStatusId,
					name: issues[i].reportStatusName,
					color: issues[i].reportStatusColor,
					value: 1
				};
			} else {
				count[id].value += 1;

			}

		}

		ddbbIssues.data = [count];
		ddbbIssues.size = ddbbIssues.data.length;
		return ddbbIssues;
	}


	/**
	 * getReportsByIssueId
	 * @description
	 * @param entityId
	 * @param issueId
	 * @returns
	 */
	async getReportsByIssueId(entityId: number, issueId: number) {
		const issues = await coreInstance.module.urbanIssues.getReportsByIssueId(entityId, issueId);
		let firstTime: boolean = true;
		let issue: any = {};
		let images: any;
		for (const i in issues.data) {
			if (issues.data[i] !== undefined && issues.data[i].reportId !== undefined) {
				images = new Array();
				if (firstTime) {
					firstTime = false;
					issue = {
						id: issues.data[i].issueId,
						entityId: issues.data[i].issueEntity,
						appId: issues.data[i].issueAPP,
						latitude: issues.data[i].issueLatitude,
						longitude: issues.data[i].issueLongitude,
						altitude: issues.data[i].issueAltitude,
						created: issues.data[i].issueCreated,
						report: []
					};
					images = await coreInstance.module.urbanIssues.getIssueImages(issueId);
				}
				issue.report.push({
					id: issues.data[i].reportId,
					categoryId: issues.data[i].reportCategoryId,
					categoryName: issues.data[i].reportCategoryName,
					categoryDescription: issues.data[i].reportCategoryDescription,
					statusId: issues.data[i].reportStatusId,
					statusName: issues.data[i].reportStatusName,
					statusColor: issues.data[i].reportStatusColor,
					userId: issues.data[i].reportUserId,
					userName: issues.data[i].reportUserName,
					userSurname: issues.data[i].reportUserSurname,
					report: issues.data[i].reportDescription,
					created: issues.data[i].reportCreated,
					image: images.data
				});
			}
		}
		issues.data = [issue];
		issues.size = issues.data.length;
		return issues;
	}


	/**
	 * setReturn
	 * @description
	 * @param report
	 * @returns
	 */
	async setReport(report: reportDT) {
		const retReport = await coreInstance.module.urbanIssues.setReport(report);
		return retReport;
	}


	// async getIssueById(params: API_GET_IssueIdDT, appId: number) {
	// 	return await coreInstance.module.urbanIssues.getIssueById(params.entityId, params.id, appId);
	// }

	// async setIssue(params: API_POST_IssueDT, appId: number) {
	// 	const issueInserted = await coreInstance.module.urbanIssues.setIssue(appId, params.entityId, params.issue);

	// 	if (issueInserted.status) {
	// 		for (const key in params.issue.image) {
	// 			const shortToken = encrypt.sha512(appId.toString()).toLowerCase().substr(0, 6);

	// 			const name = "issue" + shortToken + "-img" + key + "-n" + params.issue.image[key].name;
	// 			const saveFile = new File(
	// 				issueInserted.data[0].id,
	// 				name,
	// 				params.issue.image[key].format,
	// 				params.issue.image[key].data
	// 			);
	// 			saveFile.save();

	// 		}
	// 	}
	// 	return issueInserted;
	// }

	// async setIssueImage(issueId: number, fileName: string) {
	// 	return await coreInstance.module.urbanIssues.setIssueImage(issueId, fileName);
	// }
}

export let issueInstance = new Issue();
