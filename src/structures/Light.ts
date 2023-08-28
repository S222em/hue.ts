import { APIDeltaAction, APIResource, APIResourceIdentifier, APIResourceType } from '../types/api';
import { checkXyInReach, createXy, getClosestXy, XyPoint } from '../color/xy';
import { createGamut, Gamut, resolveGamutByType } from '../color/gamut';
import { Resource } from './Resource';

export interface LightIsCapableOfDimming {
	brightness: number;
	minBrightnessLevel: number;
}

export interface LightIsCapableOfColorTemperature extends LightIsCapableOfDimming {
	colorTemperature: number;
	minColorTemperature: number;
	maxColorTemperature: number;
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

export interface LightEditOptions {
	on?: boolean;
	dynamics?: {
		duration?: number;
		speed?: number;
	};
	effect?: APILightEffect;
	timedEffects?: {
		effect?: APILightTimedEffect;
		duration?: number;
	};
	brightness?: number;
	brightnessDelta?: {
		action: APIDeltaAction;
		brightness: number;
	};
	colorTemperature?: number;
	colorTemperatureDelta?: {
		action: APIDeltaAction;
		colorTemperature: number;
	};
	color?: XyPoint;
	gradient?: XyPoint[];
}

// TODO add effects and timed_effects (and other missing)

/**
 * Represents the light resource from the hue API
 */
export class Light extends Resource<APILight> {
	type = APIResourceType.Light;

	/**
	 * Whether this light is on
	 */
	public isOn(): boolean {
		return this.data.on.on;
	}

	/**
	 * The brightness of this light in percentages
	 */
	get brightness(): number | undefined {
		return this.data.dimming?.brightness;
	}

	/**
	 * The minimum brightness percentage this light can display
	 */
	get minBrightnessLevel(): number | undefined {
		return this.data.dimming?.min_dim_level;
	}

	/**
	 * The color temperature of this light
	 */
	get colorTemperature(): number | undefined {
		return this.data.color_temperature?.mirek;
	}

	/**
	 * The minimum color temperature this light can display
	 */
	get minColorTemperature(): number | undefined {
		return this.data.color_temperature?.mirek_schema?.mirek_minimum;
	}

	/**
	 * The maximum color temperature this light can display
	 */
	get maxColorTemperature(): number | undefined {
		return this.data.color_temperature?.mirek_schema?.mirek_maximum;
	}

	/**
	 * The color of this light
	 */
	get color(): XyPoint | undefined {
		return this.data.color
			? createXy(this.data.color.xy.x, this.data.color!.xy.y, this.data.dimming!.brightness)
			: undefined;
	}

	/**
	 * The maximum red color the light can display
	 * Defined by a point on the C.I.E.
	 */
	get maxGamutRed(): XyPoint | undefined {
		return this.data.color
			? this.data.color.gamut?.red ?? resolveGamutByType(this.data.color.gamut_type).red
			: undefined;
	}

	/**
	 * The maximum green color the light can display
	 * Defined by a point on the C.I.E.
	 */
	get maxGamutGreen(): XyPoint | undefined {
		return this.data.color
			? this.data.color.gamut?.green ?? resolveGamutByType(this.data.color.gamut_type).green
			: undefined;
	}

	/**
	 * The maximum blue color the light can display
	 * Defined by a point on the C.I.E.
	 */
	get maxGamutBlue(): XyPoint | undefined {
		return this.data.color
			? this.data.color.gamut?.blue ?? resolveGamutByType(this.data.color.gamut_type).blue
			: undefined;
	}

	/**
	 * Combined maximum color the light can display
	 * Defined by a triangle on the C.I.E.
	 */
	get gamut(): Gamut | undefined {
		return this.maxGamutRed && this.maxGamutGreen && this.maxGamutBlue
			? createGamut(this.maxGamutRed, this.maxGamutGreen, this.maxGamutBlue)
			: undefined;
	}

	/**
	 * The gradient of the light
	 */
	get gradient(): XyPoint[] | undefined {
		return this.data.gradient?.points?.map((point) => point.color.xy);
	}

	/**
	 * The mode of this light
	 */
	get mode(): APILightMode {
		return this.data.mode as APILightMode;
	}

	/**
	 * Turns this light on
	 * @param duration
	 */
	public async on(duration?: number): Promise<string> {
		return await this.edit({ on: true, dynamics: { duration } });
	}

	/**
	 * Turns this light off
	 * @param duration
	 */
	public async off(duration?: number): Promise<string> {
		return await this.edit({ on: false, dynamics: { duration } });
	}

	/**
	 * Toggles this light
	 * @param duration
	 */
	public async toggle(duration?: number): Promise<string> {
		return await this.edit({ on: !this.isOn(), dynamics: { duration } });
	}

	/**
	 * Sets the light to a dynamic effect
	 * @param effect
	 */
	public async setEffect(effect: LightEditOptions['effect']): Promise<string> {
		return await this.edit({ effect });
	}

	/**
	 * Sets the light to a dynamic effect that has a duration
	 * @param timedEffects
	 */
	public async setTimedEffect(timedEffects: LightEditOptions['timedEffects']): Promise<string> {
		return await this.edit({ timedEffects });
	}

	/**
	 * Sets the lights brightness
	 * @param brightness
	 * @param duration
	 */
	public async setBrightness(brightness: LightEditOptions['brightness'], duration?: number): Promise<string> {
		return await this.edit({ brightness, on: true, dynamics: { duration } });
	}

	/**
	 * Sets the lights brightness delta (up action increments, down action decrements)
	 * @param delta
	 * @param duration
	 */
	public async setBrightnessDelta(delta: LightEditOptions['brightnessDelta'], duration?: number): Promise<string> {
		return await this.edit({ brightnessDelta: delta, on: true, dynamics: { duration } });
	}

	/**
	 * Sets the lights color temperature
	 * @param colorTemperature
	 * @param duration
	 */
	public async setColorTemperature(
		colorTemperature: LightEditOptions['colorTemperature'],
		duration?: number,
	): Promise<string> {
		return await this.edit({ colorTemperature: colorTemperature, on: true, dynamics: { duration } });
	}

	/**
	 * Sets the lights color temperature delta (up action increments, down action decrements)
	 * @param delta
	 * @param duration
	 */
	public async setColorTemperatureDelta(
		delta: LightEditOptions['colorTemperatureDelta'],
		duration?: number,
	): Promise<string> {
		return await this.edit({ colorTemperatureDelta: delta, on: true, dynamics: { duration } });
	}

	/**
	 * Returns true if the given point on the C.I.E. is inside the triangle provided by {@link Light.gamut}
	 * @param color
	 */
	public colorInRange(color: XyPoint): boolean | undefined {
		return this.gamut ? checkXyInReach(color, this.gamut) : undefined;
	}

	/**
	 * Converts the given point on the C.I.E. to the closest point within range of the triangle provided by {@link Light.gamut}
	 * @param color
	 */
	public colorToRange(color: XyPoint): XyPoint | undefined {
		return this.gamut ? getClosestXy(color, this.gamut) : undefined;
	}

	/**
	 * Sets the color of this light
	 * @param color
	 * @param duration
	 */
	public async setColor(color: LightEditOptions['color'], duration?: number): Promise<string> {
		return await this.edit({ color, on: true, dynamics: { duration } });
	}

	/**
	 * Sets the gradient of this light
	 * @param gradient
	 * @param duration
	 */
	public async setGradient(gradient: LightEditOptions['gradient'], duration?: number): Promise<string> {
		return await this.edit({ gradient, on: true, dynamics: { duration } });
	}

	/**
	 * Edits this light
	 * @param options
	 */
	public async edit(options: LightEditOptions): Promise<string> {
		return await this.hue.lights.edit(this.id, options);
	}

	/**
	 * Whether this light supports dimming
	 */
	public supportsDimming(): this is this & LightIsCapableOfDimming {
		return typeof this.data.dimming != 'undefined';
	}

	/**
	 * Whether this light supports color temperatures
	 */
	public supportsColorTemperatures(): this is this & LightIsCapableOfColorTemperature {
		return typeof this.data.color_temperature != 'undefined';
	}

	/**
	 * Whether this light supports colors
	 */
	public supportsColors(): this is this & LightIsCapableOfColor {
		return typeof this.data.color != 'undefined';
	}

	/**
	 * Whether this light supports gradients
	 */
	public supportsGradient(): this is this & LightIsCapableOfGradient {
		return typeof this.data.gradient != 'undefined';
	}
}

export enum APILightEffect {
	Fire = 'fire',
	Candle = 'candle',
	NoEffect = 'no_effect',
}

export enum APILightTimedEffect {
	Sunrise = 'sunrise',
	NoEffect = 'no_effect',
}

export enum APILightMode {
	Normal = 'normal',
	Streaming = 'streaming',
}

export interface APILight extends APIResource<APIResourceType.Light> {
	owner: APIResourceIdentifier;
	on: {
		on: boolean;
	};
	dimming?: {
		brightness: number;
		min_dim_level?: number;
	};
	color_temperature?: {
		mirek: number;
		mirek_valid: boolean;
		mirek_schema: {
			mirek_minimum: number;
			mirek_maximum: number;
		};
	};
	color?: {
		xy: {
			x: number;
			y: number;
		};
		gamut?: {
			red: {
				x: number;
				y: number;
			};
			green: {
				x: number;
				y: number;
			};
			blue: {
				x: number;
				y: number;
			};
		};
		gamut_type: 'A' | 'B' | 'C';
	};
	dynamics?: {
		status: 'dynamic_palette' | 'none';
		status_values: any[];
		speed: number;
		speed_valid: boolean;
	};
	mode: APILightMode;
	gradient?: {
		points: Array<{
			color: {
				xy: {
					x: number;
					y: number;
				};
			};
		}>;
		points_capable: number;
	};
	effects?: {
		effect: APILightEffect;
		// TODO any[] not correct type
		status_value: any[];
		status: APILightEffect;
		// TODO any[] not correct type
		effect_values: any[];
	};
	timed_effects?: {
		effect: APILightTimedEffect;
		duration: number;
		// TODO any[] not correct type
		status_values: any[];
		status: APILightTimedEffect;
		// TODO any[] not correct type
		effect_values: any[];
	};
}
