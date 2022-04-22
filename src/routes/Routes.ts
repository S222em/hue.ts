import { ResourceRoute } from './ResourceRoute';
import { DeviceRoute } from './DeviceRoute';
import { LightRoute } from './LightRoute';
import { GroupedLightRoute } from './GroupedLightRoute';
import { RoomRoute } from './RoomRoute';
import { ZoneRoute } from './ZoneRoute';
import { SceneRoute } from './SceneRoute';
import { EventStreamRoute } from './EventStream';

const Routes = {
	Resource: ResourceRoute,
	Device: DeviceRoute,
	Light: LightRoute,
	GroupedLight: GroupedLightRoute,
	Room: RoomRoute,
	Zone: ZoneRoute,
	Scene: SceneRoute,
	EventStream: EventStreamRoute,
};

export { Routes };
