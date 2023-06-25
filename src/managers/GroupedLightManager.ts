import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { GroupedLight, GroupedLightEditOptions } from '../structures/GroupedLight';
import { transformColor, transformColorTemperature, transformDimming, transformOn } from '../util/Transformers';

export class GroupedLightManager extends Manager<ResourceType.GroupedLight> {
	type = ResourceType.GroupedLight;
	holds = GroupedLight;

	public async edit(id: string, options: GroupedLightEditOptions): Promise<void> {
		await this._put(id, {
			on: transformOn(options.on),
			dimming: transformDimming(options.brightness),
			color_temperature: transformColorTemperature(options.mirek),
			color: transformColor(options.color),
		});
	}
}
