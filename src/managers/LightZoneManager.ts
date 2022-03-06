import { Manager } from './Manager';
import type { Zone, ZoneResolvable } from '../structures/Zone';
import type { Light } from '../structures/Light';
import type Collection from '@discordjs/collection';

export class LightZoneManager extends Manager<ZoneResolvable> {
	public readonly light: Light;

	constructor(light: Light) {
		super();
		this.light = light;
	}

	get cache(): Collection<string, Zone> {
		return this.light.bridge.zones.cache.filter((zone) =>
			zone.data.services.map((service) => service.rid).includes(this.light.id),
		);
	}
}
