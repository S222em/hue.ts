import { XyPoint } from '../color/XyPoint';
import type { Light } from './Light';

const GamutA = {
	red: new XyPoint({
		x: 0.704,
		y: 0.296,
	}),
	blue: new XyPoint({
		x: 0.2151,
		y: 0.7106,
	}),
	green: new XyPoint({
		x: 0.138,
		y: 0.08,
	}),
};

const GamutB = {
	red: new XyPoint({
		x: 0.675,
		y: 0.322,
	}),
	blue: new XyPoint({
		x: 0.4091,
		y: 0.518,
	}),
	green: new XyPoint({
		x: 0.167,
		y: 0.04,
	}),
};

const GamutC = {
	red: new XyPoint({
		x: 0.692,
		y: 0.308,
	}),
	blue: new XyPoint({
		x: 0.17,
		y: 0.7,
	}),
	green: new XyPoint({
		x: 0.153,
		y: 0.048,
	}),
};

function resolveGamut(gamutType: 'A' | 'B' | 'C') {
	return gamutType === 'A' ? GamutA : gamutType === 'B' ? GamutB : GamutC;
}

/**
 * Represents the capabilities of a light
 */
export class LightCapabilities {
	/**
	 * The connected light
	 * @private
	 */
	private readonly light: Light;

	constructor(light: Light) {
		this.light = light;
	}

	/**
	 * The maximum gradient points of the light
	 */
	get maxGradientPoints(): number | null {
		return this.light.isCapableOfGradient() ? this.light.data.gradient?.points_capable : null;
	}

	/**
	 * The maximum red color of the light
	 */
	get red(): XyPoint | null {
		return this.light.isCapableOfColor()
			? this.light.data.color?.gamut
				? this.light.data.color.gamut.red
				: resolveGamut(this.light.data.color?.gamut_type).red
			: null;
	}

	/**
	 * The maximum green color of the light
	 */
	get green(): XyPoint | null {
		return this.light.isCapableOfColor()
			? this.light.data.color?.gamut
				? this.light.data.color.gamut.green
				: resolveGamut(this.light.data.color?.gamut_type).green
			: null;
	}

	/**
	 * The maximum blue color of the light
	 */
	get blue(): XyPoint | null {
		return this.light.isCapableOfColor()
			? this.light.data.color?.gamut
				? this.light.data.color.gamut.blue
				: resolveGamut(this.light.data.color?.gamut_type).blue
			: null;
	}

	/**
	 * The maximum temperature color of the light
	 */
	get maxTemperature(): number | undefined {
		return this.light.isCapableOfTemperature() ? this.light.data.color_temperature?.mirek_schema?.mirek_maximum : null;
	}

	/**
	 * The minimum temperature color of the light
	 */
	get minTemperature(): number | undefined {
		return this.light.isCapableOfTemperature() ? this.light.data.color_temperature?.mirek_schema?.mirek_minimum : null;
	}

	/**
	 * The minimum brightness of the light
	 */
	get minBrightnessLevel(): number | undefined {
		return this.light.isCapableOfDimming() ? this.light.data.dimming?.min_dim_level : null;
	}
}
