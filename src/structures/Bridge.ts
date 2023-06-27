import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { BridgeManager } from '../managers/BridgeManager';

export class Bridge extends Resource<ResourceType.Bridge> {
	type = ResourceType.Bridge;

	get manager(): BridgeManager {
		return this.hue.bridges;
	}

	get ownerId(): string {
		return this.data.owner.rid;
	}

	get bridgeId(): string {
		return this.data.bridge_id;
	}

	get timeZone(): string {
		return this.data.time_zone.time_zone;
	}
}
