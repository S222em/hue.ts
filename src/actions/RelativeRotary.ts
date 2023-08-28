import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function relativeRotaryAdd(data: SSEResource, hue: Hue) {
	const relativeRotary = hue.relativeRotaries._add(data);

	return () => hue.emit(Events.RelativeRotaryAdd, relativeRotary);
}

export function relativeRotaryUpdate(data: SSEResource, hue: Hue) {
	const relativeRotary = hue.relativeRotaries.cache.get(data.id);
	if (!relativeRotary) return;

	const clone = relativeRotary._update(data);

	return () => hue.emit(Events.RelativeRotaryUpdate, relativeRotary, clone);
}

export function relativeRotaryDelete(data: SSEResource, hue: Hue) {
	const relativeRotary = hue.relativeRotaries.cache.get(data.id);
	if (!relativeRotary) return;

	const clone = relativeRotary._clone();

	hue.relativeRotaries.cache.delete(data.id);

	return () => hue.emit(Events.RelativeRotaryDelete, clone);
}
