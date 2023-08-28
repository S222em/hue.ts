import { APIArcheType, APIResourceIdentifier, APIResourceType } from '../types/api';
import { APIArcheTypeResource, ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';

export interface DeviceEditOptions extends ArcheTypeResourceEditOptions {
	action: APIDeviceAction;
}

/**
 * Represents the device resource from the hue API
 */
export class Device extends ArcheTypeResource<APIDevice> {
	type = APIResourceType.Device;

	/**
	 * ID belonging to the model of the device
	 */
	get modelId(): string {
		return this.data.product_data.model_id;
	}

	/**
	 * Name of this devices manufacturer
	 */
	get manufacturerName(): string {
		return this.data.product_data.manufacturer_name;
	}

	/**
	 * This device's product name
	 */
	get productName(): string {
		return this.data.product_data.product_name;
	}

	/**
	 * Whether this device was created by a certified manufacturer
	 */
	get certified(): boolean {
		return this.data.product_data.certified;
	}

	/**
	 * Software version this device is on
	 */
	get softwareVersion(): string {
		return this.data.product_data.software_version;
	}

	/**
	 * Hardware type, identified by manufacturer code and image type
	 */
	get hardwarePlatformType(): string | undefined {
		return this.data.product_data.hardware_platform_type;
	}

	/**
	 * Services belonging to this device
	 */
	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	/**
	 * Sends an identify request
	 * This causes the device (light) to blink
	 */
	public async identify(): Promise<string> {
		return await this.edit({ action: APIDeviceAction.Identify });
	}

	/**
	 * Edits this device
	 * @param options
	 */
	public async edit(options: DeviceEditOptions): Promise<string> {
		return await this.hue.devices.edit(this.id, options);
	}

	/**
	 * Deletes this device (disconnect/remove it from the hue system)
	 */
	public async delete(): Promise<string> {
		return await this.hue.devices.delete(this.id);
	}
}

export enum APIDeviceAction {
	Identify = 'identify',
}

export interface APIDevice extends APIArcheTypeResource<APIResourceType.Device> {
	product_data: {
		model_id: string;
		manufacturer_name: string;
		product_name: string;
		product_archetype: APIArcheType;
		certified: boolean;
		software_version: string;
		hardware_platform_type?: string;
	};
	services: APIResourceIdentifier[];
}
