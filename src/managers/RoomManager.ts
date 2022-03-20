import type { Bridge } from '../bridge/Bridge';
import { Room } from '../structures/Room';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';
import { ApiRoom, ApiRoomGet } from '../types/api/room';

export class RoomManager extends ResourceManager<Room> {
	public readonly cache: Collection<string, Room>;

	public constructor(bridge: Bridge) {
		super(bridge);
		this.cache = new Collection();
	}

	public _add(data: ApiRoom): Room {
		const room = this.cache.ensure(data.id, () => new Room(this.bridge));
		room._patch(data);
		return room;
	}

	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.bridge.rest.get(Routes.room(id));
		const data = response.data as ApiRoomGet;
		data.data.forEach((data: ApiRoom) => {
			this._add(data);
		});
	}
}
