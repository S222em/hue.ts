import { NamedResource } from './NamedResource';
import { ApiDevice } from '../types/api/device';
import { ApiResourceType } from '../types/api/common';
import { Light } from './Light';
import { Product } from './Product';
import { Routes } from '../util/Routes';

/**
 * Represents a Hue device
 */
export class Device extends NamedResource<ApiDevice> {
	type = ApiResourceType.Device;
	/**
	 * Device specifications e.g. manufacturer
	 */
	public readonly product = new Product(this);

	/**
	 * Connected light if any
	 */
	get light(): Light | undefined {
		return this.bridge.lights.cache.get(this.lightId);
	}

	/**
	 * Connected light ID if any
	 */
	get lightId(): string | undefined {
		return this.data.services.find((service) => service.rtype === ApiResourceType.Light)?.rid;
	}

	/**
	 * Date the device was added to the hue bridge
	 */
	get addedAt(): Date {
		return new Date(this.data.creation_time);
	}

	/**
	 * Edits this device with new data e.g. new name
	 * @param options
	 */
	public async edit(options: DeviceOptions): Promise<void> {
		return await this._edit(Device.transform(options));
	}

	/**
	 * Fetch this device from the bridge
	 */
	public async fetch(): Promise<Device> {
		await this.bridge.devices.fetch(this.id);
		return this;
	}

	/**
	 * Whether this device is connected to a light
	 */
	public isLight(): this is Device & { light: Light; lightId: string } {
		return Boolean(this.data.services.find((service) => service.rtype === ApiResourceType.Light));
	}

	/**
	 * Edits this device with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiDevice): Promise<void> {
		await this.bridge.rest.put(Routes.device.id(this.id), data);
	}

	public static transform(options: DeviceOptions): ApiDevice {
		return {
			metadata: options.name ? { name: options.name } : undefined,
		};
	}
}

export type DeviceResolvable = Device | string;

export interface DeviceOptions {
	name?: string;
}

export namespace Device {
	export type Resolvable = DeviceResolvable;
	export type Options = DeviceOptions;
}
