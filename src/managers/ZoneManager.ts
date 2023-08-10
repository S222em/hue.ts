import { Manager } from './Manager';
import { APIResourceType } from '../api/ResourceType';
import { Zone, ZoneCreateOptions, ZoneEditOptions } from '../structures/Zone';
import { transformChildren, transformMetadataWithArcheType } from '../util/Transformers';

/**
 * Manages the zone resource
 */
export class ZoneManager extends Manager<APIResourceType.Zone> {
	type = APIResourceType.Zone;
	holds = Zone;

	/**
	 * Creates a new zone
	 * @param options
	 * @example
	 * ```
	 * await hue.zones.create({
	 *    name: 'Attic',
	 *    archeType: ArcheType.Attic,
	 *    children: ['some-lightId-1', 'some-lightId-2'],
	 * });
	 * ```
	 */
	public async create(options: ZoneCreateOptions): Promise<string | undefined> {
		const identifiers = await this._post({
			metadata: transformMetadataWithArcheType(options)!,
			children: transformChildren(options.children)!,
		});

		return identifiers?.[0]?.rid;
	}

	/**
	 * Edits specified zone
	 * @param id
	 * @param options
	 * @example
	 * ```ts
	 * await hue.zones.edit('some-id', {
	 *    name: 'New name',
	 * });
	 * ```
	 */
	public async edit(id: string, options: ZoneEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadataWithArcheType(options),
			children: transformChildren(options.children),
		});
	}

	/**
	 * Deletes specified zone
	 * @param id
	 */
	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
