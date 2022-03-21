import { Group } from './Group';
import { Routes } from '../util/Routes';
import { ApiRoom } from '../types/api/room';
import { ApiResourceType } from '../types/api/common';
import Collection from '@discordjs/collection';
import { Light } from './Light';
import { Device } from './Device';

export type RoomResolvable = Room | string;

export class Room extends Group<ApiRoom> {
	type = ApiResourceType.Room;

	get devices(): Collection<string, Device> {
		return this.bridge.devices.cache.filter((device) =>
			this.data.children.some((child) => child.rid === device.id && child.rtype === ApiResourceType.Device),
		);
	}

	get lights(): Collection<string, Light> {
		const collection = new Collection<string, Light>();

		this.devices.forEach((device) => {
			if (device.isLight()) collection.set(device.lightId, device.light);
		});

		return collection;
	}

	public async fetch(): Promise<Room> {
		await this.bridge.rooms.fetch(this.id);
		return this;
	}

	protected async _edit(data: ApiRoom): Promise<void> {
		await this.bridge.rest.put(Routes.room(this.id), data);
	}
}
