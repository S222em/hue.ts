import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSEResource } from '../../types/sse';

export default function buttonUpdate(data: SSEResource, hue: Hue) {
	const button = hue.buttons.cache.get(data.id);
	if (!button) return;

	const clone = button._update(data);

	return () => hue.emit(Events.ButtonUpdate, button, clone);
}
