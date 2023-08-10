export function makeRoute(route: string, id?: string): string {
	return id ? `${route}/${id}` : route;
}
