import { Resource } from './Resource';
import { ApiResourceType } from '../api/ApiResourceType';
import { ResourceIdentifier } from '../api/ResourceIdentifier';

export class BridgeHome extends Resource<ApiResourceType.BridgeHome> {
	type = ApiResourceType.BridgeHome;
	get children(): ResourceIdentifier[] {
		return this.data.children;
	}

	get services(): ResourceIdentifier[] {
		return this.data.services;
	}
}
