import { Resource, ResourceType } from './Resource';
import type { Group } from './Group';
import type { ApiGroupedLight } from '../types/api';
import type { DeepPartial } from '../types/common';
import { Routes } from '../util/Routes';

export type GroupedLightResolvable = GroupedLight | 'string';

export interface GroupedLightStateOptions {
	on?: boolean;
}

export class GroupedLight extends Resource {
	type = ResourceType.GroupedLight;
	public on: boolean;

	public _patch(data: ApiGroupedLight) {
		super._patch(data);
		if ('on' in data) {
			if ('on' in data) this.on = data.on.on;
		}
	}

	get group(): Group {
		const find = (group: Group) => group.groupedLight === this;

		const room = this.bridge.rooms.cache.find(find);
		if (room) return room;

		const zone = this.bridge.zones.cache.find(find);
		if (zone) return zone;
	}

	get groupId(): string {
		return this.group?.id;
	}

	public async state(state: GroupedLightStateOptions) {
		await this._edit({ on: { on: state.on ?? true } });
	}

	protected async _edit(data: DeepPartial<ApiGroupedLight>): Promise<void> {
		await this.bridge.groupedLights.rest.put(Routes.groupedLight(this.id), data);
	}
}
