import type { Bridge } from '../bridge/Bridge';
import { Room, RoomResolvable } from '../structures/Room';
import { ResourceManager } from './ResourceManager';
import type { ApiRoom } from '../types/api';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';

export class RoomManager extends ResourceManager<RoomResolvable> {
	public readonly cache: Collection<string, Room>;

	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
		this.cache = new Collection();
	}

	public _add(data: ApiRoom): Room {
		const room = this.cache.ensure(data.id, () => new Room(this.bridge));
		room._patch(data);
		return room;
	}

	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.rest.get(Routes.room(id));
		const data = response.data.data as ApiRoom[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
