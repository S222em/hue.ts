import { Hue } from './Hue';
import { Request, Response } from '../connections/Rest';
import { Light } from '../structures/Light';
import { Device } from '../structures/Device';
import { Room } from '../structures/Room';
import { Zone } from '../structures/Zone';
import { Scene } from '../structures/Scene';
import { GroupedLight } from '../structures/GroupedLight';
import { DevicePower } from '../structures/DevicePower';
import { Motion } from '../structures/Motion';
import { ZigbeeConnectivity } from '../structures/ZigbeeConnectivity';
import { ZigbeeDeviceDiscovery } from '../structures/ZigbeeDeviceDiscovery';
import { Bridge } from '../structures/Bridge';
import { BridgeHome } from '../structures/BridgeHome';
import { Geolocation } from '../structures/Geolocation';
import { Button } from '../structures/Button';
import { Temperature } from '../structures/Temperature';
import { LightLevel } from '../structures/LightLevel';

export const Events = {
	Ready: 'ready',
	Error: 'error',
	Raw: 'raw',
	Debug: 'debug',
	Request: 'request',
	Response: 'response',
	DeviceAdd: 'deviceAdd',
	DeviceUpdate: 'deviceUpdate',
	DeviceDelete: 'deviceDelete',
	GroupedLightAdd: 'groupedLightAdd',
	GroupedLightUpdate: 'groupedLightUpdate',
	GroupedLightDelete: 'groupedLightDelete',
	LightAdd: 'lightAdd',
	LightUpdate: 'lightUpdate',
	LightDelete: 'lightDelete',
	RoomAdd: 'roomAdd',
	RoomUpdate: 'roomUpdate',
	RoomDelete: 'roomDelete',
	SceneAdd: 'sceneAdd',
	SceneUpdate: 'sceneUpdate',
	SceneDelete: 'sceneDelete',
	ZoneAdd: 'zoneAdd',
	ZoneUpdate: 'zoneUpdate',
	ZoneDelete: 'zoneDelete',
	DevicePowerAdd: 'devicePowerAdd',
	DevicePowerUpdate: 'devicePowerUpdate',
	DevicePowerDelete: 'devicePowerDelete',
	MotionAdd: 'motionAdd',
	MotionUpdate: 'motionUpdate',
	MotionDelete: 'motionDelete',
	ZigbeeConnectivityAdd: 'zigbeeConnectivityAdd',
	ZigbeeConnectivityUpdate: 'zigbeeConnectivityUpdate',
	ZigbeeConnectivityDelete: 'zigbeeConnectivityDelete',
	ZigbeeDeviceDiscoveryAdd: 'zigbeeDeviceDiscoveryAdd',
	ZigbeeDeviceDiscoveryUpdate: 'zigbeeDeviceDiscoveryUpdate',
	ZigbeeDeviceDiscoveryDelete: 'zigbeeDeviceDiscoveryDelete',
	BridgeAdd: 'bridgeAdd',
	BridgeUpdate: 'bridgeUpdate',
	BridgeDelete: 'bridgeDelete',
	BridgeHomeAdd: 'bridgeHomeAdd',
	BridgeHomeUpdate: 'bridgeHomeUpdate',
	BridgeHomeDelete: 'bridgeHomeDelete',
	GeolocationAdd: 'geolocationAdd',
	GeolocationUpdate: 'geolocationUpdate',
	GeolocationDelete: 'geolocationDelete',
	ButtonAdd: 'buttonAdd',
	ButtonUpdate: 'buttonUpdate',
	ButtonDelete: 'buttonDelete',
	TemperatureAdd: 'temperatureAdd',
	TemperatureUpdate: 'temperatureUpdate',
	TemperatureDelete: 'temperatureDelete',
	LightLevelAdd: 'lightLevelAdd',
	LightLevelUpdate: 'lightLevelUpdate',
	LightLevelDelete: 'lightLevelDelete',
} as const;

export interface HueEvents {
	[Events.Ready]: [bridge: Hue];
	[Events.Error]: [error: Error];
	[Events.Raw]: [data: Record<string, any>];
	[Events.Debug]: [debug: string];
	[Events.Request]: [request: Request];
	[Events.Response]: [response: Response];
	[Events.DeviceAdd]: [device: Device];
	[Events.DeviceUpdate]: [newDevice: Device, oldDevice: Device];
	[Events.DeviceDelete]: [device: Device];
	[Events.GroupedLightAdd]: [groupedLight: GroupedLight];
	[Events.GroupedLightUpdate]: [newGroupedLight: GroupedLight, oldGroupedLight: GroupedLight];
	[Events.GroupedLightDelete]: [groupedLight: GroupedLight];
	[Events.LightAdd]: [light: Light];
	[Events.LightUpdate]: [newLight: Light, oldLight: Light];
	[Events.LightDelete]: [light: Light];
	[Events.RoomAdd]: [room: Room];
	[Events.RoomUpdate]: [newRoom: Room, oldRoom: Room];
	[Events.RoomDelete]: [room: Room];
	[Events.SceneAdd]: [scene: Scene];
	[Events.SceneUpdate]: [newScene: Scene, oldScene: Scene];
	[Events.SceneDelete]: [scene: Scene];
	[Events.ZoneAdd]: [zone: Zone];
	[Events.ZoneUpdate]: [newZone: Zone, oldZone: Zone];
	[Events.ZoneDelete]: [zone: Zone];
	[Events.DevicePowerAdd]: [devicePower: DevicePower];
	[Events.DevicePowerUpdate]: [newDevicePower: DevicePower, oldDevicePower: DevicePower];
	[Events.DevicePowerDelete]: [devicePower: DevicePower];
	[Events.MotionAdd]: [motion: Motion];
	[Events.MotionUpdate]: [newMotion: Motion, oldMotion: Motion];
	[Events.MotionDelete]: [motion: Motion];
	[Events.ZigbeeConnectivityAdd]: [zigbeeConnectivity: ZigbeeConnectivity];
	[Events.ZigbeeConnectivityUpdate]: [
		newZigbeeConnectivity: ZigbeeConnectivity,
		oldZigbeeConnectivity: ZigbeeConnectivity,
	];
	[Events.ZigbeeConnectivityDelete]: [zigbeeConnectivity: ZigbeeConnectivity];
	[Events.ZigbeeDeviceDiscoveryAdd]: [zigbeeDeviceDiscovery: ZigbeeDeviceDiscovery];
	[Events.ZigbeeDeviceDiscoveryUpdate]: [
		newZigbeeDeviceDiscovery: ZigbeeDeviceDiscovery,
		oldZigbeeDeviceDiscovery: ZigbeeDeviceDiscovery,
	];
	[Events.ZigbeeDeviceDiscoveryDelete]: [zigbeeDeviceDiscovery: ZigbeeDeviceDiscovery];
	[Events.BridgeAdd]: [bridge: Bridge];
	[Events.BridgeUpdate]: [newBridge: Bridge, oldBridge: Bridge];
	[Events.BridgeDelete]: [bridge: Bridge];
	[Events.BridgeHomeAdd]: [bridgeHome: BridgeHome];
	[Events.BridgeHomeUpdate]: [newBridgeHome: BridgeHome, oldBridgeHome: BridgeHome];
	[Events.BridgeHomeDelete]: [bridgeHome: BridgeHome];
	[Events.GeolocationAdd]: [geolocation: Geolocation];
	[Events.GeolocationUpdate]: [newGeolocation: Geolocation, oldGeolocation: Geolocation];
	[Events.GeolocationDelete]: [geolocation: Geolocation];
	[Events.ButtonAdd]: [button: Button];
	[Events.ButtonUpdate]: [newButton: Button, oldButton: Button];
	[Events.ButtonDelete]: [button: Button];
	[Events.TemperatureAdd]: [temperature: Temperature];
	[Events.TemperatureUpdate]: [newTemperature: Temperature, oldTemperature: Temperature];
	[Events.TemperatureDelete]: [temperature: Temperature];
	[Events.LightLevelAdd]: [lightLevel: LightLevel];
	[Events.LightLevelUpdate]: [newLightLevel: LightLevel, oldLightLevel: LightLevel];
	[Events.LightLevelDelete]: [lightLevel: LightLevel];
}
