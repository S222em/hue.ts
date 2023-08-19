import { createResourceIdentifier } from '../util/resourceIdentifier';
import { APIResourceType } from '../types/api';
import { RESTPayload } from '../types/rest';
import { ZoneCreateOptions, ZoneEditOptions } from '../structures/Zone';

export function createZonePutPayload(options: ZoneEditOptions): RESTPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: options.children ? createZoneChildrenPayload(options.children) : undefined,
	};
}

export function createZonePostPayload(options: ZoneCreateOptions): RESTPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: createZoneChildrenPayload(options.children),
	};
}

export function createZoneChildrenPayload(children: string[]): RESTPayload[] {
	return children.map((child) => createResourceIdentifier(child, APIResourceType.Light));
}
