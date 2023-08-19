import { APIResourceIdentifier, APIResourceType } from '../types/api';

export function createResourceIdentifier<TAPIResourceType extends APIResourceType>(
	id: string,
	type: TAPIResourceType,
): APIResourceIdentifier<TAPIResourceType> {
	return { rid: id, rtype: type };
}
