import { NamedResource } from './NamedResource';
import { APIResourceIdentifier, APIResourceType } from '../types/api';
import { APIArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { ZoneManager } from '../managers/ZoneManager';
import { SceneCreateOptions } from './Scene';

export interface ZoneEditOptions extends ArcheTypeResourceEditOptions {
	children?: string[];
}

export type ZoneCreateOptions = Required<ZoneEditOptions>;

/**
 * Represents the zone resource from the hue API
 */
export class Zone extends NamedResource<APIZone> {
	type = APIResourceType.Zone;

	get manager(): ZoneManager {
		return this.hue.zones;
	}

	/**
	 * Children of this zone
	 */
	get childIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	/**
	 * Children of this zone
	 */
	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	/**
	 * Creates a new scene belonging to this zone
	 * @param options
	 */
	public async createScene(options: SceneCreateOptions): Promise<string> {
		return await this.hue.scenes.create(this.id, options);
	}

	/**
	 * Adds new children to this zone (children can only be in 1 room)
	 * @param children
	 */
	public async addChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		const newChildren = [...this.childIds, ...children];

		return await this.setChildren(newChildren);
	}

	/**
	 * Removes children from this zone
	 * @param children
	 */
	public async removeChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		const newChildren = this.childIds.filter((id) => !children.includes(id));

		return await this.setChildren(newChildren);
	}

	/**
	 * Sets the children of this zone
	 * @param children
	 */
	public async setChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		return await this.edit({ children });
	}

	/**
	 * Edits this zone
	 * @param options
	 */
	public async edit(options: ZoneEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}

	/**
	 * Deletes this zone
	 */
	public async delete(): Promise<string> {
		return await this.hue.zones.delete(this.id);
	}
}

export interface APIZone extends APIArcheTypeResource<APIResourceType.Zone> {
	children: Array<APIResourceIdentifier>;
	services: Array<APIResourceIdentifier>;
}
