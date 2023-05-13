import { ApiResourceType } from '../ApiResourceType';

export interface ApiDevicePut {
	type?: ApiResourceType.Device;
	metadata?: {
		archetype?: string;
		name?: string;
	};
	identify?: {
		action: 'identify';
	};
}
