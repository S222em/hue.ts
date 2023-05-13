import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export function createResourceIdentifier<T extends ApiResourceType>(id: string, type: T): ResourceIdentifier<T> {
	return { rid: id, rtype: type };
}

export function areIdentifiersEqual(identifier1?: ResourceIdentifier, identifier2?: ResourceIdentifier): boolean {
	return identifier1?.rid === identifier2?.rid && identifier1?.rtype === identifier2?.rtype;
}
