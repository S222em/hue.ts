import { APIResourceType } from '../api/ResourceType';
import { APIResourceIdentifier } from '../api/ResourceIdentifier';

export function createResourceIdentifier<TAPIResourceType extends APIResourceType>(
	id: string,
	type: TAPIResourceType,
): APIResourceIdentifier<TAPIResourceType> {
	return { rid: id, rtype: type };
}
