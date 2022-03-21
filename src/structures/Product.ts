import { Device } from './Device';

export class Product {
	private readonly device: Device;

	constructor(device: Device) {
		this.device = device;
	}

	get id(): string {
		return this.device.data.product_data?.product_id;
	}

	get name(): string {
		return this.device.data.product_data?.product_name;
	}

	get modelId(): string {
		return this.device.data.product_data?.model_id;
	}

	get manufacturerName(): string {
		return this.device.data.product_data?.manufacturer_name;
	}

	get certified(): boolean {
		return this.device.data.product_data?.certified;
	}

	get softwareVersion(): string {
		return this.device.data.product_data?.software_version;
	}
}
