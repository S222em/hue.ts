import { Group } from './Group';
import { Routes } from '../util/Routes';
import { ApiRoom } from '../types/api/room';
import { ApiResourceType } from '../types/api/common';

export type RoomResolvable = Room | string;

export class Room extends Group<ApiRoom> {
	type = ApiResourceType.Room;

	public async fetch(): Promise<Room> {
		await this.bridge.rooms.fetch(this.id);
		return this;
	}

	protected async _edit(data: ApiRoom): Promise<void> {
		await this.bridge.rest.put(Routes.room(this.id), data);
	}
}
