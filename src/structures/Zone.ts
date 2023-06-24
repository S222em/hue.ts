import { NamedResource } from './NamedResource';
import { ResourceType } from '../api/ResourceType';
import { ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { ZoneManager } from '../managers/ZoneManager';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { RoomEditOptions } from './Room';

export interface ZoneEditOptions extends ArcheTypeResourceEditOptions {
	children?: string[];
}

export type ZoneCreateOptions = Required<ZoneEditOptions>;

export class Zone extends NamedResource<ResourceType.Zone> {
	type = ResourceType.Zone;

	get manager(): ZoneManager {
		return this.bridge.zones;
	}

	get childIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	public async addChildren(children: Required<ZoneEditOptions>['children']): Promise<void> {
		const newChildren = [...this.childIds, ...children];

		await this.setChildren(newChildren);
	}

	public async removeChildren(children: Required<ZoneEditOptions>['children']): Promise<void> {
		const newChildren = this.childIds.filter((id) => !children.includes(id));

		await this.setChildren(newChildren);
	}

	public async setChildren(children: Required<ZoneEditOptions>['children']): Promise<void> {
		await this.edit({ children });
	}

	public async edit(options: RoomEditOptions): Promise<void> {
		await this.manager._put(this.id, {
			metadata: { name: options.name, archetype: options.archeType },
			children: options.children?.map?.((child) => {
				return createResourceIdentifier(child, ResourceType.Light);
			}),
		});
	}

	public async delete(): Promise<void> {
		await this.manager._delete(this.id);
	}
}
