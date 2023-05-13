import { NamedResource } from './NamedResource';
import { ApiResourceType } from '../api/ApiResourceType';
import { XyPoint } from '../util/color/xy';
import { ResourceIdentifier } from '../api/ResourceIdentifier';
import { NarrowResource } from './Resource';

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
	recall?: {
		action?: 'active' | 'dynamic_palette';
		duration?: number;
		brightness?: number;
	};
}

// TODO palette and actions edit
export class Scene extends NamedResource<ApiResourceType.Scene> {
	type = ApiResourceType.Scene;

	get group(): NarrowResource {
		return this.bridge.resources.getByIdentifier(this.groupIdentifier);
	}

	get groupIdentifier(): ResourceIdentifier {
		return this.data.group;
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

	public actionFor(identifier: ResourceIdentifier<ApiResourceType.Light>): SceneAction | undefined {
		return this.actions.find((action) => action.target === identifier);
	}

	get speed(): number {
		return this.data.speed;
	}

	public async recall(options?: SceneEditOptions['recall']): Promise<void> {
		await this._put({ recall: { action: 'active', ...options } });
	}

	public async edit(options: SceneEditOptions): Promise<void> {
		await this._put({
			metadata: options.name ? { name: options.name } : undefined,
			recall: options.recall
				? {
						action: options.recall?.action ?? 'active',
						duration: options.recall?.duration,
						dimming: { brightness: options.recall?.brightness },
				  }
				: undefined,
		});
	}
}
