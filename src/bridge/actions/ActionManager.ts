import type { Bridge } from '../Bridge';
import lightUpdate from './lightUpdate';
import groupedLightUpdate from './groupedLightUpdate';
import roomUpdate from './roomUpdate';
import zoneUpdate from './zoneUpdate';
import roomDelete from './roomDelete';
import zoneDelete from './zoneDelete';
import groupedLightDelete from './groupedLightDelete';
import sceneUpdate from './sceneUpdate';
import sceneDelete from './sceneDelete';
import roomAdd from './roomAdd';
import zoneAdd from './zoneAdd';
import sceneAdd from './sceneAdd';
import lightAdd from './lightAdd';
import lightDelete from './lightDelete';
import groupedLightAdd from './groupedLightAdd';

export class ActionManager {
	private readonly bridge: Bridge;

	constructor(bridge: Bridge) {
		this.bridge = bridge;

		// Light
		this.register(lightAdd);
		this.register(lightUpdate);
		this.register(lightDelete);

		// Grouped Light
		this.register(groupedLightAdd);
		this.register(groupedLightUpdate);
		this.register(groupedLightDelete);

		// Room
		this.register(roomAdd);
		this.register(roomUpdate);
		this.register(roomDelete);

		// Zone
		this.register(zoneAdd);
		this.register(zoneUpdate);
		this.register(zoneDelete);

		// Scene
		this.register(sceneAdd);
		this.register(sceneUpdate);
		this.register(sceneDelete);
	}

	private register(action: (bridge: Bridge, data: any) => any) {
		this[action.name.toLowerCase()] = action;
	}
}
