import { Base } from './Base';

export enum ResourceType {
	Light = 'light',
	DimmableLight = 'dimmableLight',
	TemperatureLight = 'temperatureLight',
	ColorLight = 'colorLight',
	GradientLight = 'gradientLight',
	GroupedLight = 'groupedLight',
	Room = 'room',
	Zone = 'zone',
	Scene = 'scene',
}

export abstract class Resource<R extends object> extends Base<R> {
	public abstract type: ResourceType;
}
