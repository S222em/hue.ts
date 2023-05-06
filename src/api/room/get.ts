import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiRoomGet {
	type?: ApiResourceType.Room;
	id: string;
	children: Array<ResourceIdentifier>;
	services: Array<ResourceIdentifier>;
	metadata: {
		name: string;
		archetype: string;
	};
}
