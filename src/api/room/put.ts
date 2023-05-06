import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiRoomPut {
	type?: ApiResourceType.Room;
	children?: Array<ResourceIdentifier>;
	metadata?: {
		name?: string;
		archetype?: string;
	};
}
