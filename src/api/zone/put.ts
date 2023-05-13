import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiZonePut {
	type?: ApiResourceType.Zone;
	children?: Array<ResourceIdentifier>;
	metadata?: {
		name?: string;
		archetype?: string;
	};
}
