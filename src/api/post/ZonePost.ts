import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';
import { ArcheType } from '../ArcheType';

export interface ZonePost {
	type?: ResourceType.Zone;
	children: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: ArcheType;
	};
}
