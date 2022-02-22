import { Resource, ResourceType } from './Resource';
import { ApiGroupedLight } from '../../api';
import type { Group } from './Group';

export type GroupedLightResolvable = GroupedLight | 'string';

export class GroupedLight extends Resource {
	type = ResourceType.GroupedLight;
	protected _on: boolean;

	public _patch(data: ApiGroupedLight.Object) {
		super._patch(data);
		if ('on' in data) {
			if ('on' in data) this._on = data.on.on;
		}
	}

	get group(): Group {
		const find = (group: Group) => group.groupedLightId === this.id;

		const room = this.bridge.rooms.cache.find(find);
		if (room) return room;

		const zone = this.bridge.zones.cache.find(find);
		if (zone) return zone;
	}

	get groupId(): string {
		return this.group?.id;
	}

	public isOn(): boolean {
		return Boolean(this._on);
	}

	public async toggle(): Promise<void> {
		await this.edit({ on: { on: !this._on } });
	}

	public async on(): Promise<void> {
		await this.edit({ on: { on: true } });
	}

	public async off(): Promise<void> {
		await this.edit({ on: { on: false } });
	}

	protected async edit(data: ApiGroupedLight.Put, autoOn?: boolean): Promise<void> {
		await this.bridge.groupedLights.rest.put(
			ApiGroupedLight.route(this.id),
			autoOn
				? {
						...data,
						on: { on: true },
				  }
				: data,
		);
	}
}
