import { TemperatureLight } from '../structures/TemperatureLight';
import type { Bridge } from '../bridge/Bridge';
import { Light } from '../structures/Light';
import { ColorLight } from '../structures/ColorLight';
import { GradientLight } from '../structures/GradientLight';
import { DimmableLight } from '../structures/DimmableLight';
import { ResourceManager } from './ResourceManager';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';
import { ApiLight, ApiLightGet } from '../types/api/light';

/**
 * Manager for all Hue lights
 */
export class LightManager extends ResourceManager<Light> {
	/**
	 * The cache of this manager
	 */
	public readonly cache: Collection<string, Light>;

	public constructor(bridge: Bridge) {
		super(bridge);
		this.cache = new Collection();
	}

	/**
	 * Adds or updates lights in the cache
	 * @param data
	 * @internal
	 */
	public _add(data: ApiLight): Light {
		const light = this.cache.ensure(data.id, () => {
			if ('gradient' in data) return new GradientLight(this.bridge);
			else if ('color' in data) return new ColorLight(this.bridge);
			else if ('color_temperature' in data) return new TemperatureLight(this.bridge);
			else if ('dimming' in data) return new DimmableLight(this.bridge);
			else return new Light(this.bridge);
		});
		light._patch(data);
		return light;
	}

	/**
	 * Fetches a specific light from the bridge
	 * @param id
	 */
	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.bridge.rest.get(Routes.light(id));
		const data = response.data as ApiLightGet;
		data.data.forEach((data: ApiLight) => {
			this._add(data);
		});
	}
}
