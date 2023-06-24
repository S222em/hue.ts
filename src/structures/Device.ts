import { ResourceType } from '../api/ResourceType';
import { ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { DeviceManager } from '../managers/DeviceManager';

export type DeviceEditOptions = ArcheTypeResourceEditOptions;

export class Device extends ArcheTypeResource<ResourceType.Device> {
	type = ResourceType.Device;

	get manager(): DeviceManager {
		return this.bridge.devices;
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

	public async identify(): Promise<void> {
		await this.manager._put(this.id, { identify: { action: 'identify' } });
	}

	public async edit(options: DeviceEditOptions): Promise<void> {
		await this.manager._put(this.id, {
			metadata: {
				name: options.name,
				archetype: options.archeType,
			},
		});
	}

	public async delete(): Promise<void> {
		await this.manager._delete(this.id);
	}
}
