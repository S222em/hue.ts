import { APINamedResource, NamedResource } from './NamedResource';
import { APIResourceIdentifier, APIResourceType } from '../types/api';
import { XyPoint } from '../color/xy';
import { APILightEffect } from './Light';

export interface SceneAction {
	id: string;
	on?: boolean;
	brightness?: number;
	colorTemperature?: number;
	color?: XyPoint;
	gradient?: XyPoint[];
	effects?: APILightEffect;
	dynamics?: { duration: number };
}

export interface ScenePalette {
	color: Array<{
		color: XyPoint;
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
	// palette?: ScenePalette;
	speed?: number;
	recall?: {
		action?: 'active' | 'dynamic_palette';
		duration?: number;
		brightness?: number;
	};
}

export type SceneCreateOptions = Pick<Required<SceneEditOptions>, 'name' | 'actions'>;

// TODO scene palette

/**
 * Represents the scene resource from the hue API
 */
export class Scene extends NamedResource<APIScene> {
	type = APIResourceType.Scene;

	/**
	 * ID of this scene's group (room or zone)
	 */
	get groupId(): string {
		return this.data.group.rid;
	}

	/**
	 * Actions in this scene
	 */
	get actions(): SceneAction[] {
		return this.data.actions.map(({ target, action }) => {
			return {
				id: target.rid,
				on: action.on?.on,
				brightness: action.dimming?.brightness,
				colorTemperature: action.color_temperature?.mirek,
				color: action.color?.xy,
				gradient: action.gradient ? action.gradient.points.map((p) => p.color.xy) : undefined,
				effects: action.effects as APILightEffect,
				dynamics: action.dynamics,
			};
		});
	}

	/**
	 * Retrieves the action for a specific light
	 * @param id
	 */
	public actionFor(id: string): SceneAction | undefined {
		return this.actions.find((action) => action.id == id);
	}

	/**
	 * The speed of this scene, only if a dynamic scene is active
	 */
	get speed(): number {
		return this.data.speed;
	}

	/**
	 * Recalls the scene
	 * @param options
	 */
	public async recall(options?: SceneEditOptions['recall']): Promise<string> {
		return await this.edit({ recall: options });
	}

	/**
	 * Creates a new action for specified light's ID
	 * @param id
	 * @param options
	 */
	public async createActionFor(id: string, options: Omit<SceneAction, 'id'>): Promise<string> {
		const newAction = { ...options, id };

		return await this.setActions([...this.actions, newAction]);
	}

	/**
	 * Edits an action for specified light's ID
	 * @param id
	 * @param options
	 */
	public async editActionFor(id: string, options: Omit<SceneAction, 'id'>): Promise<string> {
		const action = this.actionFor(id)!;
		const newAction = { ...action, ...options };

		return await this.setActions([...this.actions.filter((action) => action.id != id), newAction]);
	}

	/**
	 * Sets the actions of this scene
	 * @param actions
	 */
	public async setActions(actions: SceneAction[]): Promise<string> {
		return await this.edit({ actions });
	}

	/**
	 * Edits this scene
	 * @param options
	 */
	public async edit(options: SceneEditOptions): Promise<string> {
		return await this.hue.scenes.edit(this.id, options);
	}

	/**
	 * Deletes this scene
	 */
	public async delete(): Promise<string> {
		return await this.hue.scenes.delete(this.id);
	}
}

export enum APISceneRecallAction {
	Active = 'active',
	DynamicPalette = 'dynamic_palette',
}

export interface APIScene extends APINamedResource<APIResourceType.Scene> {
	metadata: {
		name: string;
		image?: APIResourceIdentifier;
	};
	group: APIResourceIdentifier;
	actions: Array<{
		target: APIResourceIdentifier;
		action: {
			on?: { on: boolean };
			dimming?: { brightness: number };
			color?: { xy: { x: number; y: number } };
			color_temperature?: { mirek: number };
			gradient?: {
				points: Array<{
					color: { xy: { x: number; y: number } };
				}>;
			};
			effects?: 'fire' | 'candle' | 'no_effect';
			dynamics?: {
				duration: number;
			};
		};
	}>;
	palette?: {
		color: Array<{
			color: { xy: { x: number; y: number } };
			dimming: { brightness: number };
		}>;
		dimming: { brightness: number };
		color_temperature: { color_temperature: { mirek: number }; dimming: { brightness: number } };
	};
	speed: number;
}
