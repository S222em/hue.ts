import { ApiLight } from '../types/api/light';

export interface LightEditOptions {
	name?: string;
}

export function lightEditTransformer(options: LightEditOptions): ApiLight {
	return {
		metadata: options.name ? { name: options.name } : undefined,
	};
}
