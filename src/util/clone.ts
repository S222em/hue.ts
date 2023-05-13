export function clone<T extends Record<string, any>>(object: T): T {
	return Object.assign(Object.create(object), object);
}
