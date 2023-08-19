import { RoomCreateOptions, RoomEditOptions } from '../structures/Room';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { APIResourceType } from '../types/api';
import { RESTPayload } from '../types/rest';

export function createRoomPutPayload(options: RoomEditOptions): RESTPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: options.children ? createRoomChildrenPayload(options.children) : undefined,
	};
}

export function createRoomPostPayload(options: RoomCreateOptions): RESTPayload {
	return {
		metadata: { name: options.name, archetype: options.archeType },
		children: createRoomChildrenPayload(options.children),
	};
}

export function createRoomChildrenPayload(children: string[]): RESTPayload[] {
	return children.map((child) => createResourceIdentifier(child, APIResourceType.Light));
}
