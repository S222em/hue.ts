import { GroupedLightEditOptions } from '../structures/GroupedLight';
import { RESTGroupedLightPutPayload } from '../api/GroupedLight';

export function createGroupedLightPutPayload(options: GroupedLightEditOptions): RESTGroupedLightPutPayload {
	return {
		on: options.on ? { on: options.on } : undefined,
		dimming: options.brightness ? { brightness: options.brightness } : undefined,
		color_temperature: options.colorTemperature ? { mirek: options.colorTemperature } : undefined,
		color: options.color ? { xy: { x: options.color.x, y: options.color.y } } : undefined,
	};
}
