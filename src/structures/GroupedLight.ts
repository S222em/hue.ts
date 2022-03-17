import { Resource, ResourceType } from './Resource';
import type { Group } from './Group';
import type { ApiGroupedLight } from '../types/api';
import type { DeepPartial } from '../types/common';
import { Routes } from '../util/Routes';
import { GroupedLightStateOptions, groupedLightStateTransformer } from '../transformers/GroupedLightStateTransformer';

export type GroupedLightResolvable = GroupedLight | 'string';

export class GroupedLight extends Resource<ApiGroupedLight> {
	type = ResourceType.GroupedLight;

	get id(): string {
		return this.data.id;
	}

	get group(): Group {
		const find = (group: Group) => group.groupedLight?.id === this.id;

		const room = this.bridge.rooms.cache.find(find);
		if (room) return room;

		const zone = this.bridge.zones.cache.find(find);
		if (zone) return zone;
	}

	get groupId(): string {
		return this.group?.id;
	}

	public async state(state: GroupedLightStateOptions) {
		await this._edit(groupedLightStateTransformer(this, state));
	}

	public async on(): Promise<void> {
		await this.state({ on: true });
	}

	public async off(): Promise<void> {
		await this.state({ on: false });
	}

	public async toggle(): Promise<void> {
		await this.state({ on: !this.isOn() });
	}

	public async fetch(): Promise<GroupedLight> {
		await this.bridge.groupedLights.fetch(this.id);
		return this;
	}

	public isOn(): boolean {
		return this.data.on?.on;
	}

	protected async _edit(data: DeepPartial<ApiGroupedLight>): Promise<void> {
		await this.bridge.groupedLights.rest.put(Routes.groupedLight(this.id), data);
	}
}
