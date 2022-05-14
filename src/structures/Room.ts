import { Group } from './Group';
import { Routes } from '../util/Routes';
import { ApiRoom } from '../types/api/room';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Light } from './Light';
import { Device } from './Device';

export type RoomResolvable = Room | string;

/**
 * Represents a Hue room
 */
export class Room extends Group<ApiRoom> {
	type = ApiResourceType.Room;

	/**
	 * The connected devices
	 */
	get devices(): Collection<string, Device> {
		return this.bridge.devices.cache.filter((device) =>
			this.data.children.some((child) => child.rid === device.id && child.rtype === ApiResourceType.Device),
		);
	}

	/**
	 * The connected lights
	 */
	get lights(): Collection<string, Light> {
		const collection = new Collection<string, Light>();

		this.devices.forEach((device) => {
			if (device.isLight()) collection.set(device.lightId, device.light);
		});

		return collection;
	}

	/**
	 * Deletes this room
	 */
	public async delete(): Promise<void> {
		await this.bridge.rest.delete(Routes.room.id(this.id));
	}

	/**
	 * Fetch this room from the bridge
	 */
	public async fetch(): Promise<Room> {
		await this.bridge.rooms.fetch(this.id);
		return this;
	}

	/**
	 * Edits this room with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiRoom): Promise<void> {
		await this.bridge.rest.put(Routes.room.id(this.id), data);
	}
}
