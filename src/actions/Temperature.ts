import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function temperatureAdd(data: SSEResource, hue: Hue) {
	const temperature = hue.temperatures._add(data);

	return () => hue.emit(Events.TemperatureAdd, temperature);
}

export function temperatureUpdate(data: SSEResource, hue: Hue) {
	const temperature = hue.temperatures.cache.get(data.id);
	if (!temperature) return;

	const clone = temperature._update(data);

	return () => hue.emit(Events.TemperatureUpdate, temperature, clone);
}

export function temperatureDelete(data: SSEResource, hue: Hue) {
	const temperature = hue.temperatures.cache.get(data.id);
	if (!temperature) return;

	const clone = temperature._clone();

	hue.temperatures.cache.delete(data.id);

	return () => hue.emit(Events.TemperatureDelete, clone);
}
