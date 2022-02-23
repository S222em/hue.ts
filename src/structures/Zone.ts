import { Group } from './Group';
import { ResourceType } from './Resource';
import { ApiZone } from '../api';

export class Zone extends Group {
	type = ResourceType.Zone;

	protected async _edit(data: ApiZone.Put): Promise<void> {
		await this.bridge.zones.rest.put(ApiZone.route(this.id), data);
	}
}
