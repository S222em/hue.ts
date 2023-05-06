export function merge<T extends Record<string, any>>(target: Record<string, any>, source: Record<string, any>): T {
	const isObject = (obj: any) => obj && typeof obj === 'object';

	for (const key of Object.keys(source)) {
		const targetValue = target[key];
		const sourceValue = source[key];

		if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
			target[key] = targetValue.concat(sourceValue);
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = merge(Object.assign({}, targetValue), sourceValue);
		} else {
			target[key] = sourceValue;
		}
	}

	return target as T;
}
