import { ApiConnectedResource, ApiMetadata, ApiResourceType, ApiReturnGet, ApiReturnPut } from './common';

export interface ApiRoom {
	type?: ApiResourceType.Room;
	id?: string;
	services?: Array<ApiConnectedResource>;
	metadata?: ApiMetadata;
	children?: Array<ApiConnectedResource>;
}

export type ApiRoomGet = ApiReturnGet<ApiRoom>;
export type ApiRoomPut = ApiReturnPut<ApiResourceType.Room>;
