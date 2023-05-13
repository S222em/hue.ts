import { NarrowResource } from '../structures/Resource';
import { ApiResourceType } from '../api/ApiResourceType';

export function findResourceByTypeInArray<T extends ApiResourceType>(
	resources: NarrowResource[],
	type: T,
	force?: boolean,
): NarrowResource<T> | undefined;
export function findResourceByTypeInArray<T extends ApiResourceType>(
	resources: NarrowResource[],
	type: T,
	force: true,
): NarrowResource<T>;
export function findResourceByTypeInArray<T extends ApiResourceType>(resources: NarrowResource[], type: T) {
	return resources.find((resource) => resource.isType(type));
}
