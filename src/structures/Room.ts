import { APIResourceIdentifier, APIResourceType } from '../types/api';
import { APIArcheTypeResource, ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { ZoneEditOptions } from './Zone';
import { SceneCreateOptions } from './Scene';

export interface APIRoom extends APIArcheTypeResource<APIResourceType.Room> {
	children: Array<APIResourceIdentifier>;
	services: Array<APIResourceIdentifier>;
}

export interface RoomEditOptions extends ArcheTypeResourceEditOptions {
	children?: string[];
}

export type RoomCreateOptions = Required<RoomEditOptions>;

/**
 * Represents the room resource from the hue API
 */
export class Room extends ArcheTypeResource<APIRoom> {
	type = APIResourceType.Room;

	/**
	 * Children of this room
	 */
	get childIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	/**
	 * Services of this room
	 */
	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	/**
	 * Creates a new scene belonging to this room
	 * @param options
	 */
	public async createScene(options: SceneCreateOptions): Promise<string> {
		return await this.hue.scenes.create(this.id, options);
	}

	/**
	 * Adds new children to this room (children can only be in 1 room)
	 * @param children
	 */
	public async addChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		const newChildren = [...this.childIds, ...children];

		return await this.setChildren(newChildren);
	}

	/**
	 * Removes children from this room
	 * @param children
	 */
	public async removeChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		const newChildren = this.childIds.filter((id) => !children.includes(id));

		return await this.setChildren(newChildren);
	}

	/**
	 * Sets the children of this room
	 * @param children
	 */
	public async setChildren(children: Required<ZoneEditOptions>['children']): Promise<string> {
		return await this.edit({ children });
	}

	/**
	 * Edits this room
	 * @param options
	 */
	public async edit(options: RoomEditOptions): Promise<string> {
		return await this.hue.rooms.edit(this.id, options);
	}

	/**
	 * Deletes this room
	 */
	public async delete(): Promise<string> {
		return await this.hue.rooms.delete(this.id);
	}
}
