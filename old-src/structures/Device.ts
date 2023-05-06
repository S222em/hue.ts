import { NamedResource } from './NamedResource';
import { ApiDevice } from '../types/api/device';
import { ApiResourceType } from '../types/api/common';
import { Product } from './Product';
import { ResourceLike } from '../types/common';
import Collection from '@discordjs/collection';

export type DeviceResolvable = Device | string;

export interface DeviceOptions {
	name?: string;
}

/**
 * Represents a Hue device
 */
export class Device extends NamedResource<ApiDevice> {
	public type = ApiResourceType.Device;
	/**
	 * Device specifications e.g. manufacturer
	 */
	public readonly product = new Product(this);

	get services(): Collection<string, ResourceLike> {
		return this.bridge.resources.resolveAll(this.serviceIds);
	}

	get serviceIds(): string[] | null {
		return this.data.services?.map?.((service) => service.rid);
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
		return await this._edit({
			metadata: { name: options.name },
		});
	}

	/**
	 * Fetch this device from the bridge
	 */
	public async fetch(): Promise<Device> {
		return await this.bridge.resources.fetch(this.id, ApiResourceType.Device);
	}

	/**
	 * Edits this device with raw API data structure
	 * @param data
	 * @protected
	 * @internal
	 */
	protected async _edit(data: ApiDevice): Promise<void> {
		await this.bridge.resources._edit(this, data);
	}
}
