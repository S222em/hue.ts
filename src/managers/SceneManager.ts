import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Scene, SceneCreateOptions } from '../structures/Scene';
import { ifNotNull } from '../util/ifNotNull';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { Zone } from '../structures/Zone';
import { Room } from '../structures/Room';

export class SceneManager extends Manager<ResourceType.Scene> {
	type = ResourceType.Scene;
	_resourceClass = Scene;

	public async _create(groupId: string, options: SceneCreateOptions): Promise<string | undefined> {
		const group: Zone | Room | undefined = this.bridge.zones.cache.get(groupId) ?? this.bridge.rooms.cache.get(groupId);
		if (!group) return;

		const identifiers = await this._post({
			group: group.identifier,
			metadata: { name: options.name },
			actions: options.actions.map((action) =>
				Object({
					target: createResourceIdentifier(action.id, ResourceType.Light),
					action: {
						on: ifNotNull(action.on, () => Object({ on: action.on })),
						dimming: ifNotNull(action.brightness, () => Object({ brightness: action.brightness })),
						color_temperature: ifNotNull(action.mirek, () =>
							Object({
								mirek: action.mirek,
							}),
						),
						color: ifNotNull(action.color, () => Object({ xy: { x: action.color!.x, y: action.color!.y } })),
						gradient: ifNotNull(action.gradient, () =>
							Object({
								points: action.gradient!.map((xy) => {
									return {
										color: { xy },
									};
								}),
							}),
						),
						effects: action.effects,
						dynamics: ifNotNull(action.dynamics?.duration, () =>
							Object({
								duration: action.dynamics!.duration!,
							}),
						),
					},
				}),
			),
		});

		return identifiers?.[0]?.rid;
	}
}
