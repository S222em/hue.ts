import { SceneCreateOptions } from '../structures/Scene';
import { createResourceIdentifier } from './resourceIdentifier';
import { ResourceType } from '../api/ResourceType';
import { ifNotNull } from './ifNotNull';

export function transformSceneAction(options: SceneCreateOptions['actions'][0]) {
	return {
		target: createResourceIdentifier(options.id, ResourceType.Light),
		action: {
			on: ifNotNull(options.on, () => Object({ on: options.on })),
			dimming: ifNotNull(options.brightness, () => Object({ brightness: options.brightness })),
			color_temperature: ifNotNull(options.mirek, () =>
				Object({
					mirek: options.mirek,
				}),
			),
			color: ifNotNull(options.color, () => Object({ xy: { x: options.color!.x, y: options.color!.y } })),
			gradient: ifNotNull(options.gradient, () =>
				Object({
					points: options.gradient!.map((xy) => {
						return {
							color: { xy },
						};
					}),
				}),
			),
			effects: options.effects,
			dynamics: ifNotNull(options.dynamics?.duration, () =>
				Object({
					duration: options.dynamics!.duration!,
				}),
			),
		},
	};
}
