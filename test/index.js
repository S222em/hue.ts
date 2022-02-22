const { Bridge, Colors } = require('../dist');

const bridge = new Bridge({
	ip: '192.168.178.180',
	applicationKey: 'WOXEOCMOxXTKQmPnjgUhVeLeoJsSHypFl5vz3HOb',
});

bridge.on('ready', async () => {
	console.log('Ready!');

	// bridge.lights.cache.forEach((light) => console.log(light.id, light.name));
	// bridge.rooms.forEach((room) => console.log(room.id, room.name));
	// bridge.scenes.cache.forEach((scene) => console.log(scene.id, scene.name, scene.group.name));

	// const scene = bridge.scenes.cache.get('193d7d39-d31c-4afd-90f1-8701991d4e7f');

	// await scene.apply();

	const room = await bridge.rooms.cache.get('3778eb1c-00ae-4c48-ad55-ab9f7e1d3eb3');

	await room.applyScene('Default', { transition: 5000 });

	// const light = bridge.lights.get('19a9e154-7227-40ad-90ce-0ffece23d47b');

	// await room.setColor('#2eff00');

	// room.lights.forEach((light) => console.log(light.id, light.name));
});

bridge.on('lightAdd', (light) => console.log('lightAdd', light.name));
bridge.on('lightUpdate', (light) => console.log('lightUpdate', light.name));
bridge.on('lightDelete', (light) => console.log('lightDelete', light.name));

bridge.on('roomAdd', (room) => console.log('roomAdd', room.name));
bridge.on('roomUpdate', (room) => console.log('roomUpdate', room.name));
bridge.on('roomDelete', (room) => console.log('roomDelete', room.name));

bridge.on('zoneAdd', (zone) => console.log('zoneAdd', zone.name));
bridge.on('zoneUpdate', (zone) => console.log('zoneUpdate', zone.name));
bridge.on('zoneDelete', (zone) => console.log('zoneDelete', zone.name));

bridge.on('groupedLightAdd', (groupedLight) => console.log('groupedLightAdd', groupedLight.group?.name));
bridge.on('groupedLightUpdate', (groupedLight) => console.log('groupedLightUpdate', groupedLight.group?.name));
bridge.on('groupedLightDelete', (groupedLight) => console.log('groupedLightDelete', groupedLight.group?.name));
