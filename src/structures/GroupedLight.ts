import { Resource } from './Resource';
import type { Group } from './Group';
import { Routes } from '../util/Routes';
import { GroupedLightStateOptions, groupedLightStateTransformer } from '../transformers/GroupedLightStateTransformer';
import { ApiResourceType } from '../types/api/common';
import { ApiGroupedLight } from '../types/api/grouped_light';

export type GroupedLightResolvable = GroupedLight | 'string';

/**
 * Represents a Hue grouped light
 */
export class GroupedLight extends Resource<ApiGroupedLight> {
	type = ApiResourceType.GroupedLight;

	/**
	 * ID of this grouped light
	 */
	get id(): string {
		return this.data.id;
	}

	/**
	 * Connected group
	 */
	get group(): Group {
		const find = (group: Group) => group.groupedLight?.id === this.id;

		const room = this.bridge.rooms.cache.find(find);
		if (room) return room;

		const zone = this.bridge.zones.cache.find(find);
		if (zone) return zone;
	}

	/**
	 * Connected group ID
	 */
	get groupId(): string {
		return this.group?.id;
	}

	/**
	 * Edits the state of this grouped light
	 * @param state
	 * @example
	 * groupedLight.state({ on: true });
	 */
	public async state(state: GroupedLightStateOptions) {
		await this._edit(groupedLightStateTransformer(state));
	}

	/**
	 * Edits the on state of all lights to true
	 */
	public async on(): Promise<void> {
		await this.state({ on: true });
	}

	/**
	 * Edits the on state of all lights to false
	 */
	public async off(): Promise<void> {
		await this.state({ on: false });
	}

	/**
	 * Toggles the on state of all lights
	 */
	public async toggle(): Promise<void> {
		await this.state({ on: !this.isOn() });
	}

	/**
	 * Fetch this grouped light from the bridge
	 */
	public async fetch(): Promise<GroupedLight> {
		await this.bridge.groupedLights.fetch(this.id);
		return this;
	}

	/**
	 * Whether a light in the group is on
	 */
	public isOn(): boolean {
		return this.data.on?.on;
	}

	/**
	 * Edits this group light with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiGroupedLight): Promise<void> {
		await this.bridge.rest.put(Routes.groupedLight(this.id), data);
	}
}
