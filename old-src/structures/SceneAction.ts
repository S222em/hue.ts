import { Light, LightResolvable } from './Light';
import type { GradientLight } from './GradientLight';
import type { Scene } from './Scene';
import { ApiSceneAction } from '../types/api/scene_action';
import { Bridge } from '../bridge/Bridge';
import { ApiResourceType } from '../types/api/common';
import { Data } from './Data';

/**
 * Represents a Scene action
 */
export class SceneAction extends Data<ApiSceneAction> {
	/**
	 * The connected Scene
	 */
	public readonly scene: Scene;

	constructor(scene: Scene, data: ApiSceneAction) {
		super(scene.bridge, data);
		this.scene = scene;
	}

	/**
	 * The connected Light
	 */
	get light(): Light {
		return this.bridge.resources.resolve(this.lightId, ApiResourceType.Light);
	}

	/**
	 * The connected Light ID
	 */
	get lightId(): string {
		return this.data.target?.rid;
	}

	/**
	 * Whether the connected light should be on
	 */
	get on(): boolean {
		return this.data.action?.on?.on;
	}

	/**
	 * The brightness for the connected light
	 */
	get brightness(): number {
		return this.light.isCapableOfDimming() ? this.data.action?.dimming.brightness : null;
	}

	/**
	 * The temperature for the connected light
	 */
	get temperature(): number {
		return this.light.isCapableOfTemperature() ? this.data.action?.color_temperature?.mirek : null;
	}

	/**
	 * The color for the connected light
	 */
	get color(): string {
		return this.light.isCapableOfColor()
			? this.light.colorResolver.rgbToHex(
					this.light.colorResolver.xyPointToRgb({
						x: this.data.action?.color?.xy?.x,
						y: this.data.action?.color?.xy?.y,
						brightnessInPercentage: this.data.action?.dimming?.brightness,
					}),
			  )
			: null;
	}

	/**
	 * The gradient for the connected light
	 */
	get gradient(): string[] {
		return this.light.isCapableOfGradient()
			? this.data.action?.gradient?.points?.map((point) => {
					const light = this.light as GradientLight;
					return light.colorResolver.rgbToHex(
						light.colorResolver.xyPointToRgb({
							x: point.color?.xy?.x,
							y: point.color?.xy?.y,
							brightnessInPercentage: this.data.action?.dimming?.brightness,
						}),
					);
			  })
			: null;
	}

	/**
	 * Edits this action e.g. new color
	 * @param options
	 */
	public async edit(options: Omit<SceneActionOptions, 'light'>) {
		await this.scene.edit({
			actions: [
				{
					...options,
					light: this.light,
				},
				...this.scene.actions.cache.filter((action) => action.lightId !== this.lightId).values(),
			],
		});
	}

	public static transform(bridge: Bridge, options: SceneActionOptions): ApiSceneAction {
		const light = bridge.resources.resolve(options.light, ApiResourceType.Light) as GradientLight;
		return {
			target: {
				rid: light.id,
				rtype: ApiResourceType.Light,
			},
			action: {
				on: { on: options.on ?? true },
				dimming: {
					brightness: options.brightness,
				},
				color_temperature: {
					mirek: options.temperature,
				},
				color: options.color
					? { xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(options.color)) }
					: undefined,
				gradient: options.gradient
					? {
							points: options.gradient.map((gradient) => {
								return {
									color: {
										xy: light.colorResolver.rgbToXyPoint(light.colorResolver.hexToRgb(gradient)),
									},
								};
							}),
					  }
					: undefined,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore This will be fixed in a future API types refactor
				dynamics: { duration: transitionOptions?.duration },
			},
		};
	}
}

export type SceneActionResolvable = SceneAction | string;

export interface SceneActionOptions {
	light: LightResolvable;
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

export namespace SceneAction {
	export type Resolvable = SceneActionResolvable;
	export type Options = SceneActionOptions;
}
