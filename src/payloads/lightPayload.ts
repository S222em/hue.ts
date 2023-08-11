import { LightEditOptions } from '../structures/Light';
import { RESTLightPutPayload } from '../api/Light';

export function createLightPutPayload(options: LightEditOptions): RESTLightPutPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
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

export function createLightGradientPayload(gradient: LightEditOptions['gradient']): RESTLightPutPayload['gradient'] {
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
