import { Hue } from '../../../hue/Hue';
import { Events } from '../../../hue/HueEvents';

export default function lightAdd(data: any, hue: Hue) {
	const light = hue.lights._add(data);
	if (!light) return;

	return () => hue.emit(Events.LightAdd, light);
}
