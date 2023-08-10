import { NamedResource } from './NamedResource';
import { APIResourceType } from '../api/ResourceType';
import { XyPoint } from '../color/xy';
import { SceneManager } from '../managers/SceneManager';
import { LightEffect } from './Light';

export interface SceneAction {
	id: string;
	on?: boolean;
	brightness?: number;
	colorTemperature?: number;
	color?: XyPoint;
	gradient?: XyPoint[];
	effects?: LightEffect;
	dynamics?: { duration?: number };
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

export enum SceneRecallAction {
	Active = 'active',
	DynamicPalette = 'dynamic_palette',
}

// TODO scene palette

export class Scene extends NamedResource<APIResourceType.Scene> {
	type = APIResourceType.Scene;

	get manager(): SceneManager {
		return this.hue.scenes;
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
				colorTemperature: action.color_temperature?.mirek,
				color: action.color?.xy,
				gradient: action.gradient ? action.gradient.points.map((p) => p.color.xy) : undefined,
				effects: action.effects as LightEffect,
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

	public async recall(options?: SceneEditOptions['recall']): Promise<string> {
		return await this.edit({ recall: { ...options } });
	}

	public async createActionFor(id: string, options: Omit<SceneAction, 'id'>): Promise<string> {
		const newAction = { ...options, id };

		return await this.setActions([...this.actions, newAction]);
	}

	public async editActionFor(id: string, options: Omit<SceneAction, 'id'>): Promise<string> {
		const action = this.actionFor(id)!;
		const newAction = { ...action, ...options };

		return await this.setActions([...this.actions.filter((action) => action.id != id), newAction]);
	}

	public async setActions(actions: SceneAction[]): Promise<string> {
		return await this.edit({ actions });
	}

	public async edit(options: SceneEditOptions): Promise<string> {
		return await this.manager.edit(this.id, options);
	}

	public async delete(): Promise<string> {
		return await this.manager.delete(this.id);
	}
}
