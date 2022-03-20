import { z } from 'zod';
import { GroupedLight } from '../structures/GroupedLight';
import { ApiGroupedLight } from '../types/api/grouped_light';

export const groupedLightStateValidator = z.object({
	on: z.boolean().optional().nullable(),
});

export type GroupedLightStateOptions = z.infer<typeof groupedLightStateValidator>;

export function groupedLightStateTransformer(
	groupedLight: GroupedLight,
	options: GroupedLightStateOptions,
): ApiGroupedLight {
	return groupedLightStateValidator
		.transform((data): ApiGroupedLight => {
			return {
				on: { on: data.on },
			};
		})
		.parse(options);
}
