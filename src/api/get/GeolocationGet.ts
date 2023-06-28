import { ResourceType } from '../ResourceType';

export interface GeolocationGet {
	type?: ResourceType.Geolocation;
	id: string;
	is_configured: boolean;
}
