import { Manager } from './Manager';
import { ResourceType } from '../api/ResourceType';
import { Scene, SceneCreateOptions, SceneEditOptions } from '../structures/Scene';
import { transformMetadata, transformRecall, transformSceneActions } from '../util/Transformers';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { ifNotNull } from '../util/ifNotNull';

export class SceneManager extends Manager<ResourceType.Scene> {
	type = ResourceType.Scene;
	holds = Scene;

	public async create(groupId: string, options: SceneCreateOptions): Promise<string | undefined> {
		const group = this.hue.zones.cache.get(groupId) ?? this.hue.rooms.cache.get(groupId);
		if (!group) return;

		const identifiers = await this._post({
			group: createResourceIdentifier(groupId, group.type),
			metadata: transformMetadata(options)!,
			actions: transformSceneActions(options.actions)!,
		});

		return identifiers?.[0]?.rid;
	}
	public async edit(id: string, options: SceneEditOptions): Promise<void> {
		await this._put(id, {
			metadata: transformMetadata(options),
			speed: ifNotNull(options.speed, () => options.speed),
			recall: transformRecall(options.recall),
			actions: transformSceneActions(options.actions),
		});
	}

	public async delete(id: string): Promise<void> {
		await this._delete(id);
	}
}
