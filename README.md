[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#example-usage">Example usage</a>
    </li>
    <li>
      <a href="#colors">Colors</a>
    </li>
    <li>
      <a href="#other">Other</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
  </ol>
</details>

> ⚠️ Library is under construction and may not work as expected

# About

hue.ts is a node module that allows you to easily interact with the hue API (V2).

- Object-oriented
- Written in TypeScript
- Future 100%-coverage of the hue API (v2)

# Installation

> ⚠️ **Hue bridge version 1948086000 or newer is required**: You can find your bridge's version in
the hue app, Settings -> My Hue system -> Select your bridge -> Software

```shell
npm install hue.ts
```

# Example usage

This examples goal is to create a new zone, and adding a scene to this zone.

```shell
npm install hue.ts
```

Before connecting to your hue bridge, its ip address and an application key are required.
The ip address can be found in the Hue app at Settings -> My hue system -> Select your bridge -> IP
After, an application key can be acquired by the following method:
1. Open your browser and go to `https://<bridge ip address>/debug/clip.html`
2. Next fill in the options below:
   URL: /api
   BODY: {"devicetype":"some-random-name"}
3. Press the POST button
4. Go click the button on your Hue bridge
5. Press the POST button again
6. You should now see something like `{ success: { username: 'some-key' } }`

For more information on retrieving this key visit: https://developers.meethue.com/develop/hue-api-v2/getting-started/

```ts
import { Hue, ArcheType, SceneAction } from 'hue.ts';
import { fromHex } from "./hex";

// Create new Hue, with the ip address and application key
const hue = new Hue({
   connection: {
      ip: 'some-ip',
      applicationKey: 'some-key',
   },
});

// Listen to the 'ready' event, which is emitted when the socket has connected and cached all resources
hue.on('ready', async () => {
   // Get the lights we want in the new zone
   const light1 = hue.lights.cache.find((light) => light.name == 'Demo Light 1')!;
   const light2 = hue.lights.cache.find((light) => light.name == 'Demo Light 2')!;

   // Create the zone
   const zoneId = await hue.zones.create({
      name: 'Demo',
      archeType: ArcheType.ManCave,
      children: [light1.id, light2.id],
   });

   // Fetch the newly created zone
   const zone = await hue.zones.fetch(zoneId);

   // Make the actions
   // These actions will be executed once the scene is recalled
   const actions = [light1, light2].map((light) => Object({
      id: light.id,
      on: true,
      // Check if the light can do dimming, and if so, set the brightness of the light to 50%
      brightness: light.isCapableOfDimming() ? 50 : undefined,
      // Check if the light can display color, and if so, set the color to #eb403
      color: light.isCapableOfColor() ? fromHex('#eb403') : undefined,
   }));

   // Create the scene
   const sceneId = await zone.createScene({
      name: 'Awesome scene',
      actions,
   });
   
   // Fetch the newly created scene
   const scene = await hue.scenes.fetch(sceneId);
   
   // Recall the scene
   await scene.recall();
});
```
# Colors

Colors... get more complicated. The hue system uses the C.I.E. color representation. This representation is a 2D-colored diagram.
This also means, to get a color of this diagram, a coordinate (position on the horizontal and vertical axes) is needed.
A color is therefor represented as `{ x: number; y: number }`. Where x is the horizontal placement and y the vertical.

![cie-url]

As this is a sort of 'non-standard' color representation, utility functions are provided to convert a rgb/hex value to C.I.E.
```ts
const xy = fromHex('#eb4034');

await light.setColor(xy);
```
```ts
const xy = fromRGB({
   red: 235,
   green: 64,
   blue: 52,
});

await light.setColor(xy);
```
```ts
const hex = toHex(light.color);
```
```ts
const rgb = toRGB(light.color);
```

As also visible in the C.I.E. above, defined by the triangles,
there is a limit to what the light is able to display.
Because of that, there might be a difference of your input and the color of the light.
In order to calculate the color the light is currently showing, the following method can be used.
```ts
const xy = light.colorToRange(light.color);

const hex = toHex(xy);
```

# Links

- [Documentation](documentation-url)
- [GitHub](github-url)
- [npm](npm-url)

# Help

For questions or issues, please open an issue on our [github](issues-url) page.

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
[cie-url]: https://developers.meethue.com/wp-content/uploads/2018/02/color.png
[documentation-url]: https://github.com/S222em/hue.ts/wiki/Exports
[github-url]: https://github.com/S222em/hue.ts
[npm-url]: https://www.npmjs.com/package/hue.ts
