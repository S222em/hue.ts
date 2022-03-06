export interface ApiResource {
	id: string;
}

export interface ApiNamedResource extends ApiResource {
	metadata: {
		name: string;
	};
}

export interface ApiMetadata {
	name: string;
	archetype: string;
}

export interface ApiOn {
	on: boolean;
}

export interface ApiDimming {
	brightness: number;
}

export interface ApiTemperature {
	mirek: number;
}

export interface ApiColor {
	xy: {
		x: number;
		y: number;
	};
}

export interface ApiGradient {
	color: ApiColor;
}

export interface ApiConnectedResource {
	rid: string;
	rtype: string;
}

export interface ApiLight {
	type?: 'light';
	id: string;
	id_v1?: string;
	owner: ApiConnectedResource;
	metadata: ApiMetadata;
	on: ApiOn;
	dimming?: ApiDimming & {
		min_dim_level: number;
	};
	color_temperature?: ApiTemperature & {
		mirek_valid: boolean;
		mirek_schema: {
			mirek_minimum: number;
			mirek_maximum: number;
		};
	};
	color?: ApiColor & {
		gamut?: {
			red: {
				x: number;
				y: number;
			};
			green: {
				x: number;
				y: number;
			};
			blue: {
				x: number;
				y: number;
			};
		};
		gamut_type: 'A' | 'B' | 'C';
	};
	dynamics?: {
		speed: number;
		status: 'dynamic_palette' | 'none';
		// TODO find the actual object for this
		status_values: any[];
		speed_valid: boolean;
	};
	alert?: {
		// TODO find the actual object for this
		action_values: any[];
	};
	mode: 'normal' | 'streaming';
	gradient?: {
		points: Array<ApiGradient>;
		points_capable: number;
	};
}

export interface ApiGroupedLight {
	type?: 'grouped_light';
	id: string;
	id_v1?: string;
	on: ApiOn;
	alert?: {
		// TODO find the actual object for this
		action_values: any[];
	};
}

export interface ApiGroup {
	type?: 'room' | 'zone';
	id: string;
	id_v1?: string;
	services: Array<ApiConnectedResource>;
	metadata: ApiMetadata;
	children: Array<ApiConnectedResource>;
}

export interface ApiRoom extends ApiGroup {
	type?: 'room';
}

export interface ApiZone extends ApiGroup {
	type?: 'zone';
}

export interface ApiSceneAction {
	target: ApiConnectedResource;
	action: {
		on: ApiOn;
		dimming?: ApiDimming;
		color?: ApiColor;
		color_temperature?: ApiTemperature;
		gradient?: {
			points: Array<ApiGradient>;
		};
	};
}

export interface ApiScene {
	type?: 'scene';
	id: string;
	id_v1?: string;
	metadata: Omit<ApiMetadata, 'archetype'> & {
		image?: ApiConnectedResource;
	};
	group: ApiConnectedResource;
	actions: Array<ApiSceneAction>;
	palette?: {
		color: {
			color: ApiColor;
			dimming: ApiDimming;
		};
		dimming?: ApiDimming;
		color_temperature?: ApiTemperature & {
			dimming: ApiDimming;
		};
	};
	speed: number;
	recall?: {
		action: 'active' | 'dynamic_palette';
		status: 'active' | null;
		duration: number;
		dimming: {
			brightness: number;
		};
	};
}
