import { DeviceEditOptions } from '../structures/Device';
import { RESTDevicePutPayload } from '../api/Device';

export function createDevicePutPayload(options: DeviceEditOptions): RESTDevicePutPayload {
	return {
		metadata: {
			name: options.name,
			archetype: options.archeType,
		},
		identify: options.action ? { action: options.action } : undefined,
	};
}
