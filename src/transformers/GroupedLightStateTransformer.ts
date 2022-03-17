import { z } from 'zod';
import { GroupedLight } from '../structures/GroupedLight';
import { DeepPartial } from '../types/common';
import { ApiGroupedLight } from '../types/api';

export const groupedLightStateValidator = z.object({
	on: z.boolean().optional().nullable(),
});

export type GroupedLightStateOptions = z.infer<typeof groupedLightStateValidator>;

export function groupedLightStateTransformer(
	groupedLight: GroupedLight,
	options: GroupedLightStateOptions,
): DeepPartial<ApiGroupedLight> {
	return groupedLightStateValidator
		.transform((data): DeepPartial<ApiGroupedLight> => {
			return {
				on: { on: data.on },
			};
		})
		.parse(options);
}
