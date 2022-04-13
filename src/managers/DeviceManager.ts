import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import { Device } from '../structures/Device';
import { ApiDevice } from '../types/api/device';

/**
 * Manager for Hue devices
 */
export class DeviceManager extends ResourceManager<Device, ApiDevice> {
	public constructor(bridge: Bridge) {
		super(bridge, { createCollection: true, makeCache: () => new Device(bridge), getRoute: Routes.device });
	}
}
