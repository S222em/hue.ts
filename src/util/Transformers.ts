import { ifNotNull } from './ifNotNull';
import { createResourceIdentifier } from './resourceIdentifier';
import { ResourceType } from '../api/ResourceType';
import { XyPoint } from '../color/xy';
import { SceneAction, SceneRecallAction } from '../structures/Scene';
import { NamedResourceEditOptions } from '../structures/NamedResource';
import { ArcheTypeResourceEditOptions } from '../structures/ArcheTypeResource';

export function transformMetadata(options: NamedResourceEditOptions) {
	return ifNotNull(options.name, () =>
		Object({
			name: options.name,
		}),
	);
}

export function transformMetadataWithArcheType(options: ArcheTypeResourceEditOptions) {
	return ifNotNull(options.name ?? options.archeType, () =>
		Object({
			name: options.name,
			archetype: options.archeType,
		}),
	);
}

export function transformChildren(children?: string[]) {
	return ifNotNull(children, () => children!.map((child) => createResourceIdentifier(child, ResourceType.Light)));
}

export function transformOn(on?: boolean) {
	return ifNotNull(on, () => Object({ on }));
}

export function transformDynamics(dynamics?: { duration?: number; speed?: number }) {
	return ifNotNull(dynamics, () =>
		Object({
			duration: dynamics!.duration,
			speed: dynamics!.speed,
		}),
	);
}

export function transformEffects(effect?: 'fire' | 'candle' | 'no_effect') {
	return ifNotNull(effect, () =>
		Object({
			effect: effect,
		}),
	);
}

export function transformTimedEffects(timedEffects?: { effect?: 'sunrise' | 'no_effect'; duration?: number }) {
	return ifNotNull(timedEffects, () =>
		Object({
			effect: timedEffects!.effect,
			duration: timedEffects!.duration,
		}),
	);
}

export function transformDimming(brightness?: number) {
	return ifNotNull(brightness, () =>
		Object({
			brightness,
		}),
	);
}

export function transformColorTemperature(mirek?: number) {
	return ifNotNull(mirek, () =>
		Object({
			mirek,
		}),
	);
}

export function transformColor(color?: XyPoint) {
	return ifNotNull(color, () =>
		Object({
			xy: { x: color!.x, y: color!.y },
		}),
	);
}

export function transformGradient(gradient?: XyPoint[]) {
	return ifNotNull(gradient, () =>
		Object({
			points: gradient!.map((point) =>
				Object({
					color: transformColor(point),
				}),
			),
		}),
	);
}

export function transformRecall(recall?: { action?: string; duration?: number; brightness?: number }) {
	return ifNotNull(recall, () =>
		Object({
			action: recall!.action ?? SceneRecallAction.Active,
			duration: recall!.duration,
			dimming: { brightness: recall!.brightness },
		}),
	);
}

export function transformSceneActions(actions?: SceneAction[]) {
	return ifNotNull(actions, () =>
		actions!.map((action) =>
			Object({
				target: createResourceIdentifier(action.id, ResourceType.Light),
				action: {
					on: transformOn(action.on),
					dimming: transformDimming(action.brightness),
					color_temperature: transformColorTemperature(action.mirek),
					color: transformColor(action.color),
					gradient: transformGradient(action.gradient),
					effects: transformEffects(action.effects),
					dynamics: transformDynamics(action.dynamics),
				},
			}),
		),
	);
}

export function transformAction(action: { actionType: 'search' }) {
	return ifNotNull(action, () =>
		Object({
			action_type: action.actionType,
		}),
	);
}
