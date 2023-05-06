import { ApiResourceType } from './ApiResourceType';

export interface ResourceIdentifier<T extends ApiResourceType = ApiResourceType> {
	rid: string;
	rtype: T;
}
