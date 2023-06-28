import { ResourceType } from './ResourceType';

export interface ResourceIdentifier<T extends ResourceType = ResourceType> {
	rid: string;
	rtype: T;
}
