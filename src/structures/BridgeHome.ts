import { Resource } from './Resource';
import { ResourceType } from '../api/ResourceType';
import { BridgeHomeManager } from '../managers/BridgeHomeManager';

export class BridgeHome extends Resource<ResourceType.BridgeHome> {
	type = ResourceType.BridgeHome;

	get manager(): BridgeHomeManager {
		return this.hue.bridgeHomes;
	}

	get childrenIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}
}
