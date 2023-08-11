import { createResourceIdentifier } from '../util/resourceIdentifier';
import { APIResourceType } from '../api/ResourceType';
import { ZoneCreateOptions, ZoneEditOptions } from '../structures/Zone';
import { RESTZonePostPayload, RESTZonePutPayload } from '../api/Zone';

export function createZonePutPayload(options: ZoneEditOptions): RESTZonePutPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: options.children ? createZoneChildrenPutPayload(options.children) : undefined,
	};
}

export function createZonePostPayload(options: ZoneCreateOptions): RESTZonePostPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: createZoneChildrenPostPayload(options.children),
	};
}

export function createZoneChildrenPutPayload(children: ZoneEditOptions['children']): RESTZonePutPayload['children'] {
	return children!.map((child) => createResourceIdentifier(child, APIResourceType.Light));
}

export function createZoneChildrenPostPayload(
	children: ZoneCreateOptions['children'],
): RESTZonePostPayload['children'] {
	return children.map((child) => createResourceIdentifier(child, APIResourceType.Light));
}
