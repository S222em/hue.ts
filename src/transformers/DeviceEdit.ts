import { ApiDevice } from '../types/api/device';

export interface DeviceEditOptions {
	name?: string;
}

export function deviceEditTransformer(options: DeviceEditOptions): ApiDevice {
	return {
		metadata: options.name ? { name: options.name } : undefined,
	};
}
