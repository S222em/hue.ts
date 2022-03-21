import { ApiGroupedLight } from '../types/api/grouped_light';

export interface GroupedLightStateOptions {
	on?: boolean;
}

export function groupedLightStateTransformer(options: GroupedLightStateOptions): ApiGroupedLight {
	return {
		on: { on: options.on ?? true },
	};
}
