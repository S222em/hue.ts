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

/**
 * Represents a Resource
 */
export abstract class Resource extends Base {
	/**
	 * The type of this Resource
	 */
	public abstract type: ResourceType;
	/**
	 * The id of this Resource
	 */
	public id: string;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: { id?: string; metadata?: { name?: string } }) {
		if ('id' in data) this.id = data.id;
	}
}
