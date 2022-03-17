import type { DeepPartial } from '../types/common';
import type { ApiScene, ApiSceneAction } from '../types/api';
import type { LightStateOptions } from '../structures/Light';
import type { GroupedLightStateOptions } from '../structures/GroupedLight';
import { SceneActionOptions } from '../structures/SceneAction';
import { Bridge } from '../bridge/Bridge';
import { SceneOptions } from '../structures/Scene';

export class Util {
	public static parseSceneActionOptions(options: SceneActionOptions, bridge: Bridge): DeepPartial<ApiSceneAction> {
		const light = bridge.lights.resolve(options.light);

		const action = Util.parseLightStateOptions(options, light);

		return {
			target: {
				rid: light.id,
				rtype: 'light',
			},
			action,
		};
	}

	public static parseSceneOptions(options: SceneOptions, bridge: Bridge): DeepPartial<ApiScene> {
		const parsed = {} as DeepPartial<ApiScene>;

		if ('name' in options) parsed.metadata = { name: options.name };
		if ('actions' in options)
			parsed.actions = options.actions.map((action) => Util.parseSceneActionOptions(action, bridge));

		return parsed;
	}

	public static mergeDeep(target, source) {
		const isObject = (obj) => obj && typeof obj === 'object';

		if (!isObject(target) || !isObject(source)) {
			return source;
		}

		Object.keys(source).forEach((key) => {
			const targetValue = target[key];
			const sourceValue = source[key];

			if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
				target[key] = targetValue.concat(sourceValue);
			} else if (isObject(targetValue) && isObject(sourceValue)) {
				target[key] = Util.mergeDeep(Object.assign({}, targetValue), sourceValue);
			} else {
				target[key] = sourceValue;
			}
		});

		return target;
	}

	public static clone<O extends object>(object: O): O {
		return Object.assign(Object.create(object), object);
	}
}
