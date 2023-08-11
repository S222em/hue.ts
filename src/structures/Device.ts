import { APIResourceType } from '../api/ResourceType';
import { ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { DeviceManager } from '../managers/DeviceManager';

export enum DeviceAction {
	Identify = 'identify',
}

export interface DeviceEditOptions extends ArcheTypeResourceEditOptions {
	action: DeviceAction;
}

export class Device extends ArcheTypeResource<APIResourceType.Device> {
	type = APIResourceType.Device;

	get manager(): DeviceManager {
		return this.hue.devices;
	}

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

	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	public async identify(): Promise<string> {
		return await this.edit({ action: DeviceAction.Identify });
	}

	public async edit(options: DeviceEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}

	public async delete(): Promise<string> {
		return await this.manager.delete(this.id);
	}
}
