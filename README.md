[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

**WARNING: this library is still under heavy construction**

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About">About</a>
    </li>
    <li>
      <a href="#example-usage">Example usage</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#docs">Docs</a>
    </li>
    <li>
      <a href="#examples">Examples</a>
    </li>
    <li>
      <a href="#rate-limits">Ratelimits</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
  </ol>
</details>

# About

hue.ts is a node module that allows you to easily interact with the hue API (V2).

- Object-oriented
- Written in TypeScript
- 100%-coverage of the hue API (still work in progress)

# Docs

Docs can be found on our wiki [here][wiki-url].

# Example usage

```js
const { Bridge } = require('hue.ts');

const bridge = new Bridge({
	ip: 'some-ip',
	applicationKey: 'some-key',
});

bridge.on('ready', async () => {
	console.log('Ready!');

	const scene = bridge.scenes.cache.get('some-id');

	await scene.apply({ duration: 5000 });
});

bridge.connect();
```

# Installation

**NodeJS v16.13.0 or newer is required.**

**Hue bridge version 1948086000 or higher is required.**

```shell
npm install hue.ts
```

# Examples

## Connecting to a bridge

```ts
const bridge = new Bridge({
	ip: 'BRIDGE_IP',
	applicationKey: 'APPLICATION_KEY',
	// Uncomment line below if you are having ssl certificate validation issues
	// rejectUnauthorized: false,
});
```

The **BRIDGE_IP** can be found in the Hue app at Settings -> My hue system -> (Your bridge) -> IP

You can get an **APPLICATION_KEY** by following the steps below:

1. Open your browser and go to `https://<bridge ip address>/debug/clip.html`
2. Next fill in the options below:
   URL: /api
   BODY: {"devicetype":"hue_ts#YOUR_USER"}
3. Press the POST button
4. Go click the button on your Hue bridge
5. Press the POST button again
6. You should now see something like `{ success: { username: 'APPLICATION_KEY' } }`

Next we need to connect to the bridge by calling `bridge.connect()` at the bottom of your file.

After the bridge has successfully connected and cached all resources the **ready** event is emitted. You can also listen to other events which can be found [here](https://github.com/S222em/hue.ts/wiki/BridgeEvents).

```ts
bridge.on('ready', () => {
	// Do stuff
});
```

## Lights

First get a light from the cache, you can also get a light from an event like **lightUpdate**.

```ts
const light = bridge.lights.resolve('ID_OR_NAME');
```

To make sure that a light is capable of what you are trying to accomplish, several type gaurds are in place. All of these type gaurds return a **boolean**.

```ts
// The light can do dimming
light.isCapableOfDimming();
// The light can do dimming and temperature
light.isCapableOfTemperature();
// The light can do dimming, temperature and color
light.isCapableOfColor();
// The light can do dimming, temperature, color and gradient
light.isCapableOfGradient();
// The light is a dimmable light
light.isDimmable();
// The light is a temperature light
light.isTemperature();
// The light is a color light
light.isColor();
// The light is a gradient light
light.isGradient();
```

After calling one of these typegaurds additional methods show up that can be used to change the state of the light

```ts
if (light.isCapableOfColor()) {
	await light.setColor('HEX_COLOR');
	// Or
	await light.state({ color: 'HEX_COLOR' });
}
```

The methods above are not available if the `light.isCapableOfColor()` or the `light.isColor()` typegaurd is not called first. The rest of the methods are similiar to above and can all be reviewed in the [wiki][wiki-url].

Lights are connected to another resource: Device. A Device includes properties like the menufacturer and model type. All devices, lights, buttons, etc have a Device connected to it.

```ts
const device = light.device;

console.log(device.product.manufacturerName);
```

## Groups

Groups consist of 2 different resources: rooms and zones.

Lets get a room from the cache to get started:

```ts
const room = bridge.rooms.resolve('ID_OR_NAME');
// Or a Zone
const zone = bridge.zones.resolve('ID_OR_NAME');
```

You can set all the lights in the room to one state, if all lights are capable of what you are trying to set as the state

```ts
await room.state({ color: 'HEX_COLOR' });
```

Settings the color for a light, like above, won't do anything for lights that don't support it.

A light can only be in one room, while a light can have many zones.

```ts
await room.addLight('ID_OR_NAME_OR_LIGHT');
```

If the above method is called on a room (not on a zone), the light will be moved to that room. With zones, the light will keep the zones it was already in, and is added to the new zone as well.

Groups also have a Collection of all the lights that belong to it.

```ts
room.lights.forEach((light) => console.log(light.name));
```

# Ratelimits

hue.ts keeps track of the request you make, and makes sure no ratelimit is hit. This might cause a delay when executing requests. All routes expect lights has a 1 per second ratelimit. Requests to /lights has a 10 per second ratelimit.

# Colors

Not all Hue Lights are the same, so there are differences in the ranges of colors one can display. To make sure the color you gave (e.g. `light.setColor('#15ff00')`) is in range of what the light can actually display, there might be a difference from the color you where trying to display. This might happen on conversion from hex to xy (hue color format), or the other way around. Note that this difference might not be noticable at all.

# Roadmap

This library is still a work in progress, and I plan to add support for all API features, currently focusing on the structure of the library itself. The Hue API V2 is currently
not in a finished state yet, so many features **can't** be implemented yet.

[contributors-shield]: https://img.shields.io/github/contributors/S222em/hue.js.svg?style=for-the-badge
[contributors-url]: https://github.com/S222em/hue.js/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/S222em/hue.js.svg?style=for-the-badge
[forks-url]: https://github.com/S222em/hue.js/network/members
[stars-shield]: https://img.shields.io/github/stars/S222em/hue.js.svg?style=for-the-badge
[stars-url]: https://github.com/S222em/hue.js/stargazers
[issues-shield]: https://img.shields.io/github/issues/S222em/hue.js.svg?style=for-the-badge
[issues-url]: https://github.com/S222em/hue.js/issues
[license-shield]: https://img.shields.io/github/license/S222em/hue.js.svg?style=for-the-badge
[license-url]: https://github.com/S222em/hue.js/blob/master/LICENSE.txt
[wiki-url]: https://github.com/S222em/hue.ts/wiki
