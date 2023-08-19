import { GeolocationEditOptions } from '../structures/Geolocation';
import { RESTPayload } from '../types/rest';

export function createGeolocationPutPayload(options: GeolocationEditOptions): RESTPayload {
	return {
		latitude: options.latitude,
		longitude: options.longitude,
	};
}
