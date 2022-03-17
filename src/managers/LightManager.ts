import { TemperatureLight } from '../structures/TemperatureLight';
import type { Bridge } from '../bridge/Bridge';
import { Light } from '../structures/Light';
import { ColorLight } from '../structures/ColorLight';
import { GradientLight } from '../structures/GradientLight';
import { DimmableLight } from '../structures/DimmableLight';
import { ResourceManager } from './ResourceManager';
import type { ApiLight } from '../types/api';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';

export class LightManager extends ResourceManager<Light> {
	public readonly cache: Collection<string, Light>;

	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 100 });
		this.cache = new Collection();
	}

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

	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.rest.get(Routes.light(id));
		const data = response.data.data as ApiLight[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
