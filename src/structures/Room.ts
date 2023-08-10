import { APIResourceType } from '../api/ResourceType';
import { ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { RoomManager } from '../managers/RoomManager';
import { ZoneEditOptions } from './Zone';
import { SceneCreateOptions } from './Scene';

export interface RoomEditOptions extends ArcheTypeResourceEditOptions {
	children?: string[];
}

export type RoomCreateOptions = Required<RoomEditOptions>;

export class Room extends ArcheTypeResource<APIResourceType.Room> {
	type = APIResourceType.Room;

	get manager(): RoomManager {
		return this.hue.rooms;
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
	public async edit(options: RoomEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}

	public async delete(): Promise<string> {
		return await this.manager.delete(this.id);
	}
}
