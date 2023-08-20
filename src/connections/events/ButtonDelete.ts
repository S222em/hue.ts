import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function buttonDelete(data: SSEResource, hue: Hue) {
	const button = hue.buttons.cache.get(data.id);
	if (!button) return;

	const clone = button._clone();

	hue.buttons.cache.delete(data.id);

	return () => hue.emit(Events.ButtonDelete, clone);
}
