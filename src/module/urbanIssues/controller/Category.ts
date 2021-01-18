/**
 * Category
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { coreInstance } from "../../../core/Core";

class Category {
	constructor() {

	}

	/**
	 * getCategories
	 * @description
	 * @returns Return a list of categories
	 */
	async getCategories() {
		const status = await coreInstance.module.urbanIssues.getCategories();
		return status;
	}

	/**
	 * getCategory
	 * @description
	 * @param
	 * @returns Return a list of categories
	 */
	async getCategoryOfEntityById(entityId: number) {
		const status = await coreInstance.module.urbanIssues.getCategoryOfEntityById(entityId);
		return status;
	}
}

export let categoryInstance = new Category();
