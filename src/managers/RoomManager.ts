import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { Room } from '../structures/Room';

export class RoomManager extends Manager<ApiResourceType.Room> {
	type = ApiResourceType.Room;
	_resourceClass = Room;
}
