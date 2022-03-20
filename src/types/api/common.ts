export enum ApiResourceType {
	Device = 'device',
	BridgeHome = 'bridge_home',
	Room = 'room',
	Zone = 'zone',
	Light = 'light',
	Button = 'button',
	Temperature = 'temperature',
	LightLevel = 'light_level',
	Motion = 'motion',
	Entertainment = 'entertainment',
	GroupedLight = 'grouped_light',
	DevicePower = 'device_power',
	ZigbeeBridgeConnectivity = 'zigbee_bridge_connectivity',
	ZgpConnectivity = 'zgp_connectivity',
	Bridge = 'bridge',
	Homekit = 'homekit',
	Scene = 'scene',
	EntertainmentConfiguration = 'entertainment_configuration',
	PublicImage = 'public_image',
	BehaviourScript = 'behaviour_script',
	BehaviourInstance = 'behaviour_instance',
	Geofence = 'geofence',
	GeofenceClient = 'geofence_client',
	Geolocation = 'geolocation',
}

export interface ApiConnectedResource<T extends ApiResourceType = ApiResourceType> {
	rid: string;
	rtype: T;
}

export interface ApiError {
	message: string;
}

export interface ApiReturnGet<T> {
	errors?: ApiError[];
	data: T[];
}

export interface ApiReturnPut<T extends ApiResourceType> {
	errors?: ApiError[];
	data: ApiConnectedResource<T>;
}

export type ApiReturnDelete<T extends ApiResourceType> = ApiReturnPut<T>;
export type ApiReturnPost<T extends ApiResourceType> = ApiReturnPut<T>;

export interface ApiMetadata {
	name?: string;
}

export interface ApiOn {
	on: boolean;
}

export interface ApiDimming {
	brightness: number;
}

export interface ApiColorTemperature {
	mirek: number;
}

export interface ApiColor {
	xy: {
		x: number;
		y: number;
	};
}

export interface ApiGradient {
	points: Array<{ color: ApiColor }>;
}
