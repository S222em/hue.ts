// Bridge
export * from './bridge/Bridge';
export * from './bridge/BridgeEvents';

// Connections
export * from './connections/Rest';
export * from './connections/Limit';
export * from './connections/Sse';

// Managers
export * from './managers/Manager';
export * from './managers/LightManager';
export * from './managers/DeviceManager';
export * from './managers/RoomManager';
export * from './managers/ZoneManager';
export * from './managers/GroupedLightManager';
export * from './managers/DevicePowerManager';
export * from './managers/MotionManager';
export * from './managers/SceneManager';

// Resources
export * from './structures/Device';
export * from './structures/DevicePower';
export * from './structures/DimmableLight';
export * from './structures/GroupedLight';
export * from './structures/Light';
export * from './structures/MirekLight';
export * from './structures/NamedResource';
export * from './structures/Resource';
export * from './structures/Room';
export * from './structures/Scene';
export * from './structures/XyLight';
export * from './structures/XysLight';
export * from './structures/Zone';
export * from './structures/Motion';

// API
export * from './api/ApiResourceType';
export * from './api/ResourceIdentifier';

export * from './api/device/get';
export * from './api/device/put';
export * from './api/device_power/get';
export * from './api/grouped_light/get';
export * from './api/grouped_light/put';
export * from './api/light/get';
export * from './api/light/put';
export * from './api/room/get';
export * from './api/room/post';
export * from './api/room/put';
export * from './api/scene/get';
export * from './api/scene/post';
export * from './api/scene/put';
export * from './api/zone/get';
export * from './api/zone/post';
export * from './api/zone/put';
export * from './api/motion/get';
export * from './api/motion/put';

// Util
export * from './util/util';
export * from './util/clone';
export * from './util/merge';
export * from './util/resourceIdentifier';

export * from './util/color/xy';
export * from './util/color/gamut';
export * from './util/color/rgb';
export * from './util/color/hex';

// TODO dimming_delta & color_temperature_delta
// TODO archetypes
// TODO delete resources
// TODO create cache managers for every resource
