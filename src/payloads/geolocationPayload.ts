import { GeolocationEditOptions } from '../structures/Geolocation';
import { RESTGeolocationPutPayload } from '../api/Geolocation';

export function createGeolocationPutPayload(options: GeolocationEditOptions): RESTGeolocationPutPayload {
	return {
		latitude: options.latitude,
		longitude: options.longitude,
	};
}
