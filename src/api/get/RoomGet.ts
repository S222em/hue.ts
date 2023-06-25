import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';
import { ArcheType } from '../ArcheType';

export interface RoomGet {
	type?: ResourceType.Room;
	id: string;
	children: Array<ResourceIdentifier>;
	services: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: ArcheType;
	};
}
