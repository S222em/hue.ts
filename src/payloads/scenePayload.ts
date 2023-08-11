import { SceneAction, SceneCreateOptions, SceneEditOptions } from '../structures/Scene';
import { RESTScenePostPayload, RESTScenePutPayload } from '../api/Scene';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { APIResourceType } from '../api/ResourceType';
import { APIResourceIdentifier } from '../api/ResourceIdentifier';

export function createScenePutPayload(options: SceneEditOptions): RESTScenePutPayload {
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
		actions: options.actions ? createSceneActionsPutPayload(options.actions) : undefined,
	};
}

export function createScenePostPayload(
	groupIdentifier: APIResourceIdentifier,
	options: SceneCreateOptions,
): RESTScenePostPayload {
	return {
		metadata: { name: options.name },
		group: groupIdentifier,
		actions: createSceneActionsPostPayload(options.actions),
	};
}

export function createSceneActionsPutPayload(actions: SceneEditOptions['actions']): RESTScenePutPayload['actions'] {
	return actions!.map((action) => {
		return {
			target: createResourceIdentifier(action.id, APIResourceType.Light),
			action: {
				on: action.on ? { on: action.on } : undefined,
				dimming: { brightness: action.brightness ?? action.color?.z },
				color: action.color ? { xy: { x: action.color.x, y: action.color.y } } : undefined,
				color_temperature: action.colorTemperature ? { mirek: action.colorTemperature } : undefined,
				gradient: action.gradient ? createSceneActionGradientPayload(action.gradient) : undefined,
				effects: action.effects,
				dynamics: action.dynamics ? { duration: action.dynamics.duration } : undefined,
			},
		};
	});
}

export function createSceneActionsPostPayload(actions: SceneCreateOptions['actions']): RESTScenePostPayload['actions'] {
	return actions.map((action) => {
		const brightness = action.brightness ?? action.color?.z;

		return {
			target: createResourceIdentifier(action.id, APIResourceType.Light),
			action: {
				on: action.on ? { on: action.on } : undefined,
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

export function createSceneActionGradientPayload(gradient: SceneAction['gradient']) {
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
