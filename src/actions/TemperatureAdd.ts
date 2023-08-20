import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function temperatureAdd(data: SSEResource, hue: Hue) {
	const temperature = hue.temperatures._add(data);
	if (!temperature) return;

	return () => hue.emit(Events.TemperatureAdd, temperature);
}
