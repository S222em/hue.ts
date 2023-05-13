import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiZoneGet {
	type?: ApiResourceType.Zone;
	id: string;
	children: Array<ResourceIdentifier>;
	services: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: string;
	};
}
