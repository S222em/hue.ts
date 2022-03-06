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
 * Represents the capabilities of a Light
 */
export class LightCapabilities {
	public readonly light: Light;

	constructor(light: Light) {
		this.light = light;
	}

	get maxGradientPoints(): number {
		return this.light.isGradient() ? this.light.data.gradient?.points_capable : null;
	}

	get red(): XyPoint {
		return this.light.isColor()
			? this.light.data.color?.gamut
				? this.light.data.color.gamut.red
				: resolveGamut(this.light.data.color?.gamut_type).red
			: null;
	}

	get green(): XyPoint {
		return this.light.isColor()
			? this.light.data.color?.gamut
				? this.light.data.color.gamut.green
				: resolveGamut(this.light.data.color?.gamut_type).green
			: null;
	}

	get blue(): XyPoint {
		return this.light.isColor()
			? this.light.data.color?.gamut
				? this.light.data.color.gamut.blue
				: resolveGamut(this.light.data.color?.gamut_type).blue
			: null;
	}

	get maxTemperature(): number {
		return this.light.isTemperature() ? this.light.data.color_temperature?.mirek_schema?.mirek_maximum : null;
	}

	get minTemperature(): number {
		return this.light.isTemperature() ? this.light.data.color_temperature?.mirek_schema?.mirek_minimum : null;
	}

	get minBrightnessLevel(): number {
		return this.light.isDimmable() ? this.light.data.dimming?.min_dim_level : null;
	}
}
