import { TemperatureLight } from '../structures/TemperatureLight';
import type { Bridge } from '../bridge/Bridge';
import { Light, LightResolvable } from '../structures/Light';
import { ColorLight } from '../structures/ColorLight';
import { GradientLight } from '../structures/GradientLight';
import { ApiLight } from '../../api';
import { DimmableLight } from '../structures/DimmableLight';
import { ResourceManager } from './ResourceManager';

// TODO add device search

export class LightManager extends ResourceManager<Light> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 100 });
	}

	public _add(data: ApiLight.Object): Light {
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

	public resolve(resolvable: LightResolvable): Light {
		if (typeof resolvable === 'string') {
			if (this.cache.has(resolvable)) return this.cache.get(resolvable);
			const find = this.cache.find((light) => light.name === resolvable);
			if (find) return find;
		} else if (resolvable instanceof Light) {
			return this.cache.get(resolvable.id);
		}
	}

	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(ApiLight.route());
		const data = response.data.data as ApiLight.Get;
		data.forEach((data) => {
			this._add(data);
		});
	}
}
