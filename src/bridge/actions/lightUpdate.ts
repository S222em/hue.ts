import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import { ApiLight } from '../../types/api/light';

export default function lightUpdate(bridge: Bridge, data: ApiLight) {
	const light = bridge.lights.cache.get(data.id);
	if (light) {
		const old = light._update(data);
		bridge.emit(Events.LightUpdate, old, light);
	}
}
