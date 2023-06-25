import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Light, LightEditOptions } from '../structures/Light';
import { ifNotNull } from '../util/ifNotNull';

export class LightManager extends Manager<ResourceType.Light> {
	type = ResourceType.Light;
	holds = Light;

	public async edit(id: string, options: LightEditOptions): Promise<void> {
		await this._put(id, {
			metadata: { name: options.name, archetype: options.archeType },
			on: { on: options.on },
			dynamics: { duration: options.dynamics?.duration, speed: options.dynamics?.speed },
			effects: { effect: options.effect },
			timed_effects: {
				effect: options.timedEffects?.effect,
				duration: options.timedEffects?.duration,
			},
			dimming: { brightness: options.brightness ?? options.color?.z },
			color_temperature: {
				mirek: options.mirek,
			},
			color: { xy: ifNotNull(options.color, () => Object({ x: options.color!.x, y: options.color!.y })) },
			gradient: ifNotNull(options.gradient, () =>
				Object({
					points: options.gradient!.map((xy) => {
						return {
							color: { xy },
						};
					}),
				}),
			),
		});
	}
}
