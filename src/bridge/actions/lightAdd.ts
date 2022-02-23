import type { Bridge } from '../Bridge';
import { Events } from '../../util/Events';
import type { ApiLight } from '../../types/api';

export default function lightAdd(bridge: Bridge, data: ApiLight) {
	const existing = bridge.lights.cache.get(data.id);
	const light = bridge.lights._add(data);
	if (!existing && light) {
		bridge.emit(Events.LightAdd, light);
	}
}
