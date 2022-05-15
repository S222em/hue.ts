import { Base } from './Base';
import { Light, LightResolvable } from './Light';
import type { GradientLight } from './GradientLight';
import type { Scene } from './Scene';
import { ApiSceneAction } from '../types/api/scene_action';
import { Bridge } from '../bridge/Bridge';
import { ApiResourceType } from '../types/api/common';

export interface SceneActionOptions {
	light: LightResolvable;
	on?: boolean;
	brightness?: number;
	temperature?: number;
	color?: string;
	gradient?: string[];
}

/**
 * Represents a Scene action
 */
export class SceneAction extends Base<ApiSceneAction> {
	/**
	 * The connected Scene
	 */
	public readonly scene: Scene;

	constructor(scene: Scene) {
		super(scene.bridge);
		this.scene = scene;
	}

	/**
	 * The connected Light
	 */
	get light(): Light {
		return this.bridge.lights.cache.get(this.lightId);
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
						bri: this.data.action?.dimming?.brightness,
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
							bri: this.data.action?.dimming?.brightness,
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
		const light = bridge.lights.resolve(options.light);
		return {
			target: {
				rid: light.id,
				rtype: ApiResourceType.Light,
			},
			action: Light.transformState(bridge, light, options),
		};
	}
}
