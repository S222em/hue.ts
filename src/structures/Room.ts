import { Group } from './Group';
import { ResourceType } from './Resource';
import type { ApiRoom } from '../types/api';
import { Routes } from '../util/Routes';

export type RoomResolvable = Room | string;

export class Room extends Group {
	type = ResourceType.Room;

	protected async _edit(data: ApiRoom): Promise<void> {
		await this.bridge.rooms.rest.put(Routes.room(this.id), data);
	}
}
