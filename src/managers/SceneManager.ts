import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Scene, SceneCreateOptions, SceneEditOptions } from '../structures/Scene';
import { Zone } from '../structures/Zone';
import { Room } from '../structures/Room';
import { transformSceneAction } from '../util/Scene';
import { ifNotNull } from '../util/ifNotNull';

export class SceneManager extends Manager<ResourceType.Scene> {
	type = ResourceType.Scene;
	holds = Scene;

	public async create(groupId: string, options: SceneCreateOptions): Promise<string | undefined> {
		const group: Zone | Room | undefined = this.bridge.zones.cache.get(groupId) ?? this.bridge.rooms.cache.get(groupId);
		if (!group) return;

		const identifiers = await this._post({
			group: group.identifier,
			metadata: { name: options.name },
			actions: options.actions.map((action) => transformSceneAction(action)),
		});

		return identifiers?.[0]?.rid;
	}
	public async edit(id: string, options: SceneEditOptions): Promise<void> {
		await this._put(id, {
			metadata: ifNotNull(options.name, () => Object({ name: options.name! })),
			recall: ifNotNull(options.recall, () =>
				Object({
					action: options.recall!.action ?? 'active',
					duration: options.recall!.duration,
					dimming: { brightness: options.recall!.brightness },
				}),
			),
			actions: ifNotNull(options.actions, () => options.actions!.map((action) => transformSceneAction(action))),
		});
	}

	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
