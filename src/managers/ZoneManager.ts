import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { Zone } from '../structures/Zone';

export class ZoneManager extends Manager<ApiResourceType.Zone> {
	type = ApiResourceType.Zone;
	_resourceClass = Zone;
}
