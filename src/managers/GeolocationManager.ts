import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Geolocation, GeolocationEditOptions } from '../structures/Geolocation';

export class GeolocationManager extends Manager<ResourceType.Geolocation> {
	type = ResourceType.Geolocation;
	holds = Geolocation;

	public async edit(id: string, options: GeolocationEditOptions): Promise<void> {
		await this._put(id, {
			latitude: options.latitude,
			longitude: options.longitude,
		});
	}
}
