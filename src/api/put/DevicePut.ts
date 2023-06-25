import { ResourceType } from '../ResourceType';
import { ArcheType } from '../ArcheType';

export interface DevicePut {
	type?: ResourceType.Device;
	metadata?: {
		archetype?: ArcheType;
		name?: string;
	};
	identify?: {
		action: 'identify';
	};
}
