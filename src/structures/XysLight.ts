import { XyLight, XyLightStateOptions } from './XyLight';
import { LightCapabilities } from './Light';
import { XyPoint } from '../util/color/xy';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';

export interface XysLightStateOptions extends XyLightStateOptions {
	xys?: XyPoint[];
}

export class XysLight extends XyLight {
	public capabilities = LightCapabilities.Xys;

	get xys(): XyPoint[] {
		return this.data.gradient!.points.map((point) => point.color.xy);
	}

	public async setXys(xys: XyPoint[], duration: number): Promise<void> {
		return await this.state({ xys, dynamics: { duration } });
	}

	public async state(
		options: XysLightStateOptions,
		_inject?: ApiResourceTypePut<ApiResourceType.Light>,
	): Promise<void> {
		if (options.xys)
			options.xys = options.xys.map((xy) => {
				if (!this.xyInRange(xy)) return this.xyToRange(xy);
				return xy;
			});

		return await super.state(options, {
			gradient: options.xys
				? {
						points: options.xys.map((xy) => {
							return {
								color: { xy },
							};
						}),
				  }
				: undefined,
			..._inject,
		});
	}
}
