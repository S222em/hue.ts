import type { Group } from '../structures/Group';

export class GroupResourceManager {
	protected group: Group;

	constructor(group: Group) {
		this.group = group;
	}
}
