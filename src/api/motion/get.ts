import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiMotionGet {
	type?: ApiResourceType.Motion;
	id: string;
	owner: ResourceIdentifier;
	enabled: boolean;
	motion: {
		motion: boolean;
		motion_valid: boolean;
	};
}
