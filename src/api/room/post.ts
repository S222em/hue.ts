import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiRoomPost {
	type?: ApiResourceType.Room;
	children: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: string;
	};
}
