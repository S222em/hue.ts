import { ResourceType } from '../api/ResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export function createResourceIdentifier<T extends ResourceType>(id: string, type: T): ResourceIdentifier<T> {
	return { rid: id, rtype: type };
}
