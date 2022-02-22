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

export abstract class Resource extends Base {
	public abstract type: ResourceType;
	public id: string;

	public _patch(data: { id?: string; metadata?: { name?: string } }) {
		if ('id' in data) this.id = data.id;
	}
}
