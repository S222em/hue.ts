import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';
import { ArcheType } from '../ArcheType';

export interface RoomPost {
	type?: ResourceType.Room;
	children: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: ArcheType;
	};
}
