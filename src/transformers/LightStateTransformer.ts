import { Light } from '../structures/Light';
import { z } from 'zod';
import { ApiLight } from '../types/api/light';

export const lightStateOptionsValidator = z.object({
	on: z.boolean().optional().nullable(),
	brightness: z.number().optional().nullable(),
	temperature: z.number().optional().nullable(),
	color: z.string().optional().nullable(),
	gradient: z.string().array().optional().nullable(),
});

export type LightStateOptions = z.infer<typeof lightStateOptionsValidator>;

export function lightStateTransformer(light: Light, options: LightStateOptions): ApiLight {
	return lightStateOptionsValidator
		.transform((o): ApiLight => {
			return {
				on: { on: o.on ?? true },
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
