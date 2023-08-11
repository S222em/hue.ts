import { RoomCreateOptions, RoomEditOptions } from '../structures/Room';
import { RESTRoomPostPayload, RESTRoomPutPayload } from '../api/Room';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { APIResourceType } from '../api/ResourceType';

export function createRoomPutPayload(options: RoomEditOptions): RESTRoomPutPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: options.children ? createRoomChildrenPutPayload(options.children) : undefined,
	};
}

export function createRoomPostPayload(options: RoomCreateOptions): RESTRoomPostPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: createRoomChildrenPostPayload(options.children),
	};
}

export function createRoomChildrenPutPayload(children: RoomEditOptions['children']): RESTRoomPutPayload['children'] {
	return children!.map((child) => createResourceIdentifier(child, APIResourceType.Light));
}

export function createRoomChildrenPostPayload(
	children: RoomCreateOptions['children'],
): RESTRoomPostPayload['children'] {
	return children.map((child) => createResourceIdentifier(child, APIResourceType.Light));
}
