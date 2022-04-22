import type { Bridge } from '../bridge/Bridge';
import { Zone } from '../structures/Zone';
import { ResourceManager } from './ResourceManager';
import { ApiZone } from '../types/api/zone';
import { Routes } from '../routes/Routes';

/**
 * Manager for all Hue zones
 */
export class ZoneManager extends ResourceManager<Zone, ApiZone> {
	public constructor(bridge: Bridge) {
		super(bridge, { createCollection: true, makeCache: () => new Zone(bridge), route: Routes.Zone });
	}
}
