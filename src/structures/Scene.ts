import { NamedResource } from './NamedResource';
import { ResourceType } from '../api/ResourceType';
import { XyPoint } from '../color/xy';
import { SceneManager } from '../managers/SceneManager';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { ifNotNull } from '../util/ifNotNull';

export interface SceneAction {
	id: string;
	on?: boolean;
	brightness?: number;
	mirek?: number;
	color?: XyPoint;
	gradient?: XyPoint[];
	effects?: 'fire' | 'candle' | 'no_effect';
	dynamics?: { duration?: number };
}

export interface ScenePalette {
	color: Array<{
		gradient: XyPoint;
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

export type SceneCreateOptions = Pick<Required<SceneEditOptions>, 'name' | 'actions'>;

export class Scene extends NamedResource<ResourceType.Scene> {
	type = ResourceType.Scene;

	get manager(): SceneManager {
		return this.bridge.scenes;
	}

	get groupId(): string {
		return this.data.group.rid;
	}

	get actions(): SceneAction[] {
		return this.data.actions.map(({ target, action }) => {
			return {
				id: target.rid,
				on: action.on?.on,
				brightness: action.dimming?.brightness,
				mirek: action.color_temperature?.mirek,
				color: action.color?.xy,
				gradient: action.gradient ? action.gradient.points.map((p) => p.color.xy) : undefined,
				effects: action.effects,
				dynamics: action.dynamics,
			};
		});
	}

	get speed(): number {
		return this.data.speed;
	}

	public actionFor(id: string): SceneAction | undefined {
		return this.actions.find((action) => action.id == id);
	}

	public async recall(options?: SceneEditOptions['recall']): Promise<void> {
		await this.edit({ recall: { ...options } });
	}

	public async createActionFor(id: string, options: Omit<SceneAction, 'id'>): Promise<void> {
		const newAction = { ...options, id };

		await this.setActions([...this.actions, newAction]);
	}

	public async editActionFor(id: string, options: Omit<SceneAction, 'id'>): Promise<void> {
		const action = this.actionFor(id);
		if (!action) return;

		const newAction = { ...action, ...options };

		await this.setActions([...this.actions.filter((action) => action.id != id), newAction]);
	}

	public async setActions(actions: SceneAction[]): Promise<void> {
		await this.edit({ actions });
	}

	public async edit(options: SceneEditOptions): Promise<void> {
		await this.manager._put(this.id, {
			metadata: ifNotNull(options.name, () => Object({ name: options.name! })),
			recall: ifNotNull(options.recall, () =>
				Object({
					action: options.recall!.action ?? 'active',
					duration: options.recall!.duration,
					dimming: { brightness: options.recall!.brightness },
				}),
			),
			actions: ifNotNull(options.actions, () =>
				options.actions!.map((action) =>
					Object({
						target: createResourceIdentifier(action.id, ResourceType.Light),
						action: {
							on: ifNotNull(action.on, () => Object({ on: action.on })),
							dimming: ifNotNull(action.brightness, () => Object({ brightness: action.brightness })),
							color_temperature: ifNotNull(action.mirek, () =>
								Object({
									mirek: action.mirek,
								}),
							),
							color: ifNotNull(action.color, () => Object({ xy: { x: action.color!.x, y: action.color!.y } })),
							gradient: ifNotNull(action.gradient, () =>
								Object({
									points: action.gradient!.map((xy) => {
										return {
											color: { xy },
										};
									}),
								}),
							),
							effects: action.effects,
							dynamics: ifNotNull(action.dynamics?.duration, () =>
								Object({
									duration: action.dynamics!.duration!,
								}),
							),
						},
					}),
				),
			),
		});
	}

	public async delete(): Promise<void> {
		await this.manager._delete(this.id);
	}
}
