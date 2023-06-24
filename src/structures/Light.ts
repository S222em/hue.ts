import { ResourceType } from '../api/ResourceType';
import { ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { LightManager } from '../managers/LightManager';
import { checkXyInReach, createXy, getClosestXy, XyPoint } from '../color/xy';
import { createGamut, Gamut, resolveGamutByType } from '../color/gamut';
import { ifNotNull } from '../util/ifNotNull';

export enum LightCapabilities {
	None = 'none',
	Dimming = 'dimming',
	Mirek = 'mirek',
	Xy = 'xy',
	Xys = 'xys',
}

export interface LightIsCapableOfDimming {
	brightness: number;
	minBrightnessLevel: number;
}

export interface LightIsCapableOfColorTemperature extends LightIsCapableOfDimming {
	mirek: number;
	minMirek: number;
	maxMirek: number;
}

export interface LightIsCapableOfColor extends LightIsCapableOfColorTemperature {
	color: XyPoint;
	maxGamutRed: number;
	maxGamutGreen: number;
	maxGamutBlue: number;
	gamut: Gamut;
	colorInRange: (xy: XyPoint) => boolean;
	colorToRange: (xy: XyPoint) => XyPoint;
}

export interface LightIsCapableOfGradient extends LightIsCapableOfColor {
	gradient: XyPoint[];
}

export interface LightEditOptions extends ArcheTypeResourceEditOptions {
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
	brightness?: number;
	mirek?: number;
	color?: XyPoint;
	gradient?: XyPoint[];
}

export class Light extends ArcheTypeResource<ResourceType.Light> {
	type = ResourceType.Light;

	get manager(): LightManager {
		return this.bridge.lights;
	}

	public isOn(): boolean {
		return this.data.on.on;
	}

	get brightness(): number | undefined {
		return this.data.dimming?.brightness;
	}

	get minBrightnessLevel(): number | undefined {
		return this.data.dimming?.min_dim_level;
	}

	get mirek(): number | undefined {
		return this.data.color_temperature?.mirek;
	}

	get minMirek(): number | undefined {
		return this.data.color_temperature?.mirek_schema?.mirek_minimum;
	}

	get maxMirek(): number | undefined {
		return this.data.color_temperature?.mirek_schema?.mirek_maximum;
	}

	get color(): XyPoint | undefined {
		return this.data.color
			? createXy(this.data.color.xy.x, this.data.color!.xy.y, this.data.dimming!.brightness)
			: undefined;
	}

	get maxGamutRed(): XyPoint | undefined {
		return this.data.color
			? this.data.color.gamut?.red ?? resolveGamutByType(this.data.color.gamut_type).red
			: undefined;
	}

	get maxGamutGreen(): XyPoint | undefined {
		return this.data.color
			? this.data.color.gamut?.green ?? resolveGamutByType(this.data.color.gamut_type).green
			: undefined;
	}

	get maxGamutBlue(): XyPoint | undefined {
		return this.data.color
			? this.data.color.gamut?.blue ?? resolveGamutByType(this.data.color.gamut_type).blue
			: undefined;
	}

	get gamut(): Gamut | undefined {
		return this.maxGamutRed && this.maxGamutGreen && this.maxGamutBlue
			? createGamut(this.maxGamutRed, this.maxGamutGreen, this.maxGamutBlue)
			: undefined;
	}

	get gradient(): XyPoint[] | undefined {
		return this.data.gradient?.points?.map((point) => point.color.xy);
	}

	get mode(): 'normal' | 'streaming' {
		return this.data.mode;
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

	public async setBrightness(brightness: LightEditOptions['brightness'], duration?: number): Promise<void> {
		await this.edit({ brightness, on: true, dynamics: { duration } });
	}

	public async setMirek(mirek: LightEditOptions['mirek'], duration?: number): Promise<void> {
		await this.edit({ mirek, on: true, dynamics: { duration } });
	}

	public colorInRange(color: XyPoint): boolean | undefined {
		return this.gamut ? checkXyInReach(color, this.gamut) : undefined;
	}

	public colorToRange(color: XyPoint): XyPoint | undefined {
		return this.gamut ? getClosestXy(color, this.gamut) : undefined;
	}

	public async setColor(color: LightEditOptions['color'], duration?: number): Promise<void> {
		await this.edit({ color, on: true, dynamics: { duration } });
	}

	public async setGradient(gradient: LightEditOptions['gradient'], duration?: number): Promise<void> {
		await this.edit({ gradient, on: true, dynamics: { duration } });
	}

	public async edit(options: LightEditOptions): Promise<void> {
		await this.manager._put(this.id, {
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

	public isCapableOfDimming(): this is this & LightIsCapableOfDimming {
		return typeof this.data.dimming != 'undefined';
	}

	public isCapableOfColorTemperature(): this is this & LightIsCapableOfColorTemperature {
		return typeof this.data.color_temperature != 'undefined';
	}

	public isCapableOfColor(): this is this & LightIsCapableOfColor {
		return typeof this.data.color != 'undefined';
	}

	public isCapableOfGradient(): this is this & LightIsCapableOfGradient {
		return typeof this.data.gradient != 'undefined';
	}
}
