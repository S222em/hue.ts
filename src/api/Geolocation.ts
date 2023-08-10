import { APIResourceType } from './ResourceType';
import { MakeSSEUpdateData } from './Update';
import { MakeSSEDeleteData } from './Delete';

export interface APIGeolocation {
	type: APIResourceType.Geolocation;
	id: string;
	is_configured: boolean;
}

export type RESTGeolocationGetResponseData = APIGeolocation[];

export interface RESTGeolocationPutPayload {
	type?: APIResourceType.Geolocation;
	longitude: number;
	latitude: number;
}

export type SSEGeolocationAddData = APIGeolocation;

export type SSEGeolocationUpdateData = MakeSSEUpdateData<APIGeolocation>;

export type SSEGeolocationDeleteData = MakeSSEDeleteData<APIGeolocation>;
