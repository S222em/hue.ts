import { Light } from '../structures/Light';
import { ApiLight } from '../types/api/light';

export interface LightStateOptions {
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export function lightStateTransformer(options: LightStateOptions, light: Light): ApiLight {
	return {
		on: { on: options.on ?? true },
		dimming: light.isDimmable() && options.brightness ? { brightness: options.brightness } : undefined,
		color_temperature: light.isTemperature() && options.temperature ? { mirek: options.temperature } : undefined,
		color:
			light.isColor() && options.color
				? { xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(options.color)) }
				: undefined,
		gradient:
			light.isGradient() && options.gradient
				? {
						points: options.gradient.map((gradient) => {
							return {
								color: {
									xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(gradient)),
								},
							};
						}),
				  }
				: undefined,
	};
}
