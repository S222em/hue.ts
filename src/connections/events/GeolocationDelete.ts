import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEGeolocationDeleteData } from '../../api/Geolocation';

export default function geolocationDelete(data: SSEGeolocationDeleteData, hue: Hue) {
	const geolocation = hue.geolocations.cache.get(data.id);
	if (!geolocation) return;

	const clone = geolocation._clone();

	hue.geolocations.cache.delete(data.id);

	return () => hue.emit(Events.GeolocationDelete, clone);
}
