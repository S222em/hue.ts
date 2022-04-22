export class Util {
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

	public static dateToString(date: Date = new Date()): string {
		return `${Util.pad(date.getHours())}:${Util.pad(date.getMinutes())}:${Util.pad(date.getSeconds())}`;
	}

	public static pad(number: number) {
		return (number < 10 ? '0' : '') + String(number);
	}
}
