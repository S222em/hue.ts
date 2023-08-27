import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function geolocationAdd(data: SSEResource, hue: Hue) {
	const geolocation = hue.geolocations._add(data);

	return () => hue.emit(Events.GeolocationAdd, geolocation);
}

export function geolocationUpdate(data: SSEResource, hue: Hue) {
	const geolocation = hue.geolocations.cache.get(data.id);
	if (!geolocation) return;

	const clone = geolocation._update(data);

	return () => hue.emit(Events.GeolocationUpdate, geolocation, clone);
}

export function geolocationDelete(data: SSEResource, hue: Hue) {
	const geolocation = hue.geolocations.cache.get(data.id);
	if (!geolocation) return;

	const clone = geolocation._clone();

	hue.geolocations.cache.delete(data.id);

	return () => hue.emit(Events.GeolocationDelete, clone);
}
