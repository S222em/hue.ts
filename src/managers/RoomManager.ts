import type { Bridge } from '../bridge/Bridge';
import { ApiRoom } from '../api';
import { Room } from '../structures/Room';
import type { GroupResolvable } from '../structures/Group';
import { ResourceManager } from './ResourceManager';

export class RoomManager extends ResourceManager<Room> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
	}

	public _add(data: ApiRoom.Data): Room {
		const room = this.cache.ensure(data.id, () => {
			return new Room(this.bridge);
		});
		room._patch(data);

		return room;
	}

	public resolve(resolvable: GroupResolvable): Room {
		if (typeof resolvable === 'string') {
			if (this.cache.has(resolvable)) return this.cache.get(resolvable);
			const find = this.cache.find((room) => room.name === resolvable);
			if (find) return find;
		} else if (resolvable instanceof Room) {
			return this.cache.get(resolvable.id);
		}
	}

	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(ApiRoom.route());
		const data = response.data.data as ApiRoom.Get;
		data.forEach((data) => {
			this._add(data);
		});
	}
}
