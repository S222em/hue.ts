import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEGeolocationAddData } from '../../api/Geolocation';

export default function geolocationAdd(data: SSEGeolocationAddData, hue: Hue) {
	const geolocation = hue.geolocations._add(data);
	if (!geolocation) return;

	return () => hue.emit(Events.GeolocationAdd, geolocation);
}
