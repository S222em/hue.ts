import { Hue } from '../hue/Hue';
import { Events } from '../hue/HueEvents';
import { SSEResource } from '../types/sse';

export default function buttonAdd(data: SSEResource, hue: Hue) {
	const button = hue.buttons._add(data);
	if (!button) return;

	return () => hue.emit(Events.ButtonAdd, button);
}
