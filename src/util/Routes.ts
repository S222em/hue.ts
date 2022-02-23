export class Routes {
	public static base(ip: string) {
		return `https://${ip}:443/clip/v2`;
	}

	public static light(id?: string) {
		return `/resource/light${id ? `/${id}` : ''}`;
	}

	public static groupedLight(id?: string) {
		return `/resource/grouped_light${id ? `/${id}` : ''}`;
	}

	public static room(id?: string) {
		return `/resource/room${id ? `/${id}` : ''}`;
	}

	public static zone(id?: string) {
		return `/resource/zone${id ? `/${id}` : ''}`;
	}

	public static scene(id?: string) {
		return `/resource/scene${id ? `/${id}` : ''}`;
	}

	public static eventStream(ip: string) {
		return `https://${ip}:443/eventstream/clip/v2`;
	}
}
