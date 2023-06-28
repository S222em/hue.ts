import { ResourceType } from '../ResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface GroupedLightGet {
	type?: ResourceType.GroupedLight;
	id: string;
	owner: ResourceIdentifier;
	on?: { on: boolean };
	dimming?: { brightness: number };
	alert: {
		// TODO action_values
		action_values?: string[];
	};
}
