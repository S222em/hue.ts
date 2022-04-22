import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Device } from '../structures/Device';
import { ApiDevice } from '../types/api/device';
import { Routes } from '../routes/Routes';

/**
 * Manager for Hue devices
 */
export class DeviceManager extends ResourceManager<Device, ApiDevice> {
	public constructor(bridge: Bridge) {
		super(bridge, { createCollection: true, makeCache: () => new Device(bridge), route: Routes.Device });
	}
}
