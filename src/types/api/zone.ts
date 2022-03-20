import { ApiConnectedResource, ApiMetadata, ApiResourceType, ApiReturnGet, ApiReturnPut } from './common';

export interface ApiZone {
	type?: ApiResourceType.Zone;
	id?: string;
	services?: Array<ApiConnectedResource>;
	metadata?: ApiMetadata;
	children?: Array<ApiConnectedResource>;
}

export type ApiZoneGet = ApiReturnGet<ApiZone>;
export type ApiZonePut = ApiReturnPut<ApiResourceType.Zone>;
