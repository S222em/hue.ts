import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiGroupedLightGet {
	type?: ApiResourceType.GroupedLight;
	id: string;
	owner: ResourceIdentifier;
	on?: { on: boolean };
	dimming?: { brightness: number };
	alert: {
		// TODO action_values
		action_values?: string[];
	};
}
