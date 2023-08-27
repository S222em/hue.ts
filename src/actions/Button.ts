import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export function buttonAdd(data: SSEResource, hue: Hue) {
	const button = hue.buttons._add(data);

	return () => hue.emit(Events.ButtonAdd, button);
}

export function buttonUpdate(data: SSEResource, hue: Hue) {
	const button = hue.buttons.cache.get(data.id);
	if (!button) return;

	const clone = button._update(data);

	return () => hue.emit(Events.ButtonUpdate, button, clone);
}

export function buttonDelete(data: SSEResource, hue: Hue) {
	const button = hue.buttons.cache.get(data.id);
	if (!button) return;

	const clone = button._clone();

	hue.buttons.cache.delete(data.id);

	return () => hue.emit(Events.ButtonDelete, clone);
}
