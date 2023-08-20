import { SceneAction, SceneCreateOptions, SceneEditOptions } from '../structures/Scene';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { APIResourceIdentifier, APIResourceType } from '../types/api';
import { RESTPayload } from '../types/rest';

export function createScenePutPayload(options: SceneEditOptions): RESTPayload {
	return {
		metadata: options.name ? { name: options.name } : undefined,
		speed: options.speed,
		recall: options.recall
			? {
					action: options.recall.action,
					dimming: { brightness: options.recall.brightness },
					duration: options.recall.duration,
			  }
			: undefined,
		actions: options.actions ? createSceneActionsPayload(options.actions) : undefined,
	};
}

export function createScenePostPayload(
	groupIdentifier: APIResourceIdentifier,
	options: SceneCreateOptions,
): RESTPayload {
	return {
		metadata: { name: options.name },
		group: groupIdentifier,
		actions: createSceneActionsPayload(options.actions),
	};
}

export function createSceneActionsPayload(actions: SceneAction[]): RESTPayload[] {
	return actions.map((action) => {
		const brightness = action.brightness ?? action.color?.z;

		return {
			target: createResourceIdentifier(action.id, APIResourceType.Light),
			action: {
				on: action.on != undefined ? { on: action.on } : undefined,
				dimming: brightness ? { brightness } : undefined,
				color: action.color ? { xy: { x: action.color.x, y: action.color.y } } : undefined,
				color_temperature: action.colorTemperature ? { mirek: action.colorTemperature } : undefined,
				gradient: action.gradient ? createSceneActionGradientPayload(action.gradient) : undefined,
				effects: action.effects,
				dynamics: action.dynamics ? { duration: action.dynamics.duration } : undefined,
			},
		};
	});
}

export function createSceneActionGradientPayload(gradient: SceneAction['gradient']): RESTPayload {
	return {
		points: gradient!.map((point) => {
			return {
				color: {
					xy: { x: point.x, y: point.y },
				},
			};
		}),
	};
}
