import { ApiZone } from '../types/api/zone';
import { ApiRoom } from '../types/api/room';
import { LightResolvable } from '../structures/Light';
import { Group } from '../structures/Group';
import { ApiResourceType } from '../types/api/common';

export interface GroupEditOptions {
	name?: string;
	lights?: LightResolvable[];
}

export function groupEditTransformer(options: GroupEditOptions, group: Group): ApiRoom | ApiZone {
	return {
		metadata: options.name ? { name: options.name } : undefined,
		children: options.lights
			? options.lights.map((resolvable) => {
					const light = group.bridge.lights.resolve(resolvable);
					return {
						rid: group.type === ApiResourceType.Room ? light.deviceId : light.id,
						rtype: group.type === ApiResourceType.Room ? ApiResourceType.Device : ApiResourceType.Light,
					};
			  })
			: undefined,
	};
}
