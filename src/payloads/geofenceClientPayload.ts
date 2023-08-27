import { GeofenceEditOptions } from '../structures/GeofenceClient';
import { RESTPayload } from '../types/rest';

export function createGeofenceClientPutPayload(options: GeofenceEditOptions): RESTPayload {
	return {
		name: options.name,
		is_at_home: options.isAtHome,
	};
}

export function createGeofenceClientPostPayload(options: GeofenceEditOptions): RESTPayload {
	return {
		name: options.name,
		is_at_home: options.isAtHome,
	};
}
