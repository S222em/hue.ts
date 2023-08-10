import { NamedResource } from './NamedResource';
import { APIResourceType } from '../api/ResourceType';
import { ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { ZoneManager } from '../managers/ZoneManager';
import { SceneCreateOptions } from './Scene';

export interface ZoneEditOptions extends ArcheTypeResourceEditOptions {
	children?: string[];
}

export type ZoneCreateOptions = Required<ZoneEditOptions>;

export class Zone extends NamedResource<APIResourceType.Zone> {
	type = APIResourceType.Zone;

	get manager(): ZoneManager {
		return this.hue.zones;
	}

	get childIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	public async createScene(options: SceneCreateOptions): Promise<string> {
		return await this.hue.scenes.create(this.id, options);
	}

	public async addChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		const newChildren = [...this.childIds, ...children];

		return await this.setChildren(newChildren);
	}

	public async removeChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		const newChildren = this.childIds.filter((id) => !children.includes(id));

		return await this.setChildren(newChildren);
	}

	public async setChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		return await this.edit({ children });
	}

	public async edit(options: ZoneEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}

	public async delete(): Promise<string> {
		return await this.manager.delete(this.id);
	}
}
