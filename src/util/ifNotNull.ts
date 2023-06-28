export function ifNotNull<T>(predicate: any, func: () => T): T | undefined {
	if (predicate != null) return func();
}
