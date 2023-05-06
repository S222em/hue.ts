import { Gamut } from '../color/Gamut';
import { XyPoint } from '../color/XyPoint';
import type { Light } from './Light';

const GamutA = new Gamut({
	red: new XyPoint(0.704, 0.296),
	blue: new XyPoint(0.2151, 0.7106),
	green: new XyPoint(0.138, 0.08),
});

const GamutB = new Gamut({
	red: new XyPoint(0.675, 0.322),
	blue: new XyPoint(0.4091, 0.518),
	green: new XyPoint(0.167, 0.04),
});

const GamutC = new Gamut({
	red: new XyPoint(0.692, 0.308),
	blue: new XyPoint(0.17, 0.7),
	green: new XyPoint(0.153, 0.048),
});

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
