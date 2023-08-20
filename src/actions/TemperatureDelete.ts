import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function temperatureDelete(data: SSEResource, hue: Hue) {
	const temperature = hue.temperatures.cache.get(data.id);
	if (!temperature) return;

	const clone = temperature._clone();

	hue.temperatures.cache.delete(data.id);

	return () => hue.emit(Events.TemperatureDelete, clone);
}
