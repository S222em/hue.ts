import { GroupedLightEditOptions } from '../structures/GroupedLight';
import { RESTPayload } from '../types/rest';

export function createGroupedLightPutPayload(options: GroupedLightEditOptions): RESTPayload {
	return {
		on: options.on != undefined ? { on: options.on } : undefined,
		dimming: options.brightness ? { brightness: options.brightness } : undefined,
		dimming_delta: options.brightnessDelta
			? {
					action: options.brightnessDelta.action,
					brightness_delta: options.brightnessDelta.brightness,
			  }
			: undefined,
		color_temperature: options.colorTemperature ? { mirek: options.colorTemperature } : undefined,
		color_temperature_delta: options.colorTemperatureDelta
			? {
					action: options.colorTemperatureDelta.action,
					mirek_delta: options.colorTemperatureDelta.colorTemperature,
			  }
			: undefined,
		color: options.color ? { xy: { x: options.color.x, y: options.color.y } } : undefined,
	};
}
