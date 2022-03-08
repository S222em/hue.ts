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

export abstract class Resource<R extends object & { id: string }> extends Base<R> {
	public abstract type: ResourceType;

	get id(): string {
		return this.data.id;
	}

	public abstract fetch(): Promise<Resource<any>>;
}
