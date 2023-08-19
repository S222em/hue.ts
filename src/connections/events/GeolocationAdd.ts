import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function geolocationAdd(data: SSEResource, hue: Hue) {
	const geolocation = hue.geolocations._add(data);
	if (!geolocation) return;

	return () => hue.emit(Events.GeolocationAdd, geolocation);
}
