import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export interface DeviceEditOptions {
	name: string;
}

export class Device extends NamedResource<ApiResourceType.Device> {
	type = ApiResourceType.Device;

	get modelId(): string {
		return this.data.product_data.model_id;
	}

	get manufacturerName(): string {
		return this.data.product_data.manufacturer_name;
	}

	get productName(): string {
		return this.data.product_data.product_name;
	}

	get certified(): boolean {
		return this.data.product_data.certified;
	}

	get softwareVersion(): string {
		return this.data.product_data.software_version;
	}

	get hardwarePlatformType(): string | undefined {
		return this.data.product_data.hardware_platform_type;
	}

	get services(): ResourceIdentifier[] {
		return this.data.services;
	}

	public async identify(): Promise<void> {
		await this._put({ identify: { action: 'identify' } });
	}

	public async edit(options: DeviceEditOptions): Promise<void> {
		await this._put({ metadata: options.name ? { name: options.name } : undefined });
	}
}
