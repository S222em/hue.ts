import { Resource, ResourceType } from './Resource';
import type { Group } from './Group';
import type { ApiGroupedLight } from '../types/api';
import type { DeepPartial } from '../types/common';
import { Routes } from '../util/Routes';
import { Util } from '../util/Util';

export type GroupedLightResolvable = GroupedLight | 'string';

export interface GroupedLightStateOptions {
	on?: boolean;
}

/**
 * Represents a hue Grouped Light
 */
export class GroupedLight extends Resource<ApiGroupedLight> {
	type = ResourceType.GroupedLight;

	get id(): string {
		return this.data.id;
	}

	/**
	 * The Group this Grouped Light belongs to
	 */
	get group(): Group {
		const find = (group: Group) => group.groupedLight?.id === this.id;

		const room = this.bridge.rooms.cache.find(find);
		if (room) return room;

		const zone = this.bridge.zones.cache.find(find);
		if (zone) return zone;
	}

	/**
	 * The id of the Group this Grouped Light belongs to
	 */
	get groupId(): string {
		return this.group?.id;
	}

	get on(): boolean {
		return this.data.on?.on;
	}

	/**
	 * Edits the state of the Grouped Light
	 */
	public async state(state: GroupedLightStateOptions) {
		await this._edit(Util.parseGroupedLightStateOptions(state));
	}

	protected async _edit(data: DeepPartial<ApiGroupedLight>): Promise<void> {
		await this.bridge.groupedLights.rest.put(Routes.groupedLight(this.id), data);
	}
}
