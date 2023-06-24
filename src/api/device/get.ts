import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';
import { ArcheType } from '../ArcheType';

export interface DeviceGet {
	type?: ResourceType.Device;
	id: string;
	product_data: {
		model_id: string;
		manufacturer_name: string;
		product_name: string;
		product_archetype: ArcheType;
		certified: boolean;
		software_version: string;
		hardware_platform_type?: string;
	};
	metadata: {
		archetype: ArcheType;
		name: string;
	};
	services: ResourceIdentifier[];
}
