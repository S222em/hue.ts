import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function temperatureUpdate(data: SSEResource, hue: Hue) {
	const temperature = hue.temperatures.cache.get(data.id);
	if (!temperature) return;

	const clone = temperature._update(data);

	return () => hue.emit(Events.TemperatureUpdate, temperature, clone);
}
