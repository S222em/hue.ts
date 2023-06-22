import { Manager } from './Manager';
import { ApiResourceType } from '../api/ApiResourceType';
import { Light } from '../structures/Light';
import { NarrowResource } from '../structures/Resource';
import { XysLight } from '../structures/XysLight';
import { XyLight } from '../structures/XyLight';
import { MirekLight } from '../structures/MirekLight';
import { DimmableLight } from '../structures/DimmableLight';

export class LightManager extends Manager<ApiResourceType.Light> {
	type = ApiResourceType.Light;
	_resourceClass = Light;

	public _create(data: any): NarrowResource<ApiResourceType.Light> {
		let resource;

		if (data.gradient) resource = new XysLight(this.bridge, data);
		else if (data.color) resource = new XyLight(this.bridge, data);
		else if (data.color_temperature) resource = new MirekLight(this.bridge, data);
		else if (data.dimming) resource = new DimmableLight(this.bridge, data);
		else resource = new Light(this.bridge, data);

		this._cache.set(data.id, resource);

		return resource;
	}
}
