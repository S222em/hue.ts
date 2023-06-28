import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Light, LightEditOptions } from '../structures/Light';
import {
	transformColor,
	transformColorTemperature,
	transformDimming,
	transformDynamics,
	transformEffects,
	transformGradient,
	transformMetadataWithArcheType,
	transformOn,
	transformTimedEffects,
} from '../util/Transformers';

export class LightManager extends Manager<ResourceType.Light> {
	type = ResourceType.Light;
	holds = Light;

	public async edit(id: string, options: LightEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
			on: transformOn(options.on),
			dynamics: transformDynamics(options.dynamics),
			effects: transformEffects(options.effect),
			timed_effects: transformTimedEffects(options.timedEffects),
			dimming: transformDimming(options.brightness ?? options.color?.z),
			color_temperature: transformColorTemperature(options.colorTemperature),
			color: transformColor(options.color),
			gradient: transformGradient(options.gradient),
		});
	}
}
