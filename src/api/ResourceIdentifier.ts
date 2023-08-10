import { APIResourceType } from './ResourceType';

export interface APIResourceIdentifier<T extends APIResourceType = APIResourceType> {
	rid: string;
	rtype: T;
}
