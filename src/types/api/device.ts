import { ApiConnectedResource, ApiMetadata, ApiResourceType, ApiReturnGet, ApiReturnPut } from './common';

export interface ApiDevice {
	type?: ApiResourceType.Device;
	id?: string;
	services?: ApiConnectedResource[];
	product_data?: {
		model_id: string;
		product_id: string;
		manufacturer_name: string;
		product_name: string;
		product_archetype: string;
		certified: boolean;
		software_version: string;
	};
	metadata?: ApiMetadata;
	creation_time?: string;
}

export type ApiDeviceGet = ApiReturnGet<ApiDevice>;
export type ApiDevicePut = ApiReturnPut<ApiResourceType.Device>;
