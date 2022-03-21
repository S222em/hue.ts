import type { Bridge } from '../bridge/Bridge';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';
import { Device } from '../structures/Device';
import { ApiDevice, ApiDeviceGet } from '../types/api/device';

export class DeviceManager extends ResourceManager<Device> {
	public readonly cache: Collection<string, Device>;

	public constructor(bridge: Bridge) {
		super(bridge);
		this.cache = new Collection();
	}

	public _add(data: ApiDevice): Device {
		const device = this.cache.ensure(data.id, () => new Device(this.bridge));
		device._patch(data);
		return device;
	}

	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.bridge.rest.get(Routes.device(id));
		const data = response.data as ApiDeviceGet;
		data.data.forEach((data: ApiDevice) => {
			this._add(data);
		});
	}
}
