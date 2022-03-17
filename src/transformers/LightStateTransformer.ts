import { Light } from '../structures/Light';
import { ApiLight } from '../types/api';
import { DeepPartial } from '../types/common';
import { z } from 'zod';

export const lightStateOptionsValidator = z.object({
	on: z.boolean().optional(),
	brightness: z.number().optional(),
	temperature: z.number().optional(),
	color: z.string().optional(),
	gradient: z.string().array().optional(),
});

export type LightStateOptions = z.infer<typeof lightStateOptionsValidator>;

export function lightStateTransformer(light: Light, options: LightStateOptions): DeepPartial<ApiLight> {
	return lightStateOptionsValidator
		.transform((o): DeepPartial<ApiLight> => {
			return {
				on: { on: o.on },
				dimming: light.isDimmable() ? { brightness: o.brightness } : undefined,
				color_temperature: light.isTemperature() ? { mirek: o.temperature } : undefined,
				color: light.isColor()
					? { xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(o.color)) }
					: undefined,
				gradient: light.isGradient()
					? {
							points: o.gradient?.map((color) => {
								return {
									color: {
										xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(color)),
									},
								};
							}),
					  }
					: undefined,
			};
		})
		.parse(options);
}
