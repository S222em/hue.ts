import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiDeviceGet {
	type?: ApiResourceType.Device;
	id: string;
	product_data: {
		model_id: string;
		manufacturer_name: string;
		product_name: string;
		product_archetype: string;
		certified: boolean;
		software_version: string;
		hardware_platform_type?: string;
	};
	metadata: {
		archetype: string;
		name: string;
	};
	services: ResourceIdentifier[];
}
