import { DeviceEditOptions } from '../structures/Device';
import { RESTPayload } from '../types/rest';

export function createDevicePutPayload(options: DeviceEditOptions): RESTPayload {
	return {
		metadata: {
			name: options.name,
			archetype: options.archeType,
		},
		identify: options.action
			? {
					action: options.action,
			  }
			: undefined,
	};
}
