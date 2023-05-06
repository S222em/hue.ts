import { NamedResource } from './NamedResource';
import { ApiResourceType, ApiResourceTypePut } from '../api/ApiResourceType';
import { Resource } from './Resource';
import { XyPoint } from '../util/color/xy';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { Resolvable } from '../managers/ResourceManager';
import { LightCapabilities } from './Light';

export interface SceneAction {
	target: ResourceIdentifier;
	on?: boolean;
	brightness?: number;
	mirek?: number;
	xy?: XyPoint;
	xys?: XyPoint[];
	effects?: 'fire' | 'candle' | 'no_effect';
	dynamics?: { duration?: number };
}

export interface ScenePalette {
	color: Array<{
		xy: XyPoint;
		brightness: number;
	}>;
	brightness: number;
	temperature: {
		mirek: number;
		brightness: number;
	};
}

export interface SceneEditOptions {
	name?: string;
	actions?: Array<SceneAction>;
	palette?: ScenePalette;
	speed?: number;
}

export interface SceneRecallOptions {
	action: 'active' | 'dynamic_palette';
	duration?: number;
	brightness?: number;
}

export class Scene extends NamedResource<ApiResourceType.Scene> {
	type = ApiResourceType.Scene;

	public group(force: true): Resource<any>;
	public group(): Resource<any | undefined>;
	public group(force?: any): Resource<any> | undefined {
		return this.bridge.resources.resolve(this.data.group.rid, { type: this.data.group.rtype, force });
	}

	get actions(): SceneAction[] {
		return this.data.actions.map(({ target, action }) => {
			return {
				target: target,
				on: action.on?.on,
				brightness: action.dimming?.brightness,
				mirek: action.color_temperature?.mirek,
				xy: action.color?.xy,
				xys: action.gradient ? action.gradient.points.map((p) => p.color.xy) : undefined,
				effects: action.effects,
				dynamics: action.dynamics,
			};
		});
	}

	public actionFor(resolvable: Resolvable): SceneAction | undefined {
		const light = this.bridge.resources.resolve(resolvable, {
			type: ApiResourceType.Light,
		});

		if (!light) return;

		return this.actions.find((action) => action.target === light.identifier);
	}

	get palette(): ScenePalette | undefined {
		const pal = this.data.palette;

		if (!pal) return;

		return {
			color: pal.color.map((c) => {
				return {
					xy: c.color.xy,
					brightness: c.dimming.brightness,
				};
			}),
			brightness: pal.dimming.brightness,
			temperature: {
				mirek: pal.color_temperature.color_temperature.mirek,
				brightness: pal.color_temperature.dimming.brightness,
			},
		};
	}

	get speed(): number {
		return this.data.speed;
	}

	public async recall(options?: SceneRecallOptions): Promise<void> {
		return await this._put({
			recall: {
				action: options?.action ?? 'active',
				duration: options?.duration,
				dimming: { brightness: options?.brightness },
			},
		});
	}

	public async edit(options: SceneEditOptions): Promise<void> {
		const actions: ApiResourceTypePut<ApiResourceType.Scene>['actions'] = options.actions
			? options.actions.map((action) => {
					if (action.xy || action.xys) {
						const light = this.bridge.resources.resolve(action.target.rid, {
							type: ApiResourceType.Light,
							light: { capableOf: LightCapabilities.Xy },
							force: true,
						});

						if (action.xy && !light.xyInRange(action.xy)) {
							action.xy = light.xyToRange(action.xy);
						}

						if (action.xys && light.isCapableOfXys()) {
							action.xys = action.xys.map((xy) => {
								if (!light.xyInRange(xy)) return light.xyToRange(xy);
								return xy;
							});
						}
					}

					return {
						target: action.target,
						action: {
							on: { on: action.on },
							dimming: { brightness: action.brightness },
							color_temperature: { mirek: action.mirek },
							color: action.xy ? { xy: action.xy } : undefined,
							gradient: action.xys
								? {
										points: action.xys.map((xy) => {
											return {
												color: { xy: { x: xy.x, y: xy.y } },
											};
										}),
								  }
								: undefined,
							effects: action.effects,
							dynamics: action.dynamics?.duration ? { duration: action.dynamics.duration } : undefined,
						},
					};
			  })
			: undefined;

		return await this._put({
			metadata: options.name ? { name: options.name } : undefined,
			actions: actions,
		});
	}
}
