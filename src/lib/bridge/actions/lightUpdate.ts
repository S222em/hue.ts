import type { Bridge } from '../Bridge';
import type { ApiLight } from '../../../api';
import { Events } from '../../util/Events';

export default function lightUpdate(bridge: Bridge, data: ApiLight.Object) {
	const light = bridge.lights.cache.get(data.id);
	if (light) {
		const old = light._update(data);
		bridge.emit(Events.LightUpdate, old, light);
	}
}
