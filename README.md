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
      <a href="#bridge">Installation</a>
    </li>
    <li>
      <a href="#lights">Lights</a>
    </li>
    <li>
      <a href="#rooms">Rooms</a>
    </li>
    <li>
      <a href="#zones">Zones</a>
    </li>
    <li>
      <a href="#scenes">Scenes</a>
    </li>
    <li>
      <a href="#colors">Colors</a>
    </li>
    <li>
      <a href="#final-note">Final note</a>
    </li>
    <li>
      <a href="#updating-your-code">Updating your code</a>
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

# Example usage

```js
const { Bridge } = require('hue.ts');

const bridge = new Bridge({
  ip: 'some-ip',
});

bridge.on('ready', async () => {
  console.log('Ready!');

  const room = bridge.rooms.cache.get('some-id');
  const scene = bridge.scenes.cache.get('some-id');

  await room.applyScene(scene, { duration: 3000 });
});

bridge.connect('some-application-key');
```

# Installation

**NodeJS v16.13.0 or newer is required**

**Hue bridge version 1948086000 or higher is required**

```shell
npm install hue.ts
```

# Bridge

Let's get started by creating new **Bridge** instance

```js
const { Bridge, BridgeResourceType } = require('hue.ts');

const bridge = new Bridge({
  // You can find the local ip of your bridge in the Hue app -> Settings -> My Hue system -> (Select your bridge)
  ip: 'your-ip-goes-here',
});
// You can read about creating a key here https://developers.meethue.com/develop/get-started-2/
bridge.connect('your-applicationKey-goes-here');
```

The bridge instance has several events you can listen to.

```js
bridge.on('ready', () => {
  console.log('Ready!');
});

// Or

bridge.on('lightUpdate', (before, after) => {
  console.log(after.name, before.isOn(), after.isOn());
});
```

Here is the list of all available events:

- ready
- lightAdd
- lightUpdate
- lightDelete
- groupedLightAdd
- groupedLightUpdate
- groupedLightDelete
- roomAdd
- roomUpdate
- roomDelete
- zoneAdd
- zoneUpdate
- zoneDelete
- sceneAdd
- sceneUpdate
- sceneDelete

In the next sections we assume you place the code in the **ready** event.

# Lights

## Listing all lights in the cache

```js
bridge.lights.cache.forEach((light) => console.log(light.id, light.name));
```

## Getting a specific light in the cache

```js
// By id
const light = bridge.lights.cache.get('some-id');

// By name
const light = bridge.lights.resolve('some-name');
```

## Controlling a light

```js
// Set the light to on with a transition duration of 5000ms
await light.state({ on: true }, { duration: 5000 })
```

If you have a light that can do dimming, temperatures, color or gradient: use the type narrowers as follows.

```js
if (!light.isCapableOfDimming()) return;

// Set the brightness of the light to 100%
await light.state({ brightness: 100 });

// Or for a color light
if (!light.isCapableOfColor()) return;

await light.state({ color: '#37ff00' })
```

These methods are available for the other types of lights too. If you are going to use colors we advise to read the
color section of this README.

# Rooms

## Listing all rooms in the cache

```js
bridge.rooms.cache.forEach((room) => console.log(room.id, room.name));
```

## Getting a specific room in the cache

```js
// By id
const room = bridge.rooms.cache.get('some-id');

// By name
const room = bridge.rooms.resolve('some-name');
```

## Controlling a room

```js
// This is basicly the same as with lights. If you use a state option eg color, it will only apply to lights that are capable of displaying colors
await room.state({ on: true }, { duration: 5000 })
```

# Zones

## Listing all zones in the cache

```js
bridge.zones.cache.forEach((zone) => console.log(zone.id, zone.name));
```

## Getting a specific zone in the cache

```js
// By id
const zone = bridge.zones.cache.get('some-id');

// By name
const zone = bridge.zones.resolve('some-name');
```

## Controlling a zone

```js
// This is basicly the same as with lights. If you use a state option eg color, it will only apply to lights that are capable of displaying colors
await zone.state({ on: true }, { duration: 5000 })
```

# Scenes

## Listing all scenes in the cache

```js
bridge.scenes.cache.forEach((scene) => console.log(scene.id, scene.group.name, scene.name));
```

## Getting a specific scene in the cache

```js
// By id
const scene = bridge.scenes.cache.get('some-id');

// By name
const scene = bridge.scenes.resolve('some-name');
```

## Applying a scene

```js
await scene.apply({ duration: 5000 });
```

## Applying a scene with a Group instance

```js
await group.applyScene(scene);
// Or by id
await group.applyScene('some-id');
// Or by name
await group.applyScene('some-name');
```

# Colors

Here are a few things you should know about colors:

- Colors are only available in hex format at the moment, it might be expanded in the future if theres a use case for it.
- The actual color the light will display may vary from the hex input. This is because the color is recalculated if its
  not in range of what the light can display (not in range of the color gamut)

# Final note

The small guide above does not show all features, only the most important ones. Due to the amazing TypeScript language
you can easily explore these yourself (in your IDE), or view the source code on GitHub.

# Updating your code

Breaking changes, new features and fixes will be in the releases tab of the GitHub repo. Make sure to check there first
before opening an issue.

# Roadmap

This library is still a work in progress, and I plan to add support for all API features. The Hue API V2 is currently
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
