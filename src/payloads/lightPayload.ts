import { LightEditOptions } from '../structures/Light';
import { RESTPayload } from '../types/rest';

export function createLightPutPayload(options: LightEditOptions): RESTPayload {
	return {
		on: options.on ? { on: options.on } : undefined,
		dynamics: options.dynamics ? { duration: options.dynamics.duration, speed: options.dynamics.speed } : undefined,
		effects: options.effect ? { effect: options.effect } : undefined,
		timed_effects: options.timedEffects
			? { duration: options.timedEffects.duration, effect: options.timedEffects.effect }
			: undefined,
		dimming: { brightness: options.brightness ?? options.color?.z },
		color_temperature: options.colorTemperature ? { mirek: options.colorTemperature } : undefined,
		color: options.color ? { xy: { x: options.color.x, y: options.color.y } } : undefined,
		gradient: options.gradient ? createLightGradientPayload(options.gradient) : undefined,
	};
}

export function createLightGradientPayload(gradient: LightEditOptions['gradient']): RESTPayload {
	return {
		points: gradient!.map((point) => {
			return {
				color: {
					xy: { x: point.x, y: point.y },
				},
			};
		}),
	};
}
