import type { Bridge } from '../Bridge';
import type { ApiLight } from '../../api';
import { Events } from '../../util/Events';

export default function lightAdd(bridge: Bridge, data: ApiLight.Data) {
	const existing = bridge.lights.cache.get(data.id);
	const light = bridge.lights._add(data);
	if (!existing && light) {
		bridge.emit(Events.LightAdd, light);
	}
}
