/**
 * public
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { Request, Response, Router } from "express";
const api: Router = Router();
import { settingsInstance } from "../../../core/Settings";

api.get("/", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "UrbanIssues - Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "urbanIssues",
		component: "panel"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});
api.get("/:id", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "UrbanIssues - Detail Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "urbanIssues",
		component: "detail"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

export const issueController: Router = api;