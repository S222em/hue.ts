import { Group, GroupOptions, GroupStateOptions } from './Group';
import { ApiRoom } from '../types/api/room';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Device } from './Device';
import { LightOptions } from './Light';

export type RoomResolvable = Room | string;

export type RoomOptions = GroupOptions;

export type RoomStateOptions = GroupStateOptions;

/**
 * Represents a Hue room
 */
export class Room extends Group<ApiRoom> {
	public type = ApiResourceType.Room;

	/**
	 * The connected devices
	 */
	get devices(): Collection<string, Device> {
		return this.bridge.resources.resolveAll(this.deviceIds) as Collection<string, Device>;
	}

	get deviceIds() {
		return this.data.children.filter((child) => child.rtype === ApiResourceType.Device).map((child) => child.rid);
	}

	/**
	 * Fetch this room from the bridge
	 */
	public async fetch(): Promise<Room> {
		await this.bridge.resources.fetch(this.id, ApiResourceType.Room);
		return this;
	}

	/**
	 * Edits this room with new data e.g. new name
	 * @param options
	 */
	public async edit(options: LightOptions): Promise<void> {
		return await this._edit({
			metadata: {
				name: options.name,
			},
		});
	}

	/**
	 * Edits this room with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiRoom): Promise<void> {
		await this.bridge.resources._edit(this, data);
	}
}
