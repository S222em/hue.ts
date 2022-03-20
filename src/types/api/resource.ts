import { ApiResourceType, ApiReturnGet } from './common';

export interface ApiResource {
	id: string;
	type: ApiResourceType;
}

export type ApiResourceGet = ApiReturnGet<ApiResource>;
