import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface MotionGet {
	type?: ResourceType.Motion;
	id: string;
	owner: ResourceIdentifier;
	enabled: boolean;
	motion: {
		motion: boolean;
		motion_valid: boolean;
	};
}
