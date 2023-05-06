import { Device } from './Device';

/**
 * Represents a product
 */
export class Product {
	/**
	 * The connected device
	 * @private
	 */
	private readonly device: Device;

	constructor(device: Device) {
		this.device = device;
	}

	/**
	 * The products id
	 */
	get id(): string {
		return this.device.data.product_data?.product_id;
	}

	/**
	 * The products name
	 */
	get name(): string {
		return this.device.data.product_data?.product_name;
	}

	/**
	 * The products model ID
	 */
	get modelId(): string {
		return this.device.data.product_data?.model_id;
	}

	/**
	 * The products manufacturer
	 */
	get manufacturerName(): string {
		return this.device.data.product_data?.manufacturer_name;
	}

	/**
	 * Whether the product is a certified product
	 */
	get certified(): boolean {
		return this.device.data.product_data?.certified;
	}

	/**
	 * The products software version
	 */
	get softwareVersion(): string {
		return this.device.data.product_data?.software_version;
	}
}
