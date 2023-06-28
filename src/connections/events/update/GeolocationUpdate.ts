import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function geolocationUpdate(data: any, hue: Hue) {
	const geolocation = hue.geolocations.cache.get(data.id);
	if (!geolocation) return;

	const clone = geolocation._update(data);

	return () => hue.emit(Events.GeolocationUpdate, geolocation, clone);
}
