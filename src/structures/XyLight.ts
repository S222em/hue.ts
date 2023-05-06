import { MirekLight, MirekLightStateOptions } from './MirekLight';
import { LightCapabilities } from './Light';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';
import { createGamut, Gamut, resolveGamutByType } from '../util/color/gamut';
import { checkXyInReach, createXy, getClosestXy, XyPoint } from '../util/color/xy';

export interface XyLightStateOptions extends MirekLightStateOptions {
	xy?: XyPoint;
}

export class XyLight extends MirekLight {
	public capabilities = LightCapabilities.Xy;

	get xy(): XyPoint {
		return createXy(this.data.color!.xy.x, this.data.color!.xy.y, this.data.dimming!.brightness);
	}

	get maxGamutRed(): XyPoint {
		return this.data.color!.gamut?.red ?? resolveGamutByType(this.data.color!.gamut_type).red;
	}

	get maxGamutGreen(): XyPoint {
		return this.data.color!.gamut?.green ?? resolveGamutByType(this.data.color!.gamut_type).green;
	}

	get maxGamutBlue(): XyPoint {
		return this.data.color!.gamut?.blue ?? resolveGamutByType(this.data.color!.gamut_type).blue;
	}

	get gamut(): Gamut {
		return createGamut(this.maxGamutRed, this.maxGamutGreen, this.maxGamutBlue);
	}

	public xyInRange(xy: XyPoint): boolean {
		return checkXyInReach(xy, this.gamut);
	}

	public xyToRange(xy: XyPoint): XyPoint {
		return getClosestXy(xy, this.gamut);
	}

	public async setXy(xy: XyLightStateOptions['xy'], duration?: number): Promise<void> {
		return await this.state({ xy, dynamics: { duration } });
	}

	public async state(options: XyLightStateOptions, _inject?: ApiResourceTypePut<ApiResourceType.Light>): Promise<void> {
		if (options.xy && !this.xyInRange(options.xy)) {
			options.xy = this.xyToRange(options.xy);
		}

		return await super.state(
			{ brightness: options.xy?.z, ...options },
			{
				color: { xy: options.xy ? { x: options.xy.x, y: options.xy.y } : undefined },
				..._inject,
			},
		);
	}
}
