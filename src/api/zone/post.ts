import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiZonePost {
	type?: ApiResourceType.Zone;
	children: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: string;
	};
}
