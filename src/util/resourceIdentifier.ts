import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export function createResourceIdentifier<T extends ApiResourceType>(id: string, type: T): ResourceIdentifier<T> {
	return { rid: id, rtype: type };
}
