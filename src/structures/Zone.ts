import { NamedResource } from './NamedResource';
import { ResourceType } from '../api/ResourceType';
import { ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { ZoneManager } from '../managers/ZoneManager';
import { SceneCreateOptions } from './Scene';

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

	public async createScene(options: SceneCreateOptions): Promise<string | undefined> {
		return await this.bridge.scenes.create(this.id, options);
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

	public async edit(options: ZoneEditOptions): Promise<void> {
		await this.manager.edit(this.id, options);
	}

	public async delete(): Promise<void> {
		await this.manager.delete(this.id);
	}
}
