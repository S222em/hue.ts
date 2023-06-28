import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function geolocationAdd(data: any, hue: Hue) {
	const geolocation = hue.geolocations._add(data);
	if (!geolocation) return;

	return () => hue.emit(Events.GeolocationAdd, geolocation);
}
