import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { GroupedLight, GroupedLightEditOptions } from '../structures/GroupedLight';
import { ifNotNull } from '../util/ifNotNull';

export class GroupedLightManager extends Manager<ResourceType.GroupedLight> {
	type = ResourceType.GroupedLight;
	holds = GroupedLight;

	public async edit(id: string, options: GroupedLightEditOptions): Promise<void> {
		await this._put(id, {
			on: { on: options.on },
			dimming: ifNotNull(options.brightness, () => Object({ brightness: options.brightness })),
			color_temperature: {
				mirek: options.mirek,
			},
			color: { xy: ifNotNull(options.xy, () => Object({ x: options.xy!.x, y: options.xy!.y })) },
		});
	}
}
