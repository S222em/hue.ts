import { Base } from './Base';
import type { Light } from './Light';
import type { GradientLight } from './GradientLight';
import type { ApiSceneAction } from '../types/api';
import type { Scene } from './Scene';
import { SceneActionOptions } from '../transformers/SceneActionTransformer';

export class SceneAction extends Base<ApiSceneAction> {
	public readonly scene: Scene;

	constructor(scene: Scene) {
		super(scene.bridge);
		this.scene = scene;
	}

	get on(): boolean {
		return this.data.action?.on?.on;
	}

	get brightness(): number {
		return this.light.isDimmable() ? this.data.action?.dimming.brightness : null;
	}

	get temperature(): number {
		return this.light.isTemperature() ? this.data.action?.color_temperature?.mirek : null;
	}

	get color(): string {
		return this.light.isColor()
			? this.light.colorResolver.rgbToHex(
					this.light.colorResolver.xyPointToRgb({
						x: this.data.action?.color?.xy?.x,
						y: this.data.action?.color?.xy?.y,
						bri: this.data.action?.dimming?.brightness,
					}),
			  )
			: null;
	}

	get gradient(): string[] {
		return this.light.isGradient()
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

	get light(): Light {
		return this.bridge.lights.cache.get(this.lightId);
	}

	get lightId(): string {
		return this.data.target?.rid;
	}

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
}
