import type { Bridge } from '../bridge/Bridge';
import { Light } from '../structures/Light';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import { ApiLight } from '../types/api/light';
import { GradientLight } from '../structures/GradientLight';
import { ColorLight } from '../structures/ColorLight';
import { TemperatureLight } from '../structures/TemperatureLight';
import { DimmableLight } from '../structures/DimmableLight';

/**
 * Manager for all Hue lights
 */
export class LightManager extends ResourceManager<Light, ApiLight> {
	public constructor(bridge: Bridge) {
		super(bridge, {
			createCollection: true,
			makeCache: (data) => {
				if ('gradient' in data) return new GradientLight(bridge);
				else if ('color' in data) return new ColorLight(bridge);
				else if ('color_temperature' in data) return new TemperatureLight(bridge);
				else if ('dimming' in data) return new DimmableLight(bridge);
				else return new Light(this.bridge);
			},
			route: Routes.light,
		});
	}
}
