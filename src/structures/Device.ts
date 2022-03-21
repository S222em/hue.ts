import { NamedResource } from './NamedResource';
import { ApiDevice } from '../types/api/device';
import { ApiResourceType } from '../types/api/common';
import { Light } from './Light';
import { Product } from './Product';
import { Routes } from '../util/Routes';
import { DeviceEditOptions, deviceEditTransformer } from '../transformers/DeviceEditTransformer';

export class Device extends NamedResource<ApiDevice> {
	type = ApiResourceType.Device;
	public readonly product = new Product(this);

	get light(): Light | undefined {
		return this.bridge.lights.cache.get(this.lightId);
	}

	get lightId(): string | undefined {
		return this.data.services.find((service) => service.rtype === ApiResourceType.Light)?.rid;
	}

	get addedAt(): Date {
		return new Date(this.data.creation_time);
	}

	public async edit(options: DeviceEditOptions): Promise<void> {
		return await this._edit(deviceEditTransformer(options));
	}

	public async fetch(): Promise<Device> {
		await this.bridge.devices.fetch(this.id);
		return this;
	}

	public isLight(): this is Device & { light: Light; lightId: string } {
		return Boolean(this.data.services.find((service) => service.rtype === ApiResourceType.Light));
	}

	protected async _edit(data: ApiDevice): Promise<void> {
		await this.bridge.rest.put(Routes.device(this.id), data);
	}
}
