import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function geofenceClientAdd(data: SSEResource, hue: Hue) {
	const geofenceClient = hue.geofenceClients._add(data);

	return () => hue.emit(Events.GeofenceClientAdd, geofenceClient);
}

export function geofenceClientUpdate(data: SSEResource, hue: Hue) {
	const geofenceClient = hue.geofenceClients.cache.get(data.id);
	if (!geofenceClient) return;

	const clone = geofenceClient._update(data);

	return () => hue.emit(Events.GeofenceClientUpdate, geofenceClient, clone);
}

export function geofenceClientDelete(data: SSEResource, hue: Hue) {
	const geofenceClient = hue.geofenceClients.cache.get(data.id);
	if (!geofenceClient) return;

	const clone = geofenceClient._clone();

	hue.geofenceClients.cache.delete(data.id);

	return () => hue.emit(Events.GeofenceClientDelete, clone);
}
