
/**
 * Status
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { coreInstance } from "../../../core/Core";

class Status {
	constructor() {

	}

	/**
	 * getStatus
	 * @returns Return a list of status
	 */
	async getStatus() {
		const status = await coreInstance.module.urbanIssues.getStatus();
		return status;
	}
}

export let statusInstance = new Status();