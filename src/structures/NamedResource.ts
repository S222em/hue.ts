import { Resource } from './Resource';

/**
 * Represents a named Resource
 */
export abstract class NamedResource extends Resource {
	/**
	 * The name of this Resource
	 */
	public name: string;

	/**
	 * Patches the resource with received data
	 * @internal
	 */
	public _patch(data: { id?: string; metadata?: { name?: string } }) {
		super._patch(data);
		if ('metadata' in data) {
			if ('name' in data.metadata) this.name = data.metadata.name;
		}
	}
}
