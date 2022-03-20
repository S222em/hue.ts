import { Manager } from './Manager';
import type { Zone } from '../structures/Zone';
import type { Light } from '../structures/Light';
import type Collection from '@discordjs/collection';
import { ApiResourceType } from '../types/api/common';

export class LightZoneManager extends Manager<Zone> {
	public readonly light: Light;

	constructor(light: Light) {
		super();
		this.light = light;
	}

	get cache(): Collection<string, Zone> {
		return this.light.bridge.zones.cache.filter((zone) =>
			zone.data.children.includes({ rid: this.light.id, rtype: ApiResourceType.Light }),
		);
	}
}
