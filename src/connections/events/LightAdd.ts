import { Hue } from '../../hue/Hue';
import { Events } from '../../hue/HueEvents';
import { SSELightAddData } from '../../api/Light';

export default function lightAdd(data: SSELightAddData, hue: Hue) {
	const light = hue.lights._add(data);
	if (!light) return;

	return () => hue.emit(Events.LightAdd, light);
}
