import { TemperatureLight } from '../structures/TemperatureLight';
import type { Bridge } from '../bridge/Bridge';
import { Light, LightResolvable } from '../structures/Light';
import { ColorLight } from '../structures/ColorLight';
import { GradientLight } from '../structures/GradientLight';
import { DimmableLight } from '../structures/DimmableLight';
import { ResourceManager } from './ResourceManager';
import type { ApiLight } from '../types/api';
import { Routes } from '../util/Routes';

export class LightManager extends ResourceManager<Light> {
	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 100 });
	}

	/**
	 * Patches/creates a Light
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
	 * Resolves a Light resolvable
	 */
	public resolve(resolvable: LightResolvable): Light {
		if (typeof resolvable === 'string') {
			if (this.cache.has(resolvable)) return this.cache.get(resolvable);
			const find = this.cache.find((light) => light.name === resolvable);
			if (find) return find;
		} else if (resolvable instanceof Light) {
			return this.cache.get(resolvable.id);
		}
	}

	/**
	 * Syncs all the Lights of the bridge with this manager
	 */
	public async sync(): Promise<boolean | void> {
		const response = await this.rest.get(Routes.light());
		const data = response.data.data as ApiLight[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}
