import { NamedResource } from './NamedResource';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';
import { DimmableLight } from './DimmableLight';
import { MirekLight } from './MirekLight';
import { XyLight } from './XyLight';
import { XysLight } from './XysLight';

export enum LightCapabilities {
	None = 'none',
	Dimming = 'dimming',
	Mirek = 'mirek',
	Xy = 'xy',
	Xys = 'xys',
}

export interface Lights {
	[LightCapabilities.None]: Light | DimmableLight | MirekLight | XyLight | XysLight;
	[LightCapabilities.Dimming]: DimmableLight | MirekLight | XyLight | XysLight;
	[LightCapabilities.Mirek]: MirekLight | XyLight | XysLight;
	[LightCapabilities.Xy]: XyLight | XysLight;
	[LightCapabilities.Xys]: XysLight;
}

export type NarrowLight<T extends LightCapabilities> = Lights[T];

export interface LightEditOptions {
	name?: string;
	on?: boolean;
	dynamics?: {
		duration?: number;
		speed?: number;
	};
	effect?: 'fire' | 'candle' | 'no_effect';
	timedEffects?: {
		effect?: 'sunrise' | 'no_effect';
		duration?: number;
	};
}

export class Light extends NamedResource<ApiResourceType.Light> {
	public capabilities: LightCapabilities = LightCapabilities.None;
	type = ApiResourceType.Light;

	public isOn(): boolean {
		return this.data.on.on;
	}

	get mode(): 'normal' | 'streaming' {
		return this.data.mode;
	}

	public isCapableOf<T extends LightCapabilities>(capability: T): this is NarrowLight<T> {
		const order = [LightCapabilities.Dimming, LightCapabilities.Mirek, LightCapabilities.Xy, LightCapabilities.Xys];

		const index = order.indexOf(capability);
		const left = order.slice(index, order.length);

		return left.includes(this.capabilities);
	}

	public isCapableOfDimming(): this is NarrowLight<LightCapabilities.Dimming> {
		return this.isCapableOf(LightCapabilities.Dimming);
	}

	public isCapableOfMirek(): this is NarrowLight<LightCapabilities.Mirek> {
		return this.isCapableOf(LightCapabilities.Mirek);
	}

	public isCapableOfXy(): this is NarrowLight<LightCapabilities.Xy> {
		return this.isCapableOf(LightCapabilities.Xy);
	}

	public isCapableOfXys(): this is NarrowLight<LightCapabilities.Xys> {
		return this.isCapableOf(LightCapabilities.Xys);
	}

	public async on(duration?: number): Promise<void> {
		await this.edit({ on: true, dynamics: { duration } });
	}

	public async off(duration?: number): Promise<void> {
		await this.edit({ on: false, dynamics: { duration } });
	}

	public async toggle(duration?: number): Promise<void> {
		await this.edit({ on: !this.isOn(), dynamics: { duration } });
	}

	public async effect(effect: LightEditOptions['effect']): Promise<void> {
		await this.edit({ effect });
	}

	public async timedEffect(timedEffects: LightEditOptions['timedEffects']): Promise<void> {
		await this.edit({ timedEffects });
	}

	public async edit(options: LightEditOptions, _inject?: ApiResourceTypePut<ApiResourceType.Light>): Promise<void> {
		await this._put({
			metadata: options.name ? { name: options.name } : undefined,
			on: { on: options.on ?? true },
			dynamics: { duration: options.dynamics?.duration, speed: options.dynamics?.speed },
			effects: { effect: options.effect },
			timed_effects: {
				effect: options.timedEffects?.effect,
				duration: options.timedEffects?.duration,
			},
			..._inject,
		});
	}
}
