import { ResourceType } from '../ResourceType';

export interface GeolocationPut {
	type?: ResourceType.Geolocation;
	longitude: number;
	latitude: number;
}
