/**
 * module
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { categoryInstance } from "./controller/Category";
import { statusInstance } from "./controller/Status";
import settings from "./settings.json";
export class Module {

	private configuration: SettingsModuleDT;
	constructor() {
		console.log("* Module UrbanIssues Instantiated at " + new Date().toLocaleString() + " *");
	}

	async init(user: SettingsUserDT) {
		this.configuration = JSON.parse(JSON.stringify(settings));
		const userStatus = await statusInstance.getStatus();
		const userCategories = await categoryInstance.getCategoryOfEntityById(user.entityActivated);

		for (const i in this.configuration.language) {
			const lang = await require("./language/" + i + ".json");
			this.configuration.language[i] = lang;
		}
		if (userStatus.status) this.configuration.settings.status = userStatus.data;
		if (userCategories.status) this.configuration.settings.categories = userCategories.data;

	}

	public getSettings() {
		return this.configuration;
	}
}

