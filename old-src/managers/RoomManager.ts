import type { Bridge } from '../bridge/Bridge';
import { Room } from '../structures/Room';
import { ResourceManager } from './ResourceManager';
import { ApiRoom } from '../types/api/room';
import { Routes } from '../util/Routes';

/**
 * Manager for all Hue rooms
 */
export class RoomManager extends ResourceManager<Room, ApiRoom> {
	public constructor(bridge: Bridge) {
		super(bridge, { createCollection: true, makeCache: () => new Room(bridge), route: Routes.room });
	}
}
