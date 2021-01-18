
/**
 * api
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { Request, Response, Router } from "express";
const api: Router = Router();

import { settingsInstance } from "../../../core/Settings";
import { coreInstance } from "../../../core/Core";

/**
 * GET
 * @description Return a list of issues from an Entity
 */
api.get("/get", async (req: Request, res: Response) => {
	const user: SettingsUserDT = settingsInstance.getUser(req);
	const data: ResponseDT = await coreInstance.module.urbanIssues.getIssues(user.entity[user.entityActivated].id, -1);
	return res.json(data);
});

/**
 * GET Issue By Id
 * @description Return an issue data with last report.
 */
api.get("/get/:id", async (req: Request, res: Response) => {
	const user: SettingsUserDT = settingsInstance.getUser(req);
	const data: ResponseDT = await coreInstance.module.urbanIssues.getIssueById(user.entity[user.entityActivated].id, parseInt(req.params.id));
	return res.json(data);
});

/**
 * GET Reports By Issue Id
 * @description Return an issue data with all reports.
 */
api.get("/get/:id/detail", async (req: Request, res: Response) => {
	const user: SettingsUserDT = settingsInstance.getUser(req);
	const data: ResponseDT = await coreInstance.module.urbanIssues.getReportsByIssueId(user.entity[user.entityActivated].id, parseInt(req.params.id));
	return res.json(data);
});

/**
 * POST Report
 * @description Insert a report in issue history.
 */
api.post("/set/:id/report", async (req: Request, res: Response) => {
	const user: SettingsUserDT = settingsInstance.getUser(req);

	const report: reportDT = {
		issueId: parseInt(req.body.issueId),
		entityId: user.entity[user.entityActivated].id,
		categoryId: parseInt(req.body.categoryId),
		report: String(req.body.report),
		userId: user.profile.id,
		statusId: parseInt(req.body.statusId),
		feedback: req.body.feedback === "true" ? 1 : 0,
		created: parseInt((new Date().getTime() / 1000).toString())
	};

	const data: ResponseDT = await coreInstance.module.urbanIssues.setReport(report);
	return res.json(data);
});


api.get("/get-count", async (req: Request, res: Response) => {
	const user: SettingsUserDT = settingsInstance.getUser(req);
	const data: ResponseDT = await coreInstance.module.urbanIssues.getIssuesCount(user.entity[user.entityActivated].id);
	return res.json(data);
});

/**
 * GET Status
 * @description Return a list of status
 */
api.get("/status", async (req: Request, res: Response) => {
	const data: ResponseDT = await coreInstance.module.urbanIssues.getStatus();
	return res.json(data);
});

/**
 * GET Categories
 * @description Return a list of categories from an Entity
 */
api.get("/category", async (req: Request, res: Response) => {
	const user: SettingsUserDT = settingsInstance.getUser(req);
	const data: ResponseDT = await coreInstance.module.urbanIssues.getCategoryOfEntityById(user.entity[user.entityActivated].id);
	return res.json(data);
});


export const issueController: Router = api;
