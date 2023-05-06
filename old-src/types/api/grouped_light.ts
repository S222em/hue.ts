import { ApiOn, ApiResourceType, ApiReturnGet, ApiReturnPut } from './common';

export interface ApiGroupedLight {
	type?: ApiResourceType.GroupedLight;
	id?: string;
	on?: ApiOn;
	alert?: {
		// TODO find the actual object for this
		action_values?: any[];
	};
}

export type ApiGroupedLightGet = ApiReturnGet<ApiGroupedLight>;
export type ApiGroupedLightPut = ApiReturnPut<ApiResourceType.GroupedLight>;
