import { Group } from './Group';
import { ResourceType } from './Resource';
import { ApiRoom } from '../api';

export class Room extends Group {
	type = ResourceType.Room;

	protected async _edit(data: ApiRoom.Put): Promise<void> {
		await this.bridge.rooms.rest.put(ApiRoom.route(this.id), data);
	}
}
